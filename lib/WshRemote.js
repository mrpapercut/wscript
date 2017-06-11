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
