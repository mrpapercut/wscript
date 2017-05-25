'use strict';

/**
 * Folders.js
 * This Object spoofs the Scripting.FileSystemObject Folders Collection
 * Properties and methods taken from Microsoft documentation
 * https://msdn.microsoft.com/en-us/library/9kcx47hd(v=vs.84).aspx
 */

var Folders = function(path, _parent) {
    // Default properties
    this.Count   = null;
    this.Item    = null;

    // Custom properties
    this._path   = path;
    this._parent = _parent;
};

// Default methods
// https://msdn.microsoft.com/en-us/library/zst29hfc(v=vs.84).aspx
Folders.prototype.Add = function(folderName) {
    var newPath = this._parent._formatPath([this._path, folderName].join('\\'));
    this._parent.createFolder(newPath);

    return newPath;
};

module.exports = Folders;
