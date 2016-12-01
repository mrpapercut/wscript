'use strict';

/**
 * Drive.js
 * This Object spoofs the Scripting.FileSystemObject Drive Object
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

    this.collection = collection;
    this.index      = 0;
    this._length    = this.collection.length;
};

// Default methods
// https://msdn.microsoft.com/en-us/library/b8w3zzse(v=vs.100).aspx
Enumerator.prototype.atEnd = function() {
    return this.index >= this._length;
};

// https://msdn.microsoft.com/en-us/library/y4s58h5h(v=vs.100).aspx
Enumerator.prototype.item = function() {
    return this.index < this._length ? this.collection[this.index] : undefined;
};

// https://msdn.microsoft.com/en-us/library/5whkkbkf(v=vs.100).aspx
Enumerator.prototype.moveFirst = function() {
    this.index = 0;
};

// https://msdn.microsoft.com/en-us/library/s1t8z1b3(v=vs.100).aspx
Enumerator.prototype.moveNext = function() {
    this.index++;
};
