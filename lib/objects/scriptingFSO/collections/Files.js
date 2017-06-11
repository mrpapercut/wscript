'use strict';

/**
 * Files.js
 * This Object spoofs the Scripting.FileSystemObject Files Collection
 * Properties and methods taken from Microsoft documentation
 * https://msdn.microsoft.com/en-us/library/wz72a8c0(v=vs.84).aspx
 */

class Files {
    constructor() {
        // Default properties
        this.Count = null;
        this.Item  = null;

        this._name = 'Files';
    }

    toString() {
        return this._name;
    }
}

const ProxyGenerator = require('../../../../vendor/ProxyGenerator');
module.exports = new ProxyGenerator(Files);
