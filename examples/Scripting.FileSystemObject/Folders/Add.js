
function Add(path, foldername) {
    var fso = new ActiveXObject('Scripting.FileSystemObject');

    var f = fso.GetFolder(path);
    var fc = f.SubFolders;

    WScript.Echo(fc.Add(foldername));
}

Add('.', 'NewFolder');
