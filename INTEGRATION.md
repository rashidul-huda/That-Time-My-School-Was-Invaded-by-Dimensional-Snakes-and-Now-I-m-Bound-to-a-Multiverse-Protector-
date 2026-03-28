# Module Integration Workflow

To integrate any new chapter (e.g., `chapterN.js`) into the existing framework, follow this standardized procedure:

## 1. File Architecture & Linking

* **Storage:** Save the new module file specifically within the `js/chapters/` directory.
* **HTML Integration:** In `index.html`, add the script tag for the new chapter directly following the previous chapter's script.
* **System Hook:** This specific sequence ensures the new module hooks into the engine skeleton perfectly.

## 2. Engine Registration

* **Object Update:** Locate the `gameChapters` object inside `engine.js`.
* **Registration:** Add the new chapter reference to this object to make it accessible to the core game logic.

## 3. Mapping Command

Once the files are linked and registered, execute the mapping utility via the terminal:

```bash
node map-chapter.js
