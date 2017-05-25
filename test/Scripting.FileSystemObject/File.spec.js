'use strict';

var chai = require('chai'),
    path = require('path'),
    expect = chai.expect;

var getFilePath = function(filename) {
    return path.join(__dirname, '../..', 'lib', filename);
}

var VFS       = require(getFilePath('util/VFS'));
var MSformats = require(getFilePath('util/MSformats'));

var getNewInstance = function(filespec, vfs) {
    var instance = require(getFilePath('objects/scriptingFSO/objects/File'));
    return new instance(filespec, vfs || new VFS());
}

var File;

var testfile = {
    content: 'Hello world!',
    name: 'testfile.txt',
    path: 'C:\\temp\\testfile.txt',
    type: 'file'
};

describe('File', function() {
    describe('constructor()', function() {
        File = getNewInstance(testfile);

        var properties = {
            Attributes:       32,
            DateCreated:      MSformats.getDate(),
            DateLastAccessed: MSformats.getDate(),
            DateLastModified: MSformats.getDate(),
            Drive:            'C:',
            Name:             'testfile.txt',
            ParentFolder:     'C:\\temp',
            Path:             'C:\\temp\\testfile.txt',
            ShortName:        'testfile.txt',
            ShortPath:        'C:\\temp\\testfile.txt',
            Size:             0,
            Type:             'TXT File',
            _parent:          new VFS(),
            _content:         'Hello world!'
        }

        it('should have all properties', function() {
            expect(File).to.have.all.keys(Object.keys(properties));
        });

        it('should have all default values', function() {
            for (var i in properties) {
                expect(File[i]).to.eql(properties[i]);
            }
        });
    });

    describe('Copy()', function() {
        it('should copy current file to new location', function() {
            var vfs = new VFS();

            vfs.createTextFile('testfile.txt');
            var file = vfs.getFile('testfile.txt');

            file.Copy('newtestfile.txt');
            expect(vfs.fileExists('newtestfile.txt')).to.equal(-1);
        });
    });

    describe('Delete()', function() {
        it('should delete current file', function() {
            var vfs = new VFS();

            vfs.createTextFile('testfile.txt');
            var file = vfs.getFile('testfile.txt');

            file.Delete();
            expect(vfs.fileExists('testfile.txt')).to.equal(0);
        });
    });

    describe('Move()', function() {
        it('should move the current file to destination', function() {
            var vfs = new VFS();

            vfs.createTextFile('testfile.txt');
            var file = vfs.getFile('testfile.txt');

            file.Move('newtestfile.txt');
            expect(vfs.fileExists('testfile.txt')).to.equal(0);
            expect(vfs.fileExists('newtestfile.txt')).to.equal(-1);
        });
    });

    describe('OpenAsTextStream()', function() {
        it('should return TextStream based on current file', function() {
            var vfs = new VFS();

            var textfile = vfs.createTextFile('testfile.txt');
            textfile.Write('Hello world!');

            var file = vfs.getFile('testfile.txt');
            var ts = file.OpenAsTextStream();

            expect(ts.ReadAll()).to.equal('Hello world!');
        });
    });
});
