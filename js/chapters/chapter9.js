var chapter9 = [
    {
        bg: 'assets/chapter9/backgrounds/containment_facility_cell_empty.webp',
        bgm: 'assets/chapter9/background_music/containment_panic.mp3',
        sfx: 'assets/chapter9/sound_effects/siren_blaring.mp3',
        speaker: '',
        text: 'Red emergency lights pulse violently across the cold steel walls of the Global Defense Coalition’s maximum-security containment facility.'
    },
    {
        char: 'assets/chapter9/characters/military/commander_panicking.webp',
        speaker: 'GDC Commander',
        text: '(Shouting into a radio) "What do you mean it vanished?! A sixty-foot leviathan does not just vanish! Check the perimeter!"'
    },
    {
        bg: 'assets/chapter9/backgrounds/containment_cell_interior.webp',
        speaker: '',
        text: 'The Commander stares through the reinforced observation glass into the massive holding cell. It is completely empty. There are no breaches in the concrete. No acid burns. No forced entry.'
    },
    {
        speaker: 'GDC Commander',
        text: '"It\'s like it just evaporated into thin air..."'
    },
    {
        bg: 'assets/chapter9/backgrounds/facility_janitor_closet.webp',
        bgm: '',
        sfx: 'assets/chapter9/sound_effects/heavy_thud.mp3',
        speaker: '',
        text: 'Three levels up, in a dimly lit maintenance corridor, the heavy steel door of a janitorial locker swings open with a soft creak.'
    },
    {
        bgm: 'assets/chapter9/background_music/the_pink_haired_assassin.mp3',
        speaker: '',
        text: 'A man in his mid-twenties steps out. He is wearing a standard-issue GDC janitor uniform. Long, striking pink hair cascades entirely down to his waist.'
    },
    {
        bg: 'assets/chapter9/backgrounds/dead_janitor_in_closet.webp',
        speaker: '',
        text: 'Behind him, slumped against the mop buckets in the dark closet, is the real janitor, completely lifeless.'
    },
    {
        bg: 'assets/chapter9/backgrounds/facility_corridor_walking.webp',
        char: 'assets/chapter9/characters/pink_haired_assassin/adjusting_hat_cheeky_smile.webp',
        sfx: 'assets/chapter9/sound_effects/casual_footsteps_hallway.mp3',
        speaker: '',
        text: 'The pink-haired man casually adjusts the brim of the stolen uniform cap, a cheeky, incredibly relaxed smile plastered across his face.'
    },
    {
        speaker: '',
        text: 'He hums a soft, upbeat tune as he walks calmly past a squad of panicking, heavily armed soldiers sprinting in the opposite direction.'
    },
    {
        bg: '',
        char: '',
        vfx: 'vfx-blackout',
        bgm: '',
        speaker: '',
        text: '...'
    },
    {
        bg: 'assets/chapter8/backgrounds/main_road_evening.webp',
        bgm: 'assets/chapter8/background_music/panic_realization.mp3',
        sfx: 'assets/chapter8/sound_effects/street_traffic.mp3',
        speaker: 'Ren',
        text: '"We have to warn them! If she wasn\'t lying, the other two assassins are going to hunt my friends down just to get to me!"'
    },
    {
        char: 'assets/chapter8/characters/mysterious_protector/arms_crossed_thinking.webp',
        speaker: 'Ancestor',
        text: '"It is a standard tactic. Isolate the target by removing their anchors. But we cannot split up. I cannot protect you if I am not with you."'
    },
    {
        speaker: 'Ren',
        text: '"Then we go together. Right now. We have to check on them."'
    },
    {
        char: 'assets/chapter8/characters/mysterious_protector/nodding_serious.webp',
        speaker: 'Ancestor',
        text: '"Very well. Who do we seek out first? The one you prioritize may be the only one we reach in time."'
    },
    {
        speaker: 'Ren (Internal)',
        text: 'My heart pounds. Four people were in that lab with me. Kaito, Sho, Mika, and Yuta. If they are all targets, who is in the most immediate danger?'
    },
    {
        setVar: { turnCount: 1, checkedKaito: false, checkedSho: false, checkedMika: false, checkedYuta: false },
        jumpTo: 'hub_prompt'
    },
    {
        label: 'hub_prompt',
        speaker: 'Ren (Internal)',
        text: 'Who do I check on next?'
    },
    {
        label: 'hub_choices',
        dynamicChoices: [
            { text: 'Check on Kaito.', condition: (vars) => !vars.checkedKaito, jumpTo: 'check_kaito' },
            { text: 'Check on Sho.', condition: (vars) => !vars.checkedSho, jumpTo: 'check_sho' },
            { text: 'Check on Mika.', condition: (vars) => !vars.checkedMika, jumpTo: 'check_mika' },
            { text: 'Check on Yuta.', condition: (vars) => !vars.checkedYuta, jumpTo: 'check_yuta' }
        ]
    },
    {
        label: 'check_kaito',
        setVar: { checkedKaito: true },
        runLogic: (vars) => {
            if (vars.turnCount === 1) vars.kaitoResolve = (vars.kaitoResolve || 0) + 4;
            else if (vars.turnCount === 2) vars.kaitoResolve = (vars.kaitoResolve || 0) + 3;
            else if (vars.turnCount === 3) vars.kaitoResolve = (vars.kaitoResolve || 0) + 2;
        },
        bg: 'assets/chapter9/backgrounds/kaito_street_night.webp',
        bgm: 'assets/chapter9/background_music/sneaking_around.mp3',
        speaker: 'Ren (Internal)',
        text: 'We rush to Kaito’s house. Given that his neighborhood was literally crushed by a leviathan earlier today, I half-expect the place to be a warzone again.'
    },
    {
        bg: 'assets/chapter9/backgrounds/kaito_back_garden.webp',
        sfx: 'assets/chapter9/sound_effects/grass_rustle.mp3',
        speaker: 'Ren (Internal)',
        text: 'We sneak into his back garden and peer up at his second-floor bedroom window.'
    },
    {
        bg: 'assets/chapter9/backgrounds/kaito_bedroom_window_view.webp',
        sfx: 'assets/chapter9/sound_effects/muffled_video_game_sounds.mp3',
        char: 'assets/chapter9/characters/kaito_best_friend/gaming_headset_intense.webp',
        speaker: 'Ren (Internal)',
        text: 'He’s sitting at his desk, wearing a massive gaming headset, aggressively clicking his mouse and yelling at his monitor.'
    },
    {
        speaker: 'Ren (Internal)',
        text: 'He is completely fine. Playing a stupid PC game like the world isn\'t ending.'
    },
    {
        bg: 'assets/chapter9/backgrounds/kaito_front_door_open.webp',
        sfx: 'assets/chapter6/sound_effects/electronic_doorbell_chime.mp3',
        char: '',
        speaker: 'Ren (Internal)',
        text: 'I ring the doorbell. A minute later, Kaito opens the door, looking annoyed.'
    },
    {
        char: 'assets/chapter9/characters/kaito_best_friend/confused_looking_at_ancestor.webp',
        speaker: 'Kaito',
        text: '"Ren? I just saw you a few hours ago. What’s up? And... who is this guy?"'
    },
    {
        speaker: 'Ren',
        text: '"He’s... uh... my grandfather."'
    },
    {
        char: 'assets/chapter9/characters/kaito_best_friend/skeptical_squint.webp',
        speaker: 'Kaito',
        text: '(Squinting) "No way. He doesn’t look a day over twenty-five. Grandfather? Seriously?"'
    },
    {
        char: 'assets/chapter8/characters/mysterious_protector/beaming_proud_smile.webp',
        bgm: 'assets/chapter8/background_music/comedic_calm.mp3',
        speaker: 'Ancestor',
        text: '(Beaming with a jolly smile) "Why, thank you, young man! I take that as a massive compliment!"'
    },
    {
        speaker: 'Ancestor',
        text: '"It is all about the routine, you see. I apply all the best anti-aging creams I can find. Here, let me write it down for you."'
    },
    {
        sfx: 'assets/chapter9/sound_effects/scribbling_on_paper.mp3',
        speaker: 'Ren (Internal)',
        text: 'To my absolute horror, the Ancestor pulls a small notepad from his pocket and begins furiously scribbling a legitimate, multi-step skincare routine.'
    },
    {
        char: 'assets/chapter8/characters/mysterious_protector/handing_list.webp',
        sfx: 'assets/chapter9/sound_effects/paper_rustle.mp3',
        speaker: 'Ancestor',
        text: '"Cleanse, tone, moisturize, and never skip the SPF, even if you stay indoors playing your electronic box games."'
    },
    {
        char: 'assets/chapter9/characters/kaito_best_friend/nervous_taking_list.webp',
        speaker: 'Ren (Internal)',
        text: 'Kaito looks at me. I give him a tired, entirely done-with-this-shit stare. Feeling the sheer, bizarre pressure of the towering man handing him the paper, Kaito nervously takes it.'
    },
    {
        speaker: 'Kaito',
        text: '"Uh... thanks. I\'ll... keep that in mind."'
    },
    {
        char: '',
        speaker: 'Ren',
        text: '"Just wanted to make sure you were okay, man. Lock your doors. Seriously. Goodnight."'
    },
    {
        bg: 'assets/chapter9/backgrounds/kaito_street_night.webp',
        sfx: 'assets/chapter5/sound_effects/front_door_open_close.mp3',
        speaker: 'Ren (Internal)',
        text: 'We step back onto the street. He is safe. No snakes anywhere near his house.',
        runLogic: (vars) => { vars.turnCount++; },
        jumpTo: (vars) => {
            if (vars.turnCount > 4) return 'convergence';
            if (vars.turnCount > 3) return 'auto_resolve_last';
            return 'hub_prompt';
        }
    },
    {
        label: 'check_sho',
        setVar: { checkedSho: true },
        runLogic: (vars) => {
            if (vars.turnCount === 1) vars.shoResolve = (vars.shoResolve || 0) + 4;
            else if (vars.turnCount === 2) vars.shoResolve = (vars.shoResolve || 0) + 3;
            else if (vars.turnCount === 3) vars.shoResolve = (vars.shoResolve || 0) + 2;
        },
        bg: 'assets/chapter9/backgrounds/suburban_bakery_exterior_night.webp',
        bgm: 'assets/chapter9/background_music/melancholy_evening.mp3',
        speaker: 'Ren (Internal)',
        text: 'We head toward the suburban area. I know Sho’s family runs a bakery there—I’ve bought bread from them plenty of times. If he isn’t there, I can at least find out his home address.'
    },
    {
        sfx: 'assets/chapter9/sound_effects/locking_door_keys.mp3',
        char: 'assets/chapter9/characters/sho_taller_guy/locking_bakery_door.webp',
        speaker: 'Ren (Internal)',
        text: 'We find him right at the shop. The "Sold Out" sign is hanging in the window, and Sho is just turning the key to lock the front door.'
    },
    {
        char: 'assets/chapter9/characters/sho_taller_guy/surprised_turning_around.webp',
        speaker: 'Sho',
        text: '(Turning around, surprised) "Ren? What are you doing out here? You need to come in the morning, man, we are completely sold out for today."'
    },
    {
        speaker: 'Ren',
        text: '"I\'m not here for bread. How have things been? Are you okay? Has anything... unusual happened?"'
    },
    {
        char: 'assets/chapter9/characters/sho_taller_guy/nonchalant_shrug.webp',
        speaker: 'Sho',
        text: '(Nonchalant) "I’m fine. Just exhausted. And what do you mean by unusual? Massive snakes are loose in the world, Ren. Everything is unusual."'
    },
    {
        speaker: 'Ren (Internal)',
        text: 'He’s clueless. If an assassin was stalking him, he wouldn\'t be casually locking up a bakery.'
    },
    {
        speaker: 'Ren',
        text: '"Right. Sorry. Just checking in. Be careful out there."'
    },
    {
        char: 'assets/chapter9/characters/sho_taller_guy/calling_back_serious.webp',
        speaker: 'Ren (Internal)',
        text: 'We turn to leave, but Sho calls out.'
    },
    {
        speaker: 'Sho',
        text: '"Hey. Ren."'
    },
    {
        speaker: 'Sho',
        text: '"I never said it, but... thanks. For what you did in the lab back then. If it weren\'t for you throwing that bottle, I would have been dead against the wall."'
    },
    {
        speaker: 'Ren',
        text: '(Nodding) "I\'m glad I could help. Just stay safe, Sho."'
    },
    {
        char: '',
        speaker: 'Ren (Internal)',
        text: 'Sho nods back and walks away down the street. He is completely safe for now.',
        runLogic: (vars) => { vars.turnCount++; },
        jumpTo: (vars) => {
            if (vars.turnCount > 4) return 'convergence';
            if (vars.turnCount > 3) return 'auto_resolve_last';
            return 'hub_prompt';
        }
    },
    {
        label: 'check_mika',
        setVar: { checkedMika: true },
        runLogic: (vars) => {
            if (vars.turnCount === 1) vars.mikaResolve = (vars.mikaResolve || 0) + 4;
            else if (vars.turnCount === 2) vars.mikaResolve = (vars.mikaResolve || 0) + 3;
            else if (vars.turnCount === 3) vars.mikaResolve = (vars.mikaResolve || 0) + 2;
        },
        bg: 'assets/chapter8/backgrounds/main_road_evening.webp',
        bgm: 'assets/chapter9/background_music/sneaking_around.mp3',
        speaker: 'Ren',
        text: '"We need to find Mika. She’s in my year, but a different class. I don’t know where she lives or where she hangs out."'
    },
    {
        char: 'assets/chapter8/characters/mysterious_protector/arms_crossed_thinking.webp',
        speaker: 'Ancestor',
        text: '"Tracking is not a specialty of my kind. A hound searches with its nose. A serpent separates the world with its tongue."'
    },
    {
        speaker: 'Ren',
        text: '"...What does that mean? Can you find her or not?"'
    },
    {
        speaker: 'Ancestor',
        text: '"If you know her scent, and if she is within a few miles, I can isolate it from the ambient chaos. But you must describe it to me."'
    },
    {
        speaker: 'Ren',
        text: '"I don\'t know! That sounds incredibly creepy! She just stood near me a few times in the lab. I guess she smelled like... citrus shampoo? And maybe vanilla body spray?"'
    },
    {
        char: '',
        bg: 'assets/chapter8/backgrounds/commercial_district_evening.webp',
        sfx: 'assets/chapter8/sound_effects/street_traffic.mp3',
        speaker: 'Ren (Internal)',
        text: 'We head into the busy commercial district to start our search. The sheer volume of people makes it feel completely impossible.'
    },
    {
        speaker: 'Ren',
        text: '"There’s too many people here. We’ll never find her."'
    },
    {
        char: 'assets/chapter8/characters/mysterious_protector/still_calm.webp',
        bgm: 'assets/chapter9/background_music/snake_senses.mp3',
        speaker: 'Ancestor',
        text: '(Quietly) "Humans search with their eyes."'
    },
    {
        speaker: 'Ren (Internal)',
        text: 'He steps forward into the moving crowd. He goes entirely, unnervingly still. The contrast of his calm against the chaotic motion of the street is jarring.'
    },
    {
        sfx: 'assets/chapter9/sound_effects/subtle_tongue_flick.mp3',
        speaker: 'Ren (Internal)',
        text: 'A small, subtle flick of his tongue parts his lips.'
    },
    {
        speaker: 'Ancestor',
        text: '"We don’t."'
    },
    {
        speaker: 'Ren',
        text: '"...You can actually tell?"'
    },
    {
        speaker: 'Ancestor',
        text: '"Sweat. Soap. Fabric. Fear. They blur together for you into a wall of noise."'
    },
    {
        sfx: 'assets/chapter9/sound_effects/subtle_tongue_flick.mp3',
        vfx: 'vfx-tunnel-vision',
        speaker: 'Ren (Internal)',
        text: 'Another flick. The ambient sound of the bustling crowd suddenly seems to dull around us, as if the air itself is being pulled and separated.'
    },
    {
        char: 'assets/chapter8/characters/mysterious_protector/eyes_narrowing.webp',
        speaker: 'Ancestor',
        text: '(Turning slightly, eyes narrowing) "...but not for me."'
    },
    {
        speaker: 'Ancestor',
        text: '"I found the citrus. The vanilla. But the overcrowding slows the separation. And the scent is elevated. She is not on the ground level."'
    },
    {
        char: '',
        bg: 'assets/chapter9/backgrounds/tall_building_restaurant_view.webp',
        vfx: '',
        bgm: 'assets/chapter9/background_music/sneaking_around.mp3',
        speaker: 'Ren',
        text: '"Elevated... Let\'s check the buildings. There are a bunch of rooftop restaurants in this block."'
    },
    {
        speaker: 'Ren (Internal)',
        text: 'We scan the high-rises. And there, through the wide glass panels of an expensive rooftop dining area, I spot her.'
    },
    {
        bg: 'assets/chapter9/backgrounds/mika_family_dinner_distant.webp',
        speaker: 'Ren',
        text: '"There she is."'
    },
    {
        char: 'assets/chapter8/characters/mysterious_protector/nodding_serious.webp',
        speaker: 'Ancestor',
        text: '"Yes. That is the scent."'
    },
    {
        char: '',
        speaker: 'Ren (Internal)',
        text: 'She is sitting at a table with her parents and a little brother. She is smiling, looking genuinely happy. Her parents must have taken her out to help her recover from the trauma.'
    },
    {
        speaker: 'Ren',
        text: '"Do you reckon she is in danger up there?"'
    },
    {
        speaker: 'Ancestor',
        text: '"I do not taste the scent of our kind anywhere in this district. She is safe for tonight."'
    },
    {
        speaker: 'Ren (Internal)',
        text: 'Relieved, we don\'t intervene to ruin her dinner. We just move on.',
        runLogic: (vars) => { vars.turnCount++; },
        jumpTo: (vars) => {
            if (vars.turnCount > 4) return 'convergence';
            if (vars.turnCount > 3) return 'auto_resolve_last';
            return 'hub_prompt';
        }
    },
    {
        label: 'check_yuta',
        setVar: { checkedYuta: true },
        runLogic: (vars) => {
            if (vars.turnCount === 1) vars.yutaResolve = (vars.yutaResolve || 0) + 4;
            else if (vars.turnCount === 2) vars.yutaResolve = (vars.yutaResolve || 0) + 3;
            else if (vars.turnCount === 3) vars.yutaResolve = (vars.yutaResolve || 0) + 2;
        },
        bg: 'assets/chapter9/backgrounds/apartment_alley_night.webp',
        bgm: 'assets/chapter9/background_music/sneaking_around.mp3',
        speaker: 'Ren (Internal)',
        text: 'We head for Yuta’s apartment complex. He’s usually the most anxious out of all of us, so if anyone is panicking right now, it’s him.'
    },
    {
        bg: 'assets/chapter9/backgrounds/yuta_window_view_studying.webp',
        speaker: 'Ren (Internal)',
        text: 'We stand in the back alley, looking up at his lit window.'
    },
    {
        speaker: 'Ren (Internal)',
        text: 'He is sitting at his desk, books piled high. Even with the schools closed indefinitely, he is diligently working through his curriculum, distracting himself with absolute normalcy.'
    },
    {
        bg: 'assets/chapter9/backgrounds/yuta_window_shadow_lurking.webp',
        bgm: 'assets/chapter8/background_music/sinking_dread.mp3',
        vfx: 'vfx-shake',
        sfx: 'assets/chapter9/sound_effects/eerie_whoosh.mp3',
        speaker: 'Ren (Internal)',
        text: 'Suddenly, a dark, unnatural shadow sweeps across the exterior wall of his building, lingering right next to his window glass.'
    },
    {
        speaker: 'Ren (Internal)',
        text: 'My heart stops. Yuta is completely oblivious inside, turning a page.'
    },
    {
        vfx: 'vfx-flash-white',
        sfx: 'assets/chapter9/sound_effects/shadow_vanish.mp3',
        speaker: 'Ren (Internal)',
        text: 'But before I can even shout a warning, the shadow violently dissipates into thin air.'
    },
    {
        bg: 'assets/chapter9/backgrounds/apartment_alley_night.webp',
        char: 'assets/chapter8/characters/mysterious_protector/landing_softly.webp',
        bgm: 'assets/chapter9/background_music/sneaking_around.mp3',
        sfx: 'assets/chapter7/sound_effects/heavy_boots_landing.mp3',
        speaker: 'Ren (Internal)',
        text: 'The Ancestor drops down from the fire escape landing beside me, having scouted ahead.'
    },
    {
        speaker: 'Ancestor',
        text: '"Nothing to worry about. He is merely studying, and the air is entirely devoid of serpent essence. The shadows here are just shadows."'
    },
    {
        char: '',
        speaker: 'Ren (Internal)',
        text: 'I let out a shaky breath, wiping sweat from my forehead. My paranoia is going to kill me before the assassins do.',
        runLogic: (vars) => { vars.turnCount++; },
        jumpTo: (vars) => {
            if (vars.turnCount > 4) return 'convergence';
            if (vars.turnCount > 3) return 'auto_resolve_last';
            return 'hub_prompt';
        }
    },
    {
        label: 'auto_resolve_last',
        speaker: 'Ren (Internal)',
        text: 'That just leaves one.',
        jumpTo: (vars) => {
            if (!vars.checkedKaito) return 'check_kaito';
            if (!vars.checkedSho) return 'check_sho';
            if (!vars.checkedMika) return 'check_mika';
            if (!vars.checkedYuta) return 'check_yuta';
            return 'convergence';
        }
    },
    {
        label: 'convergence',
        bg: 'assets/chapter8/backgrounds/main_road_evening.webp',
        bgm: 'assets/chapter8/background_music/fragile_new_normal.mp3',
        sfx: 'assets/chapter8/sound_effects/street_traffic.mp3',
        speaker: 'Ren (Internal)',
        text: 'We walk back down the main street. The tension that had been crushing my chest all evening finally begins to lift.'
    },
    {
        speaker: 'Ren',
        text: '"They are all safe. Everyone was just living normally. Do you think that girl lied to us about them being hunted?"'
    },
    {
        char: 'assets/chapter8/characters/mysterious_protector/arms_crossed_thinking.webp',
        speaker: 'Ancestor',
        text: '"They might be safe for now, while the assassins gather their bearings. But if she stated your friends are the primary targets, she was not lying."'
    },
    {
        char: 'assets/chapter8/characters/mysterious_protector/serious_look.webp',
        speaker: 'Ancestor',
        text: '"We need to prepare them. If we do not arm them with the truth, I will not be able to save them all when the strikes occur simultaneously."'
    },
    {
        speaker: 'Ren',
        text: '"You want me to call them all together and explain the cosmic lore? Do you know how utterly absurd it’s going to sound? Plus, isn’t it dangerous to get them directly involved in this?"'
    },
    {
        speaker: 'Ancestor',
        text: '"They are already directly involved, Ren. Their names are written on the ledger of vengeance. They must know the nature of the danger they are in so they can prepare."'
    },
    {
        char: '',
        speaker: 'Ren (Internal)',
        text: 'He’s right. I can’t protect them by keeping them in the dark.'
    },
    {
        speaker: 'Ren',
        text: '"Okay. I’ll send out a group text tonight. We’ll meet up tomorrow."'
    },
    {
        bg: 'assets/chapter9/backgrounds/containment_facility_exterior_night.webp',
        bgm: 'assets/chapter9/background_music/the_pink_haired_assassin.mp3',
        vfx: 'vfx-camera-pan-up',
        sfx: 'assets/chapter9/sound_effects/wind_howling_night.mp3',
        speaker: '',
        text: 'Miles away, outside the heavily fortified perimeter of the GDC containment facility.'
    },
    {
        char: 'assets/chapter9/characters/pink_haired_assassin/standing_outside_smiling.webp',
        speaker: '',
        text: 'The pink-haired man in the stolen janitor uniform steps out of the shadows, entirely undetected. He takes a deep breath of the cool night air, his eyes locked onto the sprawling, illuminated city.'
    },
    {
        char: 'assets/chapter9/characters/pink_haired_assassin/sinister_smile.webp',
        speaker: 'Pink-Haired Assassin',
        text: '(Smiling, his voice echoing softly in the dark) "Alright. Let\'s get to work."'
    },
    {
        char: '',
        vfx: 'vfx-blackout',
        bgm: '',
        speaker: '',
        text: '[CHAPTER 9 END]'
    }
];
