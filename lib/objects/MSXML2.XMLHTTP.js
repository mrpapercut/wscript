'use strict';

/**
 * MSXML2.XMLHTTP.js
 * This Object spoofs the MSXML2.XMLHTTP Object
 * Properties and methods taken from Microsoft documentation
 * https://msdn.microsoft.com/en-us/library/ms760305(v=vs.85).aspx
 *
 * Note: Different versions of Windows use different forms of
 * this object, like MSXML2.XMLHTTP.3.0 or MSXML2.XMLHTTP.6.0.
 * This object ignores versioning.
 */

var MSXML2XMLHTTP = function(strProgId) {
    // Properties
    this._strProgId = strProgId ? strProgId.toUpperCase() : 'MSXML2.XMLHTTP';
    this._version = parseInt(this._strProgId.match(/MSXML2.XMLHTTP\.?([0-9.]+)?/)[1] || 0, 10);

    // https://msdn.microsoft.com/en-us/library/ms762767(v=vs.85).aspx
    this.onreadystatechange = null;
    this._onreadystatechange = function(){};
    Object.defineProperty(this, 'onreadystatechange', {
        get: function() {
            throw new Error('Object doesn\'t support this property or method');
        },
        set: function(fn) {
            if (typeof fn !== 'function') {
                throw new Error('Type mismatch');
            } else {
                this._onreadystatechange = fn;
            }
        }
    });

    // https://msdn.microsoft.com/en-us/library/ms753800(v=vs.85).aspx
    // 0 UNINTIALIZED
    // 1 LOADING
    // 2 LOADED
    // 3 INTERACTIVE
    // 4 COMPLETED
    this.readyState = null;
    this._readyState = 0;
    Object.defineProperty(this, 'readyState', {
        get: function() {
            return this._readyState;
        },
        set: function() {
            throw new Error('Wrong number of arguments or invalid property assignment');
        }
    });

    // https://msdn.microsoft.com/en-us/library/ms756095(v=vs.85).aspx
    this.responseBody = null;

    // https://msdn.microsoft.com/en-us/library/ms763792(v=vs.85).aspx
    this.responseStream = null;

    // https://msdn.microsoft.com/en-us/library/ms762275(v=vs.85).aspx
    this.responseText = null;

    // https://msdn.microsoft.com/en-us/library/ms757066(v=vs.85).aspx
    this.responseXML = null;

    // https://msdn.microsoft.com/en-us/library/ms767625(v=vs.85).aspx
    this.status = null;

    // https://msdn.microsoft.com/en-us/library/ms759127(v=vs.85).aspx
    this.statusText = null;
};

// Custom methods
MSXML2XMLHTTP.prototype._fireOnReadyStateChange = function(readyState) {
    this._readyState = readyState;
    return this._onreadystatechange();
};

// Default methods
// https://msdn.microsoft.com/en-us/library/ms760349(v=vs.85).aspx
MSXML2XMLHTTP.prototype.abort = function() {

};

// https://msdn.microsoft.com/en-us/library/ms766595(v=vs.85).aspx
MSXML2XMLHTTP.prototype.getAllResponseHeaders = function() {

};

// https://msdn.microsoft.com/en-us/library/ms757006(v=vs.85).aspx
MSXML2XMLHTTP.prototype.getResponseHeader = function() {

};

// https://msdn.microsoft.com/en-us/library/ms757849(v=vs.85).aspx
MSXML2XMLHTTP.prototype.open = function() {
    this._fireOnReadyStateChange(1);
};

// https://msdn.microsoft.com/en-us/library/ms763706(v=vs.85).aspx
MSXML2XMLHTTP.prototype.send = function() {

};

// https://msdn.microsoft.com/en-us/library/ms766589(v=vs.85).aspx
MSXML2XMLHTTP.prototype.setRequestHeader = function() {

};

module.exports = MSXML2XMLHTTP;
