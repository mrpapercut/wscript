'use strict';

/**
 * WshRemote.js
 * This Object spoofs the WshRemote Object
 * Properties and methods taken from Microsoft documentation
 * https://msdn.microsoft.com/en-us/library/x9t3ze5y(v=vs.84).aspx
 */
var WshRemote = function(CommandLine, MachineName) {
    // Default properties
    this.Status = null;
    this.Error = null;

    // Custom properties
    this._CommandLine = CommandLine;
    this._MachineName = MachineName;

	this._name = 'WshRemote';
};

WshRemote.prototype.toString = function() {
    return this._name;
};

// Custom methods (Events)
// https://msdn.microsoft.com/en-us/library/8twtdcke(v=vs.84).aspx
WshRemote.prototype._eventEnd = function() {

};

// https://msdn.microsoft.com/en-us/library/d070t67d(v=vs.84).aspx
WshRemote.prototype._eventError = function() {

};

// https://msdn.microsoft.com/en-us/library/zwzwaa4c(v=vs.84).aspx
WshRemote.prototype._eventStart = function() {

};

// Default methods
// https://msdn.microsoft.com/en-us/library/d33x48a9(v=vs.84).aspx
WshRemote.prototype.Execute = function() {

};

// https://msdn.microsoft.com/en-us/library/yk84ffsf(v=vs.84).aspx
WshRemote.prototype.Terminate = function() {

};

module.exports = WshRemote;
