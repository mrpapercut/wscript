'use strict';

var Drive      = require('./scriptingFSO/objects/Drive');
var File       = require('./scriptingFSO/objects/File');
var Folder     = require('./scriptingFSO/objects/Folder');

var Drives     = require('./scriptingFSO/collections/Drives');
var Files      = require('./scriptingFSO/collections/Files');
var Folders    = require('./scriptingFSO/collections/Folders');

/**
 * Scripting.FileSystemObject.js
 * This Object spoofs the Scripting.FileSystemObject Object
 * Properties and methods taken from Microsoft documentation
 * https://msdn.microsoft.com/en-us/library/hww8txat(v=vs.84).aspx
 */

var ScriptingFSO = function() {
    // Default properties
    this.Drives = new Drives();
};

// Default methods
// https://msdn.microsoft.com/en-us/library/z0z2z1zt(v=vs.84).aspx
ScriptingFSO.prototype.BuildPath = function(path, name) {
    return path + '\\' + name;
};

// https://msdn.microsoft.com/en-us/library/e1wf9e7w(v=vs.84).aspx
ScriptingFSO.prototype.CopyFile = function() {

};

// https://msdn.microsoft.com/en-us/library/xbfwysex(v=vs.84).aspx
ScriptingFSO.prototype.CopyFolder = function() {

};

// https://msdn.microsoft.com/en-us/library/7kby5ae3(v=vs.84).aspx
ScriptingFSO.prototype.CreateFolder = function() {

};

// https://msdn.microsoft.com/en-us/library/5t9b5c0c(v=vs.84).aspx
ScriptingFSO.prototype.CreateTextFile = function() {

};

// https://msdn.microsoft.com/en-us/library/thx0f315(v=vs.84).aspx
ScriptingFSO.prototype.DeleteFile = function() {

};

// https://msdn.microsoft.com/en-us/library/ca0at0xh(v=vs.84).aspx
ScriptingFSO.prototype.DeleteFolder = function() {

};

// https://msdn.microsoft.com/en-us/library/t565x0f1(v=vs.84).aspx
ScriptingFSO.prototype.DriveExists = function() {

};

// https://msdn.microsoft.com/en-us/library/x23stk5t(v=vs.84).aspx
ScriptingFSO.prototype.FileExists = function() {

};

// https://msdn.microsoft.com/en-us/library/5xc78d8d(v=vs.84).aspx
ScriptingFSO.prototype.FolderExists = function() {

};

// https://msdn.microsoft.com/en-us/library/zx1xa64f(v=vs.84).aspx
ScriptingFSO.prototype.GetAbsolutePathName = function() {

};

// https://msdn.microsoft.com/en-us/library/xhxzwwe1(v=vs.84).aspx
ScriptingFSO.prototype.GetBaseName = function() {

};

// https://msdn.microsoft.com/en-us/library/1z6e0fk3(v=vs.84).aspx
ScriptingFSO.prototype.GetDrive = function() {

};

// https://msdn.microsoft.com/en-us/library/48e3yfdw(v=vs.84).aspx
ScriptingFSO.prototype.GetDriveName = function() {

};

// https://msdn.microsoft.com/en-us/library/x0fxha2a(v=vs.84).aspx
ScriptingFSO.prototype.GetExtensionName = function() {

};

// https://msdn.microsoft.com/en-us/library/sheydkke(v=vs.84).aspx
ScriptingFSO.prototype.GetFile = function() {

};

// https://msdn.microsoft.com/en-us/library/a99s8akf(v=vs.84).aspx
ScriptingFSO.prototype.GetFileName = function() {

};

// https://msdn.microsoft.com/en-us/library/b4e05k97(v=vs.84).aspx
ScriptingFSO.prototype.GetFileVersion = function() {

};

// https://msdn.microsoft.com/en-us/library/f1xtf7ta(v=vs.84).aspx
ScriptingFSO.prototype.GetFolder = function() {

};

// https://msdn.microsoft.com/en-us/library/22dyy47c(v=vs.84).aspx
ScriptingFSO.prototype.GetParentFolderName = function() {

};

// https://msdn.microsoft.com/en-us/library/a72y2t1c(v=vs.84).aspx
ScriptingFSO.prototype.GetSpecialFolder = function() {

};

// https://msdn.microsoft.com/en-us/library/y6hbz9es(v=vs.84).aspx
ScriptingFSO.prototype.GetStandardStream = function() {

};

// https://msdn.microsoft.com/en-us/library/w0azsy9b(v=vs.84).aspx
ScriptingFSO.prototype.GetTempName = function() {

};

// https://msdn.microsoft.com/en-us/library/2wcf3ba6(v=vs.84).aspx
ScriptingFSO.prototype.MoveFile = function() {

};

// https://msdn.microsoft.com/en-us/library/465s5y8s(v=vs.84).aspx
ScriptingFSO.prototype.MoveFolder = function() {

};

// https://msdn.microsoft.com/en-us/library/314cz14s(v=vs.84).aspx
ScriptingFSO.prototype.OpenTextFile = function() {

};

module.exports = ScriptingFSO;
