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

		var rootFolderProperties = {
			Attributes: 22,
			Drive: 'C:',
			Files: {},
			IsRootFolder: true,
			Path: 'C:\\',
			ShortPath: 'C:\\',
			SubFolders: {},
			Type: 'Local Disk'
		};

        it('should have all properties', function() {
            expect(RootFolder).to.have.all.keys(Object.keys(rootFolderProperties));
        });

        it('should have all default values', function() {
            for (var i in rootFolderProperties) {
                expect(RootFolder[i]).to.eql(rootFolderProperties[i]);
            }
        });
    });

	describe('constructor("C:\\temp\\tmp")', function() {
		var NormalFolder = getNewInstance('C:\\temp\\tmp');

		var normalFolderProperties = {
			Attributes: 16,
			Drive: 'C:',
			Files: {},
			IsRootFolder: false,
			Name: 'tmp',
			ParentFolder: 'C:\\temp',
			Path: 'C:\\temp\\tmp',
			ShortName: '',
			ShortPath: '',
			Size: 20000,
			SubFolders: {},
			Type: 'File Folder'
		};

        it('should have all properties', function() {
            expect(NormalFolder).to.have.all.keys(Object.keys(normalFolderProperties));
        });

        it('should have all default values', function() {
            for (var i in normalFolderProperties) {
                expect(NormalFolder[i]).to.eql(normalFolderProperties[i]);
            }
        });
	});
});
