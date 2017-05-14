var item = WScript.CreateObject('Scripting.FileSystemObject');

var properties = ['AtEndOfLine', 'AtEndOfStream', 'Attributes', 'AvailableSpace', 'Column', 'CompareMode', 'Count', 'DateCreated', 'DateLastAccessed', 'DateLastModified', 'Drive', 'DriveLetter', 'Drives', 'DriveType', 'Files', 'FileSystemProperty', 'FreeSpace', 'IsReady', 'IsRootFolder', 'Item', 'Key', 'Line', 'Name', 'ParentFolder', 'Path', 'RootFolder', 'SerialNumber', 'ShareName', 'ShortName', 'ShortPath', 'Size', 'SubFolders', 'TotalSize', 'Type', 'VolumeName'];

var res = [];

for (var i = 0; i < properties.length; i++) {
	try {
		/*if (item[properties[i]] || item[properties[i]] === false) */res.push(properties[i] + ': ' + item[properties[i]]);
	} catch(e) {
		WScript.echo(properties[i] + ': ' + e.message);
	}
}

WScript.Echo(res.join('\n'));