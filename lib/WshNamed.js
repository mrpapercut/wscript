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
