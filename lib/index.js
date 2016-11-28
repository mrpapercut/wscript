'use strict';

var WScript = require('./WScript');
window.WScript = new WScript();

window.ActiveXObject = function(strProgId) {
    window.WScript.CreateObject(strProgId);
};
