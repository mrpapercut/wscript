'use strict';

/**
 * ADODB.Stream.js
 * This Object spoofs the ADODB.Stream Object
 * Properties and methods taken from Microsoft documentation
 * https://msdn.microsoft.com/en-us/library/ms677486(v=vs.85).aspx
 */

var ADODBStream = function() {
    // Default properties
    // https://msdn.microsoft.com/en-us/library/ms681424(v=vs.85).aspx
    this.Charset        = null;

    // https://msdn.microsoft.com/en-us/library/ms676145(v=vs.85).aspx
    this.EOS            = null;

    // https://msdn.microsoft.com/en-us/library/ms675062(v=vs.85).aspx
    this.LineSeparator  = null;

    // https://msdn.microsoft.com/en-us/library/ms676693(v=vs.85).aspx
    this.Mode           = null;

    // https://msdn.microsoft.com/en-us/library/ms680965(v=vs.85).aspx
    this.Position       = null;

    // https://msdn.microsoft.com/en-us/library/ms677520(v=vs.85).aspx
    this.Size           = null;

    // https://msdn.microsoft.com/en-us/library/ms675068(v=vs.85).aspx
    this.State          = null;

    // https://msdn.microsoft.com/en-us/library/ms681553(v=vs.85).aspx
    this.Type           = null;
};

// Default methods
// https://msdn.microsoft.com/en-us/library/ms681014(v=vs.85).aspx
ADODBStream.prototype.Cancel = function() {

};

// https://msdn.microsoft.com/en-us/library/ms675814(v=vs.85).aspx
ADODBStream.prototype.Close = function() {

};

// https://msdn.microsoft.com/en-us/library/ms677586(v=vs.85).aspx
ADODBStream.prototype.CopyTo = function() {

};

// https://msdn.microsoft.com/en-us/library/ms676997(v=vs.85).aspx
ADODBStream.prototype.Flush = function() {

};

// https://msdn.microsoft.com/en-us/library/ms677570(v=vs.85).aspx
ADODBStream.prototype.LoadFromFile = function() {

};

// https://msdn.microsoft.com/en-us/library/ms680846(v=vs.85).aspx
ADODBStream.prototype.Open = function() {

};

// https://msdn.microsoft.com/en-us/library/ms676702(v=vs.85).aspx
ADODBStream.prototype.Read = function() {

};

// https://msdn.microsoft.com/en-us/library/ms678077(v=vs.85).aspx
ADODBStream.prototype.ReadText = function() {

};

// https://msdn.microsoft.com/en-us/library/ms676745(v=vs.85).aspx
ADODBStream.prototype.SaveToFile = function() {

};

// https://msdn.microsoft.com/en-us/library/ms676560(v=vs.85).aspx
ADODBStream.prototype.SetEOS = function() {

};

// https://msdn.microsoft.com/en-us/library/ms675056(v=vs.85).aspx
ADODBStream.prototype.SkipLine = function() {

};

// https://msdn.microsoft.com/en-us/library/ms677226(v=vs.85).aspx
ADODBStream.prototype.Stat = function() {

};

// https://msdn.microsoft.com/en-us/library/ms675017(v=vs.85).aspx
ADODBStream.prototype.Write = function() {

};

// https://msdn.microsoft.com/en-us/library/ms676597(v=vs.85).aspx
ADODBStream.prototype.WriteText = function() {

};

module.exports = ADODBStream;
