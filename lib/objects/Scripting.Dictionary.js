'use strict';

/**
 * Scripting.Dictionary.js
 * This Object spoofs the Scripting.Dictionary Object
 * Properties and methods taken from Microsoft documentation
 * https://msdn.microsoft.com/en-us/library/x4k5wbx4(v=vs.84).aspx
 */

class ScriptingDictionary {
    constructor() {
        // Default properties
        this.Count = 0;
        this.Key   = null;
        this.CompareMode = null;

        this._contents = {};
    }

    // Custom functions
    _updateCount() {
        this.Count = Object.keys(this._contents).length;
    }

    // https://msdn.microsoft.com/en-us/library/5h92h863(v=vs.84).aspx
    Add(key, value) {
        if (!key || !value) {
            throw new TypeError('Wrong number of arguments or invalid property assignment');
        }

        if (this._contents.hasOwnProperty(key)) {
            throw new TypeError('Unknown runtime error');
        }

        this._contents[key] = value;
        this._updateCount();
    }

    // https://msdn.microsoft.com/en-us/library/57hdf10z(v=vs.84).aspx
    Exists(key) {
        if (!key) {
            throw new TypeError('Wrong number of arguments or invalid property assignment');
        }

        return this._contents.hasOwnProperty(key) ? -1 : 0;
    }

    // Scripting.Dictionary Item behaves as a method, not an attribute
    Item(key) {
        if (!key) {
            throw new TypeError('Object doesn\'t support this property or method');
        }

        return this._contents[key] || '';
    }

    // https://msdn.microsoft.com/en-us/library/8aet97f2(v=vs.84).aspx
    Items() {
        const vals = [];
        for (let key in this._contents) {
            vals.push(this._contents[key]);
        }
        return vals;
    }

    // https://msdn.microsoft.com/en-us/library/etzd1tzc(v=vs.84).aspx
    Keys() {
        return Object.keys(this._contents);
    }

    // https://msdn.microsoft.com/en-us/library/ywyayk03(v=vs.84).aspx
    Remove(key) {
        if (!key) {
            throw new TypeError('Wrong number of arguments or invalid property assignment');
        }

        delete this._contents[key];
        this._updateCount();
    }

    // https://msdn.microsoft.com/en-us/library/45731e2w(v=vs.84).aspx
    RemoveAll() {
        this._contents = {};
        this._updateCount();
    }
}

module.exports = ScriptingDictionary;
