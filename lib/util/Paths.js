'use strict';

const Files       = require('../objects/scriptingFSO/collections/Files');
const Folders     = require('../objects/scriptingFSO/collections/Folders');
const toShortname = require('./MSformats').toShortname;

// Splits absolute path into different chunks
const formatPath = exports.formatPath = folderspec => {
	let pathArr = folderspec.path.split('\\'),
		folderName = pathArr.pop();

	pathArr[0] = pathArr[0].toUpperCase();

	const normalFolderObj = {
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

	const rootFolderObj = {
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
