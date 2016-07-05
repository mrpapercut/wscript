'use strict';

var ResponseText = require('./config/ResponseText');

/**
 * TextStream.js
 * This Object spoofs the TextStream Object
 * Properties and methods taken from Microsoft documentation
 * https://msdn.microsoft.com/en-us/library/312a5kbt(v=vs.84).aspx
 */
var TextStream = function(ioType) {
    // Default properties
    this.AtEndOfLine    = true;
    this.AtEndOfStream  = true;
    this.Column         = 1;
    this.Line           = 1;

    // Custom properties
    this._ioType        = ioType;
};

TextStream.prototype.Close = function() {
    return null;
};

TextStream.prototype.Read = function(characters) {
    if (typeof characters !== 'number' || isNaN(parseInt(characters, 10))) throw new TypeError();
    characters = parseInt(characters, 10);

    return ResponseText.length > characters ? ResponseText.substr(0, characters) : ResponseText;
};

TextStream.prototype.ReadAll = function() {
    return ResponseText;
};

TextStream.prototype.ReadLine = function() {
    return ResponseText.split('\n')[0];
};

TextStream.prototype.Skip = function() {

};

TextStream.prototype.SkipLine = function() {

};

TextStream.prototype.Write = function() {

};

TextStream.prototype.WriteBlankLines = function() {

};

TextStream.prototype.WriteLine = function() {

};

module.exports = TextStream;
