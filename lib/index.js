'use strict';

const WScript = require('./WScript');
window.WScript = new WScript();
window.VFS = window.WScript.CreateObject('Scripting.FileSystemObject')._vfs;

window.ActiveXObject = function(strProgId) {
    return window.WScript.CreateObject(strProgId);
};
