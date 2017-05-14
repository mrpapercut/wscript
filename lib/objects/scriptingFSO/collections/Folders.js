'use strict';

/**
 * Folders.js
 * This Object spoofs the Scripting.FileSystemObject Folders Collection
 * Properties and methods taken from Microsoft documentation
 * https://msdn.microsoft.com/en-us/library/9kcx47hd(v=vs.84).aspx
 */

var Folders = function(path) {
    // Default properties
    this.Count = null;
    this.Item  = null;

    // Custom properties
    // To keep track of current folder structure
    this._subfolders = [];

    // TODO: use path of Folders internally
    this._path = path;
};

// Default methods
// https://msdn.microsoft.com/en-us/library/zst29hfc(v=vs.84).aspx
Folders.prototype.Add = function(folderName) {
    var Folder = require('../objects/Folder');

    for (var i = 0; i < this._subfolders.length; i++) {
        if (this._subfolders[i].Name === folderName) {
            throw new TypeError('File already exists');
        } else {
            continue;
        }
    }

    var newPath = this._path + '\\' + folderName;

    this._subfolders.push(new Folder(newPath));

    return newPath;
};

module.exports = Folders;
