'use strict';

var ResponseText = require('../config/ResponseText');

/**
 * TextStream.js
 * This Object spoofs the TextStream Object
 * Properties and methods taken from Microsoft documentation
 * https://msdn.microsoft.com/en-us/library/312a5kbt(v=vs.84).aspx
 */
var TextStream = function(filename, contents, unicode, iomode) {
    // Default properties
    this.AtEndOfLine    = false;
    this.AtEndOfStream  = false;
    this.Column         = 1;
    this.Line           = 1;

    // Custom properties
    // Filename can either be a string or a stream (StdIn/StdOut/StdErr)
    this._filename      = filename;

    // Save contents for writing/reading
    this._contents      = contents || '';

    // When not unicode, should throw error when writing unicode
    this._unicode       = unicode === false ? false : true;

    // iomode: ForReading/ForWriting/ForAppending
    if (iomode && [1, 2, 8].indexOf(iomode) === -1) {
        throw new TypeError('Invalid procedure call or argument');
    } else {
        this._iomode = iomode || 1;
        switch (this._iomode) {
            case 1:
                this._setAtEnds();
                break;
            case 2:
                this._contents = '';
                break;
            case 8:
                this._setColumnLine();
                break;
        }
    }
};

TextStream.prototype._parseInt = function(num) {
    if (typeof num !== 'number' || isNaN(parseInt(num, 10))) throw new TypeError();
    return parseInt(num, 10);
}

TextStream.prototype._setAtEnds = function() {
    var linesArr = this._contents.split('\n');
    this.AtEndOfLine = linesArr[this.Line - 1].length === this.Column - 1;
    this.AtEndOfStream = linesArr.length === this.Line && this.AtEndOfLine;
}

TextStream.prototype._setColumnLine = function(column, line) {
    this.Line = line || this._contents.split('\n').length;
    this.Column = column || this._contents.split('\n').pop().length + 1;
}

TextStream.prototype._updateProps = function(column, line) {
    this._setColumnLine(column, line);
    this._setAtEnds();
}

TextStream.prototype._movePointer = function(spaces) {
    var i = 0,
        spaces = this._parseInt(spaces);

    while (i < spaces && !this.AtEndOfStream) {
        if (this.AtEndOfLine) {
            this._updateProps(1, this.Line + 1);
        } else {
            this._updateProps(this.Column + 1, this.Line);
        }
        i++;
    }
}

// https://msdn.microsoft.com/en-us/library/yb3tbdkw(v=vs.84).aspx
TextStream.prototype.Close = function() {
    return null;
};

// https://msdn.microsoft.com/en-us/library/dhyx75w2(v=vs.84).aspx
TextStream.prototype.Read = function(characters) {
    characters = this._parseInt(characters);

    var linesArr = this._contents.split('\n');
    var startAt = linesArr.splice(this.Line - 1).join('\n').substr(this.Column - 1);

    this._movePointer(characters);

    return startAt.substr(0, characters);
};

// https://msdn.microsoft.com/en-us/library/t58aa4dd(v=vs.84).aspx
TextStream.prototype.ReadAll = function() {
    return this.Read(this._contents.length);
};

// https://msdn.microsoft.com/en-us/library/h7se9d4f(v=vs.84).aspx
TextStream.prototype.ReadLine = function() {
    var curLine = this._contents.split('\n')[this.Line - 1];
    var line = curLine.substr(this.Column - 1);

    this._updateProps(1, this.Line + 1);

    return line;
};

// https://msdn.microsoft.com/en-us/library/08xz3c5a(v=vs.84).aspx
TextStream.prototype.Skip = function(characters) {
    this._movePointer(characters);
};

// https://msdn.microsoft.com/en-us/library/zbhhkawe(v=vs.84).aspx
TextStream.prototype.SkipLine = function(characters) {
    characters = this._parseInt(characters);

    var lines = this._contents.split('\n');

    return lines.slice(characters, lines.length).join('\n');
};

// https://msdn.microsoft.com/en-us/library/6ee7s9w2(v=vs.84).aspx
TextStream.prototype.Write = function(string) {
    if (!this._unicode && /[^\u0000-\u00ff]/.test(string)) {
        throw new TypeError('Invalid procedure call or argument');
    }

    this._contents += string;
    this._updateProps();
};

// https://msdn.microsoft.com/en-us/library/eysctzwa(v=vs.84).aspx
TextStream.prototype.WriteBlankLines = function(lines) {
    lines = this._parseInt(lines);

    for (var i = 0; i < lines; i++) {
        this._contents += '\n';
    }
    this._updateProps();
};

// https://msdn.microsoft.com/en-us/library/t5399c99(v=vs.84).aspx
TextStream.prototype.WriteLine = function(string) {
    if (!this._unicode && /[^\u0000-\u00ff]/.test(string)) {
        throw new TypeError('Invalid procedure call or argument');
    }

    this._contents += string ? string + '\n' : '\n';
    this._updateProps();
};

module.exports = TextStream;
