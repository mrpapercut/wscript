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
