'use strict';

var TextStream = require('../common/TextStream');
/**
 * Virtual file system
 * Keeps track of files and folders
 */

class VFS {
    constructor() {
        // Structure filesystem as object
        this._vfs = [{
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

        // Relative paths will be prepended by this
        this._relpath = 'C:\\temp';

        this.PATH_SEP = '\\';
    }

    _printVFS() {
        return JSON.stringify(this._vfs, null, 2);
    }

    _createFolderObject(path) {
        return {
            name: path.split(this.PATH_SEP).pop(),
            path: path,
            static: false,
            type: 'folder'
        }
    }

    _createFileObject(path, content) {
        return {
            content,
            name: path.split(this.PATH_SEP).pop(),
            path,
            type: 'file'
        }
    }

    _formatPath(path) {
        let curPathArr = !path.match(/^[A-Z]\:/) ? this._relpath.split(this.PATH_SEP) : [];
        let pathArr = curPathArr.concat(path.split(this.PATH_SEP).filter(el => el));
        let absPath = [];

        pathArr.forEach(el => {
            if (el === '.') {
                // Do nothing
            } else if (el === '..') {
                absPath.pop();
            } else {
                absPath.push(el);
            }
        });

        return absPath.length === 1 ? absPath[0] + this.PATH_SEP : absPath.join(this.PATH_SEP);
    }

    _resolvePath(path, type) {
        path = type !== 'drive' ? this._formatPath(path) : path;

        return this._vfs.filter(entry => {
            if (type && entry.type !== type) {
                return false;
            } else if (type && type === 'drive') {
                return entry.name === path;
            }

            return entry.path === path;
        })[0];
    }

    _getSubfolders(path) {
        path = this._formatPath(path);

        return this._vfs.filter(entry => {
            return entry.type === 'folder' && entry.path !== path && entry.path.indexOf(path) === 0;
        });
    }

    _getSubfiles(path) {
        path = this._formatPath(path);

        return this._vfs.filter(entry => {
            return entry.type === 'file' && entry.path.replace(this.PATH_SEP + entry.name, '') === path;
        });
    }

    _updateFileContent(path, content) {
        path = this._formatPath(path);

        this._vfs.forEach(entry => {
            if (entry.type === 'file' && entry.path === path) {
                entry.content = content;
            }
        });
    }

    copyFile(file, destination) {
        destination = this._formatPath(destination);

        let resolvedFile = this._resolvePath(file);
        let destArr = destination.split(this.PATH_SEP);
        let filename = destArr.pop();

        if (!resolvedFile) {
            throw TypeError('File not found');
        }

        if (!this._resolvePath(destArr.join(this.PATH_SEP))) {
            throw TypeError('Path not found');
        }

        if (this._resolvePath(destination)) {
            this.deleteFile(destination);
        }

        this._vfs.push(this._createFileObject(destination, resolvedFile.content));
    }

    copyFolder(folder, destination) {
        destination = this._formatPath(destination);

        let resolvedOrigin = this._resolvePath(folder);
        let resolvedDest = this._resolvePath(destination);

        // First get all subfolders & files
        let subfolders = this._getSubfolders(folder);
        let subfiles = this._getSubfiles(folder);

        if (!resolvedOrigin) {
            throw new TypeError('Path not found');
        }

        // Create destination if not exists
        if (!resolvedDest) {
            this.createFolder(destination);
        }

        subfolders.forEach(folder => this.copyFolder(folder.path, [destination, folder.name].join(this.PATH_SEP)));
        subfiles.forEach(file => this.copyFile(file.path, [destination, file.name].join(this.PATH_SEP)));
    }

    createFolder(path) {
        path = this._formatPath(path);

        if (this._resolvePath(path, 'folder')) {
            throw new TypeError('File already exists');
        }

        this._vfs.push(this._createFolderObject(path));
    }

    createTextFile(filename, overwrite, unicode) {
        let self = this;

        overwrite = overwrite || false;
        unicode = unicode || false;

        if (this._resolvePath(filename)) {
            if (!overwrite) {
                throw new TypeError('File already exists');
            } else {
                this.deleteFile(filename);
            }
        }

        // Add file to VFS
        this._vfs.push(this._createFileObject(this._formatPath(filename), ''));

        let resolvedFile = this._resolvePath(filename);
        let textFile = new TextStream(filename, unicode);

        // Hook TextStream functions
        textFile._Write = textFile.Write;
        textFile.Write = function(string) {
            this._Write(string);
            self._updateFileContent(filename, this._contents);
        };

        textFile._WriteBlankLines = textFile.WriteBlankLines;
        textFile.WriteBlankLines = function(string) {
            this._WriteBlankLines(string);
            self._updateFileContent(filename, this._contents);
        };

        textFile._WriteLine = textFile.WriteLine;
        textFile.WriteLine = function(string) {
            this._WriteLine(string);
            self._updateFileContent(filename, this._contents);
        };

        return textFile;
    }

    deleteFile(path, suppressError) {
        let resolvedFile = this._resolvePath(path, 'file');

        if (!resolvedFile) {
            if (suppressError) {
                return false;
            } else {
                throw new TypeError('Path not found');
            }
        }

        this._vfs.splice(this._vfs.indexOf(resolvedFile), 1);
    }

    deleteFolder(path, suppressError) {
        let resolvedFolder = this._resolvePath(path, 'folder');

        if (!resolvedFolder) {
            if (suppressError) {
                return false;
            } else {
                throw new TypeError('Path not found');
            }
        }

        // First remove all subfolders recursively
        let subfolders = this._getSubfolders(path);
        subfolders.forEach(folder => this.deleteFolder(folder.path, true));

        // Then remove all leftover files
        let subfiles = this._getSubfiles(path);
        subfiles.forEach(file => this.deleteFile(file.path, true));

        // Finally remove folder itself
        if (!resolvedFolder.static) {
            this._vfs.splice(this._vfs.indexOf(resolvedFolder), 1);
        }
    }

    driveExists(path) {
        return this._resolvePath(path, 'drive') ? -1 : 0;
    }

    fileExists(path) {
        return this._resolvePath(path, 'file') ? -1 : 0;
    }

    folderExists(path) {
        return this._resolvePath(path, 'folder') ? -1 : 0;
    }

    getAbsolutePathName(path) {
        return this._formatPath(path);
    }

    getBaseName(path) {
        return path.split(this.PATH_SEP).pop().split('.').shift();
    }

    getDrive() {

    }

    getDriveName() {

    }

    getExtensionName(path) {
        return path.split(this.PATH_SEP).pop().split('.').pop();
    }

    getFile(path) {
        let resolvedFile = this._resolvePath(path, 'file');

        if (!resolvedFile) {
            throw new TypeError('File not found');
        } else {
            return resolvedFile;
        }
    }

    getFileName(path) {
        return path.split(this.PATH_SEP).pop();
    }

    getFileVersion() {

    }

    getFolder(path) {
        let resolvedFolder = this._resolvePath(path, 'folder');

        if (!resolvedFolder) {
            throw new TypeError('Path not found');
        } else {
            return resolvedFolder;
        }
    }

    getParentFolderName() {

    }

    getSpecialFolder() {

    }

    getStandardStream() {

    }

    getTempName() {

    }

    moveFile() {

    }

    moveFolder() {

    }

    openTextFile() {

    }
}

module.exports = VFS;
