'use strict';

let TextStream = require('../common/TextStream');

let Drive      = require('../objects/scriptingFSO/objects/Drive');
let File       = require('../objects/scriptingFSO/objects/File');
let Folder     = require('../objects/scriptingFSO/objects/Folder');

let Drives     = require('../objects/scriptingFSO/collections/Drives');
let Files      = require('../objects/scriptingFSO/collections/Files');
let Folders    = require('../objects/scriptingFSO/collections/Folders');

/**
 * Virtual file system
 * Keeps track of files and folders
 */

class VFS {
    constructor(vfs) {
        this._vfs = vfs || [{ // Default filesystem
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
            name: 'windows',
            path: 'C:\\windows',
            type: 'folder'
        }, {
            name: 'system32',
            path: 'C:\\windows\\system32',
            type: 'folder'
        }, {
            name: 'Users',
            path: 'C:\\Users',
            type: 'folder'
        }, {
            name: 'User',
            path: 'C:\\Users\\User',
            type: 'folder'
        }, {
            name: 'AppData',
            path: 'C:\\Users\\User\\AppData',
            type: 'folder'
        }, {
            name: 'Local',
            path: 'C:\\Users\\User\\AppData\\Local',
            type: 'folder'
        }, {
            name: 'Temp',
            path: 'C:\\Users\\User\\AppData\\Local\\Temp',
            type: 'folder'
        }];

        // Relative paths will be prepended by this
        this._tmppath = 'C:\\temp';

        this.PATH_SEP = '\\';
    }

    _createFileObject(path, content) {
        return {
            content,
            name: path.split(this.PATH_SEP).pop(),
            path,
            type: 'file',
            userCreated: true
        }
    }

    _createFolderObject(path) {
        return {
            name: path.split(this.PATH_SEP).pop(),
            path: path,
            type: 'folder',
            userCreated: true
        }
    }

    _findFilesByWildcard(path) {
        var filename = this.getFileName(path);
        let regex = new RegExp(filename.replace('.', '\\.').replace('*', '.*'));

        return this._vfs.filter(el => {
            return el.type === 'file' &&
                this.getParentFolderName(el.path) === this.getParentFolderName(path) &&
                el.path.match(regex);
        });
    }

