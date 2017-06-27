function AddNewFolder(path,folderName) {
   var fso, f, fc, nf;
   fso = new ActiveXObject("Scripting.FileSystemObject");
   f = fso.GetFolder(path);
   fc = f.SubFolders;

   WScript.Echo(fc.Count());

   if (folderName != "" )
      nf = fc.Add(folderName);
   else
      nf = fc.Add("New Folder");


	WScript.Echo(fc.Count());
}

AddNewFolder('.', 'test')