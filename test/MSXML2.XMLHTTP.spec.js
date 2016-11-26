'use strict';

var chai = require('chai'),
    path = require('path'),
    expect = chai.expect;

var getFilePath = function(filename) {
    return path.join(__dirname, '..', 'lib', filename);
}

var getNewInstance = function(strProgId) {
    var instance = require(getFilePath('objects/MSXML2.XMLHTTP'));
    return new instance(strProgId);
}

var MSXML2XMLHTTP;

describe('MSXML2XMLHTTP', function() {
    describe('constructor()', function() {
        beforeEach(function() {
            MSXML2XMLHTTP = getNewInstance();
        });

        describe('onreadystatechange', function() {
            it('should throw error when calling onreadystatechange() directly', function() {
                expect(function() {
                    MSXML2XMLHTTP.onreadystatechange();
                }).to.throw(Error);
            });

            it('should throw error if setting onreadystatechange with invalid type', function() {
                expect(function() {
                    MSXML2XMLHTTP.onreadystatechange = true;
                }).to.throw(Error);
            });

            it('should succesfully set and run function on onreadystatechange', function() {
                expect(MSXML2XMLHTTP._fireOnReadyStateChange(0)).to.be.undefined;
                MSXML2XMLHTTP.onreadystatechange = function() {
                    return 'Hello';
                };
                expect(MSXML2XMLHTTP._fireOnReadyStateChange(0)).to.equal('Hello');
            });
        });

        describe('readyState', function() {
            it('should throw error when setting readyState and not change the value', function() {
                expect(MSXML2XMLHTTP.readyState).to.eql(0);
                expect(function() {
                    MSXML2XMLHTTP.readyState = 4;
                }).to.throw(Error);
                expect(MSXML2XMLHTTP.readyState).to.eql(0);
            });
        });

        describe('responseBody', function() {
            it('should throw error when setting responseBody', function() {
                expect(function() {
                    MSXML2XMLHTTP.responseBody = 'responseBody';
                }).to.throw(Error);
            });

            it('should throw error when readyState is not 4', function() {
                expect(function() {
                    MSXML2XMLHTTP.responseBody
                }).to.throw(Error);
                MSXML2XMLHTTP._fireOnReadyStateChange(4);
                expect(MSXML2XMLHTTP.responseBody).to.be.null;
            });
        });

        describe('responseStream', function() {
            it('should throw error when setting responseStream', function() {
                expect(function() {
                    MSXML2XMLHTTP.responseStream = 'responseStream';
                }).to.throw(Error);
            });

            it('should throw error when readyState is not 4', function() {
                expect(function() {
                    MSXML2XMLHTTP.responseStream
                }).to.throw(Error);
                MSXML2XMLHTTP._fireOnReadyStateChange(4);
                expect(MSXML2XMLHTTP.responseStream).to.be.null;
            });
        });

        describe('responseText', function() {
            it('should throw error when setting responseText', function() {
                expect(function() {
                    MSXML2XMLHTTP.responseText = 'responseText';
                }).to.throw(Error);
            });

            it('should throw error when readyState is not 4', function() {
                expect(function() {
                    MSXML2XMLHTTP.responseText
                }).to.throw(Error);
                MSXML2XMLHTTP._fireOnReadyStateChange(4);
                expect(MSXML2XMLHTTP.responseText).to.be.null;
            });
        });

        describe('responseXML', function() {
            it('should throw error when setting responseXML', function() {
                expect(function() {
                    MSXML2XMLHTTP.responseXML = 'responseXML';
                }).to.throw(Error);
            });

            it('should throw error when readyState is not 4', function() {
                expect(function() {
                    MSXML2XMLHTTP.responseXML
                }).to.throw(Error);
                MSXML2XMLHTTP._fireOnReadyStateChange(4);
                expect(MSXML2XMLHTTP.responseXML).to.be.null;
            });
        });

        describe('status', function() {
            it('should throw error when setting status', function() {
                expect(function() {
                    MSXML2XMLHTTP.status = 200;
                }).to.throw(Error);
            });

            it('should return nothing if version is less than 3.0', function() {
                MSXML2XMLHTTP._fireOnReadyStateChange(4);
                expect(MSXML2XMLHTTP.status).to.be.undefined;
            });

            it('should throw error if readyState is less than 4 and version is greater than 0', function() {
                MSXML2XMLHTTP = getNewInstance('MSXML2.XMLHTTP.3.0');
                expect(function() {
                    MSXML2XMLHTTP.status
                }).to.throw(Error);
            });

            it('should return status', function() {
                MSXML2XMLHTTP = getNewInstance('MSXML2.XMLHTTP.3.0');
                MSXML2XMLHTTP._fireOnReadyStateChange(4);
                expect(MSXML2XMLHTTP.status).to.equal(200);
            });
        });

        describe('statusText', function() {
            it('should throw error when setting statusText', function() {
                expect(function() {
                    MSXML2XMLHTTP.statusText = 'OK';
                }).to.throw(Error);
            });

            it('should return nothing if version is less than 3.0', function() {
                MSXML2XMLHTTP._fireOnReadyStateChange(4);
                expect(MSXML2XMLHTTP.statusText).to.be.undefined;
            });

            it('should throw error if readyState is less than 4 and version is greater than 0', function() {
                MSXML2XMLHTTP = getNewInstance('MSXML2.XMLHTTP.6.0');
                expect(function() {
                    MSXML2XMLHTTP.statusText
                }).to.throw(Error);
            });

            it('should return statusText', function() {
                MSXML2XMLHTTP = getNewInstance('MSXML2.XMLHTTP.6.0');
                MSXML2XMLHTTP._fireOnReadyStateChange(4);
                expect(MSXML2XMLHTTP.statusText).to.equal('OK');
            });
        });
    });

    describe('default methods', function() {
        beforeEach(function() {
            MSXML2XMLHTTP = getNewInstance();
        });

        describe('abort()', function() {
            it('should reset readyState to 0 after abort()', function() {
                MSXML2XMLHTTP._fireOnReadyStateChange(4);
                expect(MSXML2XMLHTTP._readyState).to.equal(4);
                MSXML2XMLHTTP.abort();
                expect(MSXML2XMLHTTP._readyState).to.equal(0);
            });
        });

        describe('getAllReponseHeaders()', function() {
            it('should return undefined with version less than 3', function() {
                expect(MSXML2XMLHTTP.getAllResponseHeaders()).to.be.undefined;
            });

            it('should throw error when readyState is not 4', function() {
                MSXML2XMLHTTP = getNewInstance('MSXML2.XMLHTTP.3.0');
                expect(function() {
                    MSXML2XMLHTTP.getAllResponseHeaders();
                }).to.throw(Error);
            });

            it('should return headers when readyState is 4', function() {
                var responseHeaders = 'HTTP/1.1 200 OK\r\nDate: Mon, 27 Jul 2009 12:28:53 GMT\r\nServer: Apache/2.2.14 (Win32)\r\nLast-Modified: Wed, 22 Jul 2009 19:15:56 GMT\r\nContent-Length: 88\r\nContent-Type: text/html\r\nConnection: Closed';

                MSXML2XMLHTTP = getNewInstance('MSXML2.XMLHTTP.3.0');
                MSXML2XMLHTTP._fireOnReadyStateChange(4);
                expect(MSXML2XMLHTTP.getAllResponseHeaders()).to.equal(responseHeaders);
            });
        });

        describe('getResponseHeader()', function() {
            it('should return undefined with version less than 3', function() {
                expect(MSXML2XMLHTTP.getResponseHeader()).to.be.undefined;
            });

            it('should throw error when readyState is not 4', function() {
                MSXML2XMLHTTP = getNewInstance('MSXML2.XMLHTTP.3.0');
                expect(function() {
                    MSXML2XMLHTTP.getResponseHeader();
                }).to.throw(Error);
            });

            it('should return a header when readyState is 4', function() {
                MSXML2XMLHTTP = getNewInstance('MSXML2.XMLHTTP.3.0');
                MSXML2XMLHTTP._fireOnReadyStateChange(4);
                expect(MSXML2XMLHTTP.getResponseHeader('Content-Type')).to.equal('text/html');
            });

            it('should return empty string if header is not available', function() {
                MSXML2XMLHTTP = getNewInstance('MSXML2.XMLHTTP.3.0');
                MSXML2XMLHTTP._fireOnReadyStateChange(4);
                expect(MSXML2XMLHTTP.getResponseHeader('X-FAKE-HEADER')).to.equal('');
            });
        });

        describe('open()', function() {
            it('should throw error if bstrMethod or bstrUrl arguments are undefined', function() {
                expect(function() {
                    MSXML2XMLHTTP.open();
                }).to.throw(Error);

                expect(function() {
                    MSXML2XMLHTTP.open('GET');
                }).to.throw(Error);

                expect(function() {
                    MSXML2XMLHTTP.open(null, 'http://example.com');
                }).to.throw(Error);
            });

            it('should set readyState to 1', function() {
                MSXML2XMLHTTP.open('GET', 'http://example.com');
                expect(MSXML2XMLHTTP._readyState).to.equal(1);
            });

            it('should not fire onreadystatechange if called with async = true', function() {
                MSXML2XMLHTTP = getNewInstance();
                var changedstate = false;
                MSXML2XMLHTTP.onreadystatechange = function() {
                    changedstate = true;
                };
                MSXML2XMLHTTP.open('GET', 'http://example.com', true);
                expect(changedstate).to.be.false;
            });

            it('should fire onreadystatechange if called with async = false', function() {
                MSXML2XMLHTTP = getNewInstance();
                var changedstate = false;
                MSXML2XMLHTTP.onreadystatechange = function() {
                    changedstate = true;
                };
                MSXML2XMLHTTP.open('GET', 'http://example.com', false);
                expect(changedstate).to.be.true;
            });
        });

        describe('send()', function() {
            it('should throw error if called on unopened request (readyState Uninitialized)', function() {
                expect(function() {
                    MSXML2XMLHTTP.send();
                }).to.throw(Error);
            });

            it('should cycle through readyStates 1 - 4', function() {
                MSXML2XMLHTTP = getNewInstance();
                var states = {
                    1: false,
                    2: false,
                    3: false,
                    4: false
                };
                MSXML2XMLHTTP.onreadystatechange = function() {
                    states[MSXML2XMLHTTP.readyState] = true;
                }
                MSXML2XMLHTTP.open('GET', 'http://example.com', false);
                MSXML2XMLHTTP.send();
                for (var i in states) {
                    expect(states[i]).to.be.true;
                }
            });

            it('should set readyState to 4 immediately if called asynchronously', function() {
                MSXML2XMLHTTP = getNewInstance();
                MSXML2XMLHTTP.open('GET', 'http://example.com', true);
                MSXML2XMLHTTP.send();
                expect(MSXML2XMLHTTP._readyState).to.equal(4);
            });
        });

        describe('setRequestHeader()', function() {
            it('should throw error if called on unopened request (readyState Uninitialized)', function() {
                expect(function() {
                    MSXML2XMLHTTP.setRequestHeader('Accept', 'text/plain');
                }).to.throw(Error);
            });

            it('should throw error if arguments bstrHeader or bstrValue are undefined', function() {
                MSXML2XMLHTTP.open('GET', 'http://example.com');
                expect(function() {
                    MSXML2XMLHTTP.setRequestHeader();
                }).to.throw(Error);

                expect(function() {
                    MSXML2XMLHTTP.setRequestHeader('Accept');
                }).to.throw(Error);

                expect(function() {
                    MSXML2XMLHTTP.setRequestHeader(null, 'plain/text');
                }).to.throw(Error);
            });

            it('should push requestHeaders to MSXML2XMLHTTP._requestHeaders', function() {
                MSXML2XMLHTTP = getNewInstance();
                MSXML2XMLHTTP.open('GET', 'http://example.com');
                MSXML2XMLHTTP.setRequestHeader('Accept', 'text/plain');
                expect(MSXML2XMLHTTP._requestHeaders[0][0]).to.equal('Accept');
                expect(MSXML2XMLHTTP._requestHeaders[0][1]).to.equal('text/plain');
            });
        });
    });
});
