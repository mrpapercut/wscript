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

// https://msdn.microsoft.com/en-us/library/yb3tbdkw(v=vs.84).aspx
TextStream.prototype.Close = function() {
    return null;
};

// https://msdn.microsoft.com/en-us/library/dhyx75w2(v=vs.84).aspx
TextStream.prototype.Read = function(characters) {
    characters = this._parseInt(characters);

    return ResponseText.length > characters ? ResponseText.substr(0, characters) : ResponseText;
};

// https://msdn.microsoft.com/en-us/library/t58aa4dd(v=vs.84).aspx
TextStream.prototype.ReadAll = function() {
    return ResponseText;
};

// https://msdn.microsoft.com/en-us/library/h7se9d4f(v=vs.84).aspx
TextStream.prototype.ReadLine = function() {
    return ResponseText.split('\n')[0];
};

// https://msdn.microsoft.com/en-us/library/08xz3c5a(v=vs.84).aspx
TextStream.prototype.Skip = function(characters) {
    characters = this._parseInt(characters);

    return ResponseText.substr(characters);
};

// https://msdn.microsoft.com/en-us/library/zbhhkawe(v=vs.84).aspx
TextStream.prototype.SkipLine = function(characters) {
    characters = this._parseInt(characters);

    var lines = ResponseText.split('\n');

    return lines.slice(characters, lines.length).join('\n');
};

// https://msdn.microsoft.com/en-us/library/6ee7s9w2(v=vs.84).aspx
TextStream.prototype.Write = function(string) {
    this._contents += string;
};

// https://msdn.microsoft.com/en-us/library/eysctzwa(v=vs.84).aspx
TextStream.prototype.WriteBlankLines = function(lines) {
    lines = this._parseInt(lines);

    for (var i = 0; i < lines; i++) this._contents += '\n';
};

// https://msdn.microsoft.com/en-us/library/t5399c99(v=vs.84).aspx
TextStream.prototype.WriteLine = function(string) {
    this._contents += string ? string + '\n' : '\n';
};

