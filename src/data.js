import path from 'path';
import fs from 'fs';

import utils from './utils.js';

function initialize() {
    fs.mkdirSync(getDataDir(), {recursive: true});
    fs.mkdirSync(getBoardsDir(), {recursive: true});
}

function getDataDir() {
    return "./data";
}

function getBoardsDir() {
    return path.join(getDataDir(), "boards")
}

// todo rename to loadBoards
function loadBoards() {
    let boardsDir = getBoardsDir();
    let files = fs.readdirSync(boardsDir);
    let tasks = [];
    for(let file of files) {
        tasks.push(loadBoard(path.join(boardsDir, file)))
    }
    return tasks;
}

function loadBoard(taskFile) {
    let contents = fs.readFileSync(taskFile, {encoding:'utf8', flag: 'r'})
    let lines = utils.splitLines(contents);
    let title = null;
    let itemTitle = null;
    let itemDesc = "";
    let items = [];

    for(let line of lines) {
        let lineUntrimmed = line;
        line = line.trim();
        if(line.startsWith("#") && !line.startsWith("##")) {
            title = line.slice(1).trim();
            continue;
        }

        if(line.startsWith("##")) {
            if(itemTitle !== null) {
                items.push({title: itemTitle, desc: itemDesc.trim()});
            }
            itemTitle = line.slice(2).trim();
            itemDesc = "";
            continue;
        }

        itemDesc += lineUntrimmed + "\n";
    }
    if(itemTitle !== null) {
        items.push({title: itemTitle, desc: itemDesc.trim()});
    }
    return {file: taskFile, title, items};
}

export default {
    initialize,
    getDataDir,
    getBoardsDir,
    loadBoards
}
