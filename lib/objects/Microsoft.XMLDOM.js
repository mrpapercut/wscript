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

        this._name         = 'Microsoft.XMLDOM';
    }

    toString() {
        return this._name;
    }
};

const ProxyGenerator = require('../../vendor/ProxyGenerator');
module.exports = new ProxyGenerator(MicrosoftXMLDOM);
