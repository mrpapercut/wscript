'use strict';

var WshRemote = require('./WshRemote');

/**
 * WshController.js
 * This Object spoofs the WshController Object
 * Properties and methods taken from Microsoft documentation
 * https://msdn.microsoft.com/en-us/library/xk7bxb0d(v=vs.84).aspx
 */
var WshController = function() {
	// Custom properties
	this._name = 'WshController';
};

WshController.prototype.toString = function() {
    return this._name;
};

// Default methods
// https://msdn.microsoft.com/en-us/library/5zdwefhx(v=vs.84).aspx
WshController.prototype.CreateScript = function(CommandLine, MachineName) {
    // Return instance of WshRemote
    return new WshRemote(CommandLine, MachineName);
}

module.exports = WshController;
