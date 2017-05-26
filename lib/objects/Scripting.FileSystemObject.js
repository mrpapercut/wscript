'use strict';

const Drives = require('./scriptingFSO/collections/Drives');
const VFS    = require('../util/VFS');

/**
 * Scripting.FileSystemObject.js
 * This Object spoofs the Scripting.FileSystemObject Object
 * Properties and methods taken from Microsoft documentation
 * https://msdn.microsoft.com/en-us/library/hww8txat(v=vs.84).aspx
 */

class ScriptingFSO {
    constructor() {
        // Default properties
        this.Drives = new Drives();

        // Custom properties
        this._vfs = global.VFS instanceof VFS ? global.VFS : new VFS();
        this.PATH_SEP = this._vfs.PATH_SEP;
    }

    // Default methods
    // https://msdn.microsoft.com/en-us/library/z0z2z1zt(v=vs.84).aspx
    BuildPath(path, name) {
        const PS = this.PATH_SEP;
        return path.split(PS).concat(name.split(PS)).filter(function(el) {
            return el;
        }).join(PS);
    }

    // https://msdn.microsoft.com/en-us/library/e1wf9e7w(v=vs.84).aspx
    CopyFile(source, destination) {
        return this._vfs.copyFile(source, destination);
    }

    // https://msdn.microsoft.com/en-us/library/xbfwysex(v=vs.84).aspx
    CopyFolder(source, destination) {
        return this._vfs.copyFolder(source, destination);
    }

    // https://msdn.microsoft.com/en-us/library/7kby5ae3(v=vs.84).aspx
    CreateFolder(path) {
        return this._vfs.createFolder(path);
    }

    // https://msdn.microsoft.com/en-us/library/5t9b5c0c(v=vs.84).aspx
    CreateTextFile(filename, overwrite, unicode) {
        return this._vfs.createTextFile(filename, overwrite, unicode);
    }

    // https://msdn.microsoft.com/en-us/library/thx0f315(v=vs.84).aspx
    DeleteFile(path) {
        return this._vfs.deleteFile(path);
    }

    // https://msdn.microsoft.com/en-us/library/ca0at0xh(v=vs.84).aspx
    DeleteFolder(path) {
        return this._vfs.deleteFolder(path);
    }

    // https://msdn.microsoft.com/en-us/library/t565x0f1(v=vs.84).aspx
    DriveExists(path) {
        return this._vfs.driveExists(path);
    }

    // https://msdn.microsoft.com/en-us/library/x23stk5t(v=vs.84).aspx
    FileExists(path) {
        return this._vfs.fileExists(path);
    }

    // https://msdn.microsoft.com/en-us/library/5xc78d8d(v=vs.84).aspx
    FolderExists(path) {
        return this._vfs.folderExists(path);
    }

    // https://msdn.microsoft.com/en-us/library/zx1xa64f(v=vs.84).aspx
    GetAbsolutePathName(path) {
        return this._vfs.getAbsolutePathName(path);
    }

    // https://msdn.microsoft.com/en-us/library/xhxzwwe1(v=vs.84).aspx
    GetBaseName(path) {
        return this._vfs.getBaseName(path);
    }

    // https://msdn.microsoft.com/en-us/library/1z6e0fk3(v=vs.84).aspx
    GetDrive(drivespec) {
        return this._vfs.getDrive(drivespec);
    }

    // https://msdn.microsoft.com/en-us/library/48e3yfdw(v=vs.84).aspx
    GetDriveName(path) {
        return this._vfs.getDriveName(path);
    }

    // https://msdn.microsoft.com/en-us/library/x0fxha2a(v=vs.84).aspx
    GetExtensionName(path) {
        return this._vfs.getExtensionName(path);
    }

    // https://msdn.microsoft.com/en-us/library/sheydkke(v=vs.84).aspx
    GetFile(path) {
        return this._vfs.getFile(path);
    }

    // https://msdn.microsoft.com/en-us/library/a99s8akf(v=vs.84).aspx
    GetFileName(path) {
        return this._vfs.getFileName(path);
    }

    // https://msdn.microsoft.com/en-us/library/b4e05k97(v=vs.84).aspx
    GetFileVersion(path) {
        return this._vfs.getFileVersion(path);
    }

    // https://msdn.microsoft.com/en-us/library/f1xtf7ta(v=vs.84).aspx
    GetFolder(path) {
        return this._vfs.getFolder(path);
    }

    // https://msdn.microsoft.com/en-us/library/22dyy47c(v=vs.84).aspx
    GetParentFolderName(path) {
        return this._vfs.getParentFolderName(path);
    }

    // https://msdn.microsoft.com/en-us/library/a72y2t1c(v=vs.84).aspx
    GetSpecialFolder(folderspec) {
        return this._vfs.getSpecialFolder(folderspec);
    }

    // https://msdn.microsoft.com/en-us/library/y6hbz9es(v=vs.84).aspx
    GetStandardStream(standardStreamType, unicode) {
        return this._vfs.getStandardStream(standardStreamType, unicode);
    }

    // https://msdn.microsoft.com/en-us/library/w0azsy9b(v=vs.84).aspx
    GetTempName() {
        return this._vfs.getTempName();
    }

    // https://msdn.microsoft.com/en-us/library/2wcf3ba6(v=vs.84).aspx
    MoveFile(source, destination) {
        return this._vfs.moveFile(source, destination);
    }

    // https://msdn.microsoft.com/en-us/library/465s5y8s(v=vs.84).aspx
    MoveFolder(source, destination) {
        return this._vfs.moveFolder(source, destination);
    }

    // https://msdn.microsoft.com/en-us/library/314cz14s(v=vs.84).aspx
    OpenTextFile(filename, iomode, create, format) {
        return this._vfs.openTextFile(filename, iomode, create, format);
    }
}

module.exports = ScriptingFSO;
