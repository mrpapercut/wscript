'use strict';

/**
 * Drive.js
 * This Object spoofs the Scripting.FileSystemObject Drive Object
 * Properties and methods taken from Microsoft documentation
 * https://msdn.microsoft.com/en-us/library/ts2t8ybh(v=vs.84).aspx
 */

var Drive = function() {
	// Default properties
    this.AvailableSpace = 7156948992;
    this.DriveLetter    = 'C';
    this.DriveType      = 2;        // 0: Unknown, 1: Removable, 2: Fixed, 3: Network, 4: CD-ROM, 5: RAM Disk
    this.FileSystem     = 'NFTS';   // FAT-32
    this.FreeSpace      = 7156948992;
    this.IsReady        = true;
    this.Path           = 'C:';
    this.RootFolder     = 'C:\\';
    this.SerialNumber   = -1225924828;
    this.ShareName      = '';
    this.TotalSize      = 7725907968;
    this.VolumeName     = '';
};

module.exports = Drive;
