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
    this.Terminate   = function(){};

    // Custom properties
    this._strCommand = strCommand;
};

module.exports = WshScriptExec;
