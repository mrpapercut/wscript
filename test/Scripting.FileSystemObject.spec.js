'use strict';

var chai = require('chai'),
    path = require('path'),
    expect = chai.expect;

var getFilePath = function(filename) {
    return path.join(__dirname, '..', 'lib', filename);
}

var getNewInstance = function() {
    var instance = require(getFilePath('objects/Scripting.FileSystemObject'));
    return new instance();
}

var FSO;

describe('Scripting.FileSystemObject', function() {
    beforeEach(function() {
        FSO = getNewInstance();
    });

    describe('constructor()', function() {
        var Drives = require(getFilePath('objects/scriptingFSO/collections/Drives'));

        var properties = {
            Drives: new Drives()
        };

        it('should have all properties', function() {
            expect(FSO).to.have.all.keys(Object.keys(properties));
        });

        it('should have all default values', function() {
            expect(FSO.Drives instanceof Drives).to.be.true;
        });
    });

    describe('BuildPath()', function() {
        it('should append name to existing path', function() {
            expect(FSO.BuildPath('C:\\temp', 'newfolder')).to.equal('C:\\temp\\newfolder');
        });
    });
});