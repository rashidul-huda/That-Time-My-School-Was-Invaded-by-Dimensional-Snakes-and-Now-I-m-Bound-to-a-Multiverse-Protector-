const SAVE_KEY = 'snakesVN_saveData';
const UNLOCKS_KEY = 'snakesVN_unlocks';
const PRELOAD_STEPS = 4;
const TOTAL_CHAPTERS = 3; 

const bgmPlayer = new Audio();
bgmPlayer.loop = true;
const sfxPlayer = new Audio();
sfxPlayer.loop = false;

const mainMenu = document.getElementById('main-menu');
const loadingScreen = document.getElementById('loading-screen');
const loadingText = document.getElementById('loading-text');
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

let isTyping = false;
let typeInterval = null;
let fullCurrentText = '';
let currentTextIndex = 0;

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
    
    for (let chId = 1; chId <= TOTAL_CHAPTERS; chId++) {
        const btn = document.createElement('button');
        btn.className = 'chapter-btn';
        btn.innerText = `Chapter ${chId}`;
        
        if (unlocked.includes(chId)) {
            btn.classList.add('unlocked');
            btn.onclick = () => startLoadProcess(chId);
        } else {
            btn.innerText += " (Locked)";
        }
        chapterList.appendChild(btn);
    }
}

function loadChapterScript(chapterId, callback) {
    if (window['chapter' + chapterId]) {
        callback();
        return;
    }

    loadingText.innerText = "Downloading Chapter Data...";
    
    const script = document.createElement('script');
    script.src = `js/chapters/chapter${chapterId}.js`;
    
    script.onload = () => {
        loadingText.innerText = "Loading Assets...";
        callback();
    };
    
    script.onerror = () => {
        alert("Failed to load chapter data. Please check your connection.");
        loadingScreen.style.display = 'none';
        mainMenu.style.display = 'flex';
    };
    
    document.body.appendChild(script);
}

function preloadAhead(startIndex) {
    if (!storyScript || storyScript.length === 0) return;
    const endIndex = Math.min(startIndex + PRELOAD_STEPS, storyScript.length);
    for (let i = startIndex; i < endIndex; i++) {
        const step = storyScript[i];
        if (step.bg) { 
            const img = new Image(); 
            img.src = step.bg; 
        }
        if (step.char) { 
            const img = new Image(); 
            img.src = step.char; 
        }
        if (step.bgm) {
            const a = new Audio();
            a.src = step.bgm;
        }
        if (step.sfx) {
            const a = new Audio();
            a.src = step.sfx;
        }
    }
}

function startLoadProcess(chapterId, loadSaveData = null) {
    mainMenu.style.display = 'none';
    loadingScreen.style.display = 'flex';
    
    loadChapterScript(chapterId, () => {
        activeChapterId = chapterId;
        storyScript = window['chapter' + chapterId];
        
        let startStep = loadSaveData ? loadSaveData.currentStep : 0;
        
        preloadAhead(startStep);
        
        setTimeout(() => {
            completeLoad(loadSaveData);
        }, 600);
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
        
        hasUnsavedChanges = false; 
        
        renderStep(storyScript[currentStep], false);
    }
}

function startTyping(text) {
    clearInterval(typeInterval);
    fullCurrentText = text;
    dialogueText.textContent = '';
    currentTextIndex = 0;
    isTyping = true;
    
    const fwdBtn = document.getElementById('btn-forward');
    if(fwdBtn) fwdBtn.classList.remove('bouncing');

    if (!text) {
        finishTyping();
        return;
    }

    typeInterval = setInterval(() => {
        currentTextIndex++;
        dialogueText.textContent = fullCurrentText.substring(0, currentTextIndex);
        
        if (currentTextIndex >= fullCurrentText.length) {
            finishTyping();
        }
    }, 25);
}

function finishTyping() {
    clearInterval(typeInterval);
    dialogueText.textContent = fullCurrentText;
    isTyping = false;
    
    const fwdBtn = document.getElementById('btn-forward');
    if(fwdBtn) fwdBtn.classList.add('bouncing');
}

function advanceStory() {
    if (isTyping) {
        finishTyping();
        return;
    }

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
        preloadAhead(currentStep + 1);
        renderStep(storyScript[currentStep], false);
    } else {
        handleChapterEnd();
    }
}

