'use strict';

var chai = require('chai'),
    path = require('path'),
    expect = chai.expect;

var getFilePath = function(filename) {
    return path.join(__dirname, '../..', 'lib', filename);
}

var getFunction = function(fnName) {
    var file = require(getFilePath('util/MSformats'));

    if (file.hasOwnProperty(fnName)) {
        return file[fnName];
    }
}

describe('MSformats', function() {
    describe('Date format', function() {
        describe('getDate()', function() {
            var getDate = getFunction('getDate');

            var d = new Date(1483228800000);

            it('should format date to MSformat and UTC', function() {
                expect(getDate(1483228800000 + d.getTimezoneOffset() * 6e4))
                    .to.equal(['Sun Jan 1 00:00:00', 'UTC' + d.toString().match(/GMT([\-|\+][0-9]{4})/)[1], '2017'].join(' '));
            });

            it('should format current date in correct form', function() {
                expect(getDate()).to
                    .match(/^[A-Z][a-z]{2}\s[A-Z][a-z]{2}\s[0-9]{1,2}\s[0-9]{2}:[0-9]{2}:[0-9]{2}\s[A-Z]{3}(?:[\-|\+][0-9]{4})\s[0-9]{4}/);
            });
        });
    });

    describe('Shortened filenames', function() {
        var toShortname = getFunction('toShortname');

        it('should shorten "Program Files" to "PROGRA~1"', function() {
            expect(toShortname('Program Files')).to.equal('PROGRA~1');
        });

        it('should shorten "longfilename.manifest" to "LONGFI~1.MAN"', function() {
            expect(toShortname('longfilename.manifest')).to.equal('LONGFI~1.MAN');
        });

        it('should not shorten "Users"', function() {
            expect(toShortname('Users')).to.equal('Users');
        });

        it('should not shorten "file.txt"', function() {
            expect(toShortname('file.txt')).to.equal('file.txt');
        });
    });
});
