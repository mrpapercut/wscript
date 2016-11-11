'use strict';

var WshNamed = require('./WshNamed');
var WshUnnamed = require('./WshUnnamed');

/**
 * WshArguments.js
 * This Object spoofs the WshArguments Object
 * Properties and methods taken from Microsoft documentation
 * https://msdn.microsoft.com/en-us/library/ss1ysb2a(v=vs.84).aspx
 */

var WshArguments = function() {
    // Default properties
    this.Length = arguments.length;
    this.Named = new WshNamed(arguments);
    this.Unnamed = new WshUnnamed(arguments);

    // Custom properties
    this._args = arguments;
};

// https://msdn.microsoft.com/en-us/library/yzefkb42(v=vs.84).aspx
// Documentation calls Item a property, but it behaves like a method
WshArguments.prototype.Item = function(natIndex) {
    return typeof natIndex === 'string' ? this.Named.Item(natIndex) : this.Unnamed.Item(natIndex);
};

// https://msdn.microsoft.com/en-us/library/6x47fysb(v=vs.84).aspx
WshArguments.prototype.Count = function() {
    return this.Length;
};

// https://msdn.microsoft.com/en-us/library/dc1y0x0h(v=vs.84).aspx
WshArguments.prototype.ShowUsage = function() {
    return '';
};

module.exports = WshArguments;
