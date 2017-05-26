'use strict';

var Drives  = require('./scriptingFSO/collections/Drives');
var VFS     = require('../util/VFS');

/**
 * Scripting.FileSystemObject.js
 * This Object spoofs the Scripting.FileSystemObject Object
 * Properties and methods taken from Microsoft documentation
 * https://msdn.microsoft.com/en-us/library/hww8txat(v=vs.84).aspx
 */

var ScriptingFSO = function() {
    // Default properties
    this.Drives = new Drives();

    // Custom properties
    this._vfs = global.VFS instanceof VFS ? global.VFS : new VFS();
    this.PATH_SEP = this._vfs.PATH_SEP;
};

// Default methods
// https://msdn.microsoft.com/en-us/library/z0z2z1zt(v=vs.84).aspx
ScriptingFSO.prototype.BuildPath = function(path, name) {
    var PS = this.PATH_SEP;
    return path.split(PS).concat(name.split(PS)).filter(function(el) {
        return el;
    }).join(PS);
};

// https://msdn.microsoft.com/en-us/library/e1wf9e7w(v=vs.84).aspx
ScriptingFSO.prototype.CopyFile = function(source, destination) {
    return this._vfs.copyFile(source, destination);
};

// https://msdn.microsoft.com/en-us/library/xbfwysex(v=vs.84).aspx
ScriptingFSO.prototype.CopyFolder = function(source, destination) {
    return this._vfs.copyFolder(source, destination);
};

// https://msdn.microsoft.com/en-us/library/7kby5ae3(v=vs.84).aspx
ScriptingFSO.prototype.CreateFolder = function(path) {
    return this._vfs.createFolder(path);
};

// https://msdn.microsoft.com/en-us/library/5t9b5c0c(v=vs.84).aspx
ScriptingFSO.prototype.CreateTextFile = function(filename, overwrite, unicode) {
    return this._vfs.createTextFile(filename, overwrite, unicode);
};

// https://msdn.microsoft.com/en-us/library/thx0f315(v=vs.84).aspx
ScriptingFSO.prototype.DeleteFile = function(path) {
    return this._vfs.deleteFile(path);
};

// https://msdn.microsoft.com/en-us/library/ca0at0xh(v=vs.84).aspx
ScriptingFSO.prototype.DeleteFolder = function(path) {
    return this._vfs.deleteFolder(path);
};

// https://msdn.microsoft.com/en-us/library/t565x0f1(v=vs.84).aspx
ScriptingFSO.prototype.DriveExists = function(path) {
    return this._vfs.driveExists(path);
};

// https://msdn.microsoft.com/en-us/library/x23stk5t(v=vs.84).aspx
ScriptingFSO.prototype.FileExists = function(path) {
    return this._vfs.fileExists(path);
};

// https://msdn.microsoft.com/en-us/library/5xc78d8d(v=vs.84).aspx
ScriptingFSO.prototype.FolderExists = function(path) {
    return this._vfs.folderExists(path);
};

// https://msdn.microsoft.com/en-us/library/zx1xa64f(v=vs.84).aspx
ScriptingFSO.prototype.GetAbsolutePathName = function(path) {
    return this._vfs.getAbsolutePathName(path);
};

// https://msdn.microsoft.com/en-us/library/xhxzwwe1(v=vs.84).aspx
ScriptingFSO.prototype.GetBaseName = function(path) {
    return this._vfs.getBaseName(path);
};

// https://msdn.microsoft.com/en-us/library/1z6e0fk3(v=vs.84).aspx
ScriptingFSO.prototype.GetDrive = function(drivespec) {
    return this._vfs.getDrive(drivespec);
};

// https://msdn.microsoft.com/en-us/library/48e3yfdw(v=vs.84).aspx
ScriptingFSO.prototype.GetDriveName = function(path) {
    return this._vfs.getDriveName(path);
};

// https://msdn.microsoft.com/en-us/library/x0fxha2a(v=vs.84).aspx
ScriptingFSO.prototype.GetExtensionName = function(path) {
    return this._vfs.getExtensionName(path);
};

// https://msdn.microsoft.com/en-us/library/sheydkke(v=vs.84).aspx
ScriptingFSO.prototype.GetFile = function(path) {
    return this._vfs.getFile(path);
};

// https://msdn.microsoft.com/en-us/library/a99s8akf(v=vs.84).aspx
ScriptingFSO.prototype.GetFileName = function(path) {
    return this._vfs.getFileName(path);
};

// https://msdn.microsoft.com/en-us/library/b4e05k97(v=vs.84).aspx
ScriptingFSO.prototype.GetFileVersion = function(path) {
    return this._vfs.getFileVersion(path);
};

// https://msdn.microsoft.com/en-us/library/f1xtf7ta(v=vs.84).aspx
ScriptingFSO.prototype.GetFolder = function(path) {
    return this._vfs.getFolder(path);
};

// https://msdn.microsoft.com/en-us/library/22dyy47c(v=vs.84).aspx
ScriptingFSO.prototype.GetParentFolderName = function(path) {
    return this._vfs.getParentFolderName(path);
};

// https://msdn.microsoft.com/en-us/library/a72y2t1c(v=vs.84).aspx
ScriptingFSO.prototype.GetSpecialFolder = function(folderspec) {
    return this._vfs.getSpecialFolder(folderspec);
};

// https://msdn.microsoft.com/en-us/library/y6hbz9es(v=vs.84).aspx
ScriptingFSO.prototype.GetStandardStream = function(standardStreamType, unicode) {
    return this._vfs.getStandardStream(standardStreamType, unicode);
};

// https://msdn.microsoft.com/en-us/library/w0azsy9b(v=vs.84).aspx
ScriptingFSO.prototype.GetTempName = function() {
    return this._vfs.getTempName();
};

// https://msdn.microsoft.com/en-us/library/2wcf3ba6(v=vs.84).aspx
ScriptingFSO.prototype.MoveFile = function(source, destination) {
    return this._vfs.moveFile(source, destination);
};

// https://msdn.microsoft.com/en-us/library/465s5y8s(v=vs.84).aspx
ScriptingFSO.prototype.MoveFolder = function(source, destination) {
    return this._vfs.moveFolder(source, destination);
};

// https://msdn.microsoft.com/en-us/library/314cz14s(v=vs.84).aspx
ScriptingFSO.prototype.OpenTextFile = function(filename, iomode, create, format) {
    return this._vfs.openTextFile(filename, iomode, create, format);
};

module.exports = ScriptingFSO;
