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
class Enumerator {
    constructor(collection) {
        if (collection instanceof Array === false) {
            throw new TypeError('Invalid type');
        }

        this._collection = collection;
        this._length     = collection.length;
        this._index      = 0;
    }

    // Default methods
    // https://msdn.microsoft.com/en-us/library/b8w3zzse(v=vs.100).aspx
    atEnd() {
        return this._index >= this._length;
    }

    // https://msdn.microsoft.com/en-us/library/y4s58h5h(v=vs.100).aspx
    item() {
        return this.atEnd() ? undefined : this._collection[this._index];
    }

    // https://msdn.microsoft.com/en-us/library/5whkkbkf(v=vs.100).aspx
    moveFirst() {
        this._index = 0;
    }

    // https://msdn.microsoft.com/en-us/library/s1t8z1b3(v=vs.100).aspx
    moveNext() {
        this._index++;
    }
}

module.exports = class EnumeratorProxy {
    constructor() {
        return new Proxy(new Enumerator(...arguments), {
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
};
