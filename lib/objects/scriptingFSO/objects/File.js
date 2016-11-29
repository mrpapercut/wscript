'use strict';

/**
 * File.js
 * This Object spoofs the Scripting.FileSystemObject File Object
 * Properties and methods taken from Microsoft documentation
 * https://msdn.microsoft.com/en-us/library/1ft05taf(v=vs.84).aspx
 */

var File = function() {
    // Default properties
    this.Attributes       = null;
    this.DateCreated      = null;
    this.DateLastAccessed = null;
    this.DateLastModified = null;
    this.Drive            = null;
    this.Name             = null;
    this.ParentFolder     = null;
    this.Path             = null;
    this.ShortName        = null;
    this.ShortPath        = null;
    this.Size             = null;
    this.Type             = null;
};

// Default methods
// https://msdn.microsoft.com/en-us/library/6973t06a(v=vs.84).aspx
File.prototype.Copy = function() {

};

// https://msdn.microsoft.com/en-us/library/0k4wket3(v=vs.84).aspx
File.prototype.Delete = function() {

};

// https://msdn.microsoft.com/en-us/library/kxtftw67(v=vs.84).aspx
File.prototype.Move = function() {

};

// https://msdn.microsoft.com/en-us/library/hwfw5c59(v=vs.84).aspx
File.prototype.OpenAsTextStream = function() {

};

module.exports = File;
