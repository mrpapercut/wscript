'use strict';

var WScript = require('./WScript');
window.WScript = new WScript();

window.ActiveXObject = function(strProgId) {
    return window.WScript.CreateObject(strProgId);
};

window.ActiveXObject.prototype.toString = function(){};
