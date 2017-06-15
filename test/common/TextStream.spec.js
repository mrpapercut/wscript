'use strict';

var chai = require('chai'),
    path = require('path'),
    expect = chai.expect;

var getFilePath = function(filename) {
    return path.join(__dirname, '../..', 'lib', filename);
}

var getNewInstance = function(filename, contents, unicode, iomode, fullpath) {
    var instance = require(getFilePath('common/TextStream'));
    return new instance(filename, contents, unicode, iomode, fullpath || 'C:\\temp\\' + filename);
}

var getResponseText = function() {
    return require(getFilePath('config/ResponseText'));
};

var TextStream;

describe('TextStream', function() {
    beforeEach(function() {
        TextStream = getNewInstance();
    });

    describe('constructor()', function() {
        var properties = {
            AtEndOfLine:   true,
            AtEndOfStream: true,
            Column:        1,
            Line:          1,
            _filename:     'testfile.txt',
			_fullpath:     'C:\\temp\\testfile.txt',
            _unicode:      false,
            _iomode:       1,
            _contents:     ''
        };

        it('should have all properties', function() {
            TextStream = getNewInstance('testfile.txt', '', false);
            expect(TextStream).to.have.all.keys(Object.keys(properties));
        });

        it('should have all default values', function() {
            TextStream = getNewInstance('testfile.txt', '', false);
            for (var i in properties) {
                expect(TextStream[i]).to.eql(properties[i]);
            }
        });

        it('should throw error if initialized with invalid iomode', function() {
            expect(function() {
                getNewInstance('testfile.txt', '', false, -1);
            }).to.throw(TypeError);
        });
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
            TextStream = getNewInstance('testfile.txt', 'abcdefghijklmnopqrstuvwxyz', true, 1);

            expect(TextStream.Read(10)).to.have.lengthOf(10);
        });

        var ResponseText = getResponseText();
        it('should return all text if argument is larger than ResponseText.length', function() {
            TextStream = getNewInstance('testfile.txt', ResponseText, true, 1);

            expect(TextStream.Read(ResponseText.length + 10)).to.have.lengthOf(ResponseText.length);
        });
    });

    describe('ReadAll()', function() {
        var ResponseText = getResponseText();

        it('should return all text', function() {
            TextStream = getNewInstance('testfile.txt', ResponseText, true, 1);

            expect(TextStream.ReadAll()).to.have.lengthOf(ResponseText.length);
        });

        it('should set AtEndOfLine and AtEndOfStream to true', function() {
            TextStream.Write(ResponseText);
            TextStream.ReadAll();
            expect(TextStream.AtEndOfLine).to.be.true;
            expect(TextStream.AtEndOfStream).to.be.true;
        });
    });

    describe('ReadLine()', function() {
        var ResponseText = getResponseText();

        it('should return the first line of ResponseText', function() {
            TextStream = getNewInstance('testfile.txt', ResponseText, true, 1);

            expect(TextStream.ReadLine()).to.eql('The MIT License (MIT)');
        });
    });

    describe('Skip()', function() {
        var ResponseText = getResponseText();

        it('should skip 6 characters and return the rest', function() {
            TextStream = getNewInstance('testfile.txt', ResponseText, true, 1);
            TextStream.Skip(25);
            expect(TextStream.Column).to.equal(3);
            expect(TextStream.Line).to.equal(3);
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

        it('should throw error when writing unicode without specifying', function() {
            TextStream = getNewInstance('testfile.txt', '', false, 2);
            expect(function() {
                TextStream.Write('ĀāĂ');
            }).to.throw(TypeError);
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
            TextStream = getNewInstance('testfile.txt', '', false, 8);
            TextStream.WriteLine('Hello World!');
            expect(TextStream._contents).to.eql('Hello World!\n');
        });

        it('should write blank line if no string provided', function() {
            TextStream.WriteLine();
            expect(TextStream._contents).to.eql('\n');
        });

        it('should throw error when writing unicode without specifying', function() {
            TextStream = getNewInstance('testfile.txt', '', false, 2);
            expect(function() {
                TextStream.WriteLine('ĀāĂ');
            }).to.throw(TypeError);
        });
    });
});