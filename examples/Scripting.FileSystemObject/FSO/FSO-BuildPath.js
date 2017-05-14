var fso = new ActiveXObject('Scripting.FileSystemObject');

newpath = fso.BuildPath("current_folder", "temp");

WScript.Echo(newpath);