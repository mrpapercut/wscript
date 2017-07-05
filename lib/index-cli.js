'use strict';

const tracerlog = [];

global.proxy_config = {
    logFunction: function() {
        if (arguments) {
            [...arguments].map(l => {
                tracerlog.push(typeof l === 'string' ? l : JSON.stringify(l, false, 2));
            });
        }
    }
}

const WScript = require('./WScript');

global.WScript = new WScript();
global.VFS = global.WScript.CreateObject('Scripting.FileSystemObject')._vfs;

global.ActiveXObject = function(strProgId) {
    return global.WScript.CreateObject(strProgId);
};

console.log(tracerlog);