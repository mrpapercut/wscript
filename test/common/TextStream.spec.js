'use strict';

var chai = require('chai'),
    path = require('path'),
    expect = chai.expect;

var getFilePath = function(filename) {
    return path.join(__dirname, '../..', 'lib', filename);
}

var getNewInstance = function() {
    var instance = require(getFilePath('common/TextStream'));
    return new instance();
}

var getResponseText = function() {
    return require(getFilePath('config/ResponseText'));
};

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
            TextStream.Write('abcdefghijklmnopqrstuvwxyz');
            expect(TextStream.Read(10)).to.have.lengthOf(10);
        });

        var ResponseText = getResponseText();
        it('should return all text if argument is larger than ResponseText.length', function() {
            TextStream = getNewInstance();
            TextStream.Write(ResponseText);

            expect(TextStream.Read(ResponseText.length + 10)).to.have.lengthOf(ResponseText.length);
        });
    });

    describe('ReadAll()', function() {
        var ResponseText = getResponseText();

        it('should return all text', function() {
            TextStream.Write(ResponseText);

            expect(TextStream.ReadAll()).to.have.lengthOf(ResponseText.length);
        });
    });

    describe('ReadLine()', function() {
        var ResponseText = getResponseText();

        it('should return the first line of ResponseText', function() {
            TextStream.Write(ResponseText);

            expect(TextStream.ReadLine()).to.eql('The MIT License (MIT)');
        });
    });

    describe('Skip()', function() {
        var ResponseText = getResponseText();

        it('should skip 6 characters and return the rest', function() {
            TextStream.Write(ResponseText);

            expect(TextStream.Skip(6)).to.have.lengthOf(ResponseText.length - 6);
        });
    });

    describe('SkipLine()', function() {
        var ResponseText = getResponseText();

        it('should skip first line and return the rest', function() {
            TextStream.Write(ResponseText);

            expect(TextStream.SkipLine(1)).to.eql(ResponseText.replace('The MIT License (MIT)\n', ''));
        });
    });

    describe('Write()', function() {
        it('should write string to TextStream._contents', function() {
            TextStream.Write('Hello world!');

            expect(TextStream._contents).to.eql('Hello world!');
        });
    });

    describe('WriteBlankLines()', function() {
        it('should return 2 blank lines', function() {
            TextStream.WriteBlankLines(2);
            expect(TextStream._contents).to.eql('\n\n');
        });
    });

    describe('WriteLine()', function() {
        it('should write line to TextStream._contents', function() {
            TextStream.WriteLine('Hello World!');
            expect(TextStream._contents).to.eql('Hello World!\n');
        });
        it('should write blank line if no string provided', function() {
            TextStream.WriteLine();
            expect(TextStream._contents).to.eql('\n');
        });
    });
});