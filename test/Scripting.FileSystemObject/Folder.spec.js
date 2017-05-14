'use strict';

var chai = require('chai'),
    path = require('path'),
    expect = chai.expect;

var getFilePath = function(filename) {
    return path.join(__dirname, '../..', 'lib', filename);
}

var getNewInstance = function(folderPath) {
    var instance = require(getFilePath('objects/scriptingFSO/objects/Folder'));
    return new instance(folderPath);
}

var Folder;

describe('Folder', function() {
    describe('constructor("C:\\")', function() {
        var RootFolder = getNewInstance('C:\\');

        var Files = require(getFilePath('objects/scriptingFSO/collections/Files'));
        var Folders = require(getFilePath('objects/scriptingFSO/collections/Folders'));

		var rootFolderProperties = {
			Attributes: 22,
			Drive: 'C:',
			Files: new Files(),
			IsRootFolder: true,
			Path: 'C:\\',
			ShortPath: 'C:\\',
			SubFolders: new Folders('C:\\'),
			Type: 'Local Disk'
		};

        it('should have all properties', function() {
            expect(RootFolder).to.have.all.keys(Object.keys(rootFolderProperties));
        });

        it('should have all default values', function() {
            for (var i in rootFolderProperties) {
                if (i === 'Files') {
                    expect(RootFolder[i] instanceof Files).to.be.true;
                } else if (i === 'Folders') {
                    expect(RootFolder[i] instanceof Folders).to.be.true;
                } else {
                    expect(RootFolder[i]).to.eql(rootFolderProperties[i]);
                }
            }
        });
    });

	describe('constructor("C:\\temp\\tmp")', function() {
		var normalFolder = getNewInstance('C:\\temp\\tmp');

        var Files = require(getFilePath('objects/scriptingFSO/collections/Files'));
        var Folders = require(getFilePath('objects/scriptingFSO/collections/Folders'));

		var normalFolderProperties = {
			Attributes: 16,
			Drive: 'C:',
			Files: new Files(),
			IsRootFolder: false,
			Name: 'tmp',
			ParentFolder: 'C:\\temp',
			Path: 'C:\\temp\\tmp',
			ShortName: 'tmp',
			ShortPath: 'C:\\temp\\tmp',
			Size: 20000,
			SubFolders: new Folders('C:\\temp\\tmp'),
			Type: 'File Folder'
		};

        it('should have all properties', function() {
            expect(normalFolder).to.have.all.keys(Object.keys(normalFolderProperties));
        });

        it('should have all default values', function() {
            for (var i in normalFolderProperties) {
                if (i === 'Files') {
                    expect(normalFolder[i] instanceof Files).to.be.true;
                } else if (i === 'Folders') {
                    expect(normalFolder[i] instanceof Folders).to.be.true;
                } else {
                    expect(normalFolder[i]).to.eql(normalFolderProperties[i]);
                }
            }
        });
	});
});
