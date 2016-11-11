'use strict';

var WshUnnamed = require('./WshUnnamed');

/**
 * WshNetwork.js
 * This Object spoofs the WshNetwork Object
 * Properties and methods taken from Microsoft documentation
 * https://msdn.microsoft.com/en-us/library/s6wt333f(v=vs.84).aspx
 */

var WshNetwork = function() {
    // Default properties
    this.ComputerName = 'USERPC';
    this.UserDomain   = 'USERDOMAIN';
    this.UserName     = 'USER';

    // Custom properties
    this._name        = 'WshNetwork';
};

WshNetwork.prototype.toString = function() {
    return this._name;
};

// https://msdn.microsoft.com/en-us/library/kxsdca3c(v=vs.84).aspx
WshNetwork.prototype.AddPrinterConnection = function(strLocalName, strRemoteName, bUpdateProfile, strUser, strPassword) {
    throw new Error('The network resource type is not correct.');
}

// https://msdn.microsoft.com/en-us/library/zsdh7hkb(v=vs.84).aspx
WshNetwork.prototype.AddWindowsPrinterConnection = function(strPrinterPath, strDriverName, strPort) {
    throw new Error('The remote server machine does not exist or is unavailable.');
}

// https://msdn.microsoft.com/en-us/library/t9zt39at(v=vs.84).aspx
WshNetwork.prototype.EnumNetworkDrives = function() {
    return new WshUnnamed([]);
}

// https://msdn.microsoft.com/en-us/library/zhds6k80(v=vs.84).aspx
WshNetwork.prototype.EnumPrinterConnections = function() {
    return new WshUnnamed([]);
}

// https://msdn.microsoft.com/en-us/library/8kst88h6(v=vs.84).aspx
WshNetwork.prototype.MapNetworkDrive = function(strLocalName, strRemoteName, bUpdateProfile, strUser, strPassword) {
    throw new Error('The network path was not found.');
}

// https://msdn.microsoft.com/en-us/library/d16d7wbf(v=vs.84).aspx
WshNetwork.prototype.RemoveNetworkDrive = function(strName, bForce, bUpdateProfile) {
    throw new Error('This network connection does not exist.');
}

// https://msdn.microsoft.com/en-us/library/tsbh2yy7(v=vs.84).aspx
WshNetwork.prototype.RemovePrinterConnection = function(strName, bForce, bUpdateProfile) {
    throw new Error('This network connection does not exist.');
}

// https://msdn.microsoft.com/en-us/library/2ccwwdct(v=vs.84).aspx
WshNetwork.prototype.SetDefaultPrinter = function(strPrinterName) {
    throw new Error('There is no printer called "' + strPrinterName + '"');
}

module.exports = WshNetwork;
