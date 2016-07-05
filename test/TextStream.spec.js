'use strict';

var chai = require('chai'),
    path = require('path'),
    expect = chai.expect;

var getFilePath = function(filename) {
    return path.join(__dirname, '..', 'lib/WScript', filename);
}

var getNewInstance = function() {
    var instance = require(getFilePath('TextStream'));
    return new instance();
}

var TextStream;

describe('TextStream', function() {
    beforeEach(function() {
        TextStream = getNewInstance();
    });

    describe('Close()', function() {
        it('should return nothing', function() {
            expect(TextStream.Close()).to.be.null;
        });
    });

    describe('Read()', function() {
        it('should throw TypeError when no or invalid arguments are passed', function() {
            expect(function() {
                TextStream.Read();
            }).to.throw(TypeError);
        });

        it('should return a string of 10 characters', function() {
            expect(TextStream.Read(10)).to.have.lengthOf(10);
        });

        var ResponseText = require(getFilePath('config/ResponseText'));
        it('should return all text if argument is larger than ResponseText.length', function() {
            expect(TextStream.Read(ResponseText.length + 10)).to.have.lengthOf(ResponseText.length);
        });
    });

    describe('ReadAll()', function() {
        var ResponseText = require(getFilePath('config/ResponseText'));

        it('should return all text', function() {
            expect(TextStream.ReadAll()).to.have.lengthOf(ResponseText.length);
        });
    });

    describe('ReadLine()', function() {
        it('should return the first line of ResponseText', function() {
            expect(TextStream.ReadLine()).to.eql('The MIT License (MIT)');
        });
    });
});