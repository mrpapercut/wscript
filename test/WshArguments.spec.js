'use strict';

var chai = require('chai'),
    path = require('path'),
    expect = chai.expect;

var getFilePath = function(filename) {
    return path.join(__dirname, '..', 'lib', filename);
}

var getNewInstance = function() {
    var instance = require(getFilePath('WshArguments'));
    return new instance(123, "ab:cd", "hello world");
}

var WshArguments;
var WshNamed = require(getFilePath('WshNamed'));
var WshUnnamed = require(getFilePath('./WshUnnamed'));

describe('WshArguments', function() {
    describe('constructor(123, "ab:cd", "hello world")', function() {
        WshArguments = getNewInstance();

        var properties = {
            Length: null,
            Named: null,
            Unnamed: null,
            _args: null
        };

        it('should have all properties', function() {
            expect(WshArguments).to.have.all.keys(Object.keys(properties));
        });

        it('should set the correct Length', function() {
            expect(WshArguments.Length).to.equal(3);
        });

        it('should initialize WshNamed object for WshArguments.Named', function() {
            expect(WshArguments.Named instanceof WshNamed).to.be.true;
        });

        it('should initialize WshUnnamed object for WshArguments.Unnamed', function() {
            expect(WshArguments.Unnamed instanceof WshUnnamed).to.be.true;
        });
    });

    describe('Item()', function() {
        WshArguments = getNewInstance();

        it('should return Named value', function() {
            expect(WshArguments.Item('ab')).to.eql('cd');
        });

        it('should return Unnamed Item 1', function() {
            expect(WshArguments.Item(1)).to.eql(123);
        });

        it('should return Unnamed Item 2', function() {
            expect(WshArguments.Item(2)).to.eql('hello world');
        });
    });

    describe('.Named', function() {
        WshArguments = getNewInstance();

        it('should have Length of 1', function() {
            expect(WshArguments.Named.Length).to.eql(1);
        });

        it('should have Count() same as Length', function() {
            expect(WshArguments.Named.Count()).to.eql(WshArguments.Named.Length);
        });

        it('should return Named value', function() {
            expect(WshArguments.Item('ab')).to.eql('cd');
        });
    });

    describe('.Unnamed', function() {
        WshArguments = getNewInstance();

        it('should have Length of 2', function() {
            expect(WshArguments.Unnamed.Length).to.eql(2);
        });

        it('should have Count() same as Length', function() {
            expect(WshArguments.Unnamed.Count()).to.eql(WshArguments.Unnamed.Length);
        });

        it('should return Item 1', function() {
            expect(WshArguments.Item(1)).to.eql(123);
        });

        it('should return Item 2', function() {
            expect(WshArguments.Item(2)).to.eql('hello world');
        });
    });

    describe('Count()', function() {
        WshArguments = getNewInstance();

        it('should have same length as Length', function() {
            expect(WshArguments.Count()).to.equal(WshArguments.Length);
        });
    });

    describe('ShowUsage()', function() {
        WshArguments = getNewInstance();

        it('should return empty string', function() {
            expect(WshArguments.ShowUsage()).to.eql('');
        });
    });
});
