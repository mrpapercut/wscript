'use strict';

/**
 * This Object spoofs the WshShell Object
 * Properties and methods taken from Microsoft documentation
 * https://msdn.microsoft.com/en-us/library/aew9yb99(v=vs.84).aspx
 */

var WshShell = function() {
	// Default properties
	this.CurrentDirectory	= 'C:\Temp';
	this.Environment		= null;

	// Custom properties
	this._name				= 'WshShell';
};

WshShell.prototype.constructor = function() {
	if (!this) return new WshShell();
};

WshShell.prototype.toString = function() {
	return this._name;
};

// Property setters
WshShell.prototype._setCurrentDirectory = function(currentDirectory) {
	this.CurrentDirectory = currentDirectory;
};

// Default methods
WshShell.prototype.SpecialFolders = function(folder) {
	var Folders = {
		AllUsersDesktop:	'C:\\Users\\Public\\Desktop',
		AllUsersStartMenu:	'C:\\ProgramData\\Microsoft\\Windows\\Start Menu',
		AllUsersPrograms:	'C:\\ProgramData\\Microsoft\\Windows\\Start Menu\\Programs',
		AllUsersStartup:	'C:\\ProgramData\\Microsoft\\Windows\\Start Menu\\Programs\\StartUp',
		Desktop:			'C:\\Users\\User\\Desktop',
		Favorites:			'C:\\Users\\User\\Favorites',
		Fonts:				'C:\\Windows\\Fonts',
		MyDocuments:		'C:\\Users\\User\\Documents',
		NetHood:			'C:\\Users\\User\\AppData\\Roaming\\Microsoft\\Windows\\Network Shortcuts',
		PrintHood:			'C:\\Users\\User\\AppData\\Roaming\\Microsoft\\Windows\\Printer Shortcuts',
		Programs:			'C:\\Users\\User\\AppData\\Roaming\\Microsoft\\Windows\\Start Menu\\Programs',
		Recent:				'C:\\Users\\User\\AppData\\Roaming\\Microsoft\\Windows\\Recent',
		SendTo:				'C:\\Users\\User\\AppData\\Roaming\\Microsoft\\Windows\\SendTo',
		StartMenu:			'C:\\Users\\User\\AppData\\Roaming\\Microsoft\\Windows\\Start Menu',
		StartUp:			'C:\\Users\\User\\AppData\\Roaming\\Microsoft\\Windows\\Start Menu\\Programs\\Startup',
		Templates:			'C:\\Users\\User\\AppData\\Roaming\\Microsoft\\Windows\\Templates'
	};

	return folder && Folders[folder] !== undefined ? Folders[folder] : null;
};

WshShell.prototype.SpecialFolders.toString = function() {
	return '';
};