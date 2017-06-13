'use strict';

var chai = require('chai'),
    path = require('path'),
    expect = chai.expect;

var getFilePath = function(filename) {
    return path.join(__dirname, '../..', 'lib', filename);
}

var getNewInstance = function(useDefaultVFS) {
    var instance = require(getFilePath('util/VFS'));

    return new instance(!useDefaultVFS ? [{
        name: 'C',
        type: 'drive'
    }, {
        name: 'C:',
        path: 'C:\\',
        static: true,
        type: 'folder'
    }, {
        name: 'temp',
        path: 'C:\\temp',
        type: 'folder',
    }, {
        content: 'Hello world!',
        name: 'testfile.txt',
        path: 'C:\\temp\\testfile.txt',
        type: 'file'
    }, {
        name: 'subfolder',
        path: 'C:\\temp\\subfolder',
        type: 'folder'
    }, {
        content: 'Malicious content',
        name: 'test.ini',
        path: 'C:\\temp\\subfolder\\test.ini',
        type: 'file'
    }] : null);
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

        it('should initialize with default VFS', function() {
            VFS = getNewInstance(true);
            expect(VFS.fileExists('C:\\temp\\testfile.txt')).to.equal(0);
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
                userCreated: true
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
                type: 'file',
                userCreated: true
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
            expect(VFS._formatPath('C:\\temp/testfile.txt')).to.equal('C:\\temp\\testfile.txt');
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

    describe('_replaceCurrentFS()', function() {
        it('should replace the current VFS with a new one', function() {
            VFS._replaceCurrentFS([{
                name: 'D',
                type: 'drive'
            }, {
                name: 'D:',
                path: 'D:\\',
                static: true,
                type: 'folder'
            }, {
                name: 'temp',
                path: 'D:\\temp',
                type: 'folder',
            }, {
                content: 'Hello world!',
                name: 'testfile.txt',
                path: 'D:\\temp\\testfile.txt',
                type: 'file'
            }, {
                name: 'subfolder',
                path: 'D:\\temp\\subfolder',
                type: 'folder'
            }, {
                content: 'Malicious content',
                name: 'test.ini',
                path: 'D:\\temp\\subfolder\\test.ini',
                type: 'file'
            }]);

            expect(VFS.driveExists('C')).to.equal(0);
            expect(VFS.driveExists('D')).to.equal(-1);
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

        it('should copy multiple files if wildcard is used', function() {
            VFS.copyFile('C:\\temp\\testfile.txt', 'C:\\temp\\testfile2.txt');
            VFS.copyFile('C:\\temp\\*.txt', 'C:\\temp\\subfolder\\');
            expect(VFS.fileExists('C:\\temp\\subfolder\\testfile2.txt')).to.equal(-1);
        });

        it('should throw error if multiple files are copied to non-existing folder', function() {
            VFS.copyFile('C:\\temp\\testfile.txt', 'C:\\temp\\testfile2.txt');
            expect(function() {
                VFS.copyFile('C:\\temp\\*.txt', 'C:\\temp2\\');
            }).to.throw(TypeError);
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
        it('should throw error if file already exists', function() {
            expect(function() {
                VFS.createTextFile('C:\\temp\\testfile.txt');
            }).to.throw(TypeError);
        });

        it('should overwrite existing file if exists', function() {
            VFS.createTextFile('C:\\temp\\testfile.txt', true);
            expect(VFS._resolvePath('C:\\temp\\testfile.txt')).to.not.be.undefined;
        });

        it('should create a new file that can be written to', function() {
            var textFile = VFS.createTextFile('newfile.txt');
            textFile.Write('Hello world!');
            textFile.WriteBlankLines(1);
            textFile.WriteLine('Foo bar');

            var ts = VFS.openTextFile('newfile.txt', 1);
            expect(ts.ReadAll()).to.equal('Hello world!\nFoo bar\n');
        });
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

        it('should delete multiple files if wildcard is used', function() {
            VFS.copyFile('C:\\temp\\testfile.txt', 'C:\\temp\\testfile2.txt');
            VFS.deleteFile('C:\\temp\\*.txt');
            expect(VFS.fileExists('C:\\temp\\testfile.txt')).to.equal(0);
            expect(VFS.fileExists('C:\\temp\\testfile2.txt')).to.equal(0);
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
        it('should return absolute path', function() {
            expect(VFS.getAbsolutePathName('testfile.txt')).to.equal('C:\\temp\\testfile.txt');
        });
    });

    describe('getBaseName()', function() {
        it('should return filename without extension', function() {
            expect(VFS.getBaseName('C:\\temp\\testfile.txt')).to.equal('testfile');
        });
    });

    describe('getDrive()', function() {
        it('should throw error when trying to access network drive', function() {
            expect(function() {
                VFS.getDrive('\\\\computer2\\share1');
            }).to.throw(TypeError);
        });

        it('should throw error if Drive does not exist', function() {
            expect(function() {
                VFS.getDrive('X');
            }).to.throw(TypeError);
        });

        it('should return a Drive-object', function() {
            expect(VFS.getDrive('C:')).to.be.instanceof(Object);
        });

        it('should handle all allowed drive-notations', function() {
            expect(VFS.getDrive('C')).to.be.instanceof(Object);
            expect(VFS.getDrive('C:')).to.be.instanceof(Object);
            expect(VFS.getDrive('C:\\')).to.be.instanceof(Object);
        });

        it('should throw error if invalid drive-notation is used', function() {
            expect(function() {
                VFS.getDrive('C:\\temp');
            }).to.throw(TypeError);
        });
    });

    describe('getDriveName()', function() {
        it('should return correct name for different formats', function() {
            expect(VFS.getDriveName('C:')).to.equal('C:');
            expect(VFS.getDriveName('C:\\')).to.equal('C:');
            expect(VFS.getDriveName('V:\\temp')).to.equal('V:');
            expect(VFS.getDriveName('\\\\computer2\\share1')).to.equal('\\\\computer2\\share1');
            expect(VFS.getDriveName('\\\\computer2')).to.equal('');
            expect(VFS.getDriveName('C')).to.equal('');
            expect(VFS.getDriveName('.')).to.equal('');
            expect(VFS.getDriveName('HELLO WORLD')).to.equal('');
        });
    });

    describe('getExtensionName()', function() {
        it('should return file extension', function() {
            expect(VFS.getExtensionName('C:\\temp\\testfile.txt')).to.equal('txt');
        });
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
        it('should return full filename', function() {
            expect(VFS.getFileName('C:\\temp\\testfile.txt')).to.equal('testfile.txt');
        });
    });

    describe('getFileVersion()', function() {
        it('should throw error if file not found', function() {
            expect(function() {
                VFS.getFileVersion('C:\\ntdll.dll')
            }).to.throw(TypeError);
        });

        it('should return empty string if file is found', function() {
            expect(VFS.getFileVersion('C:\\temp\\testfile.txt')).to.equal('');
        });
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
        it('should return parent folder path', function() {
            expect(VFS.getParentFolderName('C:\\temp')).to.equal('C:\\');
            expect(VFS.getParentFolderName('C:\\temp\\subfolder\\filename.txt')).to.equal('C:\\temp\\subfolder');
        });

        it('should return empty string if no parent folder can be determined', function() {
            expect(VFS.getParentFolderName('C:\\')).to.equal('');
            expect(VFS.getParentFolderName('HELLO WORLD')).to.equal('');
            expect(VFS.getParentFolderName('\\\\computer2\\share1')).to.equal('');
        });
    });

    describe('getSpecialFolder()', function() {
        it('should throw error if value is not an integer', function() {
            expect(function() {
                VFS.getSpecialFolder('C:\\Windows');
            }).to.throw(TypeError);
        });

        it('should throw error if providing incorrect value', function() {
            expect(function() {
                VFS.getSpecialFolder(-1);
            }).to.throw(TypeError);

            expect(function() {
                VFS.getSpecialFolder(3);
            }).to.throw(TypeError);
        });

        it('should return C:\\Windows', function() {
            expect(VFS.getSpecialFolder(0)).to.equal('C:\\Windows');
        });

        it('should return C:\\Windows\\System32', function() {
            expect(VFS.getSpecialFolder(1)).to.equal('C:\\Windows\\System32');
        });

        it('should return C:\\temp', function() {
            expect(VFS.getSpecialFolder(2)).to.equal('C:\\temp');
        });
    });

    describe('getStandardStream()', function() {
        it('should throw error if value is not an integer', function() {
            expect(function() {
                VFS.getStandardStream('StdIn');
            }).to.throw(TypeError);
        });

        it('should throw error if providing incorrect value', function() {
            expect(function() {
                VFS.getStandardStream(-1);
            }).to.throw(TypeError);

            expect(function() {
                VFS.getStandardStream(3);
            }).to.throw(TypeError);
        });

        it('should create a StdIn stream type', function() {
            var StdIn = VFS.getStandardStream(0);
            expect(StdIn._filename).to.equal('StdIn');
        });

        it('should create a StdOut stream type', function() {
            var StdOut = VFS.getStandardStream(1);
            expect(StdOut._filename).to.equal('StdOut');
        });

        it('should create a StdErr stream type', function() {
            var StdErr = VFS.getStandardStream(2);
            expect(StdErr._filename).to.equal('StdErr');
        });
    });

    describe('getTempName()', function() {
        it('should return a random preformatted filename', function() {
            expect(VFS.getTempName()).to.match(/^rad[0-9A-F]{5}.tmp$/);
        });
    });

    describe('moveFile()', function() {
        it('should move a file from source to destination', function() {
            VFS.moveFile('C:\\temp\\testfile.txt', 'C:\\testfile.txt');
            expect(VFS.fileExists('C:\\temp\\testfile.txt')).to.equal(0);
            expect(VFS.fileExists('C:\\testfile.txt')).to.equal(-1);
        });

        it('should move multiple files from source to folder', function() {
            VFS.copyFile('testfile.txt', 'testfile2.txt');
            VFS.moveFile('*.txt', '.\\subfolder\\');
            expect(VFS.fileExists('C:\\temp\\testfile.txt')).to.equal(0);
            expect(VFS.fileExists('C:\\temp\\testfile2.txt')).to.equal(0);
            expect(VFS.fileExists('C:\\temp\\subfolder\\testfile.txt')).to.equal(-1);
            expect(VFS.fileExists('C:\\temp\\subfolder\\testfile2.txt')).to.equal(-1);
        });
    });

    describe('moveFolder()', function() {
        it('should move a folder to a new destination', function() {
            VFS.moveFolder('C:\\temp', 'C:\\temp2');
            expect(VFS.folderExists('C:\\temp')).to.equal(0);
            expect(VFS.folderExists('C:\\temp2')).to.equal(-1);
        });
    });

    describe('openTextFile()', function() {
        it('should throw error if no filename provided', function() {
            expect(function() {
                VFS.openTextFile();
            }).to.throw(TypeError);
        });

        it('should throw error if `create` is false and file not found', function() {
            expect(function() {
                VFS.openTextFile('notfound.txt');
            }).to.throw(TypeError);
        });

        it('should create a new file if `create` is true', function() {
            VFS.openTextFile('newfile.txt', 2, true);
            expect(VFS.fileExists('newfile.txt')).to.equal(-1);
        });

        it('should return TextStream based on existing file', function() {
            var ts = VFS.openTextFile('testfile.txt', 1);
            // Using ReadAll() function to see if TextStream behaves as expected
            expect(ts.ReadAll()).to.equal('Hello world!');
        });
    });
});
