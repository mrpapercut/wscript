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

	// Save contents for writing/reading
	this._contents		= '';
};

TextStream.prototype._parseInt = function(num) {
	if (typeof num !== 'number' || isNaN(parseInt(num, 10))) throw new TypeError();
    return parseInt(num, 10);
}

TextStream.prototype.Close = function() {
    return null;
};

TextStream.prototype.Read = function(characters) {
    characters = this._parseInt(characters);

    return ResponseText.length > characters ? ResponseText.substr(0, characters) : ResponseText;
};

TextStream.prototype.ReadAll = function() {
    return ResponseText;
};

TextStream.prototype.ReadLine = function() {
    return ResponseText.split('\n')[0];
};

TextStream.prototype.Skip = function(characters) {
    characters = this._parseInt(characters);

	return ResponseText.substr(characters);
};

TextStream.prototype.SkipLine = function(characters) {
	characters = this._parseInt(characters);

	var lines = ResponseText.split('\n');

	return lines.slice(characters, lines.length).join('\n');
};

TextStream.prototype.Write = function(string) {
	this._contents += string;
};

TextStream.prototype.WriteBlankLines = function(lines) {
	lines = this._parseInt(lines);

	for (var i = 0; i < lines; i++) this._contents += '\n';
};

TextStream.prototype.WriteLine = function(string) {
	this._contents += string ? string + '\n' : '\n';
};

module.exports = TextStream;
