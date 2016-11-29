'use strict';

/**
 * Drive.js
 * This Object spoofs the Scripting.FileSystemObject Drive Object
 * Properties and methods taken from Microsoft documentation
 * https://msdn.microsoft.com/en-us/library/ts2t8ybh(v=vs.84).aspx
 */

var Drive = function() {
	// Default properties
    this.AvailableSpace = null;
    this.DriveLetter    = null;
    this.DriveType      = null;
    this.FileSystem     = null;
    this.FreeSpace      = null;
    this.IsReady        = null;
    this.Path           = null;
    this.RootFolder     = null;
    this.SerialNumber   = null;
    this.ShareName      = null;
    this.TotalSize      = null;
    this.VolumeName     = null;
};

module.exports = Drive;