module.exports = TextStream;

},{"./config/ResponseText":16}],2:[function(require,module,exports){
(function (global){
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

    objEventSource._eventStart = global[strPrefix + '_Start'];
    objEventSource._eventEnd = global[strPrefix + '_End'];
    objEventSource._eventError = global[strPrefix + '_Error'];
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
WScript.prototype.Sleep = function(seconds) {
    var now = new Date().getTime();
    while (new Date().getTime() < now + (seconds * 1000)){};
    return;
};

module.exports = WScript;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./WshArguments":3,"./WshController":4,"./WshNetwork":7,"./WshRemote":8,"./WshShell":11}],3:[function(require,module,exports){
'use strict';

var WshNamed = require('./WshNamed');
var WshUnnamed = require('./WshUnnamed');

/**
 * WshArguments.js
 * This Object spoofs the WshArguments Object
 * Properties and methods taken from Microsoft documentation
 * https://msdn.microsoft.com/en-us/library/ss1ysb2a(v=vs.84).aspx
 */

var WshArguments = function() {
    // Default properties
    this.Length = arguments.length;
    this.Named = new WshNamed(arguments);
    this.Unnamed = new WshUnnamed(arguments);

    // Custom properties
    this._args = arguments;
};

// https://msdn.microsoft.com/en-us/library/yzefkb42(v=vs.84).aspx
// Documentation calls Item a property, but it behaves like a method
WshArguments.prototype.Item = function(natIndex) {
    return typeof natIndex === 'string' ? this.Named.Item(natIndex) : this.Unnamed.Item(natIndex);
};

// https://msdn.microsoft.com/en-us/library/6x47fysb(v=vs.84).aspx
WshArguments.prototype.Count = function() {
    return this.Length;
};

// https://msdn.microsoft.com/en-us/library/dc1y0x0h(v=vs.84).aspx
WshArguments.prototype.ShowUsage = function() {
    return '';
};

module.exports = WshArguments;

},{"./WshNamed":6,"./WshUnnamed":14}],4:[function(require,module,exports){
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

},{"./WshRemote":8}],5:[function(require,module,exports){
'use strict';

var WshEnvironmentVariables = require('./config/WshEnvironment');

/**
 * WshEnvironment.js
 * This Object spoofs the WshEnvironment Object
 * Properties and methods taken from Microsoft documentation
 * https://msdn.microsoft.com/en-us/library/6s7w15a0(v=vs.84).aspx
 */

var _envVars = null;

var WshEnvironment = function(strType) {
    _envVars = WshEnvironmentVariables[strType] || WshEnvironmentVariables['VOLATILE'];

    // Return a function
    var returnFunction = function(natIndex) {
        return _envVars[natIndex];
    }

    // https://msdn.microsoft.com/en-us/library/6kz722cz(v=vs.84).aspx
    returnFunction.Length = Object.getOwnPropertyNames(_envVars).length;

    // https://msdn.microsoft.com/en-us/library/c2x76sxz(v=vs.84).aspx
    // Documentation calls Item a property, but it behaves like a method
    returnFunction.Item = function(natIndex) {
        return _envVars[natIndex];
    };

    // https://msdn.microsoft.com/en-us/library/6x47fysb(v=vs.84).aspx
    returnFunction.Count = function() {
        return Object.getOwnPropertyNames(_envVars).length;
    };

    // https://msdn.microsoft.com/en-us/library/218yba97(v=vs.84).aspx
    returnFunction.Remove = function(strName) {
        delete _envVars[strName];
    };

    return returnFunction;
};

module.exports = WshEnvironment;

},{"./config/WshEnvironment":18}],6:[function(require,module,exports){
'use strict';

/**
 * WshNamed.js
 * This Object spoofs the WshNamed Object
 * Properties and methods taken from Microsoft documentation
 * https://msdn.microsoft.com/en-us/library/d6y04sbb(v=vs.84).aspx
 */

var WshNamed = function(args) {
    // Custom properties
    this._args = {};

    for (var i = 0; i < args.length; i++) {
        if (typeof args[i] === 'string' && args[i].match(/:/)) {
            var pair = args[i].split(/:/);
            this._args[pair[0]] = pair[1];
        }
    }

    // Default properties
    this.Length = Object.getOwnPropertyNames(this._args).length;
};

// https://msdn.microsoft.com/en-us/library/c2x76sxz(v=vs.84).aspx
// Documentation calls Item a property, but it behaves like a method
WshNamed.prototype.Item = function(natIndex) {
    return this._args[natIndex];
};

// https://msdn.microsoft.com/en-us/library/6x47fysb(v=vs.84).aspx
WshNamed.prototype.Count = function() {
    return this.Length;
};

// https://msdn.microsoft.com/en-us/library/0axxztye(v=vs.84).aspx
WshNamed.prototype.Exists = function(key) {
    return !!this._args[key];
};

module.exports = WshNamed;

},{}],7:[function(require,module,exports){
'use strict';

var WshUnnamed = require('./WshUnnamed');

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
    this._name        = 'WshNetwork';
};

WshNetwork.prototype.toString = function() {
    return this._name;
};

// https://msdn.microsoft.com/en-us/library/kxsdca3c(v=vs.84).aspx
WshNetwork.prototype.AddPrinterConnection = function(strLocalName, strRemoteName, bUpdateProfile, strUser, strPassword) {
    throw new Error('The network resource type is not correct.');
}

// https://msdn.microsoft.com/en-us/library/zsdh7hkb(v=vs.84).aspx
WshNetwork.prototype.AddWindowsPrinterConnection = function(strPrinterPath, strDriverName, strPort) {
    throw new Error('The remote server machine does not exist or is unavailable.');
}

// https://msdn.microsoft.com/en-us/library/t9zt39at(v=vs.84).aspx
WshNetwork.prototype.EnumNetworkDrives = function() {
    return new WshUnnamed([]);
}

// https://msdn.microsoft.com/en-us/library/zhds6k80(v=vs.84).aspx
WshNetwork.prototype.EnumPrinterConnections = function() {
    return new WshUnnamed([]);
}

// https://msdn.microsoft.com/en-us/library/8kst88h6(v=vs.84).aspx
WshNetwork.prototype.MapNetworkDrive = function(strLocalName, strRemoteName, bUpdateProfile, strUser, strPassword) {
    throw new Error('The network path was not found.');
}

// https://msdn.microsoft.com/en-us/library/d16d7wbf(v=vs.84).aspx
WshNetwork.prototype.RemoveNetworkDrive = function(strName, bForce, bUpdateProfile) {
    throw new Error('This network connection does not exist.');
}

// https://msdn.microsoft.com/en-us/library/tsbh2yy7(v=vs.84).aspx
WshNetwork.prototype.RemovePrinterConnection = function(strName, bForce, bUpdateProfile) {
    throw new Error('This network connection does not exist.');
}

// https://msdn.microsoft.com/en-us/library/2ccwwdct(v=vs.84).aspx
WshNetwork.prototype.SetDefaultPrinter = function(strPrinterName) {
    throw new Error('There is no printer called "' + strPrinterName + '"');
}

module.exports = WshNetwork;

},{"./WshUnnamed":14}],8:[function(require,module,exports){
'use strict';

var WshRemoteError = require('./WshRemoteError');

/**
 * WshRemote.js
 * This Object spoofs the WshRemote Object
 * Properties and methods taken from Microsoft documentation
 * https://msdn.microsoft.com/en-us/library/x9t3ze5y(v=vs.84).aspx
 */
var WshRemote = function(CommandLine, MachineName) {
    // Default properties
    this.Error = null;

    // When checking Status, increment to simulate finish running script
    this._status = 0;
    Object.defineProperty(this, 'Status', {
        get: function() {
            if (this._started || this._ended) {
                if (this._status < 2) {
                    return this._status++;
                }
            }
            return this._status;
        }
    });

    // Custom properties
    this._CommandLine = CommandLine;
    this._MachineName = MachineName;

    this._started = false;
    this._ended = false;

	this._name = 'WshRemote';
};

WshRemote.prototype.toString = function() {
    return this._name;
};

// Events
// https://msdn.microsoft.com/en-us/library/8twtdcke(v=vs.84).aspx
WshRemote.prototype._eventEnd = function() {
    // This method is meant to be overwritten
    // Return nothing
};

// https://msdn.microsoft.com/en-us/library/d070t67d(v=vs.84).aspx
WshRemote.prototype._eventError = function() {
    this.Error = new WshRemoteError();
};

// https://msdn.microsoft.com/en-us/library/zwzwaa4c(v=vs.84).aspx
WshRemote.prototype._eventStart = function() {
    // This method is meant to be overwritten
    // Return nothing
};

// Default methods
// https://msdn.microsoft.com/en-us/library/d33x48a9(v=vs.84).aspx
WshRemote.prototype.Execute = function() {
    this._status = 1;
    this._started = true;
    this._eventStart();
};

// https://msdn.microsoft.com/en-us/library/yk84ffsf(v=vs.84).aspx
WshRemote.prototype.Terminate = function() {
    this._status = 2;
    this._ended = true;
    this._eventEnd();
};

module.exports = WshRemote;

},{"./WshRemoteError":9}],9:[function(require,module,exports){
'use strict';

/**
 * WshRemoteError.js
 * This Object spoofs the WshRemoteError Object
 * Properties and methods taken from Microsoft documentation
 * https://msdn.microsoft.com/en-us/library/d02b3e15(v=vs.84).aspx
 */
var WshRemoteError = function() {
    // Default properties
    this.Description    = '';
    this.Line           = 0;
    this.Character      = 0;
    this.Number         = 0;
    this.SourceText     = '';
    this.Source         = '';

	this._name = 'WshRemoteError';
};

WshRemoteError.prototype.toString = function() {
    return this._name;
};

module.exports = WshRemoteError;

},{}],10:[function(require,module,exports){
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

// https://msdn.microsoft.com/en-us/library/yk84ffsf(v=vs.84).aspx
WshScriptExec.prototype.Terminate = function() {
    // return nothing
}

module.exports = WshScriptExec;

},{"./TextStream":1}],11:[function(require,module,exports){
'use strict';

var WshEnvironment       = require('./WshEnvironment');
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

    // Custom properties
    this._name            = 'WshShell';
};

// Using method instead of property
WshShell.prototype.Environment = function(strName) {
    return new WshEnvironment(strName);
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

},{"./WshEnvironment":5,"./WshScriptExec":10,"./WshShortcut":12,"./WshSpecialFolders":13,"./config/EnvironmentVariables":15}],12:[function(require,module,exports){
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

// https://msdn.microsoft.com/en-us/library/k5x59zft(v=vs.84).aspx
WshShortcut.prototype.Save = function() {
    return null;
};

module.exports = WshShortcut;

},{}],13:[function(require,module,exports){
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

// https://msdn.microsoft.com/en-us/library/6x47fysb(v=vs.84).aspx
WshSpecialFolders.Count = function() {
    return Object.keys(SpecialFolders).length;
};

module.exports = WshSpecialFolders;

},{"./config/SpecialFolders":17}],14:[function(require,module,exports){
'use strict';

/**
 * WshUnnamed.js
 * This Object spoofs the WshUnnamed Object
 * Properties and methods taken from Microsoft documentation
 * https://msdn.microsoft.com/en-us/library/ah2hawwc(v=vs.84).aspx
 */

var WshUnnamed = function(args) {
    // Custom properties
    this._args = {};

    for (var i = 0, j = 0; i < args.length; i++) {
        var item = args[i];
        if (typeof item === 'number' || typeof item === 'string' && !item.match(/:/)) {
            this._args[++j] = item;
        }
    }

    // Default properties
    this.Length = Object.getOwnPropertyNames(this._args).length;
};

// https://msdn.microsoft.com/en-us/library/c2x76sxz(v=vs.84).aspx
// Documentation calls Item a property, but it behaves like a method
WshUnnamed.prototype.Item = function(natIndex) {
    return this._args[natIndex];
};

// https://msdn.microsoft.com/en-us/library/6x47fysb(v=vs.84).aspx
WshUnnamed.prototype.Count = function() {
    return this.Length;
};

module.exports = WshUnnamed;

},{}],15:[function(require,module,exports){
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
},{}],16:[function(require,module,exports){
'use strict';

/**
 * This is the MIT License, used for random response strings
 */

module.exports = ['The MIT License (MIT)', '', 'Copyright (c) 2016 Author', '', 'Permission is hereby granted, free of charge, to any person obtaining a copy', 'of this software and associated documentation files (the "Software"), to deal', 'in the Software without restriction, including without limitation the rights', 'to use, copy, modify, merge, publish, distribute, sublicense, and/or sell', 'copies of the Software, and to permit persons to whom the Software is', 'furnished to do so, subject to the following conditions:', '', 'The above copyright notice and this permission notice shall be included in', 'all copies or substantial portions of the Software.', '', 'THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR', 'IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,', 'FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE', 'AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER', 'LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,', 'OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN', 'THE SOFTWARE.'].join('\n');

},{}],17:[function(require,module,exports){
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
},{}],18:[function(require,module,exports){
module.exports={
    "SYSTEM": {
        "NUMBER_OF_PROCESSORS": 4,
        "PROCESSOR_ARCHITECTURE": "AMD64",
        "PROCESSOR_IDENTIFIER": "Intel64 Family 6 Model 78 Stepping 3, GenuineIntel",
        "PROCESSOR_LEVEL": 6,
        "PROCESSOR_REVISION": "4e03",
        "OS": "Windows_NT",
        "COMSPEC": "%SystemRoot%\\system32\\cmd.exe",
        "PATH": "%SystemRoot%\\system32",
        "PATHEXT": ".COM;.EXE;.BAT;.CMD;.VBS;.VBE;.JS;.JSE;.WSF;.WSH;.MSC",
        "WINDIR": "C:\\Windows"
    },
    "PROCESS": {
        "NUMBER_OF_PROCESSORS": 4,
        "PROCESSOR_ARCHITECTURE": "AMD64",
        "PROCESSOR_IDENTIFIER": "Intel64 Family 6 Model 78 Stepping 3, GenuineIntel",
        "PROCESSOR_LEVEL": 6,
        "PROCESSOR_REVISION": "4e03",
        "OS": "Windows_NT",
        "COMSPEC": "%SystemRoot%\\system32\\cmd.exe",
        "HOMEDRIVE": "C:",
        "HOMEPATH": "\\Users\\User",
        "PATH": "%SystemRoot%\\system32",
        "PATHEXT": ".COM;.EXE;.BAT;.CMD;.VBS;.VBE;.JS;.JSE;.WSF;.WSH;.MSC",
        "PROMPT": "",
        "SYSTEMDRIVE": "C:",
        "SYSTEMROOT": "C:\\Windows",
        "WINDIR": "C:\\Windows",
        "TEMP": "C:\\Users\\User\\AppData\\Local\\Temp",
        "TMP": "C:\\Users\\User\\AppData\\Local\\Temp"
    },
    "USER": {
        "PATH": "%SystemRoot%\\system32",
        "TEMP": "C:\\Users\\User\\AppData\\Local\\Temp",
        "TMP": "C:\\Users\\User\\AppData\\Local\\Temp"
    },
    "VOLATILE": {}
}
},{}],19:[function(require,module,exports){
'use strict';

var WScript = require('./WScript');

window.WScript = new WScript();

},{"./WScript":2}]},{},[19]);
