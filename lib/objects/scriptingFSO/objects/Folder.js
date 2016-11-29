'use strict';

/**
 * Folder.js
 * This Object spoofs the Scripting.FileSystemObject Folder Object
 * Properties and methods taken from Microsoft documentation
 * https://msdn.microsoft.com/en-us/library/1c87day3(v=vs.84).aspx
 */

var Folder = function() {
    // Default properties
    this.Attributes       = null;
    this.DateCreated      = null;
    this.DateLastAccessed = null;
    this.DateLastModified = null;
    this.Drive            = null;
    this.Files            = null;
    this.IsRootFolder     = null;
    this.Name             = null;
    this.ParentFolder     = null;
    this.Path             = null;
    this.ShortName        = null;
    this.ShortPath        = null;
    this.Size             = null;
    this.SubFolders       = null;
    this.Type             = null;
};

// Default methods
// https://msdn.microsoft.com/en-us/library/6973t06a(v=vs.84).aspx
Folder.prototype.Copy = function() {

};

// https://msdn.microsoft.com/en-us/library/0k4wket3(v=vs.84).aspx
Folder.prototype.Delete = function() {

};

// https://msdn.microsoft.com/en-us/library/kxtftw67(v=vs.84).aspx
Folder.prototype.Move = function() {

};

// https://msdn.microsoft.com/en-us/library/5t9b5c0c(v=vs.84).aspx
Folder.prototype.CreateTextFile = function() {

};

module.exports = Folder;
