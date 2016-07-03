'use strict';

var WshScriptExec        = require('./WshScriptExec');
var WshSpecialFolders    = require('./WshSpecialFolders');
var WshShortcut          = require('./WshShortcut');

var EnvironmentVariables = require('./config/EnvironmentVariables');

/**
 * WshShell.js
 * This Object spoofs the WshShell Object
 * Properties and methods taken from Microsoft documentation
 * https://msdn.microsoft.com/en-us/library/aew9yb99(v=vs.84).aspx
 */

var WshShell = function() {
    // Default properties
    this.CurrentDirectory = 'C:\\Temp';
    this.Environment      = null;

    // Custom properties
    this._name            = 'WshShell';
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

WshShell.prototype.AppActivate = function(appName) {
    return true;
};

WshShell.prototype.CreateShortcut = function(strPathName) {
    return new WshShortcut(strPathName);
};

WshShell.prototype.Exec = function(strCommand) {
    return new WshScriptExec(strCommand);
};

WshShell.prototype.ExpandEnvironmentStrings = function(strString) {
    return EnvironmentVariables[strString] || '';
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

module.exports = new WshShell();
