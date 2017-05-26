'use strict';

const formatPath = require('../../../util/Paths').formatPath

/**
 * Folder.js
 * This Object spoofs the Scripting.FileSystemObject Folder Object
 * Properties and methods taken from Microsoft documentation
 * https://msdn.microsoft.com/en-us/library/1c87day3(v=vs.84).aspx
 */

class Folder {
    constructor(foldername, _parent) {
        // Default properties
        // Attributes change most significantly depending on IsRootFolder true/false

        const formatted = formatPath(foldername);

        for (let i in formatted) {
            this[i] = formatted[i];
        }

        this._parent = _parent;
    }

    // Default methods
    // https://msdn.microsoft.com/en-us/library/6973t06a(v=vs.84).aspx
    Copy(destination) {
        return this._parent.copyFolder(this.Path, destination);
    }

    // https://msdn.microsoft.com/en-us/library/0k4wket3(v=vs.84).aspx
    Delete() {
        return this._parent.deleteFolder(this.Path);
    }

    // https://msdn.microsoft.com/en-us/library/kxtftw67(v=vs.84).aspx
    Move(destination) {
        return this._parent.moveFolder(this.Path, destination);
    }

    // https://msdn.microsoft.com/en-us/library/5t9b5c0c(v=vs.84).aspx
    CreateTextFile(filename, overwrite, unicode) {
        return this._parent.createTextFile(filename, overwrite, unicode);
    }
}

module.exports = Folder;
