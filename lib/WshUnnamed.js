'use strict';

/**
 * WshUnnamed.js
 * This Object spoofs the WshUnnamed Object
 * Properties and methods taken from Microsoft documentation
 * https://msdn.microsoft.com/en-us/library/ah2hawwc(v=vs.84).aspx
 */

var WshUnnamed = function(args) {
	// Default properties
	this.Length = args.length;

	// Custom properties
	this._args = args;
};

// Documentation calls Item a property, but it behaves like a method
WshUnnamed.prototype.Item = function(natIndex) {
	return this._args[natIndex];
};

WshUnnamed.prototype.Count = function() {
	return this.Length;
};
};

module.exports = WshUnnamed;
