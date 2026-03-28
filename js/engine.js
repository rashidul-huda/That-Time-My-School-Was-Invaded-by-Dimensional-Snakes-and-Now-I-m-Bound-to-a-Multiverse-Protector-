const SAVE_KEY = 'snakesVN_saveData';
const UNLOCKS_KEY = 'snakesVN_unlocks';

const gameChapters = {
    1: typeof chapter1 !== 'undefined' ? chapter1 : [],
    2: typeof chapter2 !== 'undefined' ? chapter2 : []
};

const bgmPlayer = new Audio();
bgmPlayer.loop = true;
const sfxPlayer = new Audio();
sfxPlayer.loop = false;

const mainMenu = document.getElementById('main-menu');
const loadingScreen = document.getElementById('loading-screen');
const uiLayer = document.getElementById('ui-layer');
const bgLayer = document.getElementById('bg-layer');
const charLayer = document.getElementById('char-layer');
const vfxLayer = document.getElementById('vfx-layer');
const speakerName = document.getElementById('speaker-name');
const dialogueText = document.getElementById('dialogue-text');
const dialogueBox = document.getElementById('dialogue-box');
const choicesContainer = document.getElementById('choices-container');
const chapterList = document.getElementById('chapter-list');
const btnContinue = document.getElementById('btn-continue');
const gameContainer = document.getElementById('game-container');
const clickToStart = document.getElementById('click-to-start');
const fullscreenBtn = document.getElementById('fullscreen-btn');

let activeChapterId = 1;
let storyScript = [];
let currentStep = 0;
let stepHistory = [];
let hasUnsavedChanges = false;
let persistentState = {
    bg: null,
    char: null,
    bgm: null
};

function playMenuMusic() {
    if (!bgmPlayer.src.includes('before_the_pressure_breaks.mp3')) {
        bgmPlayer.src = 'assets/before_the_pressure_breaks.mp3';
    }
    bgmPlayer.play().catch(e => {});
}

function initMenu() {
    const savedData = localStorage.getItem(SAVE_KEY);
    if (savedData) {
        btnContinue.style.display = 'inline-block';
    }

    let unlocked = JSON.parse(localStorage.getItem(UNLOCKS_KEY)) || [1];
    chapterList.innerHTML = '';
    
    Object.keys(gameChapters).forEach(chId => {
        if (gameChapters[chId].length === 0) return; 

        const btn = document.createElement('button');
        btn.className = 'chapter-btn';
        btn.innerText = `Chapter ${chId}`;
        
        if (unlocked.includes(parseInt(chId))) {
            btn.classList.add('unlocked');
            btn.onclick = () => startLoadProcess(parseInt(chId));
        } else {
            btn.innerText += " (Locked)";
        }
        chapterList.appendChild(btn);
    });
}

function startLoadProcess(chapterId, loadSaveData = null) {
    mainMenu.style.display = 'none';
    loadingScreen.style.display = 'flex';
    
    activeChapterId = chapterId;
    storyScript = gameChapters[chapterId];
    
    const assets = new Set();
    storyScript.forEach(step => {
        if (step.bg) assets.add(step.bg);
        if (step.char) assets.add(step.char);
        if (step.bgm && step.bgm !== '') assets.add(step.bgm);
        if (step.sfx) assets.add(step.sfx);
    });

    let loaded = 0;
    const total = assets.size;
    
    if (total === 0) {
        completeLoad(loadSaveData);
        return;
    }

    const checkDone = () => {
        loaded++;
        if (loaded >= total) {
            completeLoad(loadSaveData);
        }
    };

    setTimeout(() => {
        if (loadingScreen.style.display === 'flex') {
            completeLoad(loadSaveData);
        }
    }, 5000);

    assets.forEach(src => {
        if (src.endsWith('.mp3') || src.endsWith('.wav')) {
            const audio = new Audio();
            audio.oncanplaythrough = checkDone;
            audio.onerror = checkDone;
            audio.src = src;
        } else {
            const img = new Image();
            img.onload = checkDone;
            img.onerror = checkDone;
            img.src = src;
        }
    });
}

