var shell = WScript.CreateObject('WScript.Shell');
var fld = ['AllUsersDesktop','AllUsersStartMenu','AllUsersPrograms','AllUsersStartup','Desktop','Favorites','Fonts','MyDocuments','NetHood','PrintHood','Programs','Recent','SendTo','StartMenu','Startup','Templates'];
var list = [];
for (var i = 0; i < fld.length; i++) {
	list.push(fld[i] + ': ' + shell.SpecialFolders(fld[i]));
}
WScript.Echo(list.join('\n'));