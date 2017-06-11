'use strict';

/**
 * Folders.js
 * This Object spoofs the Scripting.FileSystemObject Folders Collection
 * Properties and methods taken from Microsoft documentation
 * https://msdn.microsoft.com/en-us/library/9kcx47hd(v=vs.84).aspx
 */

class Folders {
    constructor(path, _parent) {
        // Default properties
        this.Count   = null;
        this.Item    = null;

        // Custom properties
        this._path   = path;
        this._parent = _parent;

        this._name   = 'Folders';
    }

    toString() {
        return this._name;
    }

    // Default methods
    // https://msdn.microsoft.com/en-us/library/zst29hfc(v=vs.84).aspx
    Add(folderName) {
        const newPath = this._parent._formatPath([this._path, folderName].join('\\'));
        this._parent.createFolder(newPath);

        return newPath;
    }
}

const ProxyGenerator = require('../../../../vendor/ProxyGenerator');
module.exports = new ProxyGenerator(Folders);
