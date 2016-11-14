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

var MSXML2XMLHTTP = function(object) {
    // Default properties

    // https://msdn.microsoft.com/en-us/library/ms762767(v=vs.85).aspx
    this.onreadystatechange = null;

    // https://msdn.microsoft.com/en-us/library/ms753800(v=vs.85).aspx
    this.readyState = null;

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
}

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

};

// https://msdn.microsoft.com/en-us/library/ms763706(v=vs.85).aspx
MSXML2XMLHTTP.prototype.send = function() {

};

// https://msdn.microsoft.com/en-us/library/ms766589(v=vs.85).aspx
MSXML2XMLHTTP.prototype.setRequestHeader = function() {

};

module.exports = MSXML2XMLHTTP;
