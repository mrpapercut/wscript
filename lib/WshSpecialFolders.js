'use strict';

var SpecialFolders = require('../config/SpecialFolders');

/**
 * This Object spoofs the WshShell Object
 * Properties and methods taken from Microsoft documentation
 * https://msdn.microsoft.com/en-us/library/9x9e7edx(v=vs.84).aspx
 */
var WshSpecialFolders = function(folder) {
    return folder && SpecialFolders[folder] !== undefined ? SpecialFolders[folder] : '';
};

WshSpecialFolders.count = function() {
    return Object.keys(SpecialFolders).length;
};

if (module && module.exports) module.exports = WshSpecialFolders;
