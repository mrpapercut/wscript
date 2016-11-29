'use strict';

/**
 * Folders.js
 * This Object spoofs the Scripting.FileSystemObject Folders Collection
 * Properties and methods taken from Microsoft documentation
 * https://msdn.microsoft.com/en-us/library/9kcx47hd(v=vs.84).aspx
 */

var Folders = function() {
    // Default properties
    this.Count = null;
    this.Item  = null;
};

// Default methods
// https://msdn.microsoft.com/en-us/library/zst29hfc(v=vs.84).aspx
Folders.prototype.Add = function() {

};

module.exports = Folders;
