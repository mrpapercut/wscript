var fso, f;
fso = new ActiveXObject("Scripting.FileSystemObject");
f = fso.CreateTextFile("testfile.txt", true);
f.WriteLine("This is a test.");
f.Close();
f = fso.GetFile("testfile.txt");
f.Copy("..\\test2.txt");