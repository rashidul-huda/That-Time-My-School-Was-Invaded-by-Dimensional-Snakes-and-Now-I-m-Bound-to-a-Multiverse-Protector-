# snakesVN — Visual Novel Engine

A lightweight, browser-based visual novel engine written in vanilla JavaScript. No frameworks, no build step — open an HTML file and you're running a game.

---

## Table of Contents

1. [Project Structure](#project-structure)
2. [Core Concepts](#core-concepts)
3. [Writing a Chapter Script](#writing-a-chapter-script)
4. [Step Properties Reference](#step-properties-reference)
5. [Choices & Branching](#choices--branching)
6. [Game Variables](#game-variables)
7. [Visual Effects (VFX)](#visual-effects-vfx)
8. [Audio](#audio)
9. [Conditional Routing](#conditional-routing)
10. [Labels & Jumps](#labels--jumps)
11. [Save & Unlock System](#save--unlock-system)
12. [Player Controls](#player-controls)
13. [Adding a New Chapter](#adding-a-new-chapter)
14. [Generating an Asset Manifest](#generating-an-asset-manifest)
15. [Styling & CSS Reference](#styling--css-reference)

---

## Project Structure

```
project-root/
├── index.html
├── css/
│   └── style.css               ← All layout, theming, VFX animations, responsive rules
├── js/
│   ├── engine.js               ← Core engine (this document covers it)
│   └── chapters/
│       ├── chapter1.js
│       ├── chapter2.js
│       └── ...
├── assets/
│   ├── before_the_pressure_breaks.mp3   ← Main menu BGM
│   ├── menu_bg.webp            ← Main menu background image
│   ├── chapter1/               ← Images, audio for chapter 1
│   └── ...
└── map-chapter.js              ← Asset manifest utility
```

---

## Core Concepts

The engine represents an entire chapter as a **flat JavaScript array** of step objects. Each step is a plain `{}` object with properties that tell the engine what to display, play, or do. Steps are executed in order unless a jump redirects the flow.

```js
var chapter1 = [
    { bg: 'assets/chapter1/bg_school.jpg', bgm: 'assets/chapter1/theme.mp3', speaker: 'Narrator', text: 'It was an ordinary Tuesday.' },
    { char: 'assets/chapter1/char_maya.png', speaker: 'Maya', text: 'Hey! Wait up!' },
    // ...
];
```

The engine lazy-loads each chapter's JS file on demand, so only the active chapter is in memory at any time. Assets 4 steps ahead are preloaded in the background (`PRELOAD_STEPS = 4`).

---

## Writing a Chapter Script

Create a file at `js/chapters/chapterN.js` and declare a global variable named `chapterN`:

```js
var chapter3 = [
    // step 0
    {
        bg: 'assets/chapter3/rooftop.jpg',
        bgm: 'assets/chapter3/tension.mp3',
        speaker: 'Kai',
        text: 'I knew you would come.'
    },
    // step 1 — change character sprite only
    {
        char: 'assets/chapter3/char_kai_angry.png',
        speaker: 'Kai',
        text: 'You have no idea what you walked into.'
    },
    // step 2 — end the chapter
    {
        text: '[END]'
    }
];
```

> **Key rule:** the variable name must match the file name. `chapter3.js` → `var chapter3 = [...]`.

---

## Step Properties Reference

All properties are optional. Omitting a property means "keep whatever was shown before" (persistent state).

| Property | Type | Description |
|---|---|---|
| `bg` | `string` | Path to a background image. Fades in over 150 ms. Set to `''` or `null` to clear. |
| `char` | `string` | Path to a character sprite image. Fades in over 150 ms. Set to `''` or `null` to clear. |
| `bgm` | `string` | Path to looping background music. Set to `''` to stop music. |
| `sfx` | `string` | Comma-separated paths to one-shot sound effects. All play simultaneously. |
| `speaker` | `string` | Name shown in the speaker nameplate. Omit for narration. |
| `text` | `string` | Dialogue or narration to type out. Including `[END]` anywhere ends the chapter. |
| `vfx` | `string` | Space-separated VFX class names (see [Visual Effects](#visual-effects-vfx)). |
| `label` | `string` | A named anchor this step can be jumped to by name. |
| `jumpTo` | `number \| string \| function` | Jump to a step index, label name, or a function returning either. |
| `setVar` | `object` | Set game variables: `{ setVar: { affection: 5 } }` |
| `addVar` | `object` | Add to game variables: `{ addVar: { affection: 1 } }` |
| `runLogic` | `function` | Arbitrary JS function called with `gameVariables`. For complex logic. |
| `choices` | `array` | Show a choice menu (static). See [Choices](#choices--branching). |
| `dynamicChoices` | `array` | Same as `choices` — identical behaviour, alternate name for readability. |
| `routeBasedOn` | `string` | Variable name to branch on without showing a choice. See [Conditional Routing](#conditional-routing). |

---

## Choices & Branching

Present the player with clickable options using `choices`. The dialogue box hides while choices are visible.

```js
{
    choices: [
        {
            text: 'Help her.',
            setVar: { helped: true },
            addVar: { affection: 2 },
            jumpTo: 'route_help'        // jump to label
        },
        {
            text: 'Walk away.',
            jumpTo: 15                  // jump to step index 15
        },
        {
            text: 'Ask for more time.',
            nextStepOffset: 1           // just go to the next step (default behaviour)
        }
    ]
}
```

Each choice object supports:

| Property | Type | Description |
|---|---|---|
| `text` | `string` | Button label shown to the player. |
| `setVar` | `object` | Variables to set when this choice is picked. |
| `addVar` | `object` | Variables to increment when this choice is picked. |
| `jumpTo` | `number \| string \| function` | Where to go after the choice. |
| `nextStepOffset` | `number` | Relative step offset (default `1`). Use instead of `jumpTo` for simple forward jumps. |
| `condition` | `function` | `(vars) => boolean`. If it returns `false` the button is not rendered at all. |

### Conditionally hiding choices

```js
{
    choices: [
        {
            text: 'Use the key.',
            condition: (vars) => vars.hasKey === true,
            jumpTo: 'use_key_route'
        },
        {
            text: 'Knock on the door.',
            jumpTo: 'knock_route'
        }
    ]
}
```

---

## Game Variables

`gameVariables` is a plain object that persists across steps within a play session and is included in save data. Use it to track story flags, relationship values, item flags, or anything else.

**Setting variables:**
```js
{ setVar: { metMaya: true, affection: 0 } }
```

**Incrementing variables:**
```js
{ addVar: { affection: 1, suspicion: -1 } }
```

**Custom logic:**
```js
{
    runLogic: (vars) => {
        vars.score = (vars.affection * 2) + (vars.suspicion > 3 ? 10 : 0);
    }
}
```

> `runLogic` and `setVar`/`addVar` are only executed when moving **forward** through the story, never when going back.

---

## Visual Effects (VFX)

Set the `vfx` property to a space-separated list of class names. Effects are reset at the start of every step.

| Class | Applied To | Effect |
|---|---|---|
| `vfx-shake` | bg, char, vfx, ui | Screen shake |
| `vfx-energy-clash` | bg, char, vfx, ui | All layers cycle through sepia/purple/bright/grayscale filters with shake, loops infinitely |
| `vfx-camera-pan-up` | bg, char | Slow upward pan, holds at end |
| `vfx-zoom-in` | bg, char | Zoom to 1.25×, holds at end |
| `vfx-zoom-out` | bg, char | Zoom back from 1.25× to 1×, holds at end |
| `vfx-float` | bg, char | Gentle bob up and down with slight zoom, loops infinitely |
| `vfx-flash-red` | vfx layer | Flashes red at 60% opacity over 0.5 s |
| `vfx-flash-white` | vfx layer | Flashes white at 95% opacity over 0.5 s, fades out |
| `vfx-flash-purple` | vfx layer | Flashes purple at 70% opacity over 0.5 s |
| `vfx-barrage-purple` | vfx layer | Irregular rapid purple flashes over 4 s, loops infinitely |
| `vfx-blackout` | vfx layer | Instant solid black overlay |
| `vfx-whiteout` | vfx layer | Instant solid white overlay |
| `vfx-tunnel-vision` | vfx layer | Heavy vignette that fades in over 3 s |

**Example — combine effects:**
```js
{ vfx: 'vfx-shake vfx-blackout', text: '...' }
```

> **Infinite loops** (`vfx-energy-clash`, `vfx-float`, `vfx-barrage-purple`) keep running until the next step clears them. **Forwards fill** effects (`vfx-camera-pan-up`, `vfx-zoom-in`, `vfx-zoom-out`) hold their end state until the next step resets them.

---

## Audio

### Background Music

```js
{ bgm: 'assets/chapter1/theme.mp3' }   // start/switch track (loops)
{ bgm: '' }                              // stop music
```

BGM persists until explicitly changed or stopped — you don't need to repeat it on every step.

### Sound Effects

```js
{ sfx: 'assets/sfx/crash.mp3' }
{ sfx: 'assets/sfx/door.mp3, assets/sfx/wind.mp3' }  // multiple, play simultaneously
```

SFX are one-shot (no looping). When Auto-Play is on, the engine waits for all active SFX to finish before advancing.

---

## Conditional Routing

Route automatically based on a variable's value — no choice menu shown.

```js
{
    routeBasedOn: 'affection',
    condition: '>=',
    routeValue: 5,
    ifTrue: 'good_ending',      // label name or step index
    ifFalse: 'bad_ending'
}
```

**Supported conditions:** `>`, `>=`, `<`, `<=`, `===`

If `condition` and `routeValue` are omitted, the route is treated as a simple truthy/falsy check on the variable.

```js
{ routeBasedOn: 'metMaya', ifTrue: 20, ifFalse: 25 }
```

---

## Labels & Jumps

### Labels

Mark a step with a `label` so it can be jumped to by name:

```js
{ label: 'good_ending', speaker: 'Narrator', text: 'A peaceful resolution.' }
```

### Jumps

Jump from any step or choice using `jumpTo`:

```js
// By index
{ jumpTo: 42 }

// By label name
{ jumpTo: 'good_ending' }

// Dynamic — function receives gameVariables
{ jumpTo: (vars) => vars.affection >= 5 ? 'good_ending' : 'bad_ending' }
```

---

## Save & Unlock System

All persistence uses `localStorage` with two keys:

| Key | Contents |
|---|---|
| `snakesVN_saveData` | `{ chapterId, currentStep, stepHistory, persistentState, gameVariables }` |
| `snakesVN_unlocks` | Array of unlocked chapter IDs, e.g. `[1, 2, 3]` |

### How saves work

- **Manual save** — the player clicks the Save button. Progress is written immediately.
- **Auto-save on chapter end** — when a chapter ends the engine writes save data pointing at the start of the next chapter and unlocks it.
- **Continue** — restores `currentStep`, `stepHistory`, `persistentState`, and `gameVariables` exactly, so the player lands in the same visual state they left.

Chapters not in the unlocks array appear in the chapter list as **locked** and are not clickable.

---

## Player Controls

### Keyboard

| Key | Action |
|---|---|
| `Space`, `→`, `Enter` | Advance / skip typing animation |
| `←` | Go back one step |
| `A` | Toggle Auto-Play |
| `↓` / `↑` | Navigate choices (when choice menu is open) |
| `Enter` / `Space` | Confirm highlighted choice |

### On-screen buttons

| Button | Action |
|---|---|
| Forward (→) | Advance story |
| Back (←) | Go back one step |
| AUTO | Toggle Auto-Play |
| Save | Save current progress |
| Leave | Return to main menu (prompts if unsaved) |
| Fullscreen ⛶ | Toggle fullscreen (native API with CSS pseudo-fullscreen fallback) |

### Auto-Play behaviour

When Auto-Play is active the engine advances automatically. The delay after typing finishes is `max(1000ms, textLength × 25ms)` — longer lines give the player more reading time. If SFX are playing, the engine waits for them all to finish first. Clicking or pressing any advance key cancels Auto-Play.

### Go-back behaviour

Going back restores the previous `persistentState` (bg, char, bgm) and `gameVariables` from the step history stack. Dialogue is shown instantly (no re-typing). Logic (`setVar`, `addVar`, `runLogic`) is **not** re-executed on the way back.

---

## Adding a New Chapter

1. **Create the script file.** Save `js/chapters/chapterN.js` with the matching variable name:
   ```js
   var chapter4 = [ /* your steps */ ];
   ```

2. **Update the chapter count.** Open `js/engine.js` and change the constant at the top:
   ```js
   const TOTAL_CHAPTERS = 4;  // was 3, now 4
   ```

3. **Add your assets.** Place images and audio under `assets/chapterN/`.

4. **Generate the asset manifest** (optional but recommended — see below).

5. **Test it.** Complete the previous chapter in-browser, or use the chapter select on the main menu (it will be locked until unlocked — manually add the ID to `snakesVN_unlocks` in DevTools localStorage to test immediately).

---

## Generating an Asset Manifest

`map-chapter.js` is a Node.js utility that scans a chapter's asset folder and writes a plain-text file listing every asset path. This is useful for auditing what's included or catching missing files before release.

**Configure it** — open `map-chapter.js` and set:
```js
const CHAPTER_INDEX = 4;   // whichever chapter you want to scan
```

**Run it from the project root:**
```bash
node map-chapter.js
```

This produces `chapter4_map.txt` in the project root with one asset path per line. The script will exit with an error and a helpful message if the target directory doesn't exist.

---

## Styling & CSS Reference

All visual styling lives in `css/style.css`. Here's a complete reference so you know what to edit and what to leave alone.

---

### Layout & Responsive Scaling

The game runs inside `#game-container`, which is a **16:9 aspect-ratio box** that scales to fill the browser window without ever cropping or distorting:

```css
#game-container {
    width: 100vw;
    max-width: min(1920px, calc(100dvh * (16 / 9)));
    aspect-ratio: 16 / 9;
}
```

You never need to change pixel sizes for different screen sizes — everything inside scales automatically with the container. The body is a dark `#111` flex container that centres the game.

**Portrait lock (mobile):** On phones held vertically (portrait + ≤768 px wide), `#game-container` is hidden and `#rotate-screen` is shown instead, prompting the player to rotate.

**Landscape small screens (≤950 px wide):** A `@media` block at the bottom of the stylesheet scales down fonts, padding, dialogue box height, and button sizes. Edit those values if the game feels cramped or too large on tablets.

---

### Fullscreen Modes

The engine supports two fullscreen modes, both handled in CSS:

**Native fullscreen** — triggered via the Fullscreen API. The stylesheet uses `:fullscreen` and `:-webkit-full-screen` selectors to let the container fill the screen with no max-width constraints.

**Pseudo-fullscreen** — a CSS fallback used when the Fullscreen API is blocked (e.g. iframes, some mobile browsers). The engine adds the class `.pseudo-fullscreen` to `#game-container`:

```css
#game-container.pseudo-fullscreen {
    position: fixed;
    top: 0; left: 0;
    width: 100vw; height: 100dvh;
    max-width: none; max-height: none;
    z-index: 9999;
}
```

---

### The Layer Stack

The game is built from four absolutely-positioned layers stacked by `z-index`:

| ID | z-index | Purpose |
|---|---|---|
| `#bg-layer` | 1 | Background image (crossfades on change) |
| `#char-layer` | 2 | Character sprite (crossfades on change) |
| `#vfx-layer` | 3 | VFX overlays (flash, blackout, whiteout, tunnel vision) |
| `#ui-layer` | 4 | All interactive UI — dialogue box, choices, buttons |

All four share the `.layer` base class: `position: absolute`, `width/height: 100%`, `pointer-events: none`, with a `transition: opacity 0.15s ease-in-out` for crossfades. `#ui-layer` overrides `pointer-events` to `auto` so clicks register.

> **Do not reorder the z-indexes.** VFX must sit above characters but below UI so flash effects don't block button clicks.

---

### Main Menu

The menu is a full-size flex row split into two panels:

**Left panel (`#menu-left`)** — contains the title image (`#menu-title-img`) and the main action buttons (`.menu-btn`). The background image is set via CSS on `#main-menu`:
```css
#main-menu {
    background: url('../assets/menu_bg.webp') no-repeat center center;
    background-size: cover;
}
```
To change the menu background, replace `menu_bg.webp` in the `assets/` folder (or update this path).

**Right panel (`#menu-right`)** — the chapter select list (`#chapter-list`). Chapters are dynamically generated as `.chapter-btn` elements. Locked chapters get a muted `#aaa` colour; unlocked ones are white with a gold hover border (`#ffd700`).

The chapter list scrolls if there are many chapters, with a custom gold scrollbar on hover.

**Menu button gold hover theme:**
```css
.menu-btn:hover {
    border-color: #ffd700;
    color: #ffd700;
}
```
The gold (`#ffd700`) is the project's accent colour — used on speaker names, active AUTO button, hover borders, and scrollbar thumbs. Change it in one place and update all instances if you want to re-theme.

---

### Dialogue Box

```css
#dialogue-box {
    bottom: 70px;
    width: 90%;
    height: 160px;
    background-color: rgba(0, 0, 0, 0.85);
    border: 2px solid #fff;
    border-radius: 10px;
    padding: 20px;
}
```

- `#speaker-name` — gold (`#ffd700`), 24 px bold, sits above the dialogue text.
- `#dialogue-text` — white, 20 px, line-height 1.4. Text is typed in character by character at 25 ms/character by the engine.
- The box is clickable (advances the story) — do not add `pointer-events: none` to it.

To resize the dialogue box, adjust `height` and `bottom`. The small-screen media query overrides these to `155px` height and `10px` bottom with extra bottom padding to avoid overlapping nav buttons.

---

### Choice Buttons

```css
#choices-container {
    top: 40%;
    width: 60%;
}
.choice-btn {
    background-color: rgba(30, 30, 30, 0.95);
    border: 2px solid #fff;
    font-size: 18px;
    border-radius: 5px;
}
```

Choices are centred vertically at 40% of the screen height, 60% wide. To make the choice panel wider or reposition it vertically, edit `#choices-container`. When a choice has keyboard focus (↑/↓ navigation) the browser's default `:focus` outline appears — style `.choice-btn:focus` if you want a custom look.

---

### Navigation & Utility Buttons

`#leave-btn`, `#save-btn`, and `#fullscreen-btn` share a base style — semi-transparent dark background, white border, 42 px height:

| Button | Default position |
|---|---|
| `#leave-btn` | Top-left (15 px from edges) |
| `#save-btn` | Top-right (15 px from edges) |
| `#fullscreen-btn` | Bottom-right out of game; top, 165 px from left when in-game (`.in-game` class) |

The forward/back nav chevrons (`.nav-chevron`) sit in `#nav-controls`, which is pinned to the bottom centre at 90% width.

**AUTO button active state:**
```css
#btn-auto.active {
    background-color: #ffd700;
    color: #000;
    box-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
}
```
When Auto-Play is on the button flips to a solid gold background. The engine toggles the `.active` class automatically.

**Forward button bounce:** When typing finishes, the engine adds `.bouncing` to `#btn-forward`, triggering a repeating rightward nudge animation so players know they can advance.

---

### Loading Screen

`#loading-screen` is a black full-screen overlay (`z-index: 30`) with a centred gold spinner (`.loader`) built from a CSS border animation. It shows between the chapter select and the first scene render. You can swap the spinner for anything — just keep `#loading-screen` as a flex column with `justify-content: center`.

---

### Click-to-Start Screen

`#click-to-start` sits at `z-index: 1000` (above everything) and fades out on first click. It uses `font-family: 'Cinzel', serif` and the `pulseText` animation (opacity 1 → 0.5 → 1, 2 s loop). If you're not importing the Cinzel font in your HTML, add a Google Fonts link or change this to a font you have loaded.

---

### Complete VFX Class Reference

These classes are applied by the engine via the `vfx` step property. All are defined as CSS keyframe animations in `style.css`. Every class is cleared automatically at the start of the next step.

| Class | Duration | Loops | Description |
|---|---|---|---|
| `vfx-shake` | 0.5 s | No | Rapid random translate + rotate jitter across all layers |
| `vfx-flash-red` | 0.5 s | No | VFX layer flashes red at 60% opacity |
| `vfx-flash-white` | 0.5 s | No | VFX layer flashes white at 95% opacity, fades out |
| `vfx-flash-purple` | 0.5 s | No | VFX layer flashes purple at 70% opacity |
| `vfx-barrage-purple` | 4 s | Yes (infinite) | Irregular rapid purple flash pattern — good for power surges |
| `vfx-float` | 3 s | Yes (infinite) | bg + char gently bob up and down with a slight zoom |
| `vfx-camera-pan-up` | 1.5 s | No (forwards fill) | bg + char slowly pan upward and stay there |
| `vfx-zoom-in` | 1.5 s | No (forwards fill) | bg + char zoom to 1.25× and stay |
| `vfx-zoom-out` | 1.5 s | No (forwards fill) | bg + char zoom back from 1.25× to 1× |
| `vfx-energy-clash` | 0.8 s | Yes (infinite) | All layers cycle through sepia/purple/bright/grayscale filters with shake |
| `vfx-blackout` | Instant | — | VFX layer becomes solid black |
| `vfx-whiteout` | Instant | — | VFX layer becomes solid white |
| `vfx-tunnel-vision` | 3 s transition | — | Heavy vignette (inset box-shadow) that fades in over 3 s |

> **`forwards fill` effects** (`vfx-camera-pan-up`, `vfx-zoom-in`, `vfx-zoom-out`) hold their end state until the next step resets them. Use a follow-up step without a `vfx` property to let them snap back, or use `vfx-zoom-out` to reverse a `vfx-zoom-in`.

> **Infinite loops** (`vfx-barrage-purple`, `vfx-float`, `vfx-energy-clash`) keep running until the next step. Because the engine resets VFX classes at the start of every step, simply having a step without that class stops the loop.

---

### Adding Your Own VFX

1. Define a `@keyframes` block in `style.css`.
2. Create a class that applies it (follow the `vfx-*` naming convention).
3. In your chapter script, use it via the `vfx` property: `{ vfx: 'vfx-my-effect', ... }`.

The engine does not need to know about it in advance — the CSS class is just applied directly to the relevant layer elements.

---

*Engine source: `js/engine.js` — total chapters constant at line 4, save keys at lines 1–2. Stylesheet: `css/style.css`.*
