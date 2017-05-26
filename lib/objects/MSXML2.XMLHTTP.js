'use strict';

var ResponseHeaders = require('../config/ResponseHeaders');

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

const throwInvalidAssignmentError = () => {
    throw new Error('Wrong number of arguments or invalid property assignment');
}

const throwInvalidCallError = () => {
    throw new Error('Object doesn\'t support this property or method');
}

const throwNotYetAvailableError = () => {
    throw new Error('The data necessary to complete this operation is not yet available.');
}

class MSXML2XMLHTTP {
    constructor(strProgId) {
        // Properties
        this._strProgId = strProgId ? strProgId.toUpperCase() : 'MSXML2.XMLHTTP';
        // this._version = parseInt(this._strProgId.match(/MSXML2.XMLHTTP\.?([0-9.]+)?/)[1] || 1, 10);

        // https://msdn.microsoft.com/en-us/library/ms762767(v=vs.85).aspx
        this.onreadystatechange = null;
        this._onreadystatechange = function(){};

        // https://msdn.microsoft.com/en-us/library/ms753800(v=vs.85).aspx
        // 0 UNINTIALIZED
        // 1 LOADING
        // 2 LOADED
        // 3 INTERACTIVE
        // 4 COMPLETED
        this.readyState = null;
        this._readyState = 0;

        // https://msdn.microsoft.com/en-us/library/ms756095(v=vs.85).aspx
        this.responseBody = null;
        this._responseBody = null;

        // https://msdn.microsoft.com/en-us/library/ms763792(v=vs.85).aspx
        this.responseStream = null;
        this._responseStream = null;

        // https://msdn.microsoft.com/en-us/library/ms762275(v=vs.85).aspx
        this.responseText = null;
        this._responseText = null;

        // https://msdn.microsoft.com/en-us/library/ms757066(v=vs.85).aspx
        this.responseXML = null;
        this._responseXML = null;

        // https://msdn.microsoft.com/en-us/library/ms767625(v=vs.85).aspx
        // Returns HTTP-status code
        this.status = null;
        this._status = 200;

        // https://msdn.microsoft.com/en-us/library/ms759127(v=vs.85).aspx
        this.statusText = null;
        this._statusText = 'OK';

        this._requestHeaders = [];

        // Getters & setters
        Object.defineProperties(this, {
            'onreadystatechange': {
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
            },
            'readyState': {
                get: function() {
                    return this._readyState;
                },
                set: throwInvalidAssignmentError
            },
            'responseBody': {
                get: function() {
                    if (this._readyState !== 4) {
                        throwInvalidCallError();
                    } else {
                        return this._responseBody;
                    }
                },
                set: throwInvalidAssignmentError
            },
            'responseStream': {
                get: function() {
                    if (this._readyState !== 4) {
                        throwInvalidCallError();
                    } else {
                        return this._responseStream;
                    }
                },
                set: throwInvalidAssignmentError
            },
            'responseText': {
                get: function() {
                    if (this._readyState !== 4) {
                        throwInvalidCallError();
                    } else {
                        return this._responseText;
                    }
                },
                set: throwInvalidAssignmentError
            },
            'responseXML': {
                get: function() {
                    if (this._readyState !== 4) {
                        throwInvalidCallError();
                    } else {
                        return this._responseXML;
                    }
                },
                set: throwInvalidAssignmentError
            },
            'status': {
                get: function() {
                    if (this._readyState !== 4) {
                        throwNotYetAvailableError();
                    } else {
                        return this._status;
                    }
                },
                set: throwInvalidAssignmentError
            },
            'statusText': {
                get: function() {
                    if (this._readyState !== 4) {
                        throwNotYetAvailableError();
                    } else {
                        return this._statusText;
                    }
                },
                set: throwInvalidAssignmentError
            }
        });
    }

    // Custom methods
    _fireOnReadyStateChange(readyState) {
        this._readyState = readyState;
        return this._onreadystatechange();
    }

    // Default methods
    // https://msdn.microsoft.com/en-us/library/ms760349(v=vs.85).aspx
    abort() {
        this._readyState = 0;
    }

    // https://msdn.microsoft.com/en-us/library/ms766595(v=vs.85).aspx
    getAllResponseHeaders() {
        if (this._readyState !== 4) {
            throwNotYetAvailableError();
        } else {
            let resString = 'HTTP/1.1 200 OK';
            for (let i in ResponseHeaders) {
                resString += '\r\n' + [i, ResponseHeaders[i]].join(': ');
            }
            return resString;
        }
    }

    // https://msdn.microsoft.com/en-us/library/ms757006(v=vs.85).aspx
    getResponseHeader(bstrHeader) {
        if (this._readyState !== 4) {
            throwNotYetAvailableError();
        } else {
            return ResponseHeaders[bstrHeader] || '';
        }
    }

    // https://msdn.microsoft.com/en-us/library/ms757849(v=vs.85).aspx
    open(bstrMethod, bstrUrl, varAsync, bstrUser, bstrPassword) {
        if (!bstrMethod || !bstrUrl) {
            throwInvalidAssignmentError();
        }

        if (varAsync && !!varAsync) {
            this._readyState = 4;
        } else {
            this._fireOnReadyStateChange(1);
        }
    }

    // https://msdn.microsoft.com/en-us/library/ms763706(v=vs.85).aspx
    send(varBody) {
        if (this._readyState === 0) {
            throwInvalidCallError();
        } else if (this._readyState !== 4) {
            // Cycle through readyStates
            this._fireOnReadyStateChange(2);
            this._fireOnReadyStateChange(3);
            this._fireOnReadyStateChange(4);
        } else {
            // Called asynchronously, skip to readyState 4 immediately
            this._readyState = 4;
        }
    }

    // https://msdn.microsoft.com/en-us/library/ms766589(v=vs.85).aspx
    setRequestHeader(bstrHeader, bstrValue) {
        if (!bstrHeader || !bstrValue) {
            throwInvalidAssignmentError();
        }

        if (this._readyState === 0) {
            throwInvalidCallError();
        } else {
            this._requestHeaders.push([bstrHeader, bstrValue]);
        }
    }
}

module.exports = MSXML2XMLHTTP;
