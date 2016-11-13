'use strict';

var WshArguments  = require('./WshArguments');
var WshController = require('./WshController');
var WshNetwork    = require('./WshNetwork');
var WshRemote     = require('./WshRemote');
var WshShell      = require('./WshShell');

/**
 * WScript.js
 * This Object spoofs the WScript Object
 * Properties and methods taken from Microsoft documentation
 * https://msdn.microsoft.com/en-us/library/at5ydy31(v=vs.84).aspx
 */

var WScript = function() {
    // Default properties
    this.Arguments      = new WshArguments(arguments);
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
// https://msdn.microsoft.com/en-us/library/ccxe1xe6(v=vs.84).aspx
WScript.prototype.ConnectObject = function(objEventSource, strPrefix) {
    if (objEventSource instanceof WshRemote !== true) throw new TypeError();
    if (!strPrefix || (strPrefix && typeof strPrefix !== 'string')) throw new TypeError();

    var events = ['Start', 'End', 'Error'];
    for (var i = 0; i < events.length; i++) {
        var fnName = strPrefix + '_' + events[i],
            evName = '_event' + events[i];

        objEventSource[evName] = typeof global[fnName] === 'function' ? global[fnName] : objEventSource[evName];
    }
};

// https://msdn.microsoft.com/en-us/library/xzysf6hc(v=vs.84).aspx
WScript.prototype.CreateObject = function(strProgId, strPrefix) {
    var Obj = null;

    switch (strProgId) {
        case 'WScript.Shell':
            Obj = new WshShell();
            break;
        case 'WScript.Network':
            Obj = new WshNetwork();
            break;
		case 'WSHController':
			Obj = new WshController();
			break;
        /*
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

// https://msdn.microsoft.com/en-us/library/2d26y0c1(v=vs.84).aspx
WScript.prototype.DisconnectObject = function() {
    return undefined;
};

// https://msdn.microsoft.com/en-us/library/h8f603s7(v=vs.84).aspx
WScript.prototype.Echo = function(/*arguments = str1, str2, strN etc*/) {
    return undefined;
};

// https://msdn.microsoft.com/en-us/library/8ywk619w(v=vs.84).aspx
WScript.prototype.GetObject = function(strPathname, strProgID, strPrefix) {
    // Deprecated?
    return undefined;
};

// https://msdn.microsoft.com/en-us/library/fw0fx1aw(v=vs.84).aspx
WScript.prototype.Quit = function(intErrorCode) {
    return intErrorCode || undefined;
};

// https://msdn.microsoft.com/en-us/library/6t81adfd(v=vs.84).aspx
WScript.prototype.Sleep = function(intTime) {
    var now = new Date().getTime();
    while (new Date().getTime() < now + (intTime)){};
    return;
};

module.exports = WScript;
