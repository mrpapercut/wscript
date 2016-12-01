'use strict';

/**
 * Enumerator.js
 * This Object spoofs the Scripting.FileSystemObject Enumerator Object
 * Properties and methods taken from Microsoft documentation
 * https://msdn.microsoft.com/en-us/library/x32bxwys(v=vs.100).aspx
 */

/**
 * An Enumerator is used on collections, as collections don't allow
 * direct member access, except with for..in loops. As our collections
 * are simple arrays, this is easily emulated.
 */
var Enumerator = function(collection) {
    if (collection instanceof Array === false) {
        throw new TypeError('Invalid type');
    }

    this._collection = collection;
    this._length     = collection.length;
    this._index      = 0;
};

// Default methods
// https://msdn.microsoft.com/en-us/library/b8w3zzse(v=vs.100).aspx
Enumerator.prototype.atEnd = function() {
    return this._index >= this._length;
};

// https://msdn.microsoft.com/en-us/library/y4s58h5h(v=vs.100).aspx
Enumerator.prototype.item = function() {
    return this.atEnd() ? undefined : this._collection[this._index];
};

// https://msdn.microsoft.com/en-us/library/5whkkbkf(v=vs.100).aspx
Enumerator.prototype.moveFirst = function() {
    this._index = 0;
};

// https://msdn.microsoft.com/en-us/library/s1t8z1b3(v=vs.100).aspx
Enumerator.prototype.moveNext = function() {
    this._index++;
};

module.exports = Enumerator;
