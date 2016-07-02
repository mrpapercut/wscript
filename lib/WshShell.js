'use strict';

var WshSpecialFolders = require('./WshSpecialFolders');

/**
 * This Object spoofs the WshShell Object
 * Properties and methods taken from Microsoft documentation
 * https://msdn.microsoft.com/en-us/library/aew9yb99(v=vs.84).aspx
 */
var WshShell = function() {
	// Default properties
	this.CurrentDirectory	= 'C:\\Temp';
	this.Environment		= null;

	// Custom properties
	this._name				= 'WshShell';
};

WshShell.prototype.constructor = function() {
	if (!this) return new WshShell();
};

WshShell.prototype.toString = function() {
	return this._name;
};

// Property setters
WshShell.prototype._setCurrentDirectory = function(currentDirectory) {
	this.CurrentDirectory = currentDirectory;
};

// Default methods
WshShell.prototype.SpecialFolders = WshSpecialFolders;

WshShell.prototype.AppActivate = function() {

};

WshShell.prototype.CreateShortcut = function() {

};

WshShell.prototype.Exec = function() {

};

WshShell.prototype.ExpandEnvironmentStrings = function() {

};

WshShell.prototype.LogEvent = function() {

};

WshShell.prototype.Popup = function() {

};

WshShell.prototype.RegDelete = function() {

};

WshShell.prototype.RegRead = function() {

};

WshShell.prototype.RegWrite = function() {

};

WshShell.prototype.Run = function() {

};

WshShell.prototype.SendKeys = function() {

};

if (module && module.exports) module.exports = new WshShell();
