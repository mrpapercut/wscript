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
