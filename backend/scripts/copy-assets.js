import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const srcDir = path.join(__dirname, '../src');
const distDir = path.join(__dirname, '../dist');

// Recursively create directories
function mkdirRecursive(dir) {
    if (!fs.existsSync(dir)) {
        mkdirRecursive(path.dirname(dir));
        fs.mkdirSync(dir);
    }
}

// Copy files recursively
function copyFiles(sourceDir, targetDir) {
    const files = fs.readdirSync(sourceDir);

    files.forEach(file => {
        const sourcePath = path.join(sourceDir, file);
        const targetPath = path.join(targetDir, file);
        const stats = fs.statSync(sourcePath);

        if (stats.isDirectory()) {
            mkdirRecursive(targetPath);
            copyFiles(sourcePath, targetPath);
        } else if (!file.endsWith('.ts') && !file.endsWith('.js')) {
            // Only copy non-TypeScript/JavaScript files
            mkdirRecursive(path.dirname(targetPath));
            fs.copyFileSync(sourcePath, targetPath);
        }
    });
}

// Create dist directory if it doesn't exist
mkdirRecursive(distDir);

// Copy files
copyFiles(srcDir, distDir);

console.log('Assets copied successfully!'); 