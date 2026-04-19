/**
 * PROJECT ASSET MAPPING UTILITY
 * -----------------------------------------------------------------------------
 * Generates a manifest file of all assets within a specific chapter directory.
 * Usage: Set the CHAPTER constant and run 'node map-chapter.js' from root.
 */

const fs = require("fs");
const path = require("path");

// --- CONFIGURATION ---
const CHAPTER_INDEX = 5; 
// ---------------------

const TARGET_DIR = path.join("assets", `chapter${CHAPTER_INDEX}`);
const OUTPUT_FILE = `chapter${CHAPTER_INDEX}_map.txt`;

/**
 * Recursively scans directory and returns an array of relative file paths.
 */
function getFileManifest(dir, fileList = []) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
        const res = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            getFileManifest(res, fileList);
        } else {
            // Standardize to forward slashes for cross-platform compatibility
            fileList.push(res.replace(/\\/g, "/"));
        }
    }

    return fileList;
}

/**
 * Main Execution
 */
function run() {
    if (!fs.existsSync(TARGET_DIR)) {
        console.error(`[ERROR] Target directory not found: "${TARGET_DIR}"`);
        console.log(`[INFO] Ensure the command is executed from the project root.`);
        process.exit(1);
    }

    try {
        const manifest = getFileManifest(TARGET_DIR);
        fs.writeFileSync(OUTPUT_FILE, manifest.join("\n"), "utf8");

        console.log(`[SUCCESS] Manifest generated: ${OUTPUT_FILE}`);
        console.log(`[INFO] Total entries processed: ${manifest.length}`);
    } catch (err) {
        console.error(`[FATAL] Failed to write manifest: ${err.message}`);
        process.exit(1);
    }
}

run();
