'use strict';

var chai = require('chai'),
    path = require('path'),
    expect = chai.expect;

var getFilePath = function(filename) {
    return path.join(__dirname, '../..', 'lib', filename);
}

var getNewInstance = function(fnName) {
    var instance = require(getFilePath('util/VFS'));

	return new instance();
}

var VFS;

describe('VFS', function() {
	beforeEach(function() {
        VFS = getNewInstance();
    });

	describe('constructor()', function() {
		it('should initialize a VFS-object', function() {
			expect(VFS._vfs).to.be.instanceof(Array);
		});
	});

	describe('_printVFS()', function() {
		it('should return JSON representation of the current VFS', function() {
			expect(function() {
				JSON.parse(VFS._printVFS());
			}).to.not.throw(SyntaxError);
		});
    });

	describe('_createFolderObject()', function() {
		it('should return a FolderObject()', function() {
			var expected = {
				name: 'temp',
				type: 'folder',
				path: 'C:\\temp',
				static: false
			};

			var folder = VFS._createFolderObject('C:\\temp');

			expect(folder).to.have.all.keys(expected);

			for (var i in folder) {
				expect(folder[i]).to.equal(expected[i]);
			}
		});
    });

	describe('_createFileObject()', function() {
		it('should return a FileObject()', function() {
			var expected = {
				content: 'Hello world!',
				name: 'testfile.txt',
				path: 'C:\\temp\\testfile.txt',
				type: 'file'
			};

			var file = VFS._createFileObject('C:\\temp\\testfile.txt', 'Hello world!');

			expect(file).to.have.all.keys(expected);

			for (var i in file) {
				expect(file[i]).to.equal(expected[i]);
			}
		});
    });

	describe('_formatPath()', function() {
		it('should resolve absolute paths', function() {
			expect(VFS._formatPath('C:\\temp\\testfile.txt')).to.equal('C:\\temp\\testfile.txt');
		});

		it('should resolve paths relative to current folder', function() {
			expect(VFS._formatPath('testfile.txt')).to.equal('C:\\temp\\testfile.txt');
		});

		it('should resolve really weird paths', function() {
			expect(VFS._formatPath('..\\temp\\.\\..\\windows\\..\\.\\temp\\testfile.txt')).to.equal('C:\\temp\\testfile.txt');
			expect(VFS._formatPath('.\\testfile.txt')).to.equal('C:\\temp\\testfile.txt');
			expect(VFS._formatPath('C:\\')).to.equal('C:\\');
			expect(VFS._formatPath('..\\')).to.equal('C:\\');
		});
    });

	describe('_resolvePath()', function() {
		it('should resolve path to VFS-object', function() {
			expect(VFS._resolvePath('C:\\temp\\testfile.txt')).to.be.instanceof(Object);
		});

		it('should return `undefined` if path not found', function() {
			expect(VFS._resolvePath('C:\\boot.ini')).to.be.undefined;
		});
    });

	describe('copyFile()', function() {
		it('should copy a file from one location to another', function() {
			VFS.copyFile('testfile.txt', 'textfile.txt');

			expect(VFS._resolvePath('textfile.txt')).to.not.be.undefined;
		});

		it('should throw error if file not found', function() {
			expect(function() {
				VFS.copyFile('C:\\boot.ini', 'C:\\temp\\boot.ini');
			}).to.throw(TypeError);
		});

		it('should throw error if destination not valid', function() {
			expect(function() {
				VFS.copyFile('testfile.txt', 'C:\\invalid\\textfile.txt');
			}).to.throw(TypeError);
		});

		it('should delete file in destination if exists', function() {
			var len = VFS._vfs.length;

			VFS.copyFile('testfile.txt', 'C:\\temp\\testfile.txt');

			expect(VFS._vfs.length).to.equal(len);
		});
    });

	describe('copyFolder()', function() {
		it('should copy a folder and its contents to a new location', function() {
			VFS.copyFolder('C:\\temp', 'C:\\temp2');

			expect(VFS.folderExists('C:\\temp2')).to.equal(-1);
			expect(VFS.folderExists('C:\\temp2\\subfolder')).to.equal(-1);
			expect(VFS.fileExists('C:\\temp2\\testfile.txt')).to.equal(-1);
			expect(VFS.fileExists('C:\\temp2\\subfolder\\test.ini')).to.equal(-1);
		});

		it('should not create new folder if destination exists', function() {
			VFS.createFolder('C:\\temp2');
			VFS.copyFile('C:\\temp\\testfile.txt', 'C:\\temp2\\file.txt');
			VFS.copyFolder('C:\\temp', 'C:\\temp2');

			expect(VFS.fileExists('C:\\temp2\\file.txt'));
		});

		it('should throw error if origin does not exist', function() {
			expect(function() {
				VFS.copyFolder('C:\\temp2', 'C:\\temp');
			}).to.throw(TypeError);
		});
    });

	describe('createFolder()', function() {
		it('should create a new folder', function() {
			VFS.createFolder('testfolder');
			expect(VFS.folderExists('C:\\temp\\testfolder')).to.equal(-1);
		});

		it('should throw error if folder already exists', function() {
			expect(function() {
				VFS.createFolder('C:\\temp');
			}).to.throw(TypeError);
		});
    });

	describe('createTextFile()', function() {

    });

	describe('deleteFile()', function() {
		it('should remove a file from the VFS', function() {
			VFS.deleteFile('testfile.txt');
			expect(VFS._resolvePath('testfile.txt', 'file')).to.be.undefined;
		});

		it('should throw error if file not found', function() {
			expect(function() {
				VFS.deleteFile('C:\\boot.ini');
			}).to.throw(TypeError);
		});

		it('should return false if file not found and suppressError is true', function() {
			expect(VFS.deleteFile('C:\\boot.ini', true)).to.equal(false);
		});
    });

	describe('deleteFolder()', function() {
		it('should remove a folder from the VFS', function() {
			VFS.deleteFolder('C:\\temp');
			expect(VFS._resolvePath('C:\\temp', 'folder')).to.be.undefined;
		});

		it('should throw error if path not found', function() {
			expect(function() {
				VFS.deleteFolder('C:\\windows');
			}).to.throw(TypeError);
		});

		it('should remove subfolders and subfiles as well', function() {
			VFS.deleteFolder('C:\\');
			expect(VFS._resolvePath('C:\\temp', 'folder')).to.be.undefined;
			expect(VFS._resolvePath('C:\\temp\\testfile.txt', 'file')).to.be.undefined;
		});

		it('should not be able to remove static-folders (i.e. drive-folders)', function() {
			VFS.deleteFolder('C:\\');
			expect(VFS._resolvePath('C:\\')).to.not.be.undefined;
		});
    });

	describe('driveExists()', function() {
		it('should return -1 if drive exists', function() {
			expect(VFS.driveExists('C')).to.equal(-1);
		});

		it('should return 0 if drive does not exist', function() {
			expect(VFS.driveExists('X')).to.equal(0);
		});
    });

	describe('fileExists()', function() {
		it('should return -1 if file exists', function() {
			expect(VFS.fileExists('C:\\temp\\testfile.txt')).to.equal(-1);
		});

		it('should return 0 if Drive does not exist', function() {
			expect(VFS.fileExists('C:\\boot.ini')).to.equal(0);
		});
    });

	describe('folderExists()', function() {
		it('should return -1 if folder exists', function() {
			expect(VFS.folderExists('C:\\temp')).to.equal(-1);
		});

		it('should return 0 if folder does not exist', function() {
			expect(VFS.folderExists('C:\\windows')).to.equal(0);
		});
    });

	describe('getAbsolutePathName()', function() {

    });

	describe('getBaseName()', function() {

    });

	describe('getDrive()', function() {

    });

	describe('getDriveName()', function() {

    });

	describe('getExtensionName()', function() {

    });

	describe('getFile()', function() {
		it('should return a file-object', function() {
			expect(VFS.getFile('C:\\temp\\testfile.txt')).to.be.instanceof(Object);
		});

		it('should throw TypeError if file not found', function() {
			expect(function() {
				VFS.getFile('C:\\boot.ini');
			}).to.throw(TypeError);
		});
    });

	describe('getFileName()', function() {

    });

	describe('getFileVersion()', function() {

    });

	describe('getFolder()', function() {
		it('should return a folder-object', function() {
			expect(VFS.getFolder('C:\\temp')).to.be.instanceof(Object);
		});

		it('should throw TypeError if folder not found', function() {
			expect(function() {
				VFS.getFolder('C:\\windows');
			}).to.throw(TypeError);
		});
    });

	describe('getParentFolderName()', function() {

    });

	describe('getSpecialFolder()', function() {

    });

	describe('getStandardStream()', function() {

    });

	describe('getTempName()', function() {

    });

	describe('moveFile()', function() {

    });

	describe('moveFolder()', function() {

    });

	describe('openTextFile()', function() {

    });
});
