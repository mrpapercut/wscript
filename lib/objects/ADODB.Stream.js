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
    this.Charset        = 'unicode';

    // https://msdn.microsoft.com/en-us/library/ms676145(v=vs.85).aspx
    this.EOS            = false;

    // https://msdn.microsoft.com/en-us/library/ms675062(v=vs.85).aspx
    // -1 = adCRLF
    // 10 = adLF
    // 13 = adCR
    this.LineSeparator  = -1;

    // https://msdn.microsoft.com/en-us/library/ms676693(v=vs.85).aspx
    // 0 = mode unknown
    // 1 = read-only
    // 2 = write-only
    // 3 = read/write
    this.Mode           = 1;

    // https://msdn.microsoft.com/en-us/library/ms680965(v=vs.85).aspx
    this.Position       = 0;

    // https://msdn.microsoft.com/en-us/library/ms677520(v=vs.85).aspx
    // Because we don't actually use a stream, setting Size to Infinity
    // means that checks against fixed bytesize always return true
    // e.g. if (ADODBStream.Size > 65535) { will return true
    this.Size           = Infinity;

    // https://msdn.microsoft.com/en-us/library/ms675068(v=vs.85).aspx
    // 0 = closed
    // 1 = open
    // 2 = connecting
    // 4 = object is executing
    // 8 = object is retrieving
    this.State          = 0;

    // https://msdn.microsoft.com/en-us/library/ms681553(v=vs.85).aspx
    // 1 = Indicates binary data
    // 2 = Indicates text data
    this.Type           = 2;
};

// Default methods
// https://msdn.microsoft.com/en-us/library/ms681014(v=vs.85).aspx
ADODBStream.prototype.Cancel = function() {
    this.State = 0;
    // return nothing
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
    this.State = 1;
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
