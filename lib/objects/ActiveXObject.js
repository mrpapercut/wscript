'use strict';

var WScript = require('../WScript');

/**
 * ActiveXObject.js
 * This Object spoofs the ActiveXObject Object
 * Properties and methods taken from Microsoft documentation
 * https://msdn.microsoft.com/en-us/library/6958xykx(v=vs.100).aspx
 */

var ActiveXObject = function(object) {
    var wscript = new WScript();
    return wscript.CreateObject(object);
};

module.exports = ActiveXObject;
