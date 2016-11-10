'use strict';

/**
 * WshNamed.js
 * This Object spoofs the WshNamed Object
 * Properties and methods taken from Microsoft documentation
 * https://msdn.microsoft.com/en-us/library/d6y04sbb(v=vs.84).aspx
 */

var WshNamed = function(args) {
	// Custom properties
    this._args = {};

    for (var i = 0; i < args.length; i++) {
        if (typeof args[i] === 'string' && args[i].match(/:/)) {
            var pair = args[i].split(/:/);
            this._args[pair[0]] = pair[1];
        }
    }

	// Default properties
	this.Length = Object.getOwnPropertyNames(this._args).length;
};

// Documentation calls Item a property, but it behaves like a method
WshNamed.prototype.Item = function(natIndex) {
	return this._args[natIndex];
};

WshNamed.prototype.Count = function() {
	return this.Length;
};

module.exports = WshNamed;
