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
    }

    // https://msdn.microsoft.com/en-us/library/yk84ffsf(v=vs.84).aspx
    Terminate() {
        // return nothing
    }
}

module.exports = WshScriptExec;
