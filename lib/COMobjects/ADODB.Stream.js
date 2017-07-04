'use strict';

var ArrayBufferString = require('../util/ArrayBufferString');

/**
 * ADODB.Stream.js
 * This Object spoofs the ADODB.Stream Object
 * Properties and methods taken from Microsoft documentation
 * https://msdn.microsoft.com/en-us/library/ms677486(v=vs.85).aspx
 */

/**
 * ADODB.Stream uses a buffer with 2-bytes per character. We emulate this
 * with an JS ArrayBuffer
 */

class ADODBStream {
    constructor() {
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
        // Getters & setters
        this.type          = 2;
        this._type          = 2;

        // Custom properties
        this._data         = new ArrayBufferString();

        this._name         = 'ADODB.Stream';

        Object.defineProperty(this, 'type', {
            get: function() {
                return this._type;
            },
            set: function(type) {
                this._data._setType(type);
                this._data._clean();
                this._type = type;
            }
        });
    }

    toString() {
        return this._name;
    }

    // Getters
    _getLineSeparator() {
        const ls = this.lineSeparator;

        if (ls === 13) {
            return '\r';
        } else if (ls === 10) {
            return '\n';
        } else {
            return '\r\n';
        }
    }

    // Helpers
    _setPosition() {
        this.position = this._data.getLength();
    }

    _throwArgumentsError() {
        throw new TypeError('Arguments are of the wrong type, are out of acceptable range, or are in conflict with one another');
    }

    _throwOperationContextError() {
        throw new TypeError('Operation is not allowed in this context.');
    }

    // Default methods
    // https://msdn.microsoft.com/en-us/library/ms681014(v=vs.85).aspx
    cancel() {
        this.state = 0;
    }

    // https://msdn.microsoft.com/en-us/library/ms675814(v=vs.85).aspx
    close() {
        this.state = 0;
        this.flush();
    }

    // https://msdn.microsoft.com/en-us/library/ms677586(v=vs.85).aspx
    copyTo(destStream, numChars) {
        if (!destStream || destStream instanceof ADODBStream === false || destStream.state === 0) {
            this._throwArgumentsError();
        }

        destStream.mode  = this.mode;
        destStream.type  = this._type;

        if (numChars !== null && numChars !== undefined) {
            if (isNaN(parseInt(numChars, 10))) {
                this._throwArgumentsError();
            } else if (numChars > -1) {
                var newstr = this._data.toString().replace(/^\ufeff/, '').slice(this.position, numChars);
                destStream._data.fromString(newstr);
                destStream._setPosition();
                return;
            }
        }

        destStream._data.fromString(this._data.toString());
        destStream._setPosition();
    }

    // https://msdn.microsoft.com/en-us/library/ms676997(v=vs.85).aspx
    flush() {
        this._data = new ArrayBufferString();
        this._setPosition();
    }

    // https://msdn.microsoft.com/en-us/library/ms677570(v=vs.85).aspx
    loadFromFile(fileName) {
        if (this.state === 0) {
            this._throwOperationContextError();
        }

        // TODO: Actually open file? Use VFS?
        // Throw file not found error as we're not actually loading files
        throw new Error('File could not be opened');
    }

    // https://msdn.microsoft.com/en-us/library/ms680846(v=vs.85).aspx
    open(source, mode, openOptions, userName, password) {
        if (mode !== null && mode !== undefined) {
            if (isNaN(parseInt(mode, 10)) || mode < 0 || mode > 3) {
                this._throwArgumentsError();
            } else {
                this.mode = mode;
            }
        }
        this.state = 1;
    }

    // https://msdn.microsoft.com/en-us/library/ms676702(v=vs.85).aspx
    read(numBytes) {
        if (this._type !== 1) {
            this._throwOperationContextError();
        }

        // TODO: figure out how to emulate this
    }

    // https://msdn.microsoft.com/en-us/library/ms678077(v=vs.85).aspx
    readText(numChars) {
        // numChars enum
        // -1 readAll
        // -2 readLine

        if (this._type !== 2) {
            this._throwOperationContextError();
        }

        let res = this._data.toString();
        res = res.replace(/^\ufeff/, '');

        if (numChars !== null && numChars !== undefined) {
            if (isNaN(parseInt(numChars, 10)) || numChars < -2) {
                this._throwArgumentsError();
            } else if (numChars > -1) {
                res = res.slice(this.position, numChars);
                this.position += numChars;
            } else if (numChars < -1) {
                // Return rest of line from position
                const ls = this._getLineSeparator();
                let oldPosition = this.position;
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
    }

    // https://msdn.microsoft.com/en-us/library/ms676745(v=vs.85).aspx
    saveToFile(fileName, saveOptionsEnum) {
        // saveOptionsEnum:
        // 1 adSaveCreateNotExists - Does not overwrite if file exists
        // 2 adSaveCreateOverWrite - Overwrites if file exists
        if (saveOptionsEnum && (saveOptionsEnum !== 1 && saveOptionsEnum !== 2)) {
            this._throwArgumentsError();
        }
        // TODO

        this.position = 0;

        if (global.VFS) {
            global.VFS.createTextFile(global.VFS._formatPath(fileName));
            global.VFS._updateFileContent(fileName, this._data.toString());
        }
    }

    // https://msdn.microsoft.com/en-us/library/ms676560(v=vs.85).aspx
    setEOS() {
        this.EOS = true;
        this._data.fromString(this._data.toString().slice(1, 1 + (this.position / 2)));
    }

    // https://msdn.microsoft.com/en-us/library/ms675056(v=vs.85).aspx
    skipLine() {
        let ls = this._getLineSeparator(),
            data = this._data.toString();

        this.position = (data.indexOf(ls, this.position / 2) + ls.length) * 2 - 1;
    }

    // https://msdn.microsoft.com/en-us/library/ms677226(v=vs.85).aspx
    stat() {
        // not supported? See examples/ADODB.Stream/Stat.js
    }

    // https://msdn.microsoft.com/en-us/library/ms675017(v=vs.85).aspx
    write(bytestring) {
        if (this._type !== 1) {
            this._throwOperationContextError();
        }

        var bytes = new ArrayBufferString();
        bytes._setType(1);
        bytes._clean();

        if (bytestring instanceof ArrayBuffer) {
            bytes.appendBuffer(bytestring);
        } else {
            bytes.fromString(bytestring || '');
        }

        this._data.appendBuffer(bytes._content);
        this._setPosition();
    }

    // https://msdn.microsoft.com/en-us/library/ms676597(v=vs.85).aspx
    writeText(strData, bNewLine) {
        if (this._type !== 2) {
            this._throwOperationContextError();
        }

        if (bNewLine && bNewLine !== 1) {
            this._throwArgumentsError();
        }

        let ls = bNewLine && bNewLine === 1 ? this._getLineSeparator() : '';

        (strData + ls).split('').forEach(c => {
            this._data.addChar(c);
        });

        this.position = 2 + (this.position + strData.length) * 2;
    }
}

const ProxyGenerator = require('../../vendor/ProxyGenerator');
module.exports = new ProxyGenerator(ADODBStream);
