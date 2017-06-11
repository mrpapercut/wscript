'use strict';

/**
 * Drives.js
 * This Object spoofs the Scripting.FileSystemObject Drives Collection
 * Properties and methods taken from Microsoft documentation
 * https://msdn.microsoft.com/en-us/library/x0s9y250(v=vs.84).aspx
 */

class Drives {
    constructor() {
        // Default properties
        this.Count = null;
        this.Item  = null;

        this._name = 'Drives';
    }

    toString() {
        return this._name;
    }
}

const ProxyGenerator = require('../../../../vendor/ProxyGenerator');
module.exports = new ProxyGenerator(Drives);
