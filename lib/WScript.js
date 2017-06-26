'use strict';

const WshArguments        = require('./WshArguments');
const WshController       = require('./WshController');
const WshNetwork          = require('./WshNetwork');
const WshRemote           = require('./WshRemote');
const WshShell            = require('./WshShell');

// Objects
const ADODBStream         = require('./objects/ADODB.Stream');
const ApplicationObject   = require('./objects/ApplicationObject');
const MicrosoftXMLDOM     = require('./objects/Microsoft.XMLDOM');
const MSXML2XMLHTTP       = require('./objects/MSXML2.XMLHTTP');
const ScriptingDictionary = require('./objects/Scripting.Dictionary');
const ScriptingFSO        = require('./objects/Scripting.FileSystemObject');

/**
 * WScript.js
 * This Object spoofs the WScript Object
 * Properties and methods taken from Microsoft documentation
 * https://msdn.microsoft.com/en-us/library/at5ydy31(v=vs.84).aspx
 */

class WScript {
    constructor() {
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
    }

    toString() {
        return this.Name;
    }

    // Property setters
    _setArguments(args) {
        this.Arguments = args instanceof Array ? args : [args];
    }

    _setScriptName(scriptName) {
        if (typeof scriptName !== 'string') throw new TypeError();
        this.ScriptName = scriptName;
    }

    _setScriptFullName(scriptName) {
        if (typeof scriptName !== 'string') throw new TypeError();
        this.ScriptFullName = scriptName;
    }

    // Default methods
    // https://msdn.microsoft.com/en-us/library/ccxe1xe6(v=vs.84).aspx
    ConnectObject(objEventSource, strPrefix) {
        if (objEventSource.toString() !== 'WshRemote') throw new TypeError();
        if (!strPrefix || (strPrefix && typeof strPrefix !== 'string')) throw new TypeError();

        const events = ['Start', 'End', 'Error'];
        for (let i = 0; i < events.length; i++) {
            let fnName = strPrefix + '_' + events[i],
                evName = '_event' + events[i];

            objEventSource[evName] = typeof global[fnName] === 'function' ? global[fnName] : objEventSource[evName];
        }
    }

    // https://msdn.microsoft.com/en-us/library/xzysf6hc(v=vs.84).aspx
    CreateObject(strProgId, strPrefix) {
        let Obj = null;

        if (!strProgId) throw new TypeError('Automation server can\'t create object');

        strProgId = strProgId.toLowerCase();

        switch (strProgId) {
            case 'wscript.shell':               // WScript.Shell
                Obj = new WshShell();
                break;

            case 'wscript.network':             // WScript.Network
                Obj = new WshNetwork();
                break;

            case 'wshcontroller':               // WSHController
                Obj = new WshController();
                break;

            case 'adodb.stream':                // ADODB.Stream
                Obj = new ADODBStream();
                break;

            case 'msxml2.xmlhttp.6.0':          // MSXML2.XMLHTTP.6.0
            case 'msxml2.xmlhttp.3.0':          // MSXML2.XMLHTTP.3.0
            case 'msxml2.xmlhttp':              // MSXML2.XMLHTTP
                Obj = new MSXML2XMLHTTP(strProgId);
                break;

            case 'microsoft.xmldom':            // Microsoft.XMLDOM
                Obj = new MicrosoftXMLDOM();
                break;

            case 'scripting.dictionary':        // Scripting.Dictionary
                Obj = new ScriptingDictionary();
                break;

            case 'scripting.filesystemobject':  // Scripting.FileSystemObject
                Obj = new ScriptingFSO();
                break;

        }

        // if (strProgId.match(/.application$/)) Obj = new ApplicationObject();

        if (Obj === null) throw new TypeError('Automation server can\'t create object');

        this._objects.push({
            prefix: strPrefix,
            object: Obj,
            type: Obj.Name
        });

        return Obj;
    }

    // https://msdn.microsoft.com/en-us/library/2d26y0c1(v=vs.84).aspx
    DisconnectObject() {
        return undefined;
    }

    // https://msdn.microsoft.com/en-us/library/h8f603s7(v=vs.84).aspx
    Echo(/*arguments = str1, str2, strN etc*/) {
        return undefined;
    }

    // https://msdn.microsoft.com/en-us/library/8ywk619w(v=vs.84).aspx
    GetObject(strPathname, strProgID, strPrefix) {
        // Deprecated?
        return undefined;
    }

    // https://msdn.microsoft.com/en-us/library/fw0fx1aw(v=vs.84).aspx
    Quit(intErrorCode) {
        return intErrorCode || undefined;
    }

    // https://msdn.microsoft.com/en-us/library/6t81adfd(v=vs.84).aspx
    Sleep(intTime) {
        const now = new Date().getTime();
        while (new Date().getTime() < now + (intTime)){};
        return;
    }
}

const ProxyGenerator = require('../vendor/ProxyGenerator');
module.exports = new ProxyGenerator(WScript);
