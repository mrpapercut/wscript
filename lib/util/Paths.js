'use strict';

// Splits absolute path into different chunks
var formatPath = exports.formatPath = function(path) {
	var pathArr = path.split('\\'),
		folderName = pathArr.pop();

	pathArr[0] = pathArr[0].toUpperCase();

	var normalFolderObj = {
		Attributes: 16,
		Drive: pathArr[0],
		Files: {}, // Files collection
		IsRootFolder: false,
		Name: folderName,
		ParentFolder: pathArr.join('\\') + (pathArr.length === 1 ? '\\' : ''),
		Path: pathArr.join('\\') + '\\' + folderName,
		ShortName: '', // MSformat.shortName(foldername),
		ShortPath: '', // MSformat.shortName(pathArr.join('\\') + '\\' + folderName),
		Size: 2e4,
		SubFolders: {}, // Folders collection
		Type: 'File Folder'
	}

	var rootFolderObj = {
		Attributes: 22, // Folder, System, Hidden
		Drive: pathArr[0],
		Files: {}, // Files collection
		IsRootFolder: true,
		Path: pathArr[0] + '\\',
		ShortPath: pathArr[0] + '\\',
		SubFolders: {}, // Folders collection
		Type: 'Local Disk'
	}

	return folderName !== '' ? normalFolderObj : rootFolderObj;
}
