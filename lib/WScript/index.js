'use strict';

var WshShell = require('./WshShell');

/**
 * WScript.js
 * This Object spoofs the WScript Object
 * Properties and methods taken from Microsoft documentation
 * https://msdn.microsoft.com/en-us/library/at5ydy31(v=vs.84).aspx
 */

var WScript = function() {
    // Default properties
    this.Arguments      = [];
    this.BuildVersion   = 0;
    this.FullName       = 'C:\\WINDOWS\\system32\\wscript.exe';
    this.Interactive    = true;
    this.Name           = 'Windows Script Host';
    this.Path           = 'C:\\WINDOWS\\SysWOW64';
    this.ScriptFullName = '';
    this.ScriptName     = '';
    this.StdErr         = null;
    this.StdIn          = null;
    this.StdOut         = null;
    this.Version        = 5.6;

    // Custom properties
    this._objects       = [];
};

WScript.prototype.toString = function() {
    return this.Name;
};

// Property setters
WScript.prototype._setArguments = function(args) {
    this.Arguments = args instanceof Array ? args : [args];
};

WScript.prototype._setScriptName = function(scriptName) {
    if (typeof scriptName !== 'string') throw new TypeError();
    this.ScriptName = scriptName;
};

WScript.prototype._setScriptFullName = function(scriptName) {
    if (typeof scriptName !== 'string') throw new TypeError();
    this.ScriptFullName = scriptName;
};

// Default methods
WScript.prototype.ConnectObject = function() {

};

WScript.prototype.CreateObject = function(strProgId, strPrefix) {
    var Obj = null;

    switch (strProgId) {
        case 'WScript.Shell':
            Obj = new WshShell();
            break;
        /*
		case 'WScript.Network':
            Obj = new WshNetwork();
            break;
        case 'MSXML2.XMLHTTP':
            Obj = new XMLHttpRequest();
            break;
        case 'ADODB.Stream':
            Obj = new ADODBStream();
            break;
		*/
    }

    if (Obj === null) return undefined;

    this._objects.push({
        prefix: strPrefix,
        object: Obj,
        type: Obj.Name
    });

    return Obj;
};

WScript.prototype.DisconnectObject = function() {

};

WScript.prototype.Echo = function() {

};

WScript.prototype.GetObject = function() {

};

WScript.prototype.Quit = function() {

};

WScript.prototype.Sleep = function(seconds) {
    var now = new Date().getTime();
    while (new Date().getTime() < now + (seconds * 1000)){};
    return;
};

module.exports = new WScript();
