'use strict';

var Drive      = require('./scriptingFSO/objects/Drive');
var File       = require('./scriptingFSO/objects/File');
var Folder     = require('./scriptingFSO/objects/Folder');
var TextStream = require('./scriptingFSO/objects/TextStream');

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
    this.AtEndOfLine        = false;
    this.AtEndOfStream      = false;
    this.Attributes         = null;
    this.AvailableSpace     = null;
    this.Column             = null;
    this.CompareMode        = null;
    this.Count              = null;
    this.DateCreated        = null;
    this.DateLastAccessed   = null;
    this.DateLastModified   = null;
    this.Drive              = 'C:\\';
    this.DriveLetter        = 'C';
    this.Drives             = new Drives();
    this.DriveType          = null;
    this.Files              = new Files();
    this.FileSystemProperty = null;
    this.FreeSpace          = null;
    this.IsReady            = true;
    this.IsRootFolder       = false;
    this.Item               = null;
    this.Key                = null;
    this.Line               = null;
    this.Name               = null;
    this.ParentFolder       = null;
    this.Path               = null;
    this.RootFolder         = new Folder(this.Path);
    this.SerialNumber       = null;
    this.ShareName          = null;
    this.ShortName          = null;
    this.ShortPath          = null;
    this.Size               = null;
    this.SubFolders         = new Folders();
    this.TotalSize          = null;
    this.Type               = null;
    this.VolumeName         = null;
};

// Default methods
// https://msdn.microsoft.com/en-us/library/zst29hfc(v=vs.84).aspx
ScriptingFSO.prototype.Add = function() {

};

// https://msdn.microsoft.com/en-us/library/z0z2z1zt(v=vs.84).aspx
ScriptingFSO.prototype.BuildPath = function() {

};

// https://msdn.microsoft.com/en-us/library/yb3tbdkw(v=vs.84).aspx
ScriptingFSO.prototype.Close = function() {

};

// https://msdn.microsoft.com/en-us/library/6973t06a(v=vs.84).aspx
ScriptingFSO.prototype.Copy = function() {

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

// https://msdn.microsoft.com/en-us/library/0k4wket3(v=vs.84).aspx
ScriptingFSO.prototype.Delete = function() {

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

// https://msdn.microsoft.com/en-us/library/kxtftw67(v=vs.84).aspx
ScriptingFSO.prototype.Move = function() {

};

// https://msdn.microsoft.com/en-us/library/2wcf3ba6(v=vs.84).aspx
ScriptingFSO.prototype.MoveFile = function() {

};

// https://msdn.microsoft.com/en-us/library/465s5y8s(v=vs.84).aspx
ScriptingFSO.prototype.MoveFolder = function() {

};

// https://msdn.microsoft.com/en-us/library/hwfw5c59(v=vs.84).aspx
ScriptingFSO.prototype.OpenAsTextStream = function() {

};

// https://msdn.microsoft.com/en-us/library/314cz14s(v=vs.84).aspx
ScriptingFSO.prototype.OpenTextFile = function() {

};

// https://msdn.microsoft.com/en-us/library/dhyx75w2(v=vs.84).aspx
ScriptingFSO.prototype.Read = function() {

};

// https://msdn.microsoft.com/en-us/library/t58aa4dd(v=vs.84).aspx
ScriptingFSO.prototype.ReadAll = function() {

};

// https://msdn.microsoft.com/en-us/library/h7se9d4f(v=vs.84).aspx
ScriptingFSO.prototype.ReadLine = function() {

};

// https://msdn.microsoft.com/en-us/library/08xz3c5a(v=vs.84).aspx
ScriptingFSO.prototype.Skip = function() {

};

// https://msdn.microsoft.com/en-us/library/zbhhkawe(v=vs.84).aspx
ScriptingFSO.prototype.SkipLine = function() {

};

// https://msdn.microsoft.com/en-us/library/6ee7s9w2(v=vs.84).aspx
ScriptingFSO.prototype.Write = function() {

};

// https://msdn.microsoft.com/en-us/library/eysctzwa(v=vs.84).aspx
ScriptingFSO.prototype.WriteBlankLines = function() {

};

// https://msdn.microsoft.com/en-us/library/t5399c99(v=vs.84).aspx
ScriptingFSO.prototype.WriteLine = function() {

};

module.exports = ScriptingFSO;
