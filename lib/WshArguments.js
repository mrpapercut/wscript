'use strict';

var WshNamed = require('./WshNamed');
var WshUnnamed = require('./WshUnnamed');

/**
 * WshArguments.js
 * This Object spoofs the WshArguments Object
 * Properties and methods taken from Microsoft documentation
 * https://msdn.microsoft.com/en-us/library/ss1ysb2a(v=vs.84).aspx
 */

var WshArguments = function(args) {
	// Default properties
	this.Length = args.length;
	this.Named = new WshNamed(args);
	this.Unnamed = new WshUnnamed(args);

	// Custom properties
	this._args = args;
};

// Documentation calls Item a property, but it behaves like a method
WshArguments.prototype.Item = function(natIndex) {
	return this.Unnamed.Item(natIndex);
};

WshArguments.prototype.Count = function() {
	return this.Length;
};

WshArguments.prototype.ShowUsage = function() {
	return null;
};

module.exports = WshArguments;
