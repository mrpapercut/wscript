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
// https://msdn.microsoft.com/en-us/library/0ea7b5xe(v=vs.84).aspx
WshShell.prototype.SpecialFolders = WshSpecialFolders;

// https://msdn.microsoft.com/en-us/library/wzcddbek(v=vs.84).aspx
WshShell.prototype.AppActivate = function(appName) {
    return true;
};

// https://msdn.microsoft.com/en-us/library/xsy6k3ys(v=vs.84).aspx
WshShell.prototype.CreateShortcut = function(strPathName) {
    return new WshShortcut(strPathName);
};

// https://msdn.microsoft.com/en-us/library/ateytk4a(v=vs.84).aspx
WshShell.prototype.Exec = function(strCommand) {
    return new WshScriptExec(strCommand);
};

// https://msdn.microsoft.com/en-us/library/dy8116cf(v=vs.84).aspx
WshShell.prototype.ExpandEnvironmentStrings = function(strString) {
	return typeof strString === 'string' ? strString.replace(/(%[a-zA-Z]+%)/g, function(m) {
		return EnvironmentVariables[m] || m;
	}) : '';
};

// https://msdn.microsoft.com/en-us/library/b4ce6by3(v=vs.84).aspx
WshShell.prototype.LogEvent = function(intType, strMessage) {
    // Deprecated
    return -1;
};

// https://msdn.microsoft.com/en-us/library/x83z1d9f(v=vs.84).aspx
WshShell.prototype.Popup = function(strText, nSecondsToWait, strTitle, nType) {
    // Return -1 as if timed out
    return -1;
};

// https://msdn.microsoft.com/en-us/library/293bt9hh(v=vs.84).aspx
WshShell.prototype.RegDelete = function(key) {
    throw new Error('Invalid root in registry key');
};

// https://msdn.microsoft.com/en-us/library/x05fawxd(v=vs.84).aspx
WshShell.prototype.RegRead = function(key) {
    throw new Error('Invalid root in registry key');
};

// https://msdn.microsoft.com/en-us/library/yfdfhz1b(v=vs.84).aspx
WshShell.prototype.RegWrite = function(key) {
    return undefined;
};

// https://msdn.microsoft.com/en-us/library/d5fk67ky(v=vs.84).aspx
WshShell.prototype.Run = function(strCommand, intWindowStyle, bWaitOnReturn) {

    /** intWindowStyle values
    * 0: Hides the window and activates another window.
    * 1: Activates and displays a window. If the window is minimized or maximized, the system restores it to its original size and position. An application should specify this flag when displaying the window for the first time.
    * 2: Activates the window and displays it as a minimized window.
    * 3: Activates the window and displays it as a maximized window.
    * 4: Displays a window in its most recent size and position. The active window remains active.
    * 5: Activates the window and displays it in its current size and position.
    * 6: Minimizes the specified window and activates the next top-level window in the Z order.
    * 7: Displays the window as a minimized window. The active window remains active.
    * 8: Displays the window in its current state. The active window remains active.
    * 9: Activates and displays the window. If the window is minimized or maximized, the system restores it to its original size and position. An application should specify this flag when restoring a minimized window.
    * 10: Sets the show-state based on the state of the program that started the application.
    */
    intWindowStyle = intWindowStyle || 1;
    bWaitOnReturn = bWaitOnReturn || false;

    return 0;
};

// https://msdn.microsoft.com/en-us/library/8c6yea83(v=vs.84).aspx
WshShell.prototype.SendKeys = function(string) {
    return undefined;
};

module.exports = WshShell;
