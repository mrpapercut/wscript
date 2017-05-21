'use strict';

var MSformats = require('../../../util/MSformats');

/**
 * File.js
 * This Object spoofs the Scripting.FileSystemObject File Object
 * Properties and methods taken from Microsoft documentation
 * https://msdn.microsoft.com/en-us/library/1ft05taf(v=vs.84).aspx
 */

var File = function(file) {
    var pathArr = file.path.split('\\');
    var filename = pathArr.pop();

    // Default properties
    // https://msdn.microsoft.com/en-us/library/5tx15443(v=vs.84).aspx#Settings
    this.Attributes       = 32; // Most common for files
    this.DateCreated      = MSformats.getDate();
    this.DateLastAccessed = MSformats.getDate();
    this.DateLastModified = MSformats.getDate();
    this.Drive            = 'C:';
    this.Name             = filename;
    this.ParentFolder     = pathArr.join('\\');
    this.Path             = file.path;
    this.ShortName        = MSformats.toShortname(filename);
    this.ShortPath        = pathArr.map(MSformats.toShortname).join('\\') + MSformats.toShortname(filename);
    this.Size             = 0;
    this.Type             = 'File';
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
