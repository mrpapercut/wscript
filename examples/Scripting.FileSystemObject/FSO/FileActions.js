var fso = new ActiveXObject('Scripting.FileSystemObject');

var f = fso.GetFile('ildPath.js');
f.Copy('.\\test\\file.js');