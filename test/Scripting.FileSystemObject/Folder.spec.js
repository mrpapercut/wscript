'use strict';

var chai = require('chai'),
    path = require('path'),
    expect = chai.expect;

var getFilePath = function(filename) {
    return path.join(__dirname, '../..', 'lib', filename);
}

var VFS = require(getFilePath('util/VFS'));

var getNewInstance = function(folderPath, vfs) {
    var instance = require(getFilePath('objects/scriptingFSO/objects/Folder'));
    return new instance(folderPath, vfs || new VFS());
}

var Folder;

var rootFolderObj = {
    name: 'C:',
    path: 'C:\\',
    static: true,
    type: 'folder'
};

var normalFolderObj = {
    name: 'system32',
    path: 'C:\\windows\\system32',
    type: 'folder',
};

describe('Folder', function() {
    describe('constructor("C:\\")', function() {
        var RootFolder = getNewInstance(rootFolderObj);

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
            Type: 'Local Disk',
            _parent: new VFS()
        };

        it('should have all properties', function() {
            expect(RootFolder).to.have.all.keys(Object.keys(rootFolderProperties));
        });

        it('should have all default values', function() {
            for (var i in rootFolderProperties) {
                if (i === 'Files') {
                    expect(RootFolder[i].toString()).to.eql('Files');
                } else if (i === 'Folders') {
                    expect(RootFolder[i].toString()).to.eql('Folders');
                } else {
                    expect(RootFolder[i]).to.eql(rootFolderProperties[i]);
                }
            }
        });
    });

    describe('constructor("C:\\windows\\system32")', function() {
        var normalFolder = getNewInstance(normalFolderObj);

        var Files = require(getFilePath('objects/scriptingFSO/collections/Files'));
        var Folders = require(getFilePath('objects/scriptingFSO/collections/Folders'));

        var normalFolderProperties = {
            Attributes: 16,
            Drive: 'C:',
            Files: new Files(),
            IsRootFolder: false,
            Name: 'system32',
            ParentFolder: 'C:\\windows',
            Path: 'C:\\windows\\system32',
            ShortName: 'system32',
            ShortPath: 'C:\\windows\\system32',
            Size: 20000,
            SubFolders: new Folders('C:\\windows\\system32'),
            Type: 'File Folder',
            _parent: new VFS()
        };

        it('should have all properties', function() {
            expect(normalFolder).to.have.all.keys(Object.keys(normalFolderProperties));
        });

        it('should have all default values', function() {
            for (var i in normalFolderProperties) {
                if (i === 'Files') {
                    expect(normalFolder[i].toString()).to.eql('Files');
                } else if (i === 'Folders') {
                    expect(normalFolder[i].toString()).to.eql('Folders');
                } else {
                    expect(normalFolder[i]).to.eql(normalFolderProperties[i]);
                }
            }
        });
    });

    describe('Copy()', function() {
        it('should copy the current folder to a new location', function() {
            var vfs = new VFS();

            var folder = vfs.getFolder('C:\\temp');
            folder.Copy('C:\\temp2');
            expect(vfs.folderExists('C:\\temp2')).to.equal(-1);
        });
    });

    describe('Delete()', function() {
        it('should delete the current folder', function() {
            var vfs = new VFS();

            var folder = vfs.getFolder('C:\\temp');
            folder.Delete();
            expect(vfs.folderExists('C:\\temp')).to.equal(0);
        });
    });

    describe('Move()', function() {
        it('should move current folder to new location', function() {
            var vfs = new VFS();

            var folder = vfs.getFolder('C:\\temp');
            folder.Move('C:\\temp2');
            expect(vfs.folderExists('C:\\temp')).to.equal(0);
            expect(vfs.folderExists('C:\\temp2')).to.equal(-1);
        });
    });

    describe('CreateTextFile()', function() {
        it('should create a new textfile', function() {
            var vfs = new VFS();

            var folder = vfs.getFolder('C:\\temp');
            folder.CreateTextFile('newfile.txt');
            expect(vfs.fileExists('C:\\temp\\newfile.txt')).to.equal(-1);
        });
    });
});
