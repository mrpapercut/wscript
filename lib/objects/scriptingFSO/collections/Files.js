'use strict';

/**
 * Files.js
 * This Object spoofs the Scripting.FileSystemObject Files Collection
 * Properties and methods taken from Microsoft documentation
 * https://msdn.microsoft.com/en-us/library/wz72a8c0(v=vs.84).aspx
 */

var Files = function() {
    // Default properties
    this.Count = null;
    this.Item  = null;
};

module.exports = Files;
