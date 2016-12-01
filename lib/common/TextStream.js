'use strict';

var ResponseText = require('../config/ResponseText');

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

    // Save contents for writing/reading
    this._contents      = '';
};

TextStream.prototype._parseInt = function(num) {
    if (typeof num !== 'number' || isNaN(parseInt(num, 10))) throw new TypeError();
    return parseInt(num, 10);
}

// https://msdn.microsoft.com/en-us/library/yb3tbdkw(v=vs.84).aspx
TextStream.prototype.Close = function() {
    return null;
};

// https://msdn.microsoft.com/en-us/library/dhyx75w2(v=vs.84).aspx
TextStream.prototype.Read = function(characters) {
    characters = this._parseInt(characters);

    return ResponseText.length > characters ? ResponseText.substr(0, characters) : ResponseText;
};

// https://msdn.microsoft.com/en-us/library/t58aa4dd(v=vs.84).aspx
TextStream.prototype.ReadAll = function() {
    return ResponseText;
};

// https://msdn.microsoft.com/en-us/library/h7se9d4f(v=vs.84).aspx
TextStream.prototype.ReadLine = function() {
    return ResponseText.split('\n')[0];
};

// https://msdn.microsoft.com/en-us/library/08xz3c5a(v=vs.84).aspx
TextStream.prototype.Skip = function(characters) {
    characters = this._parseInt(characters);

    return ResponseText.substr(characters);
};

// https://msdn.microsoft.com/en-us/library/zbhhkawe(v=vs.84).aspx
TextStream.prototype.SkipLine = function(characters) {
    characters = this._parseInt(characters);

    var lines = ResponseText.split('\n');

    return lines.slice(characters, lines.length).join('\n');
};

// https://msdn.microsoft.com/en-us/library/6ee7s9w2(v=vs.84).aspx
TextStream.prototype.Write = function(string) {
    this._contents += string;
};

// https://msdn.microsoft.com/en-us/library/eysctzwa(v=vs.84).aspx
TextStream.prototype.WriteBlankLines = function(lines) {
    lines = this._parseInt(lines);

    for (var i = 0; i < lines; i++) this._contents += '\n';
};

// https://msdn.microsoft.com/en-us/library/t5399c99(v=vs.84).aspx
TextStream.prototype.WriteLine = function(string) {
    this._contents += string ? string + '\n' : '\n';
};

module.exports = TextStream;
