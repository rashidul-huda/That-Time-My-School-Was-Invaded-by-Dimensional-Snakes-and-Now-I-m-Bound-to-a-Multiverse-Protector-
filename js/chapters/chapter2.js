const chapter2 = [
    {
        vfx: 'vfx-blackout',
        sfx: 'assets/chapter2/sound_effects/crowd_stampede.mp3',
        speaker: '',
        text: 'The lingering sound of shattered glass fades into a low, terrifying rumble. A deafening chorus of screams erupts from everywhere in the building as hundreds of rubber-soled shoes squeak frantically against the linoleum.'
    },
    {
        bg: 'assets/chapter2/backgrounds/the_stairwell_emergency_lights.png',
        bgm: 'assets/chapter2/background_music/the_stampede_claustrophobic_panic.mp3',
        speaker: 'Ren (Internal)',
        text: 'The glass shattered on the first floor. The main entrance.'
    },
    {
        speaker: 'Ren (Internal)',
        text: 'They’re inside.'
    },
    {
        speaker: 'Ren (Internal)',
        text: 'The realization hits the crowd in the stairwell like a physical shockwave. A second ago, everyone was pushing down to escape. Now, the tide violently reverses.'
    },
    {
        char: 'assets/chapter2/characters/random_student/random_student.png',
        vfx: 'vfx-shake',
        speaker: 'Random Student',
        text: '"GO BACK! GO BACK UP! THEY\'RE IN THE LOBBY!"'
    },
    {
        sfx: 'assets/chapter2/sound_effects/crushing_metal.mp3',
        char: '',
        speaker: 'Ren (Internal)',
        text: 'The stampede is instantaneous. It’s no longer a group of students; it’s a blind, terrified animal trying to survive. I’m slammed against the cinderblock wall, the breath knocked completely out of my lungs.'
    },
    {
        speaker: 'Ren (Internal)',
        text: 'Someone\'s elbow catches me in the ribs. A girl screams as she trips on the stairs, and two people run right over her back to get higher.'
    },
    {
        speaker: 'Ren (Internal)',
        text: 'I reach out, trying to grab her uniform to pull her up, but the crush of bodies forces me upward. If I fall down here, I’m dead before the snakes even reach us.'
    },
    {
        speaker: 'Kaito’s Voice',
        text: '"Ren! REN! Grab my hand!"'
    },
    {
        char: 'assets/chapter2/characters/kaito_best_friend/reaching_one_hand_out.png',
        speaker: 'Ren (Internal)',
        text: 'Kaito appears, leaning over the railing from the landing above. His face is pale, eyes wide with raw terror, but he’s reaching down into the sea of people.'
    },
    {
        choices: [
            { text: '"I\'m coming! Pull me up!"', nextStepOffset: 1 },
            { text: '"Hold on, someone fell!"', nextStepOffset: 2 }
        ]
    },
    {
        speaker: 'Ren (Internal)',
        text: 'Survival instinct takes over. I lunge upward, my fingers locking around Kaito’s wrist. He hauls me up with strength I didn\'t know he had, dragging me onto the second-floor landing just as the crowd surges again.',
        jumpTo: 14
    },
    {
        speaker: 'Ren (Internal)',
        text: 'I try to anchor myself against the handrail and reach down for the girl, but the crowd is too dense. A senior shoves past me, breaking my grip on the rail. Kaito grabs my collar from above and violently yanks me up to the landing.'
    },
    {
        char: 'assets/chapter2/characters/kaito_best_friend/desperate_expression.png',
        speaker: 'Kaito',
        text: '"Are you crazy?! You can\'t stop!"'
    },
    {
        bg: 'assets/chapter2/backgrounds/second_floor_hallway_bedlam.png',
        sfx: 'assets/chapter2/sound_effects/fire_alarm.mp3',
        char: '',
        speaker: 'Ren (Internal)',
        text: 'The second-floor hallway is absolute bedlam. Lockers are dented, papers are flying everywhere, and the emergency alarm finally kicks in with a piercing, rhythmic BZZZT... BZZZT... BZZZT.'
    },
    {
        sfx: 'assets/chapter2/sound_effects/wet_sliding.mp3',
        vfx: 'vfx-shake',
        speaker: 'Ren (Internal)',
        text: 'Beneath the alarm, a sickening, wet sliding sound reverberates through the floorboards. It’s heavy. Unbelievably heavy.'
    },
    {
        char: 'assets/chapter2/characters/mr_sato_math_teacher/mr_sato_math_teacher.png',
        speaker: 'Mr. Sato',
        text: '"To the east wing! Everyone, keep moving to the emergency fire exits in the east wing! Do NOT look back!"'
    },
    {
        char: 'assets/chapter2/characters/kaito_best_friend/breathing_heavily.png',
        speaker: 'Kaito',
        text: '"The fire exits... Ren, we have to follow him. We have to get out."'
    },
    {
        speaker: 'Ren (Internal)',
        text: 'Kaito is shaking. We both are. But my mind is racing, stitching together the nightmare outside with the geometry of the school.'
    },
    {
        speaker: 'Ren (Internal)',
        text: 'The snakes... there were three of them out there. They came from the field. The east wing fire exits lead directly out to the rear parking lot. Right next to the field.'
    },
    {
        speaker: 'Ren',
        text: '"No. Kaito, stop. Think about it. If we go out the east doors, we\'re completely exposed in the open lot. That\'s where they came from."'
    },
    {
        char: 'assets/chapter2/characters/kaito_best_friend/desperate_expression.png',
        speaker: 'Kaito',
        text: '"But Mr. Sato is taking everyone that way! We can\'t stay in here! Did you hear that sound downstairs? One of them is in the building, Ren! It’s going to come up the stairs!"'
    },
    {
        sfx: 'assets/chapter2/sound_effects/building_groan_hiss.mp3',
        vfx: 'vfx-shake',
        char: '',
        speaker: 'Ren (Internal)',
        text: 'The building groans loudly. The concrete floor vibrates under our feet. A terrifying, guttural hiss echoes up the very stairwell we just escaped from. A dust cloud billows out from the doorway.'
    },
    {
        speaker: 'Ren (Internal)',
        text: 'Kaito is right. We can\'t stay in the open hallway. But following the massive, loud crowd of hundreds of screaming students feels like a death sentence. We\'re just a giant, noisy buffet line.'
    },
    {
        vfx: 'vfx-tunnel-vision',
        sfx: 'assets/chapter2/sound_effects/heartbeat.mp3',
        speaker: 'Ren (Internal)',
        text: 'The edges of my vision narrow into darkness, and the deafening pound of my own heartbeat drowns out everything else.'
    },
    {
        speaker: 'Ren',
        text: '"The science labs. On the third floor. The doors are reinforced steel for chemical fires, and there are no ground-level windows."'
    },
    {
        char: 'assets/chapter2/characters/kaito_best_friend/looking_absolutely_terrified.png',
        speaker: 'Kaito',
        text: '"Are you insane?! That\'s a dead end! If they find us up there, we\'re trapped!"'
    },
    {
        char: 'assets/chapter2/characters/mr_sato_math_teacher/mr_sato_math_teacher.png',
        speaker: 'Mr. Sato',
        text: '"KEEP MOVING! HURRY!"'
    },
    {
        sfx: 'assets/chapter2/sound_effects/distant_massacre.mp3',
        char: '',
        speaker: 'Ren (Internal)',
        text: 'A sudden, horrifying crash from the east wing cuts his shout short, followed by a chorus of fresh, agonizing screams that don\'t sound like panic anymore. They sound like pain.'
    },
    {
        bgm: 'assets/chapter2/background_music/the_dread_the_trap_realization.mp3',
        speaker: 'Ren (Internal)',
        text: 'Kaito and I freeze. The screams from the east wing are deafening. Whatever was outside... it was waiting for them at the fire exits.'
    },
    {
        speaker: 'Ren (Internal)',
        text: 'Kaito slowly turns his head back to me. The argument is over.'
    },
    {
        char: 'assets/chapter2/characters/kaito_best_friend/serious_expression.png',
        speaker: 'Kaito',
        text: '"Third floor. Let\'s go. Now."'
    },
    {
        bg: 'assets/chapter2/backgrounds/third_floor_stairwell_the_escape.png',
        bgm: 'assets/chapter2/background_music/the_stealth_escape_pulsing_beat.mp3',
        char: '',
        speaker: 'Ren (Internal)',
        text: 'We abandon the main group. As we sprint up the back stairs to the third floor, the air grows heavy and still.'
    },
    {
        speaker: 'Ren (Internal)',
        text: 'The screams of our classmates below become muffled, distant echoes beneath the pounding of our own hearts.'
    },
    {
        speaker: 'Ren (Internal)',
        text: 'We reach the heavy, steel door of the Biology Lab. I grab the handle, yank it open, and we both throw ourselves inside, slamming it shut behind us.'
    },
    {
        sfx: 'assets/chapter2/sound_effects/lab_door_clang.mp3',
        speaker: 'Ren (Internal)',
        text: '...'
    },
    {
        bg: 'assets/chapter2/backgrounds/the_biology_lab_eerie_peace.png',
        bgm: 'assets/chapter2/background_music/the_lab_eerie_silence.mp3',
        speaker: 'Ren (Internal)',
        text: 'Safe. For a second, it feels like we\'re safe.'
    },
    {
        speaker: 'Ren (Internal)',
        text: 'I slide down the metal door until I\'m sitting on the cold tile, trying to catch my breath.'
    },
    {
        speaker: 'Ren (Internal)',
        text: 'Then, a voice whispers from the shadows by the lab tables.'
    },
    {
        speaker: 'Unknown Voice',
        text: '"Did... did you guys lock it?"'
    },
    {
        speaker: 'Ren (Internal)',
        text: 'Kaito and I look up. There are three other students already hiding in the dark.'
    },
    {
        vfx: 'vfx-blackout',
        bgm: '',
        speaker: '',
        text: '[CHAPTER 2 END]'
    }
];