    _formatPath(path) {
        let curPathArr = !path.match(/^[A-Z]\:/) ? this._tmppath.split(this.PATH_SEP) : [];
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

    _getSubfiles(path) {
        path = this._formatPath(path);

        return this._vfs.filter(entry => {
            return entry.type === 'file' && entry.path.replace(this.PATH_SEP + entry.name, '') === path;
        });
    }

    _getSubfolders(path) {
        path = this._formatPath(path);

        return this._vfs.filter(entry => {
            return entry.type === 'folder' &&
                entry.path !== path &&
                entry.path.indexOf((path.match(/\\$/) ? path : path + this.PATH_SEP)) === 0;
        });
    }

    _printVFS() {
        return JSON.stringify(this._vfs, null, 2);
    }

    _resolvePath(path, type) {
        path = type !== 'drive' ? this._formatPath(path) : path;

        if (this.getFileName(path).match(/\*/)) {
            return this._findFilesByWildcard(path);
        } else {
            return this._vfs.filter(entry => {
                if (type && entry.type !== type) {
                    return false;
                } else if (type && type === 'drive') {
                    return entry.name === path;
                }

                return entry.path === path;
            })[0];
        }
    }

    _replaceCurrentFS(newVFS) {
        this._vfs = newVFS;
    }

    _updateFileContent(path, content) {
        path = this._formatPath(path);

        this._vfs.forEach(entry => {
            if (entry.type === 'file' && entry.path === path) {
                entry.content = content;
            }
        });
    }

    copyFile(source, destination) {
        destination = this._formatPath(destination);

        let resolvedFile = this._resolvePath(source);

        if (!resolvedFile) {
            throw TypeError('File not found');
        }

        if (resolvedFile instanceof Array) {
            if (!this.folderExists(destination)) {
                throw new TypeError('Path not found');
            } else {
                return resolvedFile.forEach(file => this.copyFile(file.path, [destination, file.name].join(this.PATH_SEP)));
            }
        }

        if (!this.folderExists(this.getParentFolderName(destination))) {
            throw TypeError('Path not found');
        }

        if (this.fileExists(destination) === -1) {
            this.deleteFile(destination);
        }

        this._vfs.push(this._createFileObject(destination, resolvedFile.content));
    }

    copyFolder(source, destination) {
        destination = this._formatPath(destination);

        let resolvedOrigin = this._resolvePath(source);
        let resolvedDest = this._resolvePath(destination);

        // First get all subfolders & files
        let subfolders = this._getSubfolders(source);
        let subfiles = this._getSubfiles(source);

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
        let textFile = new TextStream(filename, '', unicode, 2);

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

        if (resolvedFile instanceof Array) {
            return resolvedFile.forEach(file => this.deleteFile(file.path));
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

    getDrive(drivespec) {
        if (!drivespec.match(/^[A-Z]{1}(\:|\:\\)?$/)) {
            // Throw error when trying to access network drive
            throw new TypeError('Path not found');
        }

        let resolvedDrive = this._resolvePath(drivespec.split('').shift(), 'drive');
        if (!resolvedDrive) {
            throw new TypeError('Path not found');
        }

        return new Drive(resolvedDrive);
    }

    getDriveName(path) {
        // Is network drive?
        if (path.match(/^\\\\([^<>:"\/\\|?*]+)\\([^<>:"\/\\|?*]+)/)) {
            let networkShareArr = path.split(this.PATH_SEP).filter(el => el);
            return [this.PATH_SEP, networkShareArr[0], networkShareArr[1]].join(this.PATH_SEP);
        // Volume drive?
        } else if (path.match(/^([A-Z]{1}\:)/)) {
            return path.slice(0, 2);
        } else {
            return '';
        }
    }

    getExtensionName(path) {
        return path.split(this.PATH_SEP).pop().split('.').pop();
    }

    getFile(path) {
        let resolvedFile = this._resolvePath(path, 'file');

        if (!resolvedFile) {
            throw new TypeError('File not found');
        } else {
            return new File(resolvedFile, this);
        }
    }

    getFileName(path) {
        return path.split(this.PATH_SEP).pop();
    }

    getFileVersion(path) {
        // Seems only some Windows System files (such as ntdll.dll) have FileVersions
        let resolvedFile = this._resolvePath(path, 'file');

        if (!resolvedFile) {
            throw new TypeError('The system cannot find the file specified');
        } else {
            return '';
        }
    }

    getFolder(path) {
        let resolvedFolder = this._resolvePath(path, 'folder');

        if (!resolvedFolder) {
            throw new TypeError('Path not found');
        } else {
            return new Folder(resolvedFolder, this);
        }
    }

    getParentFolderName(path) {
        let pathArr = path.split(this.PATH_SEP).filter(el => el);

        if (path.match(/^[A-Z]{1}\:?/) && pathArr.length > 1) {
            let newPathArr = pathArr.splice(0, pathArr.length - 1);
            return newPathArr.length === 1 ? newPathArr[0] + this.PATH_SEP : newPathArr.join(this.PATH_SEP);
        } else {
            return '';
        }
    }

    getSpecialFolder(folderspec) {
        folderspec = parseInt(folderspec, 10);

        if (isNaN(folderspec)) {
            throw new TypeError('Type mismatch');
        }

        if (folderspec < 0 || folderspec > 2) {
            throw new TypeError('Invalid procedure call or argument');
        }

        switch (folderspec) {
            case 0:
                return 'C:\\Windows';

            case 1:
                return 'C:\\Windows\\System32';

            case 2:
                return 'C:\\temp';
        }
    }

    getStandardStream(standardStreamType, unicode) {
        standardStreamType = parseInt(standardStreamType, 10);

        if (isNaN(standardStreamType)) {
            throw new TypeError('Type mismatch');
        }

        if (standardStreamType < 0 || standardStreamType > 2) {
            throw new TypeError('Invalid procedure call or argument');
        }

        switch (standardStreamType) {
            case 0:
                return new TextStream('StdIn', null, unicode);

            case 1:
                return new TextStream('StdOut', null, unicode);

            case 2:
                return new TextStream('StdErr', null, unicode);
        }
    }

    getTempName() {
        // Returns filename in following format:
        // prefix 'rad'
        // random 5-byte string in hex, 0 padded
        // .tmp extension
        let randBytes = ('0000' + (Math.floor(Math.random() * Math.pow(2, 20)).toString(16))).substr(-5).toUpperCase();
        return ['rad', randBytes, '.tmp'].join('');
    }

    moveFile(source, destination) {
        this.copyFile(source, destination);
        this.deleteFile(source);
    }

    moveFolder(source, destination) {
        this.copyFolder(source, destination);
        this.deleteFolder(source);
    }

    openTextFile(filename, iomode, create, format) {
        if (!filename || (filename && this.fileExists(filename) === 0 && create !== true)) {
            throw new TypeError('File not found');
        }

        if (this.fileExists(filename) === 0 && create === true) {
            return this.createTextFile(filename, false, true);
        } else {
            let origFile = this.getFile(filename);
            return new TextStream(origFile.Name, origFile._content, true, iomode);
        }
    }
}

module.exports = VFS;
