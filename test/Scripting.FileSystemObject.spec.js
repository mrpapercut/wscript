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

var fullFS = function() {
    return [{
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
    }];
}

var FSO;

describe('Scripting.FileSystemObject', function() {
    beforeEach(function() {
        FSO = getNewInstance();
        FSO._vfs._replaceCurrentFS(fullFS());
    });

    describe('constructor()', function() {
        var Drives = require(getFilePath('objects/scriptingFSO/collections/Drives'));
        var VFS = require(getFilePath('util/VFS'));

        var properties = {
            Drives: new Drives(),
            _vfs: new VFS(),
            PATH_SEP: '\\'
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
            expect(FSO.BuildPath('C:\\temp\\', 'newfolder')).to.equal('C:\\temp\\newfolder');
            expect(FSO.BuildPath('C:\\temp\\', '\\newfolder')).to.equal('C:\\temp\\newfolder');
        });
    });

    // These tests are the same as in test/util/VFS.spec.js and should return same results
    describe('CopyFile()', function() {
        it('should copy a file from one location to another', function() {
            FSO.CopyFile('testfile.txt', 'textfile.txt');

            expect(FSO.FileExists('textfile.txt')).to.equal(-1);
        });

        it('should throw error if file not found', function() {
            expect(function() {
                FSO.CopyFile('C:\\boot.ini', 'C:\\temp\\boot.ini');
            }).to.throw(TypeError);
        });

        it('should throw error if destination not valid', function() {
            expect(function() {
                FSO.CopyFile('testfile.txt', 'C:\\invalid\\textfile.txt');
            }).to.throw(TypeError);
        });

        it('should delete file in destination if exists', function() {
            var len = FSO._vfs._vfs.length;

            FSO.CopyFile('testfile.txt', 'C:\\temp\\testfile.txt');

            expect(FSO._vfs._vfs.length).to.equal(len);
        });

        it('should copy multiple files if wildcard is used', function() {
            FSO.CopyFile('C:\\temp\\testfile.txt', 'C:\\temp\\testfile2.txt');
            FSO.CopyFile('C:\\temp\\*.txt', 'C:\\temp\\subfolder\\');
            expect(FSO.FileExists('C:\\temp\\subfolder\\testfile2.txt')).to.equal(-1);
        });

        it('should throw error if multiple files are copied to non-existing folder', function() {
            FSO.CopyFile('C:\\temp\\testfile.txt', 'C:\\temp\\testfile2.txt');
            expect(function() {
                FSO.CopyFile('C:\\temp\\*.txt', 'C:\\temp2\\');
            }).to.throw(TypeError);
        });
    });

    describe('CopyFolder()', function() {
        it('should copy a folder and its contents to a new location', function() {
            FSO.CopyFolder('C:\\temp', 'C:\\temp2');

            expect(FSO.FolderExists('C:\\temp2')).to.equal(-1);
            expect(FSO.FolderExists('C:\\temp2\\subfolder')).to.equal(-1);
            expect(FSO.FileExists('C:\\temp2\\testfile.txt')).to.equal(-1);
            expect(FSO.FileExists('C:\\temp2\\subfolder\\test.ini')).to.equal(-1);
        });

        it('should not create new folder if destination exists', function() {
            FSO.CreateFolder('C:\\temp2');
            FSO.CopyFile('C:\\temp\\testfile.txt', 'C:\\temp2\\file.txt');
            FSO.CopyFolder('C:\\temp', 'C:\\temp2');

            expect(FSO.FileExists('C:\\temp2\\file.txt'));
        });

        it('should throw error if origin does not exist', function() {
            expect(function() {
                FSO.CopyFolder('C:\\temp2', 'C:\\temp');
            }).to.throw(TypeError);
        });
    });

    describe('CreateFolder()', function() {
        it('should create a new folder', function() {
            FSO.CreateFolder('testfolder');
            expect(FSO.FolderExists('C:\\temp\\testfolder')).to.equal(-1);
        });

        it('should throw error if folder already exists', function() {
            expect(function() {
                FSO.CreateFolder('C:\\temp');
            }).to.throw(TypeError);
        });
    });

    describe('CreateTextFile()', function() {
        it('should throw error if file already exists', function() {
            expect(function() {
                FSO.CreateTextFile('C:\\temp\\testfile.txt');
            }).to.throw(TypeError);
        });

        it('should overwrite existing file if exists', function() {
            FSO.CreateTextFile('C:\\temp\\testfile.txt', true);
            expect(FSO.FileExists('C:\\temp\\testfile.txt')).to.equal(-1);
        });

        it('should create a new file that can be written to', function() {
            var textFile = FSO.CreateTextFile('newfile.txt');
            textFile.Write('Hello world!');
            textFile.WriteBlankLines(1);
            textFile.WriteLine('Foo bar');

            var ts = FSO.OpenTextFile('newfile.txt', 1);
            expect(ts.ReadAll()).to.equal('Hello world!\nFoo bar\n');
        });
    });

    describe('DeleteFile()', function() {
        it('should remove a file from the VFS', function() {
            FSO.DeleteFile('testfile.txt');
            expect(FSO._vfs._resolvePath('testfile.txt', 'file')).to.be.undefined;
        });

        it('should throw error if file not found', function() {
            expect(function() {
                FSO.DeleteFile('C:\\boot.ini');
            }).to.throw(TypeError);
        });

        it('should delete multiple files if wildcard is used', function() {
            FSO.CopyFile('C:\\temp\\testfile.txt', 'C:\\temp\\testfile2.txt');
            FSO.DeleteFile('C:\\temp\\*.txt');
            expect(FSO.FileExists('C:\\temp\\testfile.txt')).to.equal(0);
            expect(FSO.FileExists('C:\\temp\\testfile2.txt')).to.equal(0);
        });
    });

    describe('DeleteFolder()', function() {
        it('should remove a folder from the VFS', function() {
            FSO.DeleteFolder('C:\\temp');
            expect(FSO._vfs._resolvePath('C:\\temp', 'folder')).to.be.undefined;
        });

        it('should throw error if path not found', function() {
            expect(function() {
                FSO.DeleteFolder('C:\\windows');
            }).to.throw(TypeError);
        });

        it('should remove subfolders and subfiles as well', function() {
            FSO.DeleteFolder('C:\\');
            expect(FSO._vfs._resolvePath('C:\\temp', 'folder')).to.be.undefined;
            expect(FSO._vfs._resolvePath('C:\\temp\\testfile.txt', 'file')).to.be.undefined;
        });

        it('should not be able to remove static-folders (i.e. drive-folders)', function() {
            FSO.DeleteFolder('C:\\');
            expect(FSO._vfs._resolvePath('C:\\')).to.not.be.undefined;
        });
    });

    describe('DriveExists()', function() {
        it('should return -1 if drive exists', function() {
            expect(FSO.DriveExists('C')).to.equal(-1);
        });

        it('should return 0 if drive does not exist', function() {
            expect(FSO.DriveExists('X')).to.equal(0);
        });
    });

    describe('FileExists()', function() {
        it('should return -1 if file exists', function() {
            expect(FSO.FileExists('C:\\temp\\testfile.txt')).to.equal(-1);
        });

        it('should return 0 if Drive does not exist', function() {
            expect(FSO.FileExists('C:\\boot.ini')).to.equal(0);
        });
    });

    describe('FolderExists()', function() {
        it('should return -1 if folder exists', function() {
            expect(FSO.FolderExists('C:\\temp')).to.equal(-1);
        });

        it('should return 0 if folder does not exist', function() {
            expect(FSO.FolderExists('C:\\windows')).to.equal(0);
        });
    });

    describe('GetAbsolutePathName()', function() {
        it('should return absolute path', function() {
            expect(FSO.GetAbsolutePathName('testfile.txt')).to.equal('C:\\temp\\testfile.txt');
        });
    });

    describe('GetBaseName()', function() {
        it('should return filename without extension', function() {
            expect(FSO.GetBaseName('C:\\temp\\testfile.txt')).to.equal('testfile');
        });
    });

    describe('GetDrive()', function() {
        it('should throw error when trying to access network drive', function() {
            expect(function() {
                FSO.GetDrive('\\\\computer2\\share1');
            }).to.throw(TypeError);
        });

        it('should throw error if Drive does not exist', function() {
            expect(function() {
                FSO.GetDrive('X');
            }).to.throw(TypeError);
        });

        it('should return a Drive-object', function() {
            expect(FSO.GetDrive('C:')).to.be.instanceof(Object);
        });

        it('should handle all allowed drive-notations', function() {
            expect(FSO.GetDrive('C')).to.be.instanceof(Object);
            expect(FSO.GetDrive('C:')).to.be.instanceof(Object);
            expect(FSO.GetDrive('C:\\')).to.be.instanceof(Object);
        });

        it('should throw error if invalid drive-notation is used', function() {
            expect(function() {
                FSO.GetDrive('C:\\temp');
            }).to.throw(TypeError);
        });
    });

    describe('GetDriveName()', function() {
        it('should return correct name for different formats', function() {
            expect(FSO.GetDriveName('C:')).to.equal('C:');
            expect(FSO.GetDriveName('C:\\')).to.equal('C:');
            expect(FSO.GetDriveName('V:\\temp')).to.equal('V:');
            expect(FSO.GetDriveName('\\\\computer2\\share1')).to.equal('\\\\computer2\\share1');
            expect(FSO.GetDriveName('\\\\computer2')).to.equal('');
            expect(FSO.GetDriveName('C')).to.equal('');
            expect(FSO.GetDriveName('.')).to.equal('');
            expect(FSO.GetDriveName('HELLO WORLD')).to.equal('');
        });
    });

    describe('GetExtensionName()', function() {
        it('should return file extension', function() {
            expect(FSO.GetExtensionName('C:\\temp\\testfile.txt')).to.equal('txt');
        });
    });

    describe('GetFile()', function() {
        it('should return a file-object', function() {
            expect(FSO.GetFile('C:\\temp\\testfile.txt')).to.be.instanceof(Object);
        });

        it('should throw TypeError if file not found', function() {
            expect(function() {
                FSO.GetFile('C:\\boot.ini');
            }).to.throw(TypeError);
        });
    });

    describe('GetFileName()', function() {
        it('should return full filename', function() {
            expect(FSO.GetFileName('C:\\temp\\testfile.txt')).to.equal('testfile.txt');
        });
    });

    describe('GetFileVersion()', function() {
        it('should throw error if file not found', function() {
            expect(function() {
                FSO.GetFileVersion('C:\\ntdll.dll')
            }).to.throw(TypeError);
        });

        it('should return empty string if file is found', function() {
            expect(FSO.GetFileVersion('C:\\temp\\testfile.txt')).to.equal('');
        });
    });

    describe('GetFolder()', function() {
        it('should return a folder-object', function() {
            expect(FSO.GetFolder('C:\\temp')).to.be.instanceof(Object);
        });

        it('should throw TypeError if folder not found', function() {
            expect(function() {
                FSO.GetFolder('C:\\windows');
            }).to.throw(TypeError);
        });
    });

    describe('GetParentFolderName()', function() {
        it('should return parent folder path', function() {
            expect(FSO.GetParentFolderName('C:\\temp')).to.equal('C:\\');
            expect(FSO.GetParentFolderName('C:\\temp\\subfolder\\filename.txt')).to.equal('C:\\temp\\subfolder');
        });

        it('should return empty string if no parent folder can be determined', function() {
            expect(FSO.GetParentFolderName('C:\\')).to.equal('');
            expect(FSO.GetParentFolderName('HELLO WORLD')).to.equal('');
            expect(FSO.GetParentFolderName('\\\\computer2\\share1')).to.equal('');
        });
    });

    describe('GetSpecialFolder()', function() {
        it('should throw error if value is not an integer', function() {
            expect(function() {
                FSO.GetSpecialFolder('C:\\Windows');
            }).to.throw(TypeError);
        });

        it('should throw error if providing incorrect value', function() {
            expect(function() {
                FSO.GetSpecialFolder(-1);
            }).to.throw(TypeError);

            expect(function() {
                FSO.GetSpecialFolder(3);
            }).to.throw(TypeError);
        });

        it('should return C:\\Windows', function() {
            expect(FSO.GetSpecialFolder(0)).to.equal('C:\\Windows');
        });

        it('should return C:\\Windows\\System32', function() {
            expect(FSO.GetSpecialFolder(1)).to.equal('C:\\Windows\\System32');
        });

        it('should return C:\\temp', function() {
            expect(FSO.GetSpecialFolder(2)).to.equal('C:\\temp');
        });
    });

    describe('GetStandardStream()', function() {
        it('should throw error if value is not an integer', function() {
            expect(function() {
                FSO.GetStandardStream('StdIn');
            }).to.throw(TypeError);
        });

        it('should throw error if providing incorrect value', function() {
            expect(function() {
                FSO.GetStandardStream(-1);
            }).to.throw(TypeError);

            expect(function() {
                FSO.GetStandardStream(3);
            }).to.throw(TypeError);
        });

        it('should create a StdIn stream type', function() {
            var StdIn = FSO.GetStandardStream(0);
            expect(StdIn._filename).to.equal('StdIn');
        });

        it('should create a StdOut stream type', function() {
            var StdOut = FSO.GetStandardStream(1);
            expect(StdOut._filename).to.equal('StdOut');
        });

        it('should create a StdErr stream type', function() {
            var StdErr = FSO.GetStandardStream(2);
            expect(StdErr._filename).to.equal('StdErr');
        });
    });

    describe('getTempName()', function() {
        it('should return a random preformatted filename', function() {
            expect(FSO.GetTempName()).to.match(/^rad[0-9A-F]{5}.tmp$/);
        });
    });

    describe('MoveFile()', function() {
        it('should move a file from source to destination', function() {
            FSO.MoveFile('C:\\temp\\testfile.txt', 'C:\\testfile.txt');
            expect(FSO.FileExists('C:\\temp\\testfile.txt')).to.equal(0);
            expect(FSO.FileExists('C:\\testfile.txt')).to.equal(-1);
        });

        it('should move multiple files from source to folder', function() {
            FSO.CopyFile('testfile.txt', 'testfile2.txt');
            FSO.MoveFile('*.txt', '.\\subfolder\\');
            expect(FSO.FileExists('C:\\temp\\testfile.txt')).to.equal(0);
            expect(FSO.FileExists('C:\\temp\\testfile2.txt')).to.equal(0);
            expect(FSO.FileExists('C:\\temp\\subfolder\\testfile.txt')).to.equal(-1);
            expect(FSO.FileExists('C:\\temp\\subfolder\\testfile2.txt')).to.equal(-1);
        });
    });

    describe('MoveFolder()', function() {
        it('should move a folder to a new destination', function() {
            FSO.MoveFolder('C:\\temp', 'C:\\temp2');
            expect(FSO.FolderExists('C:\\temp')).to.equal(0);
            expect(FSO.FolderExists('C:\\temp2')).to.equal(-1);
        });
    });

    describe('OpenTextFile()', function() {
        it('should throw error if no filename provided', function() {
            expect(function() {
                FSO.OpenTextFile();
            }).to.throw(TypeError);
        });

        it('should throw error if `create` is false and file not found', function() {
            expect(function() {
                FSO.OpenTextFile('notfound.txt');
            }).to.throw(TypeError);
        });

        it('should create a new file if `create` is true', function() {
            FSO.OpenTextFile('newfile.txt', 2, true);
            expect(FSO.FileExists('newfile.txt')).to.equal(-1);
        });

        it('should return TextStream based on existing file', function() {
            var ts = FSO.OpenTextFile('testfile.txt', 1);
            // Using ReadAll() function to see if TextStream behaves as expected
            expect(ts.ReadAll()).to.equal('Hello world!');
        });
    });
});