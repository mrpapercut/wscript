/**
 * Helper for ArrayBuffer <-> String conversions
 */

class ArrayBufferString {
    constructor() {
        this._type = 2;
        this._content = this.getIntArr([0xfeff]).buffer;
    }

    _setType(type) {
        this._type = type;
        this.fromString(this.toString());
    }

    getIntArr(content) {
        if (this._type === 1) {
            return new Uint8Array(content);
        } else {
            return new Uint16Array(content);
        }
    }

    fromString(str) {
        var buf = new ArrayBuffer(str.length * this._type);
        var bufView = this.getIntArr(buf);
        for (var i=0; i < str.length; i++) {
            bufView[i] = str.charCodeAt(i);
        }
        this._content = buf;
    }

    addByte(byte) {
        var bufView = this.getIntArr(this._content);
        var newbuf = new ArrayBuffer(bufView.byteLength + (1 * this._type));
        var newView = this.getIntArr(newbuf);
        newView.set(bufView, 0);
        newView[bufView.byteLength] = byte;
        this._content = newbuf;
    }

    addChar(char) {
        var bufView = this.getIntArr(this._content);
        var newbuf = new ArrayBuffer(bufView.byteLength + (1 * this._type));
        var newView = this.getIntArr(newbuf);
        newView.set(bufView, 0);
        newView[bufView.byteLength / this._type] = char.charCodeAt(0);
        this._content = newbuf;
    }

    getLength() {
        return this._content.byteLength;
    }

    toString() {
        var bufferView = this.getIntArr(this._content),
            chars = [];

        bufferView.forEach(c => chars.push(String.fromCharCode(c)));

        return chars.join('');
    }
}

module.exports = ArrayBufferString;
