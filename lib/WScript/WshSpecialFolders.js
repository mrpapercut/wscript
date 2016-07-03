'use strict';

var SpecialFolders = require('./config/SpecialFolders');

/**
 * WshSpecialFolders.js
 * This Object spoofs the WshSpecialFolders Object
 * Properties and methods taken from Microsoft documentation
 * https://msdn.microsoft.com/en-us/library/9x9e7edx(v=vs.84).aspx
 */
var WshSpecialFolders = function(folder) {
    return folder && SpecialFolders[folder] !== undefined ? SpecialFolders[folder] : '';
};

WshSpecialFolders.count = function() {
    return Object.keys(SpecialFolders).length;
};

module.exports = WshSpecialFolders;
