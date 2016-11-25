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
            it('should set readyState to 1', function() {
                MSXML2XMLHTTP.open();
                expect(MSXML2XMLHTTP._readyState).to.equal(1);
            });
        });

        describe('send()', function() {

        });

        describe('setRequestHeader()', function() {

        });
    });
});