function goBack() {
    if (isTyping) {
        finishTyping();
        return;
    }

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
        bgLayer.classList.remove('vfx-shake');
        charLayer.classList.remove('vfx-shake');
        uiLayer.classList.remove('vfx-shake');

        void bgLayer.offsetWidth;
        void charLayer.offsetWidth;
        void vfxLayer.offsetWidth;
        void uiLayer.offsetWidth;

        if (step.vfx) {
            const vfxClasses = step.vfx.split(' ');
            
            vfxClasses.forEach(vfxClass => {
                if (vfxClass === 'vfx-shake') {
                    bgLayer.classList.add('vfx-shake');
                    charLayer.classList.add('vfx-shake');
                    vfxLayer.classList.add('vfx-shake');
                    uiLayer.classList.add('vfx-shake');
                } else {
                    vfxLayer.classList.add(vfxClass);
                }
            });
            
            if (step.vfx.includes('vfx-blackout') && step.text === '...') {
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
                preloadAhead(currentStep);
                renderStep(storyScript[currentStep], false);
            };
            choicesContainer.appendChild(btn);
        });
    } else {
        dialogueBox.style.display = 'block';
        speakerName.innerText = step.speaker || '';
        
        if (isGoingBack) {
            fullCurrentText = step.text || '';
            finishTyping();
        } else {
            startTyping(step.text || '');
        }
    }
}

function handleChapterEnd() {
    let unlocked = JSON.parse(localStorage.getItem(UNLOCKS_KEY)) || [1];
    let nextChapterId = activeChapterId + 1;

    if (!unlocked.includes(nextChapterId) && nextChapterId <= TOTAL_CHAPTERS) {
        unlocked.push(nextChapterId);
        localStorage.setItem(UNLOCKS_KEY, JSON.stringify(unlocked));
    }

    if (activeChapterId < TOTAL_CHAPTERS) {
        const saveData = {
            chapterId: nextChapterId,
            currentStep: 0,
            stepHistory: [],
            persistentState: { bg: null, char: null, bgm: null }
        };
        localStorage.setItem(SAVE_KEY, JSON.stringify(saveData));
        hasUnsavedChanges = false;

        uiLayer.style.display = 'none';
        bgLayer.style.backgroundImage = 'none';
        charLayer.style.backgroundImage = 'none';
        vfxLayer.className = 'layer';
        
        startLoadProcess(nextChapterId);
    } else {
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
    const isNativeFs = document.fullscreenElement || document.webkitFullscreenElement || document.msFullscreenElement;
    const isPseudoFs = gameContainer.classList.contains('pseudo-fullscreen');
    if (isNativeFs || isPseudoFs) {
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
    const isNativeFs = document.fullscreenElement || document.webkitFullscreenElement || document.msFullscreenElement;
    const isPseudoFs = gameContainer.classList.contains('pseudo-fullscreen');
    
    if (!isNativeFs && !isPseudoFs) {
        const req = gameContainer.requestFullscreen || gameContainer.webkitRequestFullscreen || gameContainer.msRequestFullscreen;
        if (req) {
            try {
                const promise = req.call(gameContainer);
                if (promise !== undefined) {
                    promise.catch(() => {
                        gameContainer.classList.add('pseudo-fullscreen');
                        updateFullscreenButton();
                    });
                } else {
                    setTimeout(() => {
                        if (!document.fullscreenElement && !document.webkitFullscreenElement) {
                            gameContainer.classList.add('pseudo-fullscreen');
                            updateFullscreenButton();
                        }
                    }, 200);
                }
            } catch (e) {
                gameContainer.classList.add('pseudo-fullscreen');
                updateFullscreenButton();
            }
        } else {
            gameContainer.classList.add('pseudo-fullscreen');
            updateFullscreenButton();
        }
    } else {
        if (isNativeFs) {
            const exit = document.exitFullscreen || document.webkitExitFullscreen || document.msExitFullscreen;
            if (exit) exit.call(document);
        }
        if (isPseudoFs) {
            gameContainer.classList.remove('pseudo-fullscreen');
            updateFullscreenButton();
        }
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
