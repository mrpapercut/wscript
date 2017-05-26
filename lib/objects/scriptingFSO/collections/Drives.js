'use strict';

/**
 * Files.js
 * This Object spoofs the Scripting.FileSystemObject Drives Collection
 * Properties and methods taken from Microsoft documentation
 * https://msdn.microsoft.com/en-us/library/x0s9y250(v=vs.84).aspx
 */

class Drives {
    constructor() {
        // Default properties
        this.Count = null;
        this.Item  = null;
    }
}

module.exports = Drives;
