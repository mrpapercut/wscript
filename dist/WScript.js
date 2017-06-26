(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
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

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../vendor/ProxyGenerator":37,"./WshArguments":2,"./WshController":3,"./WshNetwork":6,"./WshRemote":7,"./WshShell":10,"./objects/ADODB.Stream":21,"./objects/ApplicationObject":22,"./objects/MSXML2.XMLHTTP":23,"./objects/Microsoft.XMLDOM":24,"./objects/Scripting.Dictionary":25,"./objects/Scripting.FileSystemObject":26}],2:[function(require,module,exports){
'use strict';

const WshNamed = require('./WshNamed');
const WshUnnamed = require('./WshUnnamed');

/**
 * WshArguments.js
 * This Object spoofs the WshArguments Object
 * Properties and methods taken from Microsoft documentation
 * https://msdn.microsoft.com/en-us/library/ss1ysb2a(v=vs.84).aspx
 */

class WshArguments {
    constructor() {
        // Default properties
        this.Length = arguments.length;
        this.Named = new WshNamed(arguments);
        this.Unnamed = new WshUnnamed(arguments);

        // Custom properties
        this._args = arguments;

        this._name = 'WshArguments';
    }

    toString() {
        return this._name;
    }

    // https://msdn.microsoft.com/en-us/library/yzefkb42(v=vs.84).aspx
    // Documentation calls Item a property, but it behaves like a method
    Item(natIndex) {
        return typeof natIndex === 'string' ? this.Named.Item(natIndex) : this.Unnamed.Item(natIndex);
    }

    // https://msdn.microsoft.com/en-us/library/6x47fysb(v=vs.84).aspx
    Count() {
        return this.Length;
    }

    // https://msdn.microsoft.com/en-us/library/dc1y0x0h(v=vs.84).aspx
    ShowUsage() {
        return '';
    }
}

const ProxyGenerator = require('../vendor/ProxyGenerator');
module.exports = new ProxyGenerator(WshArguments);

},{"../vendor/ProxyGenerator":37,"./WshNamed":5,"./WshUnnamed":13}],3:[function(require,module,exports){
'use strict';

const WshRemote = require('./WshRemote');

/**
 * WshController.js
 * This Object spoofs the WshController Object
 * Properties and methods taken from Microsoft documentation
 * https://msdn.microsoft.com/en-us/library/xk7bxb0d(v=vs.84).aspx
 */
class WshController {
    constructor() {
        // Custom properties
        this._name = 'WshController';
    }

    toString() {
        return this._name;
    }

    // Default methods
    // https://msdn.microsoft.com/en-us/library/5zdwefhx(v=vs.84).aspx
    CreateScript(CommandLine, MachineName) {
        // Return instance of WshRemote
        return new WshRemote(CommandLine, MachineName);
    }
}

const ProxyGenerator = require('../vendor/ProxyGenerator');
module.exports = new ProxyGenerator(WshController);

},{"../vendor/ProxyGenerator":37,"./WshRemote":7}],4:[function(require,module,exports){
'use strict';

const WshEnvironmentVariables = require('./config/WshEnvironment');

/**
 * WshEnvironment.js
 * This Object spoofs the WshEnvironment Object
 * Properties and methods taken from Microsoft documentation
 * https://msdn.microsoft.com/en-us/library/6s7w15a0(v=vs.84).aspx
 */

let _envVars = null;

class WshEnvironment {
    constructor(strType) {
        _envVars = WshEnvironmentVariables[strType] || WshEnvironmentVariables['VOLATILE'];

        // Return a function
        const returnFunction = natIndex => _envVars[natIndex];

        // https://msdn.microsoft.com/en-us/library/6kz722cz(v=vs.84).aspx
        returnFunction.Length = Object.getOwnPropertyNames(_envVars).length;

        // https://msdn.microsoft.com/en-us/library/c2x76sxz(v=vs.84).aspx
        // Documentation calls Item a property, but it behaves like a method
        returnFunction.Item = natIndex => _envVars[natIndex];

        // https://msdn.microsoft.com/en-us/library/6x47fysb(v=vs.84).aspx
        returnFunction.Count = () => Object.getOwnPropertyNames(_envVars).length;

        // https://msdn.microsoft.com/en-us/library/218yba97(v=vs.84).aspx
        returnFunction.Remove = strName => {
            delete _envVars[strName];
        };

        return returnFunction;
    }
}

const ProxyGenerator = require('../vendor/ProxyGenerator');
module.exports = new ProxyGenerator(WshEnvironment);

},{"../vendor/ProxyGenerator":37,"./config/WshEnvironment":19}],5:[function(require,module,exports){
'use strict';

/**
 * WshNamed.js
 * This Object spoofs the WshNamed Object
 * Properties and methods taken from Microsoft documentation
 * https://msdn.microsoft.com/en-us/library/d6y04sbb(v=vs.84).aspx
 */

class WshNamed {
    constructor(args) {
        // Custom properties
        this._args = {};

        for (let i = 0; i < args.length; i++) {
            if (typeof args[i] === 'string' && args[i].match(/:/)) {
                let pair = args[i].split(/:/);
                this._args[pair[0]] = pair[1];
            }
        }

        // Default properties
        this.Length = Object.getOwnPropertyNames(this._args).length;

        // Custom properties
        this._name = 'WshNamed';
    }

    toString() {
        return this._name;
    }

    // https://msdn.microsoft.com/en-us/library/c2x76sxz(v=vs.84).aspx
    // Documentation calls Item a property, but it behaves like a method
    Item(natIndex) {
        return this._args[natIndex];
    }

    // https://msdn.microsoft.com/en-us/library/6x47fysb(v=vs.84).aspx
    Count() {
        return this.Length;
    }

    // https://msdn.microsoft.com/en-us/library/0axxztye(v=vs.84).aspx
    Exists(key) {
        return !!this._args[key];
    }
}

const ProxyGenerator = require('../vendor/ProxyGenerator');
module.exports = new ProxyGenerator(WshNamed);

},{"../vendor/ProxyGenerator":37}],6:[function(require,module,exports){
'use strict';

const WshUnnamed = require('./WshUnnamed');

/**
 * WshNetwork.js
 * This Object spoofs the WshNetwork Object
 * Properties and methods taken from Microsoft documentation
 * https://msdn.microsoft.com/en-us/library/s6wt333f(v=vs.84).aspx
 */

class WshNetwork {
    constructor() {
        // Default properties
        this.ComputerName = 'USERPC';
        this.UserDomain   = 'USERDOMAIN';
        this.UserName     = 'USER';

        // Custom properties
        this._name        = 'WshNetwork';
    };

    toString() {
        return this._name;
    };

    // https://msdn.microsoft.com/en-us/library/kxsdca3c(v=vs.84).aspx
    AddPrinterConnection(strLocalName, strRemoteName, bUpdateProfile, strUser, strPassword) {
        throw new Error('The network resource type is not correct.');
    }

    // https://msdn.microsoft.com/en-us/library/zsdh7hkb(v=vs.84).aspx
    AddWindowsPrinterConnection(strPrinterPath, strDriverName, strPort) {
        throw new Error('The remote server machine does not exist or is unavailable.');
    }

    // https://msdn.microsoft.com/en-us/library/t9zt39at(v=vs.84).aspx
    EnumNetworkDrives() {
        return new WshUnnamed([]);
    }

    // https://msdn.microsoft.com/en-us/library/zhds6k80(v=vs.84).aspx
    EnumPrinterConnections() {
        return new WshUnnamed([]);
    }

    // https://msdn.microsoft.com/en-us/library/8kst88h6(v=vs.84).aspx
    MapNetworkDrive(strLocalName, strRemoteName, bUpdateProfile, strUser, strPassword) {
        throw new Error('The network path was not found.');
    }

    // https://msdn.microsoft.com/en-us/library/d16d7wbf(v=vs.84).aspx
    RemoveNetworkDrive(strName, bForce, bUpdateProfile) {
        throw new Error('This network connection does not exist.');
    }

    // https://msdn.microsoft.com/en-us/library/tsbh2yy7(v=vs.84).aspx
    RemovePrinterConnection(strName, bForce, bUpdateProfile) {
        throw new Error('This network connection does not exist.');
    }

    // https://msdn.microsoft.com/en-us/library/2ccwwdct(v=vs.84).aspx
    SetDefaultPrinter(strPrinterName) {
        throw new Error('There is no printer called "' + strPrinterName + '"');
    }
}

const ProxyGenerator = require('../vendor/ProxyGenerator');
module.exports = new ProxyGenerator(WshNetwork);

},{"../vendor/ProxyGenerator":37,"./WshUnnamed":13}],7:[function(require,module,exports){
'use strict';

const WshRemoteError = require('./WshRemoteError');

/**
 * WshRemote.js
 * This Object spoofs the WshRemote Object
 * Properties and methods taken from Microsoft documentation
 * https://msdn.microsoft.com/en-us/library/x9t3ze5y(v=vs.84).aspx
 */
class WshRemote {
    constructor(CommandLine, MachineName) {
        // Default properties
        this.Error = null;

        // Need to define Status or it is not recognized as Class' own properties
        this.Status = 0;

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
    }

    toString() {
        return this._name;
    }

    // Events
    // https://msdn.microsoft.com/en-us/library/8twtdcke(v=vs.84).aspx
    _eventEnd() {
        // This method is meant to be overwritten
        // Return nothing
    }

    // https://msdn.microsoft.com/en-us/library/d070t67d(v=vs.84).aspx
    _eventError() {
        this.Error = new WshRemoteError();
    }

    // https://msdn.microsoft.com/en-us/library/zwzwaa4c(v=vs.84).aspx
    _eventStart() {
        // This method is meant to be overwritten
        // Return nothing
    }

    // Default methods
    // https://msdn.microsoft.com/en-us/library/d33x48a9(v=vs.84).aspx
    Execute() {
        this._status = 0;
        this._started = true;
        this._eventStart();
    }

    // https://msdn.microsoft.com/en-us/library/yk84ffsf(v=vs.84).aspx
    Terminate() {
        this._status = 2;
        this._ended = true;
        this._eventEnd();
    }
}

const ProxyGenerator = require('../vendor/ProxyGenerator');
module.exports = new ProxyGenerator(WshRemote);

},{"../vendor/ProxyGenerator":37,"./WshRemoteError":8}],8:[function(require,module,exports){
'use strict';

/**
 * WshRemoteError.js
 * This Object spoofs the WshRemoteError Object
 * Properties and methods taken from Microsoft documentation
 * https://msdn.microsoft.com/en-us/library/d02b3e15(v=vs.84).aspx
 */
class WshRemoteError {
    constructor() {
        // Default properties
        this.Description    = '';
        this.Line           = 0;
        this.Character      = 0;
        this.Number         = 0;
        this.SourceText     = '';
        this.Source         = '';

        this._name          = 'WshRemoteError';
    }

    toString() {
        return this._name;
    }
}

const ProxyGenerator = require('../vendor/ProxyGenerator');
module.exports = new ProxyGenerator(WshRemoteError);

},{"../vendor/ProxyGenerator":37}],9:[function(require,module,exports){
'use strict';

const TextStream = require('./common/TextStream');

/**
 * WshScriptExec.js
 * This Object spoofs the WshScriptExec Object
 * Properties and methods taken from Microsoft documentation
 * https://msdn.microsoft.com/en-us/library/2f38xsxe(v=vs.84).aspx
 */
class WshScriptExec {
    constructor(strCommand) {
        // Default properties
        this.ExitCode    = null;
        this.ProcessID   = 0;
        this.Status      = 1
        this.StdErr      = new TextStream('StdErr');
        this.StdIn       = new TextStream('StdIn');
        this.StdOut      = new TextStream('StdOut');

        // Custom properties
        this._strCommand = strCommand;
        this._name       = 'WshScriptExec';
    }

    toString() {
        return this._name;
    }

    // https://msdn.microsoft.com/en-us/library/yk84ffsf(v=vs.84).aspx
    Terminate() {
        // return nothing
    }
}

const ProxyGenerator = require('../vendor/ProxyGenerator');
module.exports = new ProxyGenerator(WshScriptExec);

},{"../vendor/ProxyGenerator":37,"./common/TextStream":14}],10:[function(require,module,exports){
'use strict';

const WshEnvironment       = require('./WshEnvironment');
const WshScriptExec        = require('./WshScriptExec');
const WshSpecialFolders    = require('./WshSpecialFolders');
const WshShortcut          = require('./WshShortcut');

const EnvironmentVariables = require('./config/EnvironmentVariables');

/**
 * WshShell.js
 * This Object spoofs the WshShell Object
 * Properties and methods taken from Microsoft documentation
 * https://msdn.microsoft.com/en-us/library/aew9yb99(v=vs.84).aspx
 */

class WshShell {
    constructor() {
        // Default properties
        this.CurrentDirectory = 'C:\\Temp';

        // Custom properties
        this._name            = 'WshShell';

        // https://msdn.microsoft.com/en-us/library/0ea7b5xe(v=vs.84).aspx
        this.SpecialFolders = WshSpecialFolders;
    }

    // Using method instead of property
    Environment(strName) {
        return new WshEnvironment(strName);
    }

    toString() {
        return this._name;
    }

    // Property setters
    _setCurrentDirectory(currentDirectory) {
        this.CurrentDirectory = currentDirectory;
    }

    // Default methods
    // https://msdn.microsoft.com/en-us/library/wzcddbek(v=vs.84).aspx
    AppActivate(appName) {
        return true;
    }

    // https://msdn.microsoft.com/en-us/library/xsy6k3ys(v=vs.84).aspx
    CreateShortcut(strPathName) {
        return new WshShortcut(strPathName);
    }

    // https://msdn.microsoft.com/en-us/library/ateytk4a(v=vs.84).aspx
    Exec(strCommand) {
        return new WshScriptExec(strCommand);
    }

    // https://msdn.microsoft.com/en-us/library/dy8116cf(v=vs.84).aspx
    ExpandEnvironmentStrings(strString) {
        return typeof strString === 'string' ? strString.replace(/\//g, '\\').replace(/(%[a-zA-Z]+%)/g, function(m) {
            return (EnvironmentVariables[m.toUpperCase()] || m);
        }) : '';
    }

    // https://msdn.microsoft.com/en-us/library/b4ce6by3(v=vs.84).aspx
    LogEvent(intType, strMessage) {
        // Deprecated
        return -1;
    }

    // https://msdn.microsoft.com/en-us/library/x83z1d9f(v=vs.84).aspx
    Popup(strText, nSecondsToWait, strTitle, nType) {
        // Return -1 as if timed out
        return -1;
    }

    // https://msdn.microsoft.com/en-us/library/293bt9hh(v=vs.84).aspx
    RegDelete(key) {
        throw new Error('Invalid root in registry key');
    }

    // https://msdn.microsoft.com/en-us/library/x05fawxd(v=vs.84).aspx
    RegRead(key) {
        throw new Error('Invalid root in registry key');
    }

    // https://msdn.microsoft.com/en-us/library/yfdfhz1b(v=vs.84).aspx
    RegWrite(key) {
        return undefined;
    }

    // https://msdn.microsoft.com/en-us/library/d5fk67ky(v=vs.84).aspx
    Run(strCommand, intWindowStyle, bWaitOnReturn) {

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
    }

    // https://msdn.microsoft.com/en-us/library/8c6yea83(v=vs.84).aspx
    SendKeys(string) {
        return undefined;
    }
}

const ProxyGenerator = require('../vendor/ProxyGenerator');
module.exports = new ProxyGenerator(WshShell);

},{"../vendor/ProxyGenerator":37,"./WshEnvironment":4,"./WshScriptExec":9,"./WshShortcut":11,"./WshSpecialFolders":12,"./config/EnvironmentVariables":15}],11:[function(require,module,exports){
(function (global){
'use strict';

/**
 * WshShortcut.js
 * This Object spoofs the WshShortcut Object
 * Properties and methods taken from Microsoft documentation
 * https://msdn.microsoft.com/en-us/library/xk6kst2k(v=vs.84).aspx
 */

class WshShortcut {
    constructor(FullName) {
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

        this._name            = 'WshShortcut';
    }

    toString() {
        return this._name;
    }

    // https://msdn.microsoft.com/en-us/library/k5x59zft(v=vs.84).aspx
    Save() {
        global.VFS._vfs.push(global.VFS._createFileObject(global.VFS._formatPath(this.FullName)));

        return null;
    }
}

const ProxyGenerator = require('../vendor/ProxyGenerator');
module.exports = new ProxyGenerator(WshShortcut);

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../vendor/ProxyGenerator":37}],12:[function(require,module,exports){
'use strict';

const SpecialFolders = require('./config/SpecialFolders');

/**
 * WshSpecialFolders.js
 * This Object spoofs the WshSpecialFolders Object
 * Properties and methods taken from Microsoft documentation
 * https://msdn.microsoft.com/en-us/library/9x9e7edx(v=vs.84).aspx
 */
const WshSpecialFolders = folder =>
    folder && SpecialFolders[folder] !== undefined ? SpecialFolders[folder] : '';

// https://msdn.microsoft.com/en-us/library/6x47fysb(v=vs.84).aspx
WshSpecialFolders.Count = () => Object.keys(SpecialFolders).length;

module.exports = WshSpecialFolders;

},{"./config/SpecialFolders":18}],13:[function(require,module,exports){
'use strict';

/**
 * WshUnnamed.js
 * This Object spoofs the WshUnnamed Object
 * Properties and methods taken from Microsoft documentation
 * https://msdn.microsoft.com/en-us/library/ah2hawwc(v=vs.84).aspx
 */

class WshUnnamed {
    constructor(args) {
        // Custom properties
        this._args = {};

        for (let i = 0, j = 0; i < args.length; i++) {
            let item = args[i];
            if (typeof item === 'number' || typeof item === 'string' && !item.match(/:/)) {
                this._args[++j] = item;
            }
        }

        // Default properties
        this.Length = Object.getOwnPropertyNames(this._args).length;

        // Custom properties
        this._name = 'WshUnnamed';
    }

    toString() {
        return this._name;
    }

    // https://msdn.microsoft.com/en-us/library/c2x76sxz(v=vs.84).aspx
    // Documentation calls Item a property, but it behaves like a method
    Item(natIndex) {
        return this._args[natIndex];
    }

    // https://msdn.microsoft.com/en-us/library/6x47fysb(v=vs.84).aspx
    Count() {
        return this.Length;
    }
}

const ProxyGenerator = require('../vendor/ProxyGenerator');
module.exports = new ProxyGenerator(WshUnnamed);

},{"../vendor/ProxyGenerator":37}],14:[function(require,module,exports){
'use strict';

const ResponseText = require('../config/ResponseText');

/**
 * TextStream.js
 * This Object spoofs the TextStream Object
 * Properties and methods taken from Microsoft documentation
 * https://msdn.microsoft.com/en-us/library/312a5kbt(v=vs.84).aspx
 */
class TextStream {
    constructor(filename, contents, unicode, iomode, fullpath) {
        // Default properties
        this.AtEndOfLine    = false;
        this.AtEndOfStream  = false;
        this.Column         = 1;
        this.Line           = 1;

        // Custom properties
        // Filename can either be a string or a stream (StdIn/StdOut/StdErr)
        this._filename      = filename;
        this._fullpath      = fullpath;

        // Save contents for writing/reading
        this._contents      = contents || '';

        // When not unicode, should throw error when writing unicode
        this._unicode       = unicode === false ? false : true;

        // iomode: ForReading/ForWriting/ForAppending
        if (iomode && [1, 2, 8].indexOf(iomode) === -1) {
            throw new TypeError('Invalid procedure call or argument');
        } else {
            this._iomode = iomode || 1;
            switch (this._iomode) {
                case 1:
                    this._setAtEnds();
                    break;
                case 2:
                    this._contents = '';
                    break;
                case 8:
                    this._setColumnLine();
                    break;
            }
        }
    }

    _parseInt(num) {
        if (typeof num !== 'number' || isNaN(parseInt(num, 10))) throw new TypeError();
        return parseInt(num, 10);
    }

    _setAtEnds() {
        const linesArr = this._contents.split('\n');
        this.AtEndOfLine = linesArr[this.Line - 1].length === this.Column - 1;
        this.AtEndOfStream = linesArr.length === this.Line && this.AtEndOfLine;
    }

    _setColumnLine(column, line) {
        this.Line = line || this._contents.split('\n').length;
        this.Column = column || this._contents.split('\n').pop().length + 1;
    }

    _updateProps(column, line) {
        this._setColumnLine(column, line);
        this._setAtEnds();
    }

    _movePointer(spaces) {
        let i = 0;
        spaces = this._parseInt(spaces);

        while (i < spaces && !this.AtEndOfStream) {
            if (this.AtEndOfLine) {
                this._updateProps(1, this.Line + 1);
            } else {
                this._updateProps(this.Column + 1, this.Line);
            }
            i++;
        }
    }

    // https://msdn.microsoft.com/en-us/library/yb3tbdkw(v=vs.84).aspx
    Close() {
        return null;
    }

    // https://msdn.microsoft.com/en-us/library/dhyx75w2(v=vs.84).aspx
    Read(characters) {
        let linesArr = this._contents.split('\n'),
            startAt = linesArr.splice(this.Line - 1).join('\n').substr(this.Column - 1);

        characters = this._parseInt(characters);

        this._movePointer(characters);

        return startAt.substr(0, characters);
    }

    // https://msdn.microsoft.com/en-us/library/t58aa4dd(v=vs.84).aspx
    ReadAll() {
        return this.Read(this._contents.length);
    }

    // https://msdn.microsoft.com/en-us/library/h7se9d4f(v=vs.84).aspx
    ReadLine() {
        let curLine = this._contents.split('\n')[this.Line - 1],
            line = curLine.substr(this.Column - 1);

        this._updateProps(1, this.Line + 1);

        return line;
    }

    // https://msdn.microsoft.com/en-us/library/08xz3c5a(v=vs.84).aspx
    Skip(characters) {
        this._movePointer(characters);
    }

    // https://msdn.microsoft.com/en-us/library/zbhhkawe(v=vs.84).aspx
    SkipLine(characters) {
        characters = this._parseInt(characters);

        let lines = this._contents.split('\n');

        return lines.slice(characters, lines.length).join('\n');
    }

    // https://msdn.microsoft.com/en-us/library/6ee7s9w2(v=vs.84).aspx
    Write(string) {
        if (!this._unicode && /[^\u0000-\u00ff]/.test(string)) {
            throw new TypeError('Invalid procedure call or argument');
        }

        this._contents += string;
        this._updateProps();
    }

    // https://msdn.microsoft.com/en-us/library/eysctzwa(v=vs.84).aspx
    WriteBlankLines(lines) {
        lines = this._parseInt(lines);

        for (let i = 0; i < lines; i++) {
            this._contents += '\n';
        }
        this._updateProps();
    }

    // https://msdn.microsoft.com/en-us/library/t5399c99(v=vs.84).aspx
    WriteLine(string) {
        if (!this._unicode && /[^\u0000-\u00ff]/.test(string)) {
            throw new TypeError('Invalid procedure call or argument');
        }

        this._contents += string ? string + '\n' : '\n';
        this._updateProps();
    }
}

module.exports = class TextStreamProxy {
    constructor() {
        return new Proxy(new TextStream(...arguments), {
            get(target, propKey, receiver) {
                const methods = Object.getOwnPropertyNames(target.constructor.prototype);
                const props = Object.keys(target);
                const regex = new RegExp(`^${propKey}$`, 'i');

                let matched = null;

                for (let i in methods) {
                    if (regex.test(methods[i])) {
                        matched = methods[i];
                    }
                }

                for (let i in props) {
                    if (regex.test(props[i])) {
                        matched = props[i];
                    }
                }

                return target[matched];
            }
        });
    }
}

},{"../config/ResponseText":17}],15:[function(require,module,exports){
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
 * Fake HTTP Response headers
 */

module.exports = {
    'Date': 'Mon, 27 Jul 2009 12:28:53 GMT',
    'Server': 'Apache/2.2.14 (Win32)',
    'Last-Modified': 'Wed, 22 Jul 2009 19:15:56 GMT',
    'Content-Length': 88,
    'Content-Type': 'text/html',
    'Connection': 'Closed'
};

},{}],17:[function(require,module,exports){
'use strict';

/**
 * This is the MIT License, used for random response strings
 */

module.exports = ['The MIT License (MIT)', '', 'Copyright (c) 2016 Author', '', 'Permission is hereby granted, free of charge, to any person obtaining a copy', 'of this software and associated documentation files (the "Software"), to deal', 'in the Software without restriction, including without limitation the rights', 'to use, copy, modify, merge, publish, distribute, sublicense, and/or sell', 'copies of the Software, and to permit persons to whom the Software is', 'furnished to do so, subject to the following conditions:', '', 'The above copyright notice and this permission notice shall be included in', 'all copies or substantial portions of the Software.', '', 'THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR', 'IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,', 'FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE', 'AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER', 'LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,', 'OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN', 'THE SOFTWARE.'].join('\n');

},{}],18:[function(require,module,exports){
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
},{}],19:[function(require,module,exports){
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
},{}],20:[function(require,module,exports){
'use strict';

const WScript = require('./WScript');

window.WScript = new WScript();
window.VFS = window.WScript.CreateObject('Scripting.FileSystemObject')._vfs;

window.ActiveXObject = function(strProgId) {
    return window.WScript.CreateObject(strProgId);
};

},{"./WScript":1}],21:[function(require,module,exports){
(function (global){
'use strict';

var ArrayBufferString = require('../util/ArrayBufferString');

/**
 * ADODB.Stream.js
 * This Object spoofs the ADODB.Stream Object
 * Properties and methods taken from Microsoft documentation
 * https://msdn.microsoft.com/en-us/library/ms677486(v=vs.85).aspx
 */

/**
 * ADODB.Stream uses a buffer with 2-bytes per character. We emulate this
 * with an JS ArrayBuffer
 */

class ADODBStream {
    constructor() {
        // Default properties
        // https://msdn.microsoft.com/en-us/library/ms681424(v=vs.85).aspx
        this.charset       = 'unicode';

        // https://msdn.microsoft.com/en-us/library/ms676145(v=vs.85).aspx
        this.EOS           = false;

        // https://msdn.microsoft.com/en-us/library/ms675062(v=vs.85).aspx
        // -1 = adCRLF
        // 10 = adLF
        // 13 = adCR
        this.lineSeparator = -1;

        // https://msdn.microsoft.com/en-us/library/ms676693(v=vs.85).aspx
        // 0 = mode unknown
        // 1 = read-only
        // 2 = write-only
        // 3 = read/write
        this.mode          = 1;

        // https://msdn.microsoft.com/en-us/library/ms680965(v=vs.85).aspx
        this.position      = 0;

        // https://msdn.microsoft.com/en-us/library/ms677520(v=vs.85).aspx
        this.size          = Infinity;

        // https://msdn.microsoft.com/en-us/library/ms675068(v=vs.85).aspx
        // 0 = closed
        // 1 = open
        // 2 = connecting
        // 4 = object is executing
        // 8 = object is retrieving
        this.state         = 0;

        // https://msdn.microsoft.com/en-us/library/ms681553(v=vs.85).aspx
        // 1 = Indicates binary data
        // 2 = Indicates text data
        // Getters & setters
        this.type          = 2;
        this._type          = 2;

        // Custom properties
        this._data         = new ArrayBufferString();

        this._name         = 'ADODB.Stream';

        Object.defineProperty(this, 'type', {
            get: function() {
                return this._type;
            },
            set: function(type) {
                this._data._setType(type);
                this._type = type;
            }
        });
    }

    toString() {
        return this._name;
    }

    // Getters
    _getLineSeparator() {
        const ls = this.lineSeparator;

        if (ls === 13) {
            return '\r';
        } else if (ls === 10) {
            return '\n';
        } else {
            return '\r\n';
        }
    }

    // Helpers
    /*_stringToArrayBuffer(string) {
        let buffer = new ArrayBuffer(string.length * 2),
            bufferView = new Uint16Array(buffer);

        for (let i = 0; i < string.length; i++) {
            bufferView[i] = string.charCodeAt(i);
        }

        return buffer;
    }

    _arrayBufferToString(buffer) {
        let bufferView = new Uint16Array(buffer),
            chars = [];

        bufferView.forEach(function(c) {
            chars.push(String.fromCharCode(c));
        });

        return chars.join('');
    }

    _addByteToBuffer(buffer) {
        var newbuf = new Uint16Array(buffer.length + 1);
        newbuf[buffer.byteLength] = 0x00;

        return newbuf;
    }*/

    _setPosition() {
        this.position = this._data.getLength();
    }

    _throwArgumentsError() {
        throw new TypeError('Arguments are of the wrong type, are out of acceptable range, or are in conflict with one another');
    }

    _throwOperationContextError() {
        throw new TypeError('Operation is not allowed in this context.');
    }

    // Default methods
    // https://msdn.microsoft.com/en-us/library/ms681014(v=vs.85).aspx
    cancel() {
        this.state = 0;
    }

    // https://msdn.microsoft.com/en-us/library/ms675814(v=vs.85).aspx
    close() {
        this.state = 0;
        this.flush();
    }

    // https://msdn.microsoft.com/en-us/library/ms677586(v=vs.85).aspx
    copyTo(destStream, numChars) {
        if (!destStream || destStream instanceof ADODBStream === false || destStream.state === 0) {
            this._throwArgumentsError();
        }

        destStream.mode  = this.mode;
        destStream.type  = this._type;

        if (numChars !== null && numChars !== undefined) {
            if (isNaN(parseInt(numChars, 10))) {
                this._throwArgumentsError();
            } else if (numChars > -1) {
                var newstr = this._data.toString().replace(/^\ufeff/, '').slice(this.position, numChars);
                destStream._data.fromString(newstr);
                destStream._setPosition();
                return;
            }
        }

        destStream._data.fromString(this._data.toString());
        destStream._setPosition();
    }

    // https://msdn.microsoft.com/en-us/library/ms676997(v=vs.85).aspx
    flush() {
        this._data = new ArrayBufferString();
        this._setPosition();
    }

    // https://msdn.microsoft.com/en-us/library/ms677570(v=vs.85).aspx
    loadFromFile(fileName) {
        if (this.state === 0) {
            this._throwOperationContextError();
        }

        // TODO: Actually open file? Use VFS?
        // Throw file not found error as we're not actually loading files
        throw new Error('File could not be opened');
    }

    // https://msdn.microsoft.com/en-us/library/ms680846(v=vs.85).aspx
    open(source, mode, openOptions, userName, password) {
        if (mode !== null && mode !== undefined) {
            if (isNaN(parseInt(mode, 10)) || mode < 0 || mode > 3) {
                this._throwArgumentsError();
            } else {
                this.mode = mode;
            }
        }
        this.state = 1;
    }

    // https://msdn.microsoft.com/en-us/library/ms676702(v=vs.85).aspx
    read(numBytes) {
        if (this._type !== 1) {
            this._throwOperationContextError();
        }

        // TODO: figure out how to emulate this
    }

    // https://msdn.microsoft.com/en-us/library/ms678077(v=vs.85).aspx
    readText(numChars) {
        // numChars enum
        // -1 readAll
        // -2 readLine

        if (this._type !== 2) {
            this._throwOperationContextError();
        }

        let res = this._data.toString();
        res = res.replace(/^\ufeff/, '');

        if (numChars !== null && numChars !== undefined) {
            if (isNaN(parseInt(numChars, 10)) || numChars < -2) {
                this._throwArgumentsError();
            } else if (numChars > -1) {
                res = res.slice(this.position, numChars);
                this.position += numChars;
            } else if (numChars < -1) {
                // Return rest of line from position
                const ls = this._getLineSeparator();
                let oldPosition = this.position;
                this.position = 2 + (res.indexOf(ls, this.position / 2) + ls.length) * 2;
                res = res.slice(oldPosition / 2, (this.position / 2) - ls.length - 1);
            } else {
                // Return all from position
                res = res.slice(this.position);
                this._setPosition();
            }
        } else {
            res = res.slice(this.position);
        }

        return res;
    }

    // https://msdn.microsoft.com/en-us/library/ms676745(v=vs.85).aspx
    saveToFile(fileName, saveOptionsEnum) {
        // saveOptionsEnum:
        // 1 adSaveCreateNotExists - Does not overwrite if file exists
        // 2 adSaveCreateOverWrite - Overwrites if file exists
        if (saveOptionsEnum && (saveOptionsEnum !== 1 && saveOptionsEnum !== 2)) {
            this._throwArgumentsError();
        }
        // TODO

        this.position = 0;

        if (global.VFS) {
            global.VFS.createTextFile(global.VFS._formatPath(fileName));
            global.VFS._updateFileContent(fileName, this._data.toString());
        }
    }

    // https://msdn.microsoft.com/en-us/library/ms676560(v=vs.85).aspx
    setEOS() {
        this.EOS = true;
        this._data.fromString(this._data.toString().slice(1, 1 + (this.position / 2)));
    }

    // https://msdn.microsoft.com/en-us/library/ms675056(v=vs.85).aspx
    skipLine() {
        let ls = this._getLineSeparator(),
            data = this._data.toString();

        this.position = (data.indexOf(ls, this.position / 2) + ls.length) * 2 - 1;
    }

    // https://msdn.microsoft.com/en-us/library/ms677226(v=vs.85).aspx
    stat() {
        // not supported? See examples/ADODB.Stream/Stat.js
    }

    // https://msdn.microsoft.com/en-us/library/ms675017(v=vs.85).aspx
    write(bytes) {
        if (this._type !== 1) {
            this._throwOperationContextError();
        }

        this._data.addByte(0x00);
        this._setPosition();
    }

    // https://msdn.microsoft.com/en-us/library/ms676597(v=vs.85).aspx
    writeText(strData, bNewLine) {
        if (this._type !== 2) {
            this._throwOperationContextError();
        }

        if (bNewLine && bNewLine !== 1) {
            this._throwArgumentsError();
        }

        let ls = bNewLine && bNewLine === 1 ? this._getLineSeparator() : '';

        (strData + ls).split('').forEach(c => {
            this._data.addChar(c);
        });

        this.position = 2 + (this.position + strData.length) * 2;
    }
}

const ProxyGenerator = require('../../vendor/ProxyGenerator');
module.exports = new ProxyGenerator(ADODBStream);

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../../vendor/ProxyGenerator":37,"../util/ArrayBufferString":33}],22:[function(require,module,exports){
/*
TODO ? Cannot find link to documentation :(
Update:
Found something. Investigating...
*/
},{}],23:[function(require,module,exports){
'use strict';

const ResponseHeaders = require('../config/ResponseHeaders');

/**
 * MSXML2.XMLHTTP.js
 * This Object spoofs the MSXML2.XMLHTTP Object
 * Properties and methods taken from Microsoft documentation
 * https://msdn.microsoft.com/en-us/library/ms760305(v=vs.85).aspx
 *
 * Note: Different versions of Windows use different forms of
 * this object, like MSXML2.XMLHTTP.3.0 or MSXML2.XMLHTTP.6.0.
 * This object ignores versioning.
 */

const throwInvalidAssignmentError = () => {
    throw new Error('Wrong number of arguments or invalid property assignment');
}

const throwInvalidCallError = () => {
    throw new Error('Object doesn\'t support this property or method');
}

const throwNotYetAvailableError = () => {
    throw new Error('The data necessary to complete this operation is not yet available.');
}

class MSXML2XMLHTTP {
    constructor(strProgId) {
        // Properties
        this._strProgId = strProgId ? strProgId.toUpperCase() : 'MSXML2.XMLHTTP';
        // this._version = parseInt(this._strProgId.match(/MSXML2.XMLHTTP\.?([0-9.]+)?/)[1] || 1, 10);

        // https://msdn.microsoft.com/en-us/library/ms762767(v=vs.85).aspx
        this.onreadystatechange = null;
        this._onreadystatechange = function(){};

        // https://msdn.microsoft.com/en-us/library/ms753800(v=vs.85).aspx
        // 0 UNINTIALIZED
        // 1 LOADING
        // 2 LOADED
        // 3 INTERACTIVE
        // 4 COMPLETED
        this.readyState = null;
        this._readyState = 0;

        // https://msdn.microsoft.com/en-us/library/ms756095(v=vs.85).aspx
        this.responseBody = null;
        this._responseBody = null;

        // https://msdn.microsoft.com/en-us/library/ms763792(v=vs.85).aspx
        this.responseStream = null;
        this._responseStream = null;

        // https://msdn.microsoft.com/en-us/library/ms762275(v=vs.85).aspx
        this.responseText = null;
        this._responseText = null;

        // https://msdn.microsoft.com/en-us/library/ms757066(v=vs.85).aspx
        this.responseXML = null;
        this._responseXML = null;

        // https://msdn.microsoft.com/en-us/library/ms767625(v=vs.85).aspx
        // Returns HTTP-status code
        this.status = null;
        this._status = 200;

        // https://msdn.microsoft.com/en-us/library/ms759127(v=vs.85).aspx
        this.statusText = null;
        this._statusText = 'OK';

        this._requestHeaders = [];

        // Getters & setters
        Object.defineProperties(this, {
            'onreadystatechange': {
                get: function() {
                    throw new Error('Object doesn\'t support this property or method');
                },
                set: function(fn) {
                    if (typeof fn !== 'function') {
                        throw new Error('Type mismatch');
                    } else {
                        this._onreadystatechange = fn;
                    }
                }
            },
            'readyState': {
                get: function() {
                    return this._readyState;
                },
                set: throwInvalidAssignmentError
            },
            'responseBody': {
                get: function() {
                    if (this._readyState !== 4) {
                        throwInvalidCallError();
                    } else {
                        return this._responseBody;
                    }
                },
                set: throwInvalidAssignmentError
            },
            'responseStream': {
                get: function() {
                    if (this._readyState !== 4) {
                        throwInvalidCallError();
                    } else {
                        return this._responseStream;
                    }
                },
                set: throwInvalidAssignmentError
            },
            'responseText': {
                get: function() {
                    if (this._readyState !== 4) {
                        throwInvalidCallError();
                    } else {
                        return this._responseText;
                    }
                },
                set: throwInvalidAssignmentError
            },
            'responseXML': {
                get: function() {
                    if (this._readyState !== 4) {
                        throwInvalidCallError();
                    } else {
                        return this._responseXML;
                    }
                },
                set: throwInvalidAssignmentError
            },
            'status': {
                get: function() {
                    if (this._readyState !== 4) {
                        throwNotYetAvailableError();
                    } else {
                        return this._status;
                    }
                },
                set: throwInvalidAssignmentError
            },
            'statusText': {
                get: function() {
                    if (this._readyState !== 4) {
                        throwNotYetAvailableError();
                    } else {
                        return this._statusText;
                    }
                },
                set: throwInvalidAssignmentError
            }
        });

        this._name = 'MSXML2.XMLHTTP';
    }

    toString() {
        return this._name;
    }

    // Custom methods
    _fireOnReadyStateChange(readyState) {
        this._readyState = readyState;
        return this._onreadystatechange();
    }

    // Default methods
    // https://msdn.microsoft.com/en-us/library/ms760349(v=vs.85).aspx
    abort() {
        this._readyState = 0;
    }

    // https://msdn.microsoft.com/en-us/library/ms766595(v=vs.85).aspx
    getAllResponseHeaders() {
        if (this._readyState !== 4) {
            throwNotYetAvailableError();
        } else {
            let resString = 'HTTP/1.1 200 OK';
            for (let i in ResponseHeaders) {
                resString += '\r\n' + [i, ResponseHeaders[i]].join(': ');
            }
            return resString;
        }
    }

    // https://msdn.microsoft.com/en-us/library/ms757006(v=vs.85).aspx
    getResponseHeader(bstrHeader) {
        if (this._readyState !== 4) {
            throwNotYetAvailableError();
        } else {
            return ResponseHeaders[bstrHeader] || '';
        }
    }

    // https://msdn.microsoft.com/en-us/library/ms757849(v=vs.85).aspx
    open(bstrMethod, bstrUrl, varAsync, bstrUser, bstrPassword) {
        if (!bstrMethod || !bstrUrl) {
            throwInvalidAssignmentError();
        }

        if (varAsync && !!varAsync) {
            this._readyState = 4;
        } else {
            this._fireOnReadyStateChange(1);
        }
    }

    // https://msdn.microsoft.com/en-us/library/ms763706(v=vs.85).aspx
    send(varBody) {
        if (this._readyState === 0) {
            throwInvalidCallError();
        } else if (this._readyState !== 4) {
            // Cycle through readyStates
            this._fireOnReadyStateChange(2);
            this._fireOnReadyStateChange(3);
            this._fireOnReadyStateChange(4);
        } else {
            // Called asynchronously, skip to readyState 4 immediately
            this._readyState = 4;
        }
    }

    // https://msdn.microsoft.com/en-us/library/ms766589(v=vs.85).aspx
    setRequestHeader(bstrHeader, bstrValue) {
        if (!bstrHeader || !bstrValue) {
            throwInvalidAssignmentError();
        }

        if (this._readyState === 0) {
            throwInvalidCallError();
        } else {
            this._requestHeaders.push([bstrHeader, bstrValue]);
        }
    }
}

const ProxyGenerator = require('../../vendor/ProxyGenerator');
module.exports = new ProxyGenerator(MSXML2XMLHTTP);

},{"../../vendor/ProxyGenerator":37,"../config/ResponseHeaders":16}],24:[function(require,module,exports){
'use strict';

/**
 * Microsoft.XMLDOM.js
 * This Object spoofs the Microsoft.XMLDOM Object
 * Properties and methods taken from Microsoft documentation
 * https://msdn.microsoft.com/en-us/library/ms677486(v=vs.85).aspx
 *
 * Note: this object is out of scope for WScript
 */

class MicrosoftXMLDOM {
    constructor() {
        // Default properties

        this._name = 'Microsoft.XMLDOM';
    }

    toString() {
        return this._name;
    }
};

const ProxyGenerator = require('../../vendor/ProxyGenerator');
module.exports = new ProxyGenerator(MicrosoftXMLDOM);

},{"../../vendor/ProxyGenerator":37}],25:[function(require,module,exports){
'use strict';

/**
 * Scripting.Dictionary.js
 * This Object spoofs the Scripting.Dictionary Object
 * Properties and methods taken from Microsoft documentation
 * https://msdn.microsoft.com/en-us/library/x4k5wbx4(v=vs.84).aspx
 */

class ScriptingDictionary {
    constructor() {
        // Default properties
        this.Count       = 0;
        this.Key         = null;
        this.CompareMode = null;

        this._contents   = {};
        this._name       = 'Scripting.Dictionary';
    }

    toString() {
        return this._name;
    }

    // Custom functions
    _updateCount() {
        this.Count = Object.keys(this._contents).length;
    }

    // https://msdn.microsoft.com/en-us/library/5h92h863(v=vs.84).aspx
    Add(key, value) {
        if (!key || !value) {
            throw new TypeError('Wrong number of arguments or invalid property assignment');
        }

        if (this._contents.hasOwnProperty(key)) {
            throw new TypeError('Unknown runtime error');
        }

        this._contents[key] = value;
        this._updateCount();
    }

    // https://msdn.microsoft.com/en-us/library/57hdf10z(v=vs.84).aspx
    Exists(key) {
        if (!key) {
            throw new TypeError('Wrong number of arguments or invalid property assignment');
        }

        return this._contents.hasOwnProperty(key) ? -1 : 0;
    }

    // Scripting.Dictionary Item behaves as a method, not an attribute
    Item(key) {
        if (!key) {
            throw new TypeError('Object doesn\'t support this property or method');
        }

        return this._contents[key] || '';
    }

    // https://msdn.microsoft.com/en-us/library/8aet97f2(v=vs.84).aspx
    Items() {
        const vals = [];
        for (let key in this._contents) {
            vals.push(this._contents[key]);
        }
        return vals;
    }

    // https://msdn.microsoft.com/en-us/library/etzd1tzc(v=vs.84).aspx
    Keys() {
        return Object.keys(this._contents);
    }

    // https://msdn.microsoft.com/en-us/library/ywyayk03(v=vs.84).aspx
    Remove(key) {
        if (!key) {
            throw new TypeError('Wrong number of arguments or invalid property assignment');
        }

        delete this._contents[key];
        this._updateCount();
    }

    // https://msdn.microsoft.com/en-us/library/45731e2w(v=vs.84).aspx
    RemoveAll() {
        this._contents = {};
        this._updateCount();
    }
}

const ProxyGenerator = require('../../vendor/ProxyGenerator');
module.exports = new ProxyGenerator(ScriptingDictionary);

},{"../../vendor/ProxyGenerator":37}],26:[function(require,module,exports){
(function (global){
'use strict';

const Drives = require('./scriptingFSO/collections/Drives');
const VFS    = require('../util/VFS');

/**
 * Scripting.FileSystemObject.js
 * This Object spoofs the Scripting.FileSystemObject Object
 * Properties and methods taken from Microsoft documentation
 * https://msdn.microsoft.com/en-us/library/hww8txat(v=vs.84).aspx
 */

class ScriptingFileSystemObject {
    constructor() {
        // Default properties
        this.Drives = new Drives();

        // Custom properties
        this._vfs = global.VFS instanceof VFS ? global.VFS : new VFS();
        this.PATH_SEP = this._vfs.PATH_SEP;
        this._name = 'Scripting.FileSystemObject';
    }

    toString() {
        return this._name;
    }

    // Default methods
    // https://msdn.microsoft.com/en-us/library/z0z2z1zt(v=vs.84).aspx
    BuildPath(path, name) {
        const PS = this.PATH_SEP;
        return path.split(PS).concat(name.split(PS)).filter(function(el) {
            return el;
        }).join(PS);
    }

    // https://msdn.microsoft.com/en-us/library/e1wf9e7w(v=vs.84).aspx
    CopyFile(source, destination) {
        return this._vfs.copyFile(source, destination);
    }

    // https://msdn.microsoft.com/en-us/library/xbfwysex(v=vs.84).aspx
    CopyFolder(source, destination) {
        return this._vfs.copyFolder(source, destination);
    }

    // https://msdn.microsoft.com/en-us/library/7kby5ae3(v=vs.84).aspx
    CreateFolder(path) {
        return this._vfs.createFolder(path);
    }

    // https://msdn.microsoft.com/en-us/library/5t9b5c0c(v=vs.84).aspx
    CreateTextFile(filename, overwrite, unicode) {
        return this._vfs.createTextFile(filename, overwrite, unicode);
    }

    // https://msdn.microsoft.com/en-us/library/thx0f315(v=vs.84).aspx
    DeleteFile(path) {
        return this._vfs.deleteFile(path);
    }

    // https://msdn.microsoft.com/en-us/library/ca0at0xh(v=vs.84).aspx
    DeleteFolder(path) {
        return this._vfs.deleteFolder(path);
    }

    // https://msdn.microsoft.com/en-us/library/t565x0f1(v=vs.84).aspx
    DriveExists(path) {
        return this._vfs.driveExists(path);
    }

    // https://msdn.microsoft.com/en-us/library/x23stk5t(v=vs.84).aspx
    FileExists(path) {
        return this._vfs.fileExists(path);
    }

    // https://msdn.microsoft.com/en-us/library/5xc78d8d(v=vs.84).aspx
    FolderExists(path) {
        return this._vfs.folderExists(path);
    }

    // https://msdn.microsoft.com/en-us/library/zx1xa64f(v=vs.84).aspx
    GetAbsolutePathName(path) {
        return this._vfs.getAbsolutePathName(path);
    }

    // https://msdn.microsoft.com/en-us/library/xhxzwwe1(v=vs.84).aspx
    GetBaseName(path) {
        return this._vfs.getBaseName(path);
    }

    // https://msdn.microsoft.com/en-us/library/1z6e0fk3(v=vs.84).aspx
    GetDrive(drivespec) {
        return this._vfs.getDrive(drivespec);
    }

    // https://msdn.microsoft.com/en-us/library/48e3yfdw(v=vs.84).aspx
    GetDriveName(path) {
        return this._vfs.getDriveName(path);
    }

    // https://msdn.microsoft.com/en-us/library/x0fxha2a(v=vs.84).aspx
    GetExtensionName(path) {
        return this._vfs.getExtensionName(path);
    }

    // https://msdn.microsoft.com/en-us/library/sheydkke(v=vs.84).aspx
    GetFile(path) {
        return this._vfs.getFile(path);
    }

    // https://msdn.microsoft.com/en-us/library/a99s8akf(v=vs.84).aspx
    GetFileName(path) {
        return this._vfs.getFileName(path);
    }

    // https://msdn.microsoft.com/en-us/library/b4e05k97(v=vs.84).aspx
    GetFileVersion(path) {
        return this._vfs.getFileVersion(path);
    }

    // https://msdn.microsoft.com/en-us/library/f1xtf7ta(v=vs.84).aspx
    GetFolder(path) {
        return this._vfs.getFolder(path);
    }

    // https://msdn.microsoft.com/en-us/library/22dyy47c(v=vs.84).aspx
    GetParentFolderName(path) {
        return this._vfs.getParentFolderName(path);
    }

    // https://msdn.microsoft.com/en-us/library/a72y2t1c(v=vs.84).aspx
    GetSpecialFolder(folderspec) {
        return this._vfs.getSpecialFolder(folderspec);
    }

    // https://msdn.microsoft.com/en-us/library/y6hbz9es(v=vs.84).aspx
    GetStandardStream(standardStreamType, unicode) {
        return this._vfs.getStandardStream(standardStreamType, unicode);
    }

    // https://msdn.microsoft.com/en-us/library/w0azsy9b(v=vs.84).aspx
    GetTempName() {
        return this._vfs.getTempName();
    }

    // https://msdn.microsoft.com/en-us/library/2wcf3ba6(v=vs.84).aspx
    MoveFile(source, destination) {
        return this._vfs.moveFile(source, destination);
    }

    // https://msdn.microsoft.com/en-us/library/465s5y8s(v=vs.84).aspx
    MoveFolder(source, destination) {
        return this._vfs.moveFolder(source, destination);
    }

    // https://msdn.microsoft.com/en-us/library/314cz14s(v=vs.84).aspx
    OpenTextFile(filename, iomode, create, format) {
        return this._vfs.openTextFile(filename, iomode, create, format);
    }
}

const ProxyGenerator = require('../../vendor/ProxyGenerator');
module.exports = new ProxyGenerator(ScriptingFileSystemObject);

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../../vendor/ProxyGenerator":37,"../util/VFS":36,"./scriptingFSO/collections/Drives":27}],27:[function(require,module,exports){
'use strict';

/**
 * Drives.js
 * This Object spoofs the Scripting.FileSystemObject Drives Collection
 * Properties and methods taken from Microsoft documentation
 * https://msdn.microsoft.com/en-us/library/x0s9y250(v=vs.84).aspx
 */

class Drives {
    constructor() {
        // Default properties
        this.Count = null;
        this.Item  = null;

        this._name = 'Drives';
    }

    toString() {
        return this._name;
    }
}

const ProxyGenerator = require('../../../../vendor/ProxyGenerator');
module.exports = new ProxyGenerator(Drives);

},{"../../../../vendor/ProxyGenerator":37}],28:[function(require,module,exports){
'use strict';

/**
 * Files.js
 * This Object spoofs the Scripting.FileSystemObject Files Collection
 * Properties and methods taken from Microsoft documentation
 * https://msdn.microsoft.com/en-us/library/wz72a8c0(v=vs.84).aspx
 */

class Files {
    constructor() {
        // Default properties
        this.Count = null;
        this.Item  = null;

        this._name = 'Files';
    }

    toString() {
        return this._name;
    }
}

const ProxyGenerator = require('../../../../vendor/ProxyGenerator');
module.exports = new ProxyGenerator(Files);

},{"../../../../vendor/ProxyGenerator":37}],29:[function(require,module,exports){
'use strict';

/**
 * Folders.js
 * This Object spoofs the Scripting.FileSystemObject Folders Collection
 * Properties and methods taken from Microsoft documentation
 * https://msdn.microsoft.com/en-us/library/9kcx47hd(v=vs.84).aspx
 */

class Folders {
    constructor(path, _parent) {
        // Default properties
        this.Count   = null;
        this.Item    = null;

        // Custom properties
        this._path   = path;
        this._parent = _parent;

        this._name   = 'Folders';
    }

    toString() {
        return this._name;
    }

    // Default methods
    // https://msdn.microsoft.com/en-us/library/zst29hfc(v=vs.84).aspx
    Add(folderName) {
        const newPath = this._parent._formatPath([this._path, folderName].join('\\'));
        this._parent.createFolder(newPath);

        return newPath;
    }
}

const ProxyGenerator = require('../../../../vendor/ProxyGenerator');
module.exports = new ProxyGenerator(Folders);

},{"../../../../vendor/ProxyGenerator":37}],30:[function(require,module,exports){
'use strict';

/**
 * Drive.js
 * This Object spoofs the Scripting.FileSystemObject Drive Object
 * Properties and methods taken from Microsoft documentation
 * https://msdn.microsoft.com/en-us/library/ts2t8ybh(v=vs.84).aspx
 */

class Drive {
    constructor(drive) {
        // Default properties
        this.AvailableSpace = 7156948992;
        this.DriveLetter    = drive;
        this.DriveType      = 2;        // 0: Unknown, 1: Removable, 2: Fixed, 3: Network, 4: CD-ROM, 5: RAM Disk
        this.FileSystem     = 'NFTS';   // FAT-32
        this.FreeSpace      = 7156948992;
        this.IsReady        = true;
        this.Path           = drive + ':';
        this.RootFolder     = drive + ':\\';
        this.SerialNumber   = -1225924828;
        this.ShareName      = '';
        this.TotalSize      = 7725907968;
        this.VolumeName     = '';

        this._name          = 'Drive';
    }

    toString() {
        return this._name;
    }
}

const ProxyGenerator = require('../../../../vendor/ProxyGenerator');
module.exports = new ProxyGenerator(Drive);

},{"../../../../vendor/ProxyGenerator":37}],31:[function(require,module,exports){
'use strict';

const MSformats = require('../../../util/MSformats');

/**
 * File.js
 * This Object spoofs the Scripting.FileSystemObject File Object
 * Properties and methods taken from Microsoft documentation
 * https://msdn.microsoft.com/en-us/library/1ft05taf(v=vs.84).aspx
 */

class File {
    constructor(file, _parent) {
        let pathArr = file.path.split('\\');
        const filename = pathArr.pop();

        // Default properties
        // https://msdn.microsoft.com/en-us/library/5tx15443(v=vs.84).aspx#Settings
        this.Attributes       = 32; // Most common for files
        this.DateCreated      = MSformats.getDate();
        this.DateLastAccessed = MSformats.getDate();
        this.DateLastModified = MSformats.getDate();
        this.Drive            = 'C:';
        this.Name             = filename;
        this.ParentFolder     = pathArr.join('\\');
        this.Path             = file.path;
        this.ShortName        = MSformats.toShortname(filename);
        this.ShortPath        = pathArr.map(MSformats.toShortname).concat(MSformats.toShortname(filename)).join('\\');
        this.Size             = 0;
        this.Type             = _parent.getExtensionName(file.path).toUpperCase() + ' File';

        // Custom properties
        this._parent          = _parent;
        this._content         = file.content;
    }

    // Default methods
    // https://msdn.microsoft.com/en-us/library/6973t06a(v=vs.84).aspx
    Copy(destination, overwrite) {
        return this._parent.copyFile(this.Path, destination);
    }

    // https://msdn.microsoft.com/en-us/library/0k4wket3(v=vs.84).aspx
    Delete(force) {
        return this._parent.deleteFile(this.Path);
    }

    // https://msdn.microsoft.com/en-us/library/kxtftw67(v=vs.84).aspx
    Move(destination) {
        return this._parent.moveFile(this.Path, destination);
    }

    // https://msdn.microsoft.com/en-us/library/hwfw5c59(v=vs.84).aspx
    OpenAsTextStream(iomode, format) {
        return this._parent.openTextFile(this.Path, iomode, false, format);
    }
}

const ProxyGenerator = require('../../../../vendor/ProxyGenerator');
module.exports = new ProxyGenerator(File);

},{"../../../../vendor/ProxyGenerator":37,"../../../util/MSformats":34}],32:[function(require,module,exports){
'use strict';

const formatPath = require('../../../util/Paths').formatPath

/**
 * Folder.js
 * This Object spoofs the Scripting.FileSystemObject Folder Object
 * Properties and methods taken from Microsoft documentation
 * https://msdn.microsoft.com/en-us/library/1c87day3(v=vs.84).aspx
 */

class Folder {
    constructor(foldername, _parent) {
        // Default properties
        // Attributes change most significantly depending on IsRootFolder true/false

        const formatted = formatPath(foldername);

        for (let i in formatted) {
            this[i] = formatted[i];
        }

        this._parent = _parent;
    }

    // Default methods
    // https://msdn.microsoft.com/en-us/library/6973t06a(v=vs.84).aspx
    Copy(destination) {
        return this._parent.copyFolder(this.Path, destination);
    }

    // https://msdn.microsoft.com/en-us/library/0k4wket3(v=vs.84).aspx
    Delete() {
        return this._parent.deleteFolder(this.Path);
    }

    // https://msdn.microsoft.com/en-us/library/kxtftw67(v=vs.84).aspx
    Move(destination) {
        return this._parent.moveFolder(this.Path, destination);
    }

    // https://msdn.microsoft.com/en-us/library/5t9b5c0c(v=vs.84).aspx
    CreateTextFile(filename, overwrite, unicode) {
        return this._parent.createTextFile(filename, overwrite, unicode);
    }
}

const ProxyGenerator = require('../../../../vendor/ProxyGenerator');
module.exports = new ProxyGenerator(Folder);

},{"../../../../vendor/ProxyGenerator":37,"../../../util/Paths":35}],33:[function(require,module,exports){
/**
 * Helper for ArrayBuffer <-> String conversions
 */

class ArrayBufferString {
    constructor() {
        this._type = 2;
        this._content = this.getIntArr([0xfeff]).buffer;
    }

    _setType(type) {
        this._type = type;
        this.fromString(this.toString());
    }

    getIntArr(content) {
        if (this._type === 1) {
            return new Uint8Array(content);
        } else {
            return new Uint16Array(content);
        }
    }

    fromString(str) {
        var buf = new ArrayBuffer(str.length * this._type);
        var bufView = this.getIntArr(buf);
        for (var i=0; i < str.length; i++) {
            bufView[i] = str.charCodeAt(i);
        }
        this._content = buf;
    }

    addByte(byte) {
        var bufView = this.getIntArr(this._content);
        var newbuf = new ArrayBuffer(bufView.byteLength + (1 * this._type));
        var newView = this.getIntArr(newbuf);
        newView.set(bufView, 0);
        newView[bufView.byteLength] = byte;
        this._content = newbuf;
    }

    addChar(char) {
        var bufView = this.getIntArr(this._content);
        var newbuf = new ArrayBuffer(bufView.byteLength + (1 * this._type));
        var newView = this.getIntArr(newbuf);
        newView.set(bufView, 0);
        newView[bufView.byteLength / this._type] = char.charCodeAt(0);
        this._content = newbuf;
    }

    getLength() {
        return this._content.byteLength;
    }

    toString() {
        var bufferView = this.getIntArr(this._content),
            chars = [];

        bufferView.forEach(c => chars.push(String.fromCharCode(c)));

        return chars.join('');
    }
}

module.exports = ArrayBufferString;

},{}],34:[function(require,module,exports){
'use strict';

const pad = (str, len) => {
    len = len || 2;
    return (new Array(len).fill('0').join('') + str).substr(0 - len);
}

// Date
const getDate = exports.getDate = timestamp => formatDate(new Date(timestamp || +new Date));

// Format: Mon Jan 1 12:00:00 UTC-0100 2017
const formatDate = exports.formatDate = dateObj => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const w = days[dateObj.getDay()],
        m = months[dateObj.getMonth()],
        d = dateObj.getDate(),
        H = pad(dateObj.getHours()),
        M = pad(dateObj.getMinutes()),
        s = pad(dateObj.getSeconds()),
        tz = 'UTC' + dateObj.toString().match(/GMT([\-|\+][0-9]{4})/)[1],
        y = dateObj.getFullYear();

    return `${w} ${m} ${d} ${H}:${M}:${s} ${tz} ${y}`;
}

// Shortname
// https://en.wikipedia.org/wiki/8.3_filename#How_to_convert_a_long_filename_to_a_short_filename
const toShortname = exports.toShortname = filename => {
    let extension,
        filenameArr = filename.split('.'),
        shorten = str => str.replace(/[\s\.]/g, '').replace(/[\,\[\];=\+]/g, '_').toUpperCase();

    if (filenameArr.length > 1 && filenameArr[0].length > 1) {
        extension = filenameArr.pop();
    }

    filename = filenameArr.join('.');

    if (filename.length > 8) {
        filename = shorten(filename).slice(0, 6) + '~1';
    }

    if (extension && extension.length > 3) {
        extension = shorten(extension).slice(0, 3);
    }

    return extension ? [filename, extension].join('.') : filename;
}

},{}],35:[function(require,module,exports){
'use strict';

const Files       = require('../objects/scriptingFSO/collections/Files');
const Folders     = require('../objects/scriptingFSO/collections/Folders');
const toShortname = require('./MSformats').toShortname;

// Splits absolute path into different chunks
const formatPath = exports.formatPath = folderspec => {
    let pathArr = folderspec.path.split('\\'),
        folderName = pathArr.pop();

    pathArr[0] = pathArr[0].toUpperCase();

    const normalFolderObj = {
        Attributes: 16, // Folder
        Drive: pathArr[0],
        Files: new Files(),
        IsRootFolder: false,
        Name: folderName,
        ParentFolder: pathArr.join('\\') + (pathArr.length === 1 ? '\\' : ''),
        Path: pathArr.join('\\') + '\\' + folderName,
        ShortName: toShortname(folderName),
        ShortPath: pathArr.concat(folderName).map(function(p) { return toShortname(p)}).join('\\'),
        Size: 2e4,
        SubFolders: new Folders(pathArr.join('\\') + '\\' + folderName),
        Type: 'File Folder'
    }

    const rootFolderObj = {
        Attributes: 22, // Folder, System, Hidden
        Drive: pathArr[0],
        Files: new Files(),
        IsRootFolder: true,
        Path: pathArr[0] + '\\',
        ShortPath: pathArr[0] + '\\',
        SubFolders: new Folders(pathArr[0] + '\\'),
        Type: 'Local Disk'
    }

    return folderspec.static ? rootFolderObj : normalFolderObj;
}

},{"../objects/scriptingFSO/collections/Files":28,"../objects/scriptingFSO/collections/Folders":29,"./MSformats":34}],36:[function(require,module,exports){
'use strict';

let TextStream = require('../common/TextStream');

let Drive      = require('../objects/scriptingFSO/objects/Drive');
let File       = require('../objects/scriptingFSO/objects/File');
let Folder     = require('../objects/scriptingFSO/objects/Folder');

let Drives     = require('../objects/scriptingFSO/collections/Drives');
let Files      = require('../objects/scriptingFSO/collections/Files');
let Folders    = require('../objects/scriptingFSO/collections/Folders');

/**
 * Virtual file system
 * Keeps track of files and folders
 */

class VFS {
    constructor(vfs) {
        this._vfs = vfs || [{ // Default filesystem
            name: 'C',
            type: 'drive'
        }, {
            name: 'C:',
            path: 'C:\\',
            static: true,
            type: 'folder'
        }, {
            name: 'temp',
            path: 'C:\\temp',
            type: 'folder',
        }, {
            name: 'windows',
            path: 'C:\\windows',
            type: 'folder'
        }, {
            name: 'system32',
            path: 'C:\\windows\\system32',
            type: 'folder'
        }, {
            name: 'Users',
            path: 'C:\\Users',
            type: 'folder'
        }, {
            name: 'User',
            path: 'C:\\Users\\User',
            type: 'folder'
        }, {
            name: 'AppData',
            path: 'C:\\Users\\User\\AppData',
            type: 'folder'
        }, {
            name: 'Local',
            path: 'C:\\Users\\User\\AppData\\Local',
            type: 'folder'
        }, {
            name: 'Temp',
            path: 'C:\\Users\\User\\AppData\\Local\\Temp',
            type: 'folder'
        }];

        // Relative paths will be prepended by this
        this._tmppath = 'C:\\temp';

        this.PATH_SEP = '\\';
    }

    _createFileObject(path, content) {
        return {
            content,
            name: path.split(this.PATH_SEP).pop(),
            path,
            type: 'file',
            userCreated: true
        }
    }

    _createFolderObject(path) {
        return {
            name: path.split(this.PATH_SEP).pop(),
            path: path,
            type: 'folder',
            userCreated: true
        }
    }

    _findFilesByWildcard(path) {
        let filename = this.getFileName(path);
        let regex = new RegExp(filename.replace('.', '\\.').replace('*', '.*'));

        return this._vfs.filter(el => {
            return el.type === 'file' &&
                this.getParentFolderName(el.path) === this.getParentFolderName(path) &&
                el.path.match(regex);
        });
    }

    _formatPath(path) {
        path = path.replace(/\//g, this.PATH_SEP);
        let curPathArr = !path.match(/^[A-Z]\:/) ? this._tmppath.split(this.PATH_SEP) : [];
        let pathArr = curPathArr.concat(path.split(this.PATH_SEP).filter(el => el));
        let absPath = [];

        pathArr.forEach(el => {
            if (el === '.') {
                // Do nothing
            } else if (el === '..') {
                absPath.pop();
            } else {
                absPath.push(el);
            }
        });

        return absPath.length === 1 ? absPath[0] + this.PATH_SEP : absPath.join(this.PATH_SEP);
    }

    _getHookedTextStream(filename, content, unicode, iomode, fullpath) {
        let self = this;
        let textFile = new TextStream(filename, content, unicode, iomode, fullpath);

        // Hook TextStream functions
        textFile._Write = textFile.Write;
        textFile.Write = function(string) {
            this._Write(string);
            self._updateFileContent(this._fullpath, this._contents);
        };

        textFile._WriteBlankLines = textFile.WriteBlankLines;
        textFile.WriteBlankLines = function(string) {
            this._WriteBlankLines(string);
            self._updateFileContent(this._fullpath, this._contents);
        };

        textFile._WriteLine = textFile.WriteLine;
        textFile.WriteLine = function(string) {
            this._WriteLine(string);
            self._updateFileContent(this._fullpath, this._contents);
        };

        return textFile;
    }

    _getSubfiles(path) {
        path = this._formatPath(path);

        return this._vfs.filter(entry => {
            return entry.type === 'file' && entry.path.replace(this.PATH_SEP + entry.name, '') === path;
        });
    }

    _getSubfolders(path) {
        path = this._formatPath(path);

        return this._vfs.filter(entry => {
            return entry.type === 'folder' &&
                entry.path !== path &&
                entry.path.indexOf((path.match(/\\$/) ? path : path + this.PATH_SEP)) === 0;
        });
    }

    _printVFS() {
        return JSON.stringify(this._vfs, null, 2);
    }

    _resolvePath(path, type) {
        path = type !== 'drive' ? this._formatPath(path) : path;

        if (this.getFileName(path).match(/\*/)) {
            return this._findFilesByWildcard(path);
        } else {
            return this._vfs.filter(entry => {
                if (type && entry.type !== type) {
                    return false;
                } else if (type && type === 'drive') {
                    return entry.name === path;
                }

                return entry.path === path;
            })[0];
        }
    }

    _replaceCurrentFS(newVFS) {
        this._vfs = newVFS;
    }

    _updateFileContent(path, content) {
        path = this._formatPath(path);

        this._vfs.forEach(entry => {
            if (entry.type === 'file' && entry.path === path) {
                entry.content = content;
            }
        });
    }

    copyFile(source, destination) {
        destination = this._formatPath(destination);

        let resolvedFile = this._resolvePath(source);

        if (!resolvedFile) {
            throw TypeError('File not found');
        }

        if (resolvedFile instanceof Array) {
            if (!this.folderExists(destination)) {
                throw new TypeError('Path not found');
            } else {
                return resolvedFile.forEach(file => this.copyFile(file.path, [destination, file.name].join(this.PATH_SEP)));
            }
        }

        if (!this.folderExists(this.getParentFolderName(destination))) {
            throw TypeError('Path not found');
        }

        if (this.fileExists(destination) === -1) {
            this.deleteFile(destination);
        }

        this._vfs.push(this._createFileObject(destination, resolvedFile.content));
    }

    copyFolder(source, destination) {
        destination = this._formatPath(destination);

        let resolvedOrigin = this._resolvePath(source);
        let resolvedDest = this._resolvePath(destination);

        // First get all subfolders & files
        let subfolders = this._getSubfolders(source);
        let subfiles = this._getSubfiles(source);

        if (!resolvedOrigin) {
            throw new TypeError('Path not found');
        }

        // Create destination if not exists
        if (!resolvedDest) {
            this.createFolder(destination);
        }

        subfolders.forEach(folder => this.copyFolder(folder.path, [destination, folder.name].join(this.PATH_SEP)));
        subfiles.forEach(file => this.copyFile(file.path, [destination, file.name].join(this.PATH_SEP)));
    }

    createFolder(path) {
        path = this._formatPath(path);

        if (this._resolvePath(path, 'folder')) {
            throw new TypeError('File already exists');
        }

        this._vfs.push(this._createFolderObject(path));
    }

    createTextFile(filename, overwrite, unicode) {
        overwrite = overwrite || false;
        unicode = unicode || false;

        if (this._resolvePath(filename)) {
            if (!overwrite) {
                throw new TypeError('File already exists');
            } else {
                this.deleteFile(filename);
            }
        }

        // Add file to VFS
        this._vfs.push(this._createFileObject(this._formatPath(filename), ''));

        let resolvedFile = this._resolvePath(filename);

        return this._getHookedTextStream(resolvedFile.name, '', unicode, 2, resolvedFile.path);
    }

    deleteFile(path, suppressError) {
        let resolvedFile = this._resolvePath(path, 'file');

        if (!resolvedFile) {
            if (suppressError) {
                return false;
            } else {
                throw new TypeError('Path not found');
            }
        }

        if (resolvedFile instanceof Array) {
            return resolvedFile.forEach(file => this.deleteFile(file.path));
        }

        this._vfs.splice(this._vfs.indexOf(resolvedFile), 1);
    }

    deleteFolder(path, suppressError) {
        let resolvedFolder = this._resolvePath(path, 'folder');

        if (!resolvedFolder) {
            if (suppressError) {
                return false;
            } else {
                throw new TypeError('Path not found');
            }
        }

        // First remove all subfolders recursively
        let subfolders = this._getSubfolders(path);
        subfolders.forEach(folder => this.deleteFolder(folder.path, true));

        // Then remove all leftover files
        let subfiles = this._getSubfiles(path);
        subfiles.forEach(file => this.deleteFile(file.path, true));

        // Finally remove folder itself
        if (!resolvedFolder.static) {
            this._vfs.splice(this._vfs.indexOf(resolvedFolder), 1);
        }
    }

    driveExists(path) {
        return this._resolvePath(path, 'drive') ? -1 : 0;
    }

    fileExists(path) {
        return this._resolvePath(path, 'file') ? -1 : 0;
    }

    folderExists(path) {
        return this._resolvePath(path, 'folder') ? -1 : 0;
    }

    getAbsolutePathName(path) {
        return this._formatPath(path);
    }

    getBaseName(path) {
        return path.split(this.PATH_SEP).pop().split('.').shift();
    }

    getDrive(drivespec) {
        if (!drivespec.match(/^[A-Z]{1}(\:|\:\\)?$/)) {
            // Throw error when trying to access network drive
            throw new TypeError('Path not found');
        }

        let resolvedDrive = this._resolvePath(drivespec.split('').shift(), 'drive');
        if (!resolvedDrive) {
            throw new TypeError('Path not found');
        }

        return new Drive(resolvedDrive);
    }

    getDriveName(path) {
        // Is network drive?
        if (path.match(/^\\\\([^<>:"\/\\|?*]+)\\([^<>:"\/\\|?*]+)/)) {
            let networkShareArr = path.split(this.PATH_SEP).filter(el => el);
            return [this.PATH_SEP, networkShareArr[0], networkShareArr[1]].join(this.PATH_SEP);
        // Volume drive?
        } else if (path.match(/^([A-Z]{1}\:)/)) {
            return path.slice(0, 2);
        } else {
            return '';
        }
    }

    getExtensionName(path) {
        return path.split(this.PATH_SEP).pop().split('.').pop();
    }

    getFile(path) {
        let resolvedFile = this._resolvePath(path, 'file');

        if (!resolvedFile) {
            throw new TypeError('File not found');
        } else {
            return new File(resolvedFile, this);
        }
    }

    getFileName(path) {
        return path.split(this.PATH_SEP).pop();
    }

    getFileVersion(path) {
        // Seems only some Windows System files (such as ntdll.dll) have FileVersions
        let resolvedFile = this._resolvePath(path, 'file');

        if (!resolvedFile) {
            throw new TypeError('The system cannot find the file specified');
        } else {
            return '';
        }
    }

    getFolder(path) {
        let resolvedFolder = this._resolvePath(path, 'folder');

        if (!resolvedFolder) {
            throw new TypeError('Path not found');
        } else {
            return new Folder(resolvedFolder, this);
        }
    }

    getParentFolderName(path) {
        let pathArr = path.split(this.PATH_SEP).filter(el => el);

        if (path.match(/^[A-Z]{1}\:?/) && pathArr.length > 1) {
            let newPathArr = pathArr.splice(0, pathArr.length - 1);
            return newPathArr.length === 1 ? newPathArr[0] + this.PATH_SEP : newPathArr.join(this.PATH_SEP);
        } else {
            return '';
        }
    }

    getSpecialFolder(folderspec) {
        folderspec = parseInt(folderspec, 10);

        if (isNaN(folderspec)) {
            throw new TypeError('Type mismatch');
        }

        if (folderspec < 0 || folderspec > 2) {
            throw new TypeError('Invalid procedure call or argument');
        }

        switch (folderspec) {
            case 0:
                return 'C:\\Windows';

            case 1:
                return 'C:\\Windows\\System32';

            case 2:
                return 'C:\\temp';
        }
    }

    getStandardStream(standardStreamType, unicode) {
        standardStreamType = parseInt(standardStreamType, 10);

        if (isNaN(standardStreamType)) {
            throw new TypeError('Type mismatch');
        }

        if (standardStreamType < 0 || standardStreamType > 2) {
            throw new TypeError('Invalid procedure call or argument');
        }

        switch (standardStreamType) {
            case 0:
                return new TextStream('StdIn', null, unicode);

            case 1:
                return new TextStream('StdOut', null, unicode);

            case 2:
                return new TextStream('StdErr', null, unicode);
        }
    }

    getTempName() {
        // Returns filename in following format:
        // prefix 'rad'
        // random 5-byte string in hex, 0 padded
        // .tmp extension
        let randBytes = ('0000' + (Math.floor(Math.random() * Math.pow(2, 20)).toString(16))).substr(-5).toUpperCase();
        return ['rad', randBytes, '.tmp'].join('');
    }

    moveFile(source, destination) {
        this.copyFile(source, destination);
        this.deleteFile(source);
    }

    moveFolder(source, destination) {
        this.copyFolder(source, destination);
        this.deleteFolder(source);
    }

    openTextFile(filename, iomode, create, format) {
        create = !!create;

        if (!filename || (filename && this.fileExists(filename) === 0 && create !== true)) {
            throw new TypeError('File not found');
        }

        if (this.fileExists(filename) === 0 && create === true) {
            return this.createTextFile(filename, false, true);
        } else {
            let origFile = this.getFile(filename);
            return this._getHookedTextStream(origFile.Name, origFile._content, true, iomode, origFile.Path);
        }
    }
}

module.exports = VFS;

},{"../common/TextStream":14,"../objects/scriptingFSO/collections/Drives":27,"../objects/scriptingFSO/collections/Files":28,"../objects/scriptingFSO/collections/Folders":29,"../objects/scriptingFSO/objects/Drive":30,"../objects/scriptingFSO/objects/File":31,"../objects/scriptingFSO/objects/Folder":32}],37:[function(require,module,exports){
(function (global){
class ProxyGenerator {
    constructor(_class, _config) {
        const self = this;

        this._class  = _class;
        this._config = _config || {
            logFunction: global.proxy_config && global.proxy_config.logFunction ? global.proxy_config.logFunction : console.log
        };

        return class {
            constructor() {
                const args = [...arguments];
                self.initializedClass = new self._class(...args);
                self.log('CONSTRUCT', self.initializedClass.constructor.name, null, [...args]);

                return new Proxy(self.initializedClass, self.getProxyProps());
            }
        };
    }

    matchProperty(target, propKey) {
        const matched = {
            propKey: null,
            method: null
        }

        const methods = Object.getOwnPropertyNames(target.constructor.prototype);
        const props = Object.keys(target);

        let regex = null;
        try {
            regex = new RegExp(`^${propKey}$`, 'i');
        } catch(e) {
            return matched;
        }

        for (let i in props) {
            if (regex.test(props[i])) {
                matched.propKey = props[i];
            }
        }

        for (let i in methods) {
            if (regex.test(methods[i])) {
                matched.method = methods[i];
            }
        }

        return matched;
    }

    getProxyProps() {
        const self = this;

        return {
            get(target, propKey, receiver) {
                // Prepare for case-insensitivity
                const matched = self.matchProperty(target, propKey);

                // Accessing properties
                if (target.hasOwnProperty(matched.propKey)) {
                    self.log('GET', target.constructor.name, propKey, null, target[matched.propKey]);

                // Calling functions
                } else if (typeof target[matched.method] === 'function' && !self.isNative(target[matched.method])) {
                    return new Proxy(target[matched.method], {
                        apply(applyTarget, thisArg, args) {
                            self.log('CALL', thisArg.constructor.name, propKey, [...args]);

                            return Reflect.apply(applyTarget, thisArg, args);
                        }
                    });
                }

                return target[matched.propKey];
            },
            set(target, propKey, value, receiver) {
                const matched = self.matchProperty(target, propKey);
                self.log('SET', target.constructor.name, propKey, [value]);
                target[matched.propKey] = value;
                return true;
            }
        }
    }

    isNative(value) {
        const toString = Object.prototype.toString;

        const fnToString = Function.prototype.toString;

        const reHostCtor = /^\[object .+?Constructor\]$/;

        const reNative = RegExp('^'
            + String(toString)
            .replace(/[.*+?^${}()|[\]\/\\]/g, '\\$&')
            .replace(/toString|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?')
            + '$');

        // TODO: use isNative for native properties too
        // const type = typeof value;
        // return type === 'function' ? reNative.test(fnToString.call(value))
        // : (value && type === 'object' && reHostCtor.test(toString.call(value))) || false;

        return reNative.test(fnToString.call(value));

    }

    parseType(arg) {
        let res;

        switch (typeof arg) {
            case 'string':
                res = '"' + arg + '"';
                break;
            case 'number':
            case 'boolean':
            case 'function':
            case 'undefined':
                res = '' + arg;
                break;
            case 'object':
                if (arg === null) res = 'null';
                else if (arg.constructor.name === 'Array') res = '[' + arg.map(a => this.parseType(a)).join(', ') + ']';
                else if (arg.constructor.name === 'Object') {
                    let obj = [];
                    for (let val in arg) obj.push(`${val}: ${this.parseType(arg[val])}`);
                    res = `{${obj.join(', ')}}`;
                } else res = arg;
        }

        return res;
    }

    log(method, parentName, propertyName, args, result) {
        args = args ? args.map(arg => this.parseType(arg)).join(', ') : '';
        if (method === 'CALL' || method === 'CONSTRUCT') args = `(${args})`;
        else if (method === 'SET') args = ` = ${args}`;

        if (method === 'CONSTRUCT') {
            this._config.logFunction(`> ${method} new ${parentName}${args}`);
        } else {
            if (propertyName.indexOf('_') !== 0) {
                this._config.logFunction(`> ${method} ${parentName}.${propertyName}${args}`);
                if (result) this._config.logFunction(`< ${this.parseType(result)}`);
            }
        }
    }
}

module.exports = ProxyGenerator;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}]},{},[20]);
