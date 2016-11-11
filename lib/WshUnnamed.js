'use strict';

/**
 * WshUnnamed.js
 * This Object spoofs the WshUnnamed Object
 * Properties and methods taken from Microsoft documentation
 * https://msdn.microsoft.com/en-us/library/ah2hawwc(v=vs.84).aspx
 */

var WshUnnamed = function(args) {
    // Custom properties
    this._args = {};

    for (var i = 0, j = 0; i < args.length; i++) {
        var item = args[i];
        if (typeof item === 'number' || typeof item === 'string' && !item.match(/:/)) {
            this._args[++j] = item;
        }
    }

    // Default properties
    this.Length = Object.getOwnPropertyNames(this._args).length;
};

// https://msdn.microsoft.com/en-us/library/c2x76sxz(v=vs.84).aspx
// Documentation calls Item a property, but it behaves like a method
WshUnnamed.prototype.Item = function(natIndex) {
    return this._args[natIndex];
};

// https://msdn.microsoft.com/en-us/library/6x47fysb(v=vs.84).aspx
WshUnnamed.prototype.Count = function() {
    return this.Length;
};

module.exports = WshUnnamed;
