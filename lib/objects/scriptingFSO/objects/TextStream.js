'use strict';

/**
 * TextStream.js
 * This Object spoofs the Scripting.FileSystemObject TextStream Object
 * Properties and methods taken from Microsoft documentation
 * https://msdn.microsoft.com/en-us/library/312a5kbt(v=vs.84).aspx
 */

var TextStream = function() {
    // Default properties
    this.AtEndOfLine   = null;
    this.AtEndOfStream = null;
    this.Column        = null;
    this.Line          = null;
};

// Default methods
// https://msdn.microsoft.com/en-us/library/yb3tbdkw(v=vs.84).aspx
TextStream.prototype.Close = function() {

};

// https://msdn.microsoft.com/en-us/library/dhyx75w2(v=vs.84).aspx
TextStream.prototype.Read = function() {

};

// https://msdn.microsoft.com/en-us/library/t58aa4dd(v=vs.84).aspx
TextStream.prototype.ReadAll = function() {

};

// https://msdn.microsoft.com/en-us/library/h7se9d4f(v=vs.84).aspx
TextStream.prototype.ReadLine = function() {

};

// https://msdn.microsoft.com/en-us/library/08xz3c5a(v=vs.84).aspx
TextStream.prototype.Skip = function() {

};

// https://msdn.microsoft.com/en-us/library/zbhhkawe(v=vs.84).aspx
TextStream.prototype.SkipLine = function() {

};

// https://msdn.microsoft.com/en-us/library/6ee7s9w2(v=vs.84).aspx
TextStream.prototype.Write = function() {

};

// https://msdn.microsoft.com/en-us/library/eysctzwa(v=vs.84).aspx
TextStream.prototype.WriteBlankLines = function() {

};

// https://msdn.microsoft.com/en-us/library/t5399c99(v=vs.84).aspx
TextStream.prototype.WriteLine = function() {

};

module.exports = TextStream;
