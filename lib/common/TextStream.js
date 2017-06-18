'use strict';

const ResponseText = require('../config/ResponseText');

/**
 * TextStream.js
 * This Object spoofs the TextStream Object
 * Properties and methods taken from Microsoft documentation
 * https://msdn.microsoft.com/en-us/library/312a5kbt(v=vs.84).aspx
 */
class TextStream {
    constructor(filename, contents, unicode, iomode, fullpath) {
        // Default properties
        this.AtEndOfLine    = false;
        this.AtEndOfStream  = false;
        this.Column         = 1;
        this.Line           = 1;

        // Custom properties
        // Filename can either be a string or a stream (StdIn/StdOut/StdErr)
        this._filename      = filename;
		this._fullpath      = fullpath;

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
    }

    _parseInt(num) {
        if (typeof num !== 'number' || isNaN(parseInt(num, 10))) throw new TypeError();
        return parseInt(num, 10);
    }

    _setAtEnds() {
        const linesArr = this._contents.split('\n');
        this.AtEndOfLine = linesArr[this.Line - 1].length === this.Column - 1;
        this.AtEndOfStream = linesArr.length === this.Line && this.AtEndOfLine;
    }

    _setColumnLine(column, line) {
        this.Line = line || this._contents.split('\n').length;
        this.Column = column || this._contents.split('\n').pop().length + 1;
    }

    _updateProps(column, line) {
        this._setColumnLine(column, line);
        this._setAtEnds();
    }

    _movePointer(spaces) {
        let i = 0;
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
    Close() {
        return null;
    }

    // https://msdn.microsoft.com/en-us/library/dhyx75w2(v=vs.84).aspx
    Read(characters) {
        let linesArr = this._contents.split('\n'),
            startAt = linesArr.splice(this.Line - 1).join('\n').substr(this.Column - 1);

        characters = this._parseInt(characters);

        this._movePointer(characters);

        return startAt.substr(0, characters);
    }

    // https://msdn.microsoft.com/en-us/library/t58aa4dd(v=vs.84).aspx
    ReadAll() {
        return this.Read(this._contents.length);
    }

    // https://msdn.microsoft.com/en-us/library/h7se9d4f(v=vs.84).aspx
    ReadLine() {
        let curLine = this._contents.split('\n')[this.Line - 1],
            line = curLine.substr(this.Column - 1);

        this._updateProps(1, this.Line + 1);

        return line;
    }

    // https://msdn.microsoft.com/en-us/library/08xz3c5a(v=vs.84).aspx
    Skip(characters) {
        this._movePointer(characters);
    }

    // https://msdn.microsoft.com/en-us/library/zbhhkawe(v=vs.84).aspx
    SkipLine(characters) {
        characters = this._parseInt(characters);

        let lines = this._contents.split('\n');

        return lines.slice(characters, lines.length).join('\n');
    }

    // https://msdn.microsoft.com/en-us/library/6ee7s9w2(v=vs.84).aspx
    Write(string) {
        if (!this._unicode && /[^\u0000-\u00ff]/.test(string)) {
            throw new TypeError('Invalid procedure call or argument');
        }

        this._contents += string;
        this._updateProps();
    }

    // https://msdn.microsoft.com/en-us/library/eysctzwa(v=vs.84).aspx
    WriteBlankLines(lines) {
        lines = this._parseInt(lines);

        for (let i = 0; i < lines; i++) {
            this._contents += '\n';
        }
        this._updateProps();
    }

    // https://msdn.microsoft.com/en-us/library/t5399c99(v=vs.84).aspx
    WriteLine(string) {
        if (!this._unicode && /[^\u0000-\u00ff]/.test(string)) {
            throw new TypeError('Invalid procedure call or argument');
        }

        this._contents += string ? string + '\n' : '\n';
        this._updateProps();
    }
}

module.exports = class TextStreamProxy {
    constructor() {
        return new Proxy(new TextStream(...arguments), {
            get(target, propKey, receiver) {
                const methods = Object.getOwnPropertyNames(target.constructor.prototype);
                const props = Object.keys(target);
                let matched = null;

                let regex = null;
                try {
                    regex = new RegExp(`^${propKey}$`, 'i');
                } catch(e) {
                    return matched;
                }

                for (let i in methods) {
                    if (regex.test(methods[i])) {
                        matched = methods[i];
                    }
                }

                for (let i in props) {
                    if (regex.test(props[i])) {
                        matched = props[i];
                    }
                }

                return target[matched];
            }
        });
    }
}
