'use strict';

/**
 * WshShortcut.js
 * This Object spoofs the WshShortcut Object
 * Properties and methods taken from Microsoft documentation
 * https://msdn.microsoft.com/en-us/library/xk6kst2k(v=vs.84).aspx
 */

var WshShortcut = function(FullName) {
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
};

// https://msdn.microsoft.com/en-us/library/k5x59zft(v=vs.84).aspx
WshShortcut.prototype.Save = function() {
    return null;
};

module.exports = WshShortcut;
