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

module.exports = WshEnvironment;
