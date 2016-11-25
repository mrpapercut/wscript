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

/**
 * ADODB.Stream uses a buffer with 2-bytes per character. We emulate this
 * with an JS ArrayBuffer
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
    // TODO: Make better
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
    this._data         = this._stringToArrayBuffer('\ufeff');
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

// Helpers
ADODBStream.prototype._stringToArrayBuffer = function(string) {
    var buffer = new ArrayBuffer(string.length * 2),
        bufferView = new Uint16Array(buffer);

    for (var i = 0; i < string.length; i++) {
        bufferView[i] = string.charCodeAt(i);
    }

    return buffer;
};

ADODBStream.prototype._arrayBufferToString = function(buffer) {
    var bufferView = new Uint16Array(buffer),
        chars = [];

    bufferView.forEach(function(c) {
        chars.push(String.fromCharCode(c));
    });

    return chars.join('');
};

ADODBStream.prototype._setPosition = function() {
    this.position = this._data.byteLength;
};

ADODBStream.prototype._throwArgumentsError = function() {
    throw new TypeError('Arguments are of the wrong type, are out of acceptable range, or are in conflict with one another');
};

ADODBStream.prototype._throwOperationContextError = function() {
    throw new TypeError('Operation is not allowed in this context.');
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
        this._throwArgumentsError();
    }

    destStream.mode  = this.mode;
    destStream.type  = this.type;

    if (numChars !== null && numChars !== undefined) {
        if (isNaN(parseInt(numChars, 10))) {
            this._throwArgumentsError();
        } else if (numChars > -1) {
            destStream._data = this._stringToArrayBuffer('\ufeff' +
                this._arrayBufferToString(this._data)
                    .replace('\ufeff', '')
                    .slice(this.position, numChars)
                );
            destStream._setPosition();
            return;
        }
    }

    destStream._data = this._data;
    destStream._setPosition();
};

// https://msdn.microsoft.com/en-us/library/ms676997(v=vs.85).aspx
ADODBStream.prototype.flush = function() {
    this._data = this._stringToArrayBuffer('\ufeff');
    this._setPosition();
};

// https://msdn.microsoft.com/en-us/library/ms677570(v=vs.85).aspx
ADODBStream.prototype.loadFromFile = function(fileName) {
    if (this.state === 0) {
        this._throwOperationContextError();
    }

    // TODO: Actually open file?
    // Throw file not found error as we're not actually loading files
    throw new Error('File could not be opened');
};

// https://msdn.microsoft.com/en-us/library/ms680846(v=vs.85).aspx
ADODBStream.prototype.open = function(source, mode, openOptions, userName, password) {
    if (mode !== null && mode !== undefined) {
        if (isNaN(parseInt(mode, 10)) || mode < 0 || mode > 3) {
            this._throwArgumentsError();
        } else {
            this.mode = mode;
        }
    }
    this.state = 1;
};

// https://msdn.microsoft.com/en-us/library/ms676702(v=vs.85).aspx
ADODBStream.prototype.read = function(numBytes) {
    if (this.type !== 1) {
        this._throwOperationContextError();
    }

    // TODO: figure out how to emulate this
};

// https://msdn.microsoft.com/en-us/library/ms678077(v=vs.85).aspx
ADODBStream.prototype.readText = function(numChars) {
    // numChars enum
    // -1 readAll
    // -2 readLine

    if (this.type !== 2) {
        this._throwOperationContextError();
    }

    var res = this._arrayBufferToString(this._data).replace('\ufeff', '');

    if (numChars !== null && numChars !== undefined) {
        if (isNaN(parseInt(numChars, 10)) || numChars < -2) {
            this._throwArgumentsError();
        } else if (numChars > -1) {
            res = res.slice(this.position, numChars);
            this.position += numChars;
        } else if (numChars < -1) {
            // Return rest of line from position
            var ls = this._getLineSeparator();
            var oldPosition = this.position;
            this.position = 2 + (res.indexOf(ls, this.position / 2) + ls.length) * 2;
            res = res.slice(oldPosition / 2, (this.position / 2) - ls.length - 1);
        } else {
            // Return all from position
            res = res.slice(this.position);
            this._setPosition();
        }
    } else {
        res = res.slice(this.position);
    }

    return res;
};

// https://msdn.microsoft.com/en-us/library/ms676745(v=vs.85).aspx
ADODBStream.prototype.saveToFile = function(fileName, saveOptionsEnum) {
    // saveOptionsEnum:
    // 1 adSaveCreateNotExists - Does not overwrite if file exists
    // 2 adSaveCreateOverWrite - Overwrites if file exists
    if (saveOptionsEnum !== 1 && saveOptionsEnum !== 2) {
        this._throwArgumentsError();
    }

    this.position = 0;
};

// https://msdn.microsoft.com/en-us/library/ms676560(v=vs.85).aspx
ADODBStream.prototype.setEOS = function() {
    this.EOS = true;
    this._data = this._stringToArrayBuffer('\ufeff' + this._arrayBufferToString(this._data).replace('\ufeff', '').slice(0, this.position / 2));
};

// https://msdn.microsoft.com/en-us/library/ms675056(v=vs.85).aspx
ADODBStream.prototype.skipLine = function() {
    var ls = this._getLineSeparator(),
        data = this._arrayBufferToString(this._data).replace('\ufeff', '');

    this.position = (data.indexOf(ls, this.position / 2) + ls.length) * 2;
};

// https://msdn.microsoft.com/en-us/library/ms677226(v=vs.85).aspx
ADODBStream.prototype.stat = function() {
    // not supported? See examples/ADODB.Stream/Stat.js
};

// https://msdn.microsoft.com/en-us/library/ms675017(v=vs.85).aspx
ADODBStream.prototype.write = function() {
    if (this.type !== 1) {
        this._throwOperationContextError();
    }

    // TODO: figure out how to emulate this
};

// https://msdn.microsoft.com/en-us/library/ms676597(v=vs.85).aspx
ADODBStream.prototype.writeText = function(strData, bNewLine) {
    if (this.type !== 2) {
        this._throwOperationContextError();
    }

    if (bNewLine && bNewLine !== 1) {
        this._throwArgumentsError();
    }

    var ls = bNewLine && bNewLine === 1 ? this._getLineSeparator() : '';

    var data = this._arrayBufferToString(this._data).replace('\ufeff', ''),
        newData = data.slice(0, this.position / 2) + strData + data.slice(this.position / 2 + strData.length);

    this._data = this._stringToArrayBuffer('\ufeff' + newData + ls);

    this.position = 2 + this.position + (strData.length * 2) + (ls.length * 2);
};

module.exports = ADODBStream;
