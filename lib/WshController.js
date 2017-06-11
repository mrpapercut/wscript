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
