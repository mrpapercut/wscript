'use strict';

var MSformats = require('../../../util/MSformats');

/**
 * File.js
 * This Object spoofs the Scripting.FileSystemObject File Object
 * Properties and methods taken from Microsoft documentation
 * https://msdn.microsoft.com/en-us/library/1ft05taf(v=vs.84).aspx
 */

var File = function(file, _parent) {
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
    this.ShortPath        = pathArr.map(MSformats.toShortname).concat(MSformats.toShortname(filename)).join('\\');
    this.Size             = 0;
    this.Type             = _parent.getExtensionName(file.path).toUpperCase() + ' File';

    // Custom properties
    this._parent          = _parent;
    this._content         = file.content;
};

// Default methods
// https://msdn.microsoft.com/en-us/library/6973t06a(v=vs.84).aspx
File.prototype.Copy = function(destination, overwrite) {
    return this._parent.copyFile(this.Path, destination);
};

// https://msdn.microsoft.com/en-us/library/0k4wket3(v=vs.84).aspx
File.prototype.Delete = function(force) {
    return this._parent.deleteFile(this.Path);
};

// https://msdn.microsoft.com/en-us/library/kxtftw67(v=vs.84).aspx
File.prototype.Move = function(destination) {
    return this._parent.moveFile(this.Path, destination);
};

// https://msdn.microsoft.com/en-us/library/hwfw5c59(v=vs.84).aspx
File.prototype.OpenAsTextStream = function(iomode, format) {
    return this._parent.openTextFile(this.Path, iomode, false, format);
};

module.exports = File;