function completeLoad(loadSaveData) {
    loadingScreen.style.display = 'none';
    uiLayer.style.display = 'block';
    fullscreenBtn.classList.add('in-game');
    
    if (loadSaveData) {
        currentStep = loadSaveData.currentStep;
        stepHistory = loadSaveData.stepHistory;
        persistentState = loadSaveData.persistentState;
        applyPersistentState();
        hasUnsavedChanges = false;
        renderStep(storyScript[currentStep], false); 
    } else {
        currentStep = 0;
        stepHistory = [];
        persistentState = { bg: null, char: null, bgm: null };
        bgLayer.style.backgroundImage = 'none';
        charLayer.style.backgroundImage = 'none';
        bgmPlayer.pause();
        hasUnsavedChanges = true;
        renderStep(storyScript[currentStep], false);
    }
}

function advanceStory() {
    if (choicesContainer.style.display === 'flex') return;

    stepHistory.push({
        step: currentStep,
        state: JSON.parse(JSON.stringify(persistentState))
    });

    hasUnsavedChanges = true;
    let nextStep = currentStep;
    if (storyScript[currentStep].jumpTo !== undefined) {
        nextStep = storyScript[currentStep].jumpTo;
    } else {
        nextStep++;
    }

    if (nextStep < storyScript.length) {
        currentStep = nextStep;
        renderStep(storyScript[currentStep], false);
    } else {
        handleChapterEnd();
    }
}

function goBack() {
    if (stepHistory.length > 0) {
        const previous = stepHistory.pop();
        currentStep = previous.step;
        persistentState = previous.state;
        hasUnsavedChanges = true;
        
        applyPersistentState();
        choicesContainer.style.display = 'none';
        dialogueBox.style.display = 'block';
        vfxLayer.className = 'layer';
        renderStep(storyScript[currentStep], true);
    }
}

function applyPersistentState() {
    bgLayer.style.backgroundImage = persistentState.bg ? `url('${persistentState.bg}')` : 'none';
    bgLayer.style.opacity = 1;
    charLayer.style.backgroundImage = persistentState.char ? `url('${persistentState.char}')` : 'none';
    charLayer.style.opacity = 1;

    if (persistentState.bgm === null || persistentState.bgm === '') {
        bgmPlayer.pause();
    } else {
        if (!bgmPlayer.src.includes(persistentState.bgm)) {
            bgmPlayer.src = persistentState.bgm;
        }
        bgmPlayer.play().catch(e => {});
    }
}

function renderStep(step, isGoingBack) {
    if (step.bg !== undefined) persistentState.bg = step.bg;
    if (step.char !== undefined) persistentState.char = step.char;
    if (step.bgm !== undefined) persistentState.bgm = step.bgm;

    if (!isGoingBack) {
        if (step.bg !== undefined) {
            bgLayer.style.opacity = 0;
            setTimeout(() => {
                bgLayer.style.backgroundImage = step.bg ? `url('${step.bg}')` : 'none';
                bgLayer.style.opacity = 1;
            }, 150);
        }
        if (step.char !== undefined) {
            charLayer.style.opacity = 0;
            setTimeout(() => {
                charLayer.style.backgroundImage = step.char ? `url('${step.char}')` : 'none';
                charLayer.style.opacity = 1;
            }, 150);
        }
        
        if (step.bgm !== undefined) {
            if (step.bgm === '') {
                bgmPlayer.pause();
            } else {
                if (!bgmPlayer.src.includes(step.bgm)) {
                    bgmPlayer.src = step.bgm;
                }
                bgmPlayer.play().catch(e => {});
            }
        }
        
        if (step.sfx) {
            sfxPlayer.src = step.sfx;
            sfxPlayer.currentTime = 0;
            sfxPlayer.play().catch(e => {});
        }

        vfxLayer.className = 'layer'; 
        if (step.vfx) {
            setTimeout(() => {
                vfxLayer.classList.add(step.vfx);
            }, 10);
            
            if (step.vfx === 'vfx-blackout' && step.text === '...') {
                 setTimeout(() => { vfxLayer.classList.remove('vfx-blackout'); advanceStory(); }, 1000);
                 dialogueBox.style.display = 'none';
                 return;
            }
        }
    }

    if (step.text && step.text.includes('END]')) {
        handleChapterEnd();
        return;
    }

    if (step.choices) {
        dialogueBox.style.display = 'none';
        choicesContainer.innerHTML = '';
        choicesContainer.style.display = 'flex';
        
        step.choices.forEach(choice => {
            const btn = document.createElement('button');
            btn.className = 'choice-btn';
            btn.innerText = choice.text;
            btn.onclick = () => {
                stepHistory.push({
                    step: currentStep,
                    state: JSON.parse(JSON.stringify(persistentState))
                });
                hasUnsavedChanges = true;
                choicesContainer.style.display = 'none';
                dialogueBox.style.display = 'block';
                currentStep += choice.nextStepOffset;
                renderStep(storyScript[currentStep], false);
            };
            choicesContainer.appendChild(btn);
        });
    } else {
        dialogueBox.style.display = 'block';
        speakerName.innerText = step.speaker || '';
        dialogueText.innerText = step.text || '';
    }
}

