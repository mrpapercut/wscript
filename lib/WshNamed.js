'use strict';

/**
 * WshNamed.js
 * This Object spoofs the WshNamed Object
 * Properties and methods taken from Microsoft documentation
 * https://msdn.microsoft.com/en-us/library/d6y04sbb(v=vs.84).aspx
 */

var WshNamed = function(args) {
	// Default properties
	this.Length = args.length;

	// Custom properties
	this._args = args;
};

// Documentation calls Item a property, but it behaves like a method
WshNamed.prototype.Item = function(natIndex) {
	return this._args[natIndex];
};

WshNamed.prototype.Count = function() {
	return this.Length;
};

module.exports = WshNamed;
