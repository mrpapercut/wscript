'use strict';

var Files       = require('../objects/scriptingFSO/collections/Files');
var Folders     = require('../objects/scriptingFSO/collections/Folders');
var toShortname = require('./MSformats').toShortname;

// Splits absolute path into different chunks
var formatPath = exports.formatPath = function(folderspec) {
    console.log(folderspec);
	var pathArr = folderspec.path.split('\\'),
		folderName = pathArr.pop();

	pathArr[0] = pathArr[0].toUpperCase();

	var normalFolderObj = {
		Attributes: 16, // Folder
		Drive: pathArr[0],
		Files: new Files(),
		IsRootFolder: false,
		Name: folderName,
		ParentFolder: pathArr.join('\\') + (pathArr.length === 1 ? '\\' : ''),
		Path: pathArr.join('\\') + '\\' + folderName,
		ShortName: toShortname(folderName),
		ShortPath: pathArr.concat(folderName).map(function(p) { return toShortname(p)}).join('\\'),
		Size: 2e4,
		SubFolders: new Folders(pathArr.join('\\') + '\\' + folderName),
		Type: 'File Folder'
	}

	var rootFolderObj = {
		Attributes: 22, // Folder, System, Hidden
		Drive: pathArr[0],
		Files: new Files(),
		IsRootFolder: true,
		Path: pathArr[0] + '\\',
		ShortPath: pathArr[0] + '\\',
		SubFolders: new Folders(pathArr[0] + '\\'),
		Type: 'Local Disk'
	}

	return folderspec.static ? rootFolderObj : normalFolderObj;
}
