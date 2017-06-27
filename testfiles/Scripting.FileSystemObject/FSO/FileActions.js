var fso = new ActiveXObject('Scripting.FileSystemObject');

WScript.Echo(fso.BuildPath('C:\\Windows\\System32\\', '\\..\\..\\.\\temp\\..\\tmp'));