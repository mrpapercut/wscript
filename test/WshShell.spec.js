'use strict';

var chai = require('chai'),
    path = require('path'),
    expect = chai.expect;

var getFilePath = function(filename) {
    return path.join(__dirname, '..', 'lib', filename);
}

var WshShell;

describe('WshShell', function() {
    describe('constructor()', function() {
        WshShell = require(getFilePath('WshShell'));

        var properties = {
            CurrentDirectory: 'C:\\Temp',
            Environment: null,
            _name: 'WshShell'
        };

        it('should have all properties', function() {
            expect(WshShell).to.have.all.keys(Object.keys(properties));
        });

        it('should have all default values', function() {
            for (var i in properties) {
                expect(WshShell[i]).to.eql(properties[i]);
            }
        });
    });

    describe('toString()', function() {
        WshShell = require(getFilePath('WshShell'));
        it('should equal WshShell', function() {
            expect(WshShell + '').to.equal('WshShell');
        });
    });

    describe('Property setters', function() {
        beforeEach(function() {
            WshShell = require(getFilePath('WshShell'));
        });

        describe('_setCurrentDirectory()', function() {
            it('should return the provided directory', function() {
                WshShell._setCurrentDirectory('C:\\');
                expect(WshShell.CurrentDirectory).to.equal('C:\\');
            });
        });
    });

    describe('Default methods', function() {
        beforeEach(function() {
            WshShell = require(getFilePath('WshShell'));
        });

        describe('SpecialFolders', function() {
            it('should return empty string without argument', function() {
                expect(WshShell.SpecialFolders()).to.equal('');
            });

            var Folders = require('../config/SpecialFolders');

            it('should return the correct SpecialFolders paths', function() {
                for (var i in Folders) {
                    expect(WshShell.SpecialFolders([i])).to.eql(Folders[i]);
                }
            });

            it('should return the correct number of folders', function() {
                expect(WshShell.SpecialFolders.count()).to.equal(16);
            });
        });
    });
});
