'use strict';

var chai = require('chai'),
    path = require('path'),
    expect = chai.expect;

var getFilePath = function(filename) {
    return path.join(__dirname, '..', 'lib', filename);
}

var getNewInstance = function(strProgId) {
    var instance = require(getFilePath('objects/MSXML2.XMLHTTP'));
    return new instance();
}

var MSXML2XMLHTTP;

describe('MSXML2XMLHTTP', function() {
    describe('constructor()', function() {
        MSXML2XMLHTTP = getNewInstance();

        var properties = {
            // https://msdn.microsoft.com/en-us/library/ms762767(v=vs.85).aspx
            //onreadystatechange: null,
            // https://msdn.microsoft.com/en-us/library/ms753800(v=vs.85).aspx
            readyState: 0,
            // https://msdn.microsoft.com/en-us/library/ms756095(v=vs.85).aspx
            responseBody: null,
            // https://msdn.microsoft.com/en-us/library/ms763792(v=vs.85).aspx
            responseStream: null,
            // https://msdn.microsoft.com/en-us/library/ms762275(v=vs.85).aspx
            responseText: null,
            // https://msdn.microsoft.com/en-us/library/ms757066(v=vs.85).aspx
            responseXML: null,
            // https://msdn.microsoft.com/en-us/library/ms767625(v=vs.85).aspx
            status: null,
            // https://msdn.microsoft.com/en-us/library/ms759127(v=vs.85).aspx
            statusText: null
        };

        it('should have default properties', function() {
            expect(MSXML2XMLHTTP).to.have.any.keys(Object.keys(properties));
        });

        it('should have all default values', function() {
            for (var i in properties) {
                expect(MSXML2XMLHTTP[i]).to.eql(properties[i]);
            }
        });

        it('should throw error when calling onreadystatechange() directly', function() {
            expect(function() {
                MSXML2XMLHTTP.onreadystatechange();
            }).to.throw(Error);
        });

        it('should set onreadystatechange() without error', function() {
            MSXML2XMLHTTP.onreadystatechange = function() {
                return 'Hello';
            };
            expect(MSXML2XMLHTTP._fireOnReadyStateChange(0)).to.equal('Hello');
        });

        it('should throw error when setting readyState and not change the value', function() {
            expect(MSXML2XMLHTTP.readyState).to.eql(0);
            expect(function() {
                MSXML2XMLHTTP.readyState = 4;
            }).to.throw(Error);
            expect(MSXML2XMLHTTP.readyState).to.eql(0);
        });
    });

    describe('default methods', function() {
        beforeEach(function() {
            MSXML2XMLHTTP = getNewInstance();
        });

        describe('abort()', function() {

        });

        describe('getAllReponseHeaders()', function() {

        });

        describe('getResponseHeader()', function() {

        });

        describe('open()', function() {

        });

        describe('send()', function() {

        });

        describe('setRequestHeader()', function() {

        });
    });
});