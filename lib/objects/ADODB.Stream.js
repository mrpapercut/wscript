'use strict';

/**
 * ADODB.Stream.js
 * This Object spoofs the ADODB.Stream Object
 * Properties and methods taken from Microsoft documentation
 * https://msdn.microsoft.com/en-us/library/ms677486(v=vs.85).aspx
 *
 * Note: the documentation mentions all properties and methods capitalized
 * but all working examples I've seen use lowercase only. To comply with
 * examples from JScript, we declare all as lowercase.
 */

var ADODBStream = function() {
    // Default properties
    // https://msdn.microsoft.com/en-us/library/ms681424(v=vs.85).aspx
    this.charset       = 'unicode';

    // https://msdn.microsoft.com/en-us/library/ms676145(v=vs.85).aspx
    this.EOS           = false;

    // https://msdn.microsoft.com/en-us/library/ms675062(v=vs.85).aspx
    // -1 = adCRLF
    // 10 = adLF
    // 13 = adCR
    this.lineSeparator = -1;

    // https://msdn.microsoft.com/en-us/library/ms676693(v=vs.85).aspx
    // 0 = mode unknown
    // 1 = read-only
    // 2 = write-only
    // 3 = read/write
    this.mode          = 1;

    // https://msdn.microsoft.com/en-us/library/ms680965(v=vs.85).aspx
    this.position      = 0;

    // https://msdn.microsoft.com/en-us/library/ms677520(v=vs.85).aspx
    // Because we don't actually use a stream, setting Size to Infinity
    // means that checks against fixed bytesize always return true
    // e.g. if (ADODBStream.Size > 65535) { will return true
    this.size          = Infinity;

    // https://msdn.microsoft.com/en-us/library/ms675068(v=vs.85).aspx
    // 0 = closed
    // 1 = open
    // 2 = connecting
    // 4 = object is executing
    // 8 = object is retrieving
    this.state         = 0;

    // https://msdn.microsoft.com/en-us/library/ms681553(v=vs.85).aspx
    // 1 = Indicates binary data
    // 2 = Indicates text data
    this.type          = 2;

    // Custom properties
    this._data         = '';
};

// Getters
ADODBStream.prototype._getLineSeparator = function() {
    var ls = this.lineSeparator;

    if (ls === 13) {
        return '\r';
    } else if (ls === 10) {
        return '\n';
    } else {
        return '\r\n';
    }
};

// Default methods
// https://msdn.microsoft.com/en-us/library/ms681014(v=vs.85).aspx
ADODBStream.prototype.cancel = function() {
    this.state = 0;
};

// https://msdn.microsoft.com/en-us/library/ms675814(v=vs.85).aspx
ADODBStream.prototype.close = function() {
    this.state = 0;
    this.flush();
};

// https://msdn.microsoft.com/en-us/library/ms677586(v=vs.85).aspx
ADODBStream.prototype.copyTo = function(destStream, numChars) {
    if (!destStream || destStream instanceof ADODBStream === false || destStream.state === 0) {
        throw new TypeError('Arguments are of the wrong type, are out of acceptable range, or are in conflict with one another');
    }

    destStream.mode  = this.mode;
    destStream.type  = this.type;

    if (numChars !== null && numChars !== undefined) {
        if (isNaN(parseInt(numChars, 10))) {
            throw new TypeError('Arguments are of the wrong type, are out of acceptable range, or are in conflict with one another');
        } else if (numChars === -1) {
            destStream._data = this._data;
        } else {
            destStream._data = this._data.slice(0, numChars);
        }
    } else {
        destStream._data = this._data;
    }
};

// https://msdn.microsoft.com/en-us/library/ms676997(v=vs.85).aspx
ADODBStream.prototype.flush = function() {
    this._data = null;
};

// https://msdn.microsoft.com/en-us/library/ms677570(v=vs.85).aspx
ADODBStream.prototype.loadFromFile = function(fileName) {
    if (this.state === 0) {
        throw new Error('Operation is not allowed when the object is closed.');
    }

    // TODO: Actually open file?
    // Throw file not found error as we're not actually loading files
    throw new Error('File could not be opened');
};

// https://msdn.microsoft.com/en-us/library/ms680846(v=vs.85).aspx
ADODBStream.prototype.open = function(source, mode, openOptions, userName, password) {
    if (mode !== null && mode !== undefined) {
        if (isNaN(parseInt(mode, 10)) || mode < 0 || mode > 3) {
            throw new TypeError('Arguments are of the wrong type, are out of acceptable range, or are in conflict with one another');
        } else {
            this.mode = mode;
        }
    }
    this.state = 1;
};

// https://msdn.microsoft.com/en-us/library/ms676702(v=vs.85).aspx
ADODBStream.prototype.read = function(numBytes) {
    if (this.type !== 1) {
        throw new TypeError('Operation is not allowed in this context.');
    }
};

// https://msdn.microsoft.com/en-us/library/ms678077(v=vs.85).aspx
ADODBStream.prototype.readText = function(numChars) {
    if (this.type !== 2) {
        throw new TypeError('Operation is not allowed in this context.');
    }

    if (numChars !== null && numChars !== undefined) {
        if (isNaN(parseInt(numChars, 10))) {
            throw new TypeError('Arguments are of the wrong type, are out of acceptable range, or are in conflict with one another');
        } else if (numChars > -1) {
            return this._data.slice(0, numChars);
        }
    }

    return this._data;
};

// https://msdn.microsoft.com/en-us/library/ms676745(v=vs.85).aspx
ADODBStream.prototype.saveToFile = function() {

};

// https://msdn.microsoft.com/en-us/library/ms676560(v=vs.85).aspx
ADODBStream.prototype.setEOS = function() {
    this.EOS = true;
    this._data = this._data.slice(0, this.position);
};

// https://msdn.microsoft.com/en-us/library/ms675056(v=vs.85).aspx
ADODBStream.prototype.skipLine = function() {

};

// https://msdn.microsoft.com/en-us/library/ms677226(v=vs.85).aspx
ADODBStream.prototype.stat = function() {

};

// https://msdn.microsoft.com/en-us/library/ms675017(v=vs.85).aspx
ADODBStream.prototype.write = function() {
    if (this.type !== 1) {
        throw new TypeError('Operation is not allowed in this context.');
    }
};

// https://msdn.microsoft.com/en-us/library/ms676597(v=vs.85).aspx
ADODBStream.prototype.writeText = function(strData, bNewLine) {
    if (this.type !== 2) {
        throw new TypeError('Operation is not allowed in this context.');
    }

    this.position += strData.length;

    this._data += strData;

    if (bNewLine && bNewLine === 1) {
        this._data += this._getLineSeparator();
    }
};

module.exports = ADODBStream;
