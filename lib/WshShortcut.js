'use strict';

/**
 * WshShortcut.js
 * This Object spoofs the WshShortcut Object
 * Properties and methods taken from Microsoft documentation
 * https://msdn.microsoft.com/en-us/library/xk6kst2k(v=vs.84).aspx
 */

class WshShortcut {
    constructor(FullName) {
        // Default properties
        this.Arguments        = arguments;
        this.Description      = null;
        this.FullName         = FullName;
        this.HotKey           = null;
        this.IconLocation     = null;
        this.RelativePath     = null;
        this.TargetPath       = null;
        this.WindowStyle      = null;
        this.WorkingDirectory = null;

        this._name            = 'WshShortcut';
    }

    toString() {
        return this._name;
    }

    // https://msdn.microsoft.com/en-us/library/k5x59zft(v=vs.84).aspx
    Save() {
        global.VFS._vfs.push(global.VFS._createFileObject(global.VFS._formatPath(this.FullName)));

        return null;
    }
}

const ProxyGenerator = require('../vendor/ProxyGenerator');
module.exports = new ProxyGenerator(WshShortcut);
