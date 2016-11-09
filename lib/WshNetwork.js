'use strict';

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

WshNetwork.prototype.AddWindowsPrinterConnection = function(strPrinterPath, strDriverName, strPort) {
    // Return nothing
}

WshNetwork.prototype.AddPrinterConnection = function(strLocalName, strRemoteName, bUpdateProfile, strUser, strPassword) {
    // Return nothing
}

WshNetwork.prototype.EnumNetworkDrives = function() {

}

WshNetwork.prototype.EnumPrinterConnections = function() {

}

WshNetwork.prototype.MapNetworkDrive = function() {

}

WshNetwork.prototype.RemoveNetworkDrive = function() {

}

WshNetwork.prototype.RemovePrinterConnection = function() {

}

WshNetwork.prototype.SetDefaultPrinter = function() {

}

module.exports = WshNetwork;
