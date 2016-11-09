(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var ResponseText = require('./config/ResponseText');

/**
 * TextStream.js
 * This Object spoofs the TextStream Object
 * Properties and methods taken from Microsoft documentation
 * https://msdn.microsoft.com/en-us/library/312a5kbt(v=vs.84).aspx
 */
var TextStream = function(ioType) {
    // Default properties
    this.AtEndOfLine    = true;
    this.AtEndOfStream  = true;
    this.Column         = 1;
    this.Line           = 1;

    // Custom properties
    this._ioType        = ioType;

    // Save contents for writing/reading
    this._contents      = '';
};

TextStream.prototype._parseInt = function(num) {
    if (typeof num !== 'number' || isNaN(parseInt(num, 10))) throw new TypeError();
    return parseInt(num, 10);
}

TextStream.prototype.Close = function() {
    return null;
};

TextStream.prototype.Read = function(characters) {
    characters = this._parseInt(characters);

    return ResponseText.length > characters ? ResponseText.substr(0, characters) : ResponseText;
};

TextStream.prototype.ReadAll = function() {
    return ResponseText;
};

TextStream.prototype.ReadLine = function() {
    return ResponseText.split('\n')[0];
};

TextStream.prototype.Skip = function(characters) {
    characters = this._parseInt(characters);

    return ResponseText.substr(characters);
};

TextStream.prototype.SkipLine = function(characters) {
    characters = this._parseInt(characters);

    var lines = ResponseText.split('\n');

    return lines.slice(characters, lines.length).join('\n');
};

TextStream.prototype.Write = function(string) {
    this._contents += string;
};

TextStream.prototype.WriteBlankLines = function(lines) {
    lines = this._parseInt(lines);

    for (var i = 0; i < lines; i++) this._contents += '\n';
};

TextStream.prototype.WriteLine = function(string) {
    this._contents += string ? string + '\n' : '\n';
};

module.exports = TextStream;

},{"./config/ResponseText":9}],2:[function(require,module,exports){
'use strict';

var WshShell   = require('./WshShell');
var WshNetwork = require('./WshNetwork');

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
        case 'WScript.Network':
            Obj = new WshNetwork();
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

WScript.prototype.DisconnectObject = function() {

};

WScript.prototype.Echo = function(/*arguments = str1, str2, strN etc*/) {
    return undefined;
};

WScript.prototype.GetObject = function() {

};

WScript.prototype.Quit = function(intErrorCode) {
    return intErrorCode || undefined;
};

WScript.prototype.Sleep = function(seconds) {
    var now = new Date().getTime();
    while (new Date().getTime() < now + (seconds * 1000)){};
    return;
};

module.exports = WScript;

},{"./WshNetwork":3,"./WshShell":5}],3:[function(require,module,exports){
'use strict';

/**
 * WshNetwork.js
 * This Object spoofs the WshNetwork Object
 * Properties and methods taken from Microsoft documentation
 * https://msdn.microsoft.com/en-us/library/s6wt333f(v=vs.84).aspx
 */

var WshNetwork = function() {
    // Default properties
    this.ComputerName = 'USERPC';
    this.UserDomain   = 'USERDOMAIN';
    this.UserName     = 'USER';

    // Custom properties
    this._name            = 'WshNetwork';
};

WshNetwork.prototype.toString = function() {
    return this._name;
};

WshNetwork.prototype.AddWindowsPrinterConnection = function() {

}

WshNetwork.prototype.AddPrinterConnection = function() {

}

WshNetwork.prototype.EnumNetworkDrives = function() {

}

WshNetwork.prototype.EnumPrinterConnections = function() {

}

WshNetwork.prototype.MapNetworkDrive = function() {

}

WshNetwork.prototype.RemoveNetworkDrive = function() {

}

WshNetwork.prototype.RemovePrinterConnection = function() {

}

WshNetwork.prototype.SetDefaultPrinter = function() {

}

module.exports = WshNetwork;

},{}],4:[function(require,module,exports){
'use strict';

var TextStream = require('./TextStream');

/**
 * WshScriptExec.js
 * This Object spoofs the WshScriptExec Object
 * Properties and methods taken from Microsoft documentation
 * https://msdn.microsoft.com/en-us/library/xk6kst2k(v=vs.84).aspx
 */
var WshScriptExec = function(strCommand) {
    // Default properties
    this.ExitCode    = null;
    this.ProcessID   = 0;
    this.Status      = 1
    this.StdErr      = new TextStream('StdErr');
    this.StdIn       = new TextStream('StdIn');
    this.StdOut      = new TextStream('StdOut');

    // Custom properties
    this._strCommand = strCommand;
};

WshScriptExec.prototype.Terminate = function() {

}

module.exports = WshScriptExec;

},{"./TextStream":1}],5:[function(require,module,exports){
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

WshShell.prototype.LogEvent = function(intType, strMessage) {
    // Deprecated
    return -1;
};

WshShell.prototype.Popup = function(strText, nSecondsToWait, strTitle, nType) {
    // https://msdn.microsoft.com/en-us/library/x83z1d9f(v=vs.84).aspx
    // Return -1 as if timed out
    return -1;
};

WshShell.prototype.RegDelete = function(key) {
    throw new Error('Invalid root in registry key');
};

WshShell.prototype.RegRead = function(key) {
    throw new Error('Invalid root in registry key');
};

WshShell.prototype.RegWrite = function(key) {
    return undefined;
};

WshShell.prototype.Run = function(strCommand, intWindowStyle, bWaitOnReturn) {
    // https://msdn.microsoft.com/en-us/library/d5fk67ky(v=vs.84).aspx

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

WshShell.prototype.SendKeys = function(string) {
    // https://msdn.microsoft.com/en-us/library/8c6yea83(v=vs.84).aspx
    return undefined;
};

module.exports = WshShell;

},{"./WshScriptExec":4,"./WshShortcut":6,"./WshSpecialFolders":7,"./config/EnvironmentVariables":8}],6:[function(require,module,exports){
'use strict';

/**
 * WshShortcut.js
 * This Object spoofs the WshShortcut Object
 * Properties and methods taken from Microsoft documentation
 * https://msdn.microsoft.com/en-us/library/xk6kst2k(v=vs.84).aspx
 */

var WshShortcut = function(FullName) {
    // Default properties
    this.Arguments        = arguments;
    this.Description      = null;
    this.FullName         = FullName;
    this.HotKey           = null;
    this.IconLocation     = null;
    this.RelativePath     = null;
    this.TargetPath       = null;
    this.WindowStyle      = null;
    this.WorkingDirectory = null;
};

WshShortcut.prototype.Save = function() {
    return null;
};

module.exports = WshShortcut;

},{}],7:[function(require,module,exports){
'use strict';

var SpecialFolders = require('./config/SpecialFolders');

/**
 * WshSpecialFolders.js
 * This Object spoofs the WshSpecialFolders Object
 * Properties and methods taken from Microsoft documentation
 * https://msdn.microsoft.com/en-us/library/9x9e7edx(v=vs.84).aspx
 */
var WshSpecialFolders = function(folder) {
    return folder && SpecialFolders[folder] !== undefined ? SpecialFolders[folder] : '';
};

WshSpecialFolders.count = function() {
    return Object.keys(SpecialFolders).length;
};

module.exports = WshSpecialFolders;

},{"./config/SpecialFolders":10}],8:[function(require,module,exports){
module.exports={
  "%ALLUSERSPROFILE%":          "C:\\ProgramData",
  "%APPDATA%":                  "C:\\Users\\User\\AppData\\Roaming",
  "%CD%":                       "C:\\Users\\User\\Temp",
  "%CMDCMDLINE%":               "C:\\WINDOWS\\System32\\cmd.exe",
  "%CMDEXTVERSION%":            2,
  "%CommonProgramFiles%":       "C:\\Program Files\\Common Files",
  "%CommonProgramFiles(x86)%":  "C:\\Program Files (x86)\\Common Files",
  "%CommonProgramW6432%":       "C:\\Program Files\\Common Files",
  "%COMPUTERNAME%":             "USER-PC",
  "%COMSPEC%":                  "C:\\Windows\\System32\\cmd.exe",
  "%DATE%":                     "Sun, 01/01/2017",
  "%ERRORLEVEL%":               9009,
  "%HOMEDRIVE%":                "C:",
  "%HOMEPATH%":                 "C:\\Users\\User",
  "%LOCALAPPDATA%":             "C:\\Users\\User\\AppData\\Local",
  "%LOGONSERVER%":              "\\\\MicrosoftAccount",
  "%NUMBER_OF_PROCESSORS%":     8,
  "%OS%":                       "Windows_NT",
  "%PATH%":                     "%SystemRoot%\\system32;%SystemRoot%;%SystemRoot%\\System32\\Wbem;%SYSTEMROOT%\\System32\\WindowsPowerShell\\v1.0\\",
  "%PATHEXT%":                  "COM;.EXE;.BAT;.CMD;.VBS;.VBE;.JS;.JSE;.WSF;.WSH;.MSC",
  "%PROCESSOR_ARCHITECTURE%":   "AMD64",
  "%PROCESSOR_IDENTIFIER%":     "Intel64 Family 6 Model 60 Stepping 3, GenuineIntel",
  "%PROCESSOR_LEVEL%":          6,
  "%PROCESSOR_REVISION%":       "3c03",
  "%ProgramData%":              "C:\\ProgramData",
  "%ProgramFiles%":             "C:\\Program Files",
  "%ProgramFiles(x86)%":        "C:\\Program Files (x86)",
  "%ProgramW6432%":             "C:\\Program Files",
  "%PROMPT%":                   "$P$G",
  "%PSModulePath%":             "C:\\Windows\\system32\\WindowsPowerShell\\v1.0\\Modules\\",
  "%PUBLIC%":                   "C:\\Users\\Public",
  "%RANDOM%":                   "15622",
  "%SessionName%":              "Console",
  "%SystemDrive%":              "C:",
  "%SystemRoot%":               "C:\\Windows",
  "%TEMP%":                     "C:\\Users\\User\\AppData\\Local\\Temp",
  "%TIME%":                     "12:00:00.00",
  "%TMP%":                      "C:\\Users\\User\\AppData\\Local\\Temp",
  "%USERDOMAIN%":               "USER-PC",
  "%USERDOMAIN_ROAMINGPROFILE%":"USER-PC",
  "%USERNAME%":                 "User",
  "%USERPROFILE%":              "C:\\Users\\User",
  "%WINDIR%":                   "C:\\Windows"
}
},{}],9:[function(require,module,exports){
'use strict';

/**
 * This is the MIT License, used for random response strings
 */

module.exports = ['The MIT License (MIT)', '', 'Copyright (c) 2016 Author', '', 'Permission is hereby granted, free of charge, to any person obtaining a copy', 'of this software and associated documentation files (the "Software"), to deal', 'in the Software without restriction, including without limitation the rights', 'to use, copy, modify, merge, publish, distribute, sublicense, and/or sell', 'copies of the Software, and to permit persons to whom the Software is', 'furnished to do so, subject to the following conditions:', '', 'The above copyright notice and this permission notice shall be included in', 'all copies or substantial portions of the Software.', '', 'THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR', 'IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,', 'FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE', 'AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER', 'LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,', 'OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN', 'THE SOFTWARE.'].join('\n');

},{}],10:[function(require,module,exports){
module.exports={
  "AllUsersDesktop":   "C:\\Users\\Public\\Desktop",
  "AllUsersStartMenu": "C:\\ProgramData\\Microsoft\\Windows\\Start Menu",
  "AllUsersPrograms":  "C:\\ProgramData\\Microsoft\\Windows\\Start Menu\\Programs",
  "AllUsersStartup":   "C:\\ProgramData\\Microsoft\\Windows\\Start Menu\\Programs\\StartUp",
  "Desktop":           "C:\\Users\\User\\Desktop",
  "Favorites":         "C:\\Users\\User\\Favorites",
  "Fonts":             "C:\\Windows\\Fonts",
  "MyDocuments":       "C:\\Users\\User\\Documents",
  "NetHood":           "C:\\Users\\User\\AppData\\Roaming\\Microsoft\\Windows\\Network Shortcuts",
  "PrintHood":         "C:\\Users\\User\\AppData\\Roaming\\Microsoft\\Windows\\Printer Shortcuts",
  "Programs":          "C:\\Users\\User\\AppData\\Roaming\\Microsoft\\Windows\\Start Menu\\Programs",
  "Recent":            "C:\\Users\\User\\AppData\\Roaming\\Microsoft\\Windows\\Recent",
  "SendTo":            "C:\\Users\\User\\AppData\\Roaming\\Microsoft\\Windows\\SendTo",
  "StartMenu":         "C:\\Users\\User\\AppData\\Roaming\\Microsoft\\Windows\\Start Menu",
  "StartUp":           "C:\\Users\\User\\AppData\\Roaming\\Microsoft\\Windows\\Start Menu\\Programs\\Startup",
  "Templates":         "C:\\Users\\User\\AppData\\Roaming\\Microsoft\\Windows\\Templates"
}
},{}],11:[function(require,module,exports){
'use strict';

var WScript = require('./WScript');

window.WScript = new WScript();

},{"./WScript":2}]},{},[11]);
