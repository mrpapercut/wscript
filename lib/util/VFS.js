'use strict';

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
        }];

        // Relative paths will be prepended by this
        this._relpath = 'C:\\temp';
    }

    _printVFS() {
        console.log(JSON.stringify(this._vfs, null, 2));
    }

	_createFolderObject(path) {
        return {
            name: path.split('\\').pop(),
            type: 'folder',
            path: path
    	}
	}

	_createFileObject(path, content) {
        return {
            content,
            name: path.split('\\').pop(),
            path,
            type: 'file'
        }
	}

    _formatPath(path) {
        let curPathArr = !path.match(/^[A-Z]\:/) ? this._relpath.split('\\') : [];
        let pathArr = curPathArr.concat(path.split('\\').filter(el => el));
        let absPath = [];

        pathArr.forEach((el, index) => {
            if (el === '.') {
                // Do nothing
            } else if (el === '..') {
                absPath.pop();
            } else {
                absPath.push(el);
            }
        });

        return absPath.length === 1 ? absPath[0] + '\\' : absPath.join('\\');
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

	copyFile(file, destination) {
        let resolvedFile = this._resolvePath(file);
        let destArr = destination.split('\\');
        let filename = destArr.pop();

        if (!resolvedFile) {
            throw TypeError('File not found');
        }

        if (!this._resolvePath(destArr.join('\\'))) {
            throw TypeError('Path not found');
        }

        if (this._resolvePath(destination)) {
            this.deleteFile(destination);
        }

        this._vfs.push(this._createFileObject(destination, resolvedFile.content));
	}

	copyFolder(folder, destination) {

	}

	createFolder(path) {

    }

	createTextFile() {

	}

	deleteFile(path) {
        let resolvedFile = this._resolvePath(path);

        if (!resolvedFile) {
            throw new TypeError('File not found');
        }

        this._vfs.splice(this._vfs.indexOf(resolvedFile), 1);
	}

	deleteFolder() {

	}

	driveExists(path) {
        return this._resolvePath(path, 'drive') ? -1 : 0;
	}

	fileExists(path) {
        return this._resolvePath(path, 'file') ? -1 : 0;
	}

	folderExists(path) {
        return this._resolvePath(path, 'folder') ? -1 : path;
	}

	getAbsolutePathName() {

	}

	getBaseName() {

	}

	getDrive() {

	}

	getDriveName() {

	}

	getExtensionName() {

	}

	getFile(path) {
        let resolvedFile = this._resolvePath(path);

        if (!resolvedFile) {
            throw new TypeError('File not found');
        } else {
            return resolvedFile;
        }
	}

	getFileName() {

	}

	getFileVersion() {

	}

	getFolder() {

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
