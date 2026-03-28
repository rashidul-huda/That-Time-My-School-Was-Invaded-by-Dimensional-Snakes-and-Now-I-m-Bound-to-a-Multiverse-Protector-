const chapter1 = [
    {
        bg: 'assets/chapter1/backgrounds/the_classroom_golden_hour.webp',
        bgm: 'assets/chapter1/background_music/ambient_start.mp3',
        speaker: 'Ren (Internal)',
        text: 'Another Tuesday. Another afternoon spent counting the minutes until the final bell. The air in the classroom is thick and sleepy, smelling of chalk dust and old sneakers.'
    },
    {
        speaker: 'Ren (Internal)',
        text: 'Outside the window, the heat shimmers above the asphalt of the schoolyard. It’s the kind of day where nothing interesting ever happens.'
    },
    {
        char: 'assets/chapter1/characters/kaito_best_friend/neutral_bored.webp',
        speaker: 'Kaito',
        text: '"Hey, Ren. If you stare at the clock any harder, you\'re going to burn a hole in it. Only five more minutes. We still hitting up the arcade after this?"'
    },
    {
        choices: [
            { text: '"You know it. I need to beat your high score in Galactic Striker."', nextStepOffset: 1 },
            { text: '"Maybe. I’m pretty wiped today. Just want to crash."', nextStepOffset: 2 }
        ]
    },
    {
        char: 'assets/chapter1/characters/kaito_best_friend/amused.webp',
        speaker: 'Kaito',
        text: '(Laughs) "In your dreams, buddy! I practiced all weekend."',
        jumpTo: 6
    },
    {
        char: 'assets/chapter1/characters/kaito_best_friend/annoyed.webp',
        speaker: 'Kaito',
        text: '(Pouts) "Lame. Fine, but you’re treating next time."'
    },
    {
        char: '', 
        speaker: 'Ren (Internal)',
        text: 'Kaito turns back around, and I look out the window again. The dried-up soccer field stretches out beyond the parking lot. The grass is yellow and brittle from the recent heatwave.'
    },
    {
        speaker: 'Ren (Internal)',
        text: 'Beyond that is just dense scrubland. Completely normal. Completely boring.'
    },
    {
        bgm: '', 
        sfx: 'assets/chapter1/sound_effects/hum.mp3',
        vfx: 'vfx-shake',
        speaker: 'Ren (Internal)',
        text: 'Wait. What is that?'
    },
    {
        speaker: 'Ren (Internal)',
        text: 'I blink, thinking the heat is making me hallucinate. Out past the edge of the soccer field, where the dry grass meets the trees... something is moving. Something big.'
    },
    {
        bgm: 'assets/chapter1/background_music/the_first_sighting.mp3',
        speaker: 'Ren (Internal)',
        text: 'It’s dark. Ink black. It pushes through the brush, thick as a tank truck. It’s... a snake? No way. Snakes don\'t get that big. It’s... it must be as long as a riverbed.'
    },
    {
        speaker: 'Ren (Internal)',
        text: 'I freeze, my breath catching in my throat. I can’t take my eyes off it. It\'s pouring itself onto the field, its scales gleaming dully in the sunlight.'
    },
    {
        speaker: 'Ren (Internal)',
        text: 'It raises its head, easily fifty feet in the air, and looks directly... at us.'
    },
    {
        speaker: 'Ren',
        text: '(Whispering) "Kaito..."'
    },
    {
        char: 'assets/chapter1/characters/kaito_best_friend/confused.webp',
        speaker: 'Kaito',
        text: '"Huh? What\'s up, you look like you\'ve seen a..."'
    },
    {
        char: 'assets/chapter1/characters/kaito_best_friend/terrified.webp',
        speaker: 'Kaito',
        text: '(Shouting, voice cracking) "WHAT IS THAT?!"'
    },
    {
        bgm: 'assets/chapter1/background_music/the_panic.mp3',
        sfx: 'assets/chapter1/sound_effects/scream.mp3',
        vfx: 'vfx-flash-red',
        char: 'assets/chapter1/characters/teacher/teacher.webp',
        speaker: 'Teacher',
        text: '"Everyone! Stay calm! Get away from the windows! Move to the hallway, NOW!"'
    },
    {
        sfx: 'assets/chapter1/sound_effects/classroom_chaos.mp3',
        speaker: 'Ren (Internal)',
        text: 'The classroom erupts into chaos. People are shouting, crying, trampling over desks. Kaito grabs my arm, hard.'
    },
    {
        char: 'assets/chapter1/characters/kaito_best_friend/terrified.webp',
        speaker: 'Kaito',
        text: '"We gotta move, Ren! Come on!"'
    },
    {
        sfx: 'assets/chapter1/sound_effects/door_crash.mp3',
        char: '',
        speaker: 'Ren (Internal)',
        text: 'We push into the crowded hallway. It\'s deafening. Hundreds of students are surging towards the stairwells. I lose sight of Kaito immediately. I\'m just a cork in a raging river of panicked bodies.'
    },
    {
        bg: 'assets/chapter1/backgrounds/the_stairwell_window_looking_out_at_the_field.webp',
        speaker: 'Ren (Internal)',
        text: 'I manage to shove my way to a window in the stairwell that looks out over the parking lot. I have to know. I have to see.'
    },
    {
        speaker: 'Ren (Internal)',
        text: 'The cops are here already. Fast response. I see officers springing from their cars, pulling out shotguns. They’re yelling commands, trying to establish a perimeter, but the snake is massive.'
    },
    {
        speaker: 'Ren (Internal)',
        text: 'It whips its tail, smashing an empty sedan like it\'s a toy.'
    },
    {
        sfx: 'assets/chapter1/sound_effects/gunfire.mp3',
        speaker: 'Ren (Internal)',
        text: 'They\'re shooting. The snake writhes, black blood splattering onto the yellow grass.'
    },
    {
        sfx: 'assets/chapter1/sound_effects/snake_shriek1.mp3',
        speaker: 'Ren (Internal)',
        text: 'It rears up, letting out an unnerving, hissed shriek that I can hear even through the glass. It’s violent. It’s desperate.'
    },
    {
        speaker: 'Ren (Internal)',
        text: 'It lurches forward, and another barrage of gunfire hits it. It finally shudders and collapses. It falls heavily, crushing a section of the chain-link fence.'
    },
    {
        bgm: 'assets/chapter1/background_music/the_false_victory.mp3',
        speaker: 'Ren (Internal)',
        text: 'It’s down. They killed it.'
    },
    {
        speaker: 'Ren (Internal)',
        text: 'A collective gasp of relief ripples through the students crowded around the window with me. We stop breathing. My heart is still hammering against my ribs, but the immediate terror starts to recede.'
    },
    {
        speaker: 'Ren (Internal)',
        text: 'It\'s over. Some weird mutated thing showed up, and the authorities handled it. We\'re okay. I start looking for Kaito in the crush.'
    },
    {
        speaker: 'Kaito’s Voice',
        text: '"Ren! Over here! You okay?!"'
    },
    {
        speaker: 'Ren',
        text: '"Yeah! I\'m fine! They got it!"'
    },
    {
        sfx: 'assets/chapter1/sound_effects/explosive_boom.mp3',
        vfx: 'vfx-shake',
        speaker: 'Ren (Internal)',
        text: '...'
    },
    {
        vfx: 'vfx-blackout', 
        sfx: 'assets/chapter1/sound_effects/snake_screech2.mp3',
        speaker: '',
        text: '...'
    },
    {
        bg: 'assets/chapter1/backgrounds/the_stairwell_window_the_aftermath_sepia_tone.webp',
        bgm: 'assets/chapter1/background_music/the_true_threat.mp3',
        speaker: 'Ren (Internal)',
        text: 'No.'
    },
    {
        speaker: 'Ren (Internal)',
        text: 'My breath stops completely. My stomach plummets. Right where the first snake died... where the officers are now standing, looking confused... the ground itself seems to tear open.'
    },
    {
        speaker: 'Ren (Internal)',
        text: 'One. Two. Three. Three more. Exactly like the first one. Maybe even bigger.'
    },
    {
        speaker: 'Ren (Internal)',
        text: 'They burst forth simultaneously, their shadows swallowing the sun. They don\'t even hesitate. They don\'t look confused. They look... hungry.'
    },
    {
        speaker: 'Random Student',
        text: '"THEY’RE STILL COMING! THERE ARE MORE! OH GOD, THERE ARE MORE!"'
    },
    {
        speaker: 'Ren (Internal)',
        text: 'The relief vanishes, replaced by a stark, icy dread that is a thousand times worse. The cops are gone. Just like that.'
    },
    {
        speaker: 'Ren (Internal)',
        text: 'And the snakes... they aren\'t looking at the field anymore. They\'re turning. They\'re all turning. Their slick, black heads lift up in unison, pointing directly... at the school building.'
    },
    {
        speaker: 'Ren (Internal)',
        text: 'At us.'
    },
    {
        sfx: 'assets/chapter1/sound_effects/glass_shattering.mp3',
        speaker: 'Ren (Internal)',
        text: 'We are trapped.'
    },
    {
        vfx: 'vfx-blackout',
        bgm: '', 
        speaker: '',
        text: '[CHAPTER 1 END]'
    }
];
