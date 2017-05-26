'use strict';

const SpecialFolders = require('./config/SpecialFolders');

/**
 * WshSpecialFolders.js
 * This Object spoofs the WshSpecialFolders Object
 * Properties and methods taken from Microsoft documentation
 * https://msdn.microsoft.com/en-us/library/9x9e7edx(v=vs.84).aspx
 */
const WshSpecialFolders = folder =>
    folder && SpecialFolders[folder] !== undefined ? SpecialFolders[folder] : '';

// https://msdn.microsoft.com/en-us/library/6x47fysb(v=vs.84).aspx
WshSpecialFolders.Count = () => Object.keys(SpecialFolders).length;

module.exports = WshSpecialFolders;