function handleChapterEnd() {
    let unlocked = JSON.parse(localStorage.getItem(UNLOCKS_KEY)) || [1];
    if (!unlocked.includes(activeChapterId + 1)) {
        unlocked.push(activeChapterId + 1);
        localStorage.setItem(UNLOCKS_KEY, JSON.stringify(unlocked));
    }
    uiLayer.style.display = 'none';
    bgLayer.style.backgroundImage = 'none';
    charLayer.style.backgroundImage = 'none';
    vfxLayer.className = 'layer';
    fullscreenBtn.classList.remove('in-game');
    initMenu();
    mainMenu.style.display = 'flex';
    playMenuMusic();
}

function saveGame() {
    const saveData = {
        chapterId: activeChapterId,
        currentStep: currentStep,
        stepHistory: stepHistory,
        persistentState: persistentState
    };
    localStorage.setItem(SAVE_KEY, JSON.stringify(saveData));
    hasUnsavedChanges = false;
    alert('Game Saved Successfully!');
    initMenu();
}

function returnToMenu() {
    if (!hasUnsavedChanges || confirm("Are you sure you want to leave? Unsaved progress will be lost.")) {
        uiLayer.style.display = 'none';
        bgLayer.style.backgroundImage = 'none';
        charLayer.style.backgroundImage = 'none';
        vfxLayer.className = 'layer';
        fullscreenBtn.classList.remove('in-game');
        initMenu();
        mainMenu.style.display = 'flex';
        playMenuMusic();
    }
}

function updateFullscreenButton() {
    if (document.fullscreenElement || document.webkitFullscreenElement || document.msFullscreenElement) {
        fullscreenBtn.innerText = '⛶ Exit Fullscreen';
    } else {
        fullscreenBtn.innerText = '⛶ Fullscreen';
    }
}

document.addEventListener('fullscreenchange', updateFullscreenButton);
document.addEventListener('webkitfullscreenchange', updateFullscreenButton);
document.addEventListener('MSFullscreenChange', updateFullscreenButton);

document.getElementById('btn-new-game').onclick = () => {
    startLoadProcess(1);
};

document.getElementById('btn-continue').onclick = () => {
    const savedData = JSON.parse(localStorage.getItem(SAVE_KEY));
    if (savedData) {
        startLoadProcess(savedData.chapterId, savedData);
    }
};

document.getElementById('btn-back').onclick = goBack;
document.getElementById('btn-forward').onclick = advanceStory;
dialogueBox.onclick = advanceStory;
document.getElementById('save-btn').onclick = saveGame;
document.getElementById('leave-btn').onclick = returnToMenu;

fullscreenBtn.onclick = () => {
    if (!document.fullscreenElement) {
        if (gameContainer.requestFullscreen) gameContainer.requestFullscreen();
        else if (gameContainer.webkitRequestFullscreen) gameContainer.webkitRequestFullscreen();
        else if (gameContainer.msRequestFullscreen) gameContainer.msRequestFullscreen();
    } else {
        if (document.exitFullscreen) document.exitFullscreen();
        else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
        else if (document.msExitFullscreen) document.msExitFullscreen();
    }
};

clickToStart.addEventListener('click', () => {
    clickToStart.style.opacity = '0';
    setTimeout(() => {
        clickToStart.style.display = 'none';
    }, 500);
    playMenuMusic();
});

initMenu();
