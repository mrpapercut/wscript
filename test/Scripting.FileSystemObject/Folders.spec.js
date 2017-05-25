'use strict';

var chai = require('chai'),
    path = require('path'),
    expect = chai.expect;

var getFilePath = function(filename) {
    return path.join(__dirname, '../..', 'lib', filename);
}

var getNewInstance = function(folderPath, vfs) {
    var instance = require(getFilePath('objects/scriptingFSO/collections/Folders'));
    return new instance(folderPath, vfs);
}

var VFS = require(getFilePath('util/VFS'));

var Folders;

var normalFolderObj = {
    name: 'temp',
    path: 'C:\\temp',
    type: 'folder',
};

describe('Folders', function() {
    beforeEach(function() {
        Folders = getNewInstance('C:\\temp', new VFS());
    });

    describe('constructor("C:\\temp")', function() {

        var properties = {
            Count: null,
            Item: null,
            _parent: new VFS(),
            _path: 'C:\\temp'
        };

        it('should have all properties', function() {
            expect(Folders).to.have.all.keys(Object.keys(properties));
        });

        it('should have all default values', function() {
            for (var i in properties) {
                expect(Folders[i]).to.eql(properties[i]);
            }
        });
    });

    describe('Add()', function() {
        it('should add a new Folder object to this._subfolders', function() {
            Folders.Add('NewFolder');
            expect(Folders._parent.folderExists('C:\\temp\\NewFolder'));
        });

        it('should throw Error if folder exists', function() {
            Folders.Add('NewFolder');

            expect(function() {
                Folders.Add('NewFolder');
            }).to.throw(TypeError);
        });

        it('should not throw Error if folder doesn\'t exist', function() {
            Folders.Add('NewFolder');
            Folders.Add('NewFolder2');
        });
    });
});