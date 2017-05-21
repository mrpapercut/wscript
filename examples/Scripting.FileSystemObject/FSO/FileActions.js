var fso = new ActiveXObject('Scripting.FileSystemObject');

var f = fso.CreateTextFile('test.txt');
f.WriteLine('Hello world!');
var getStats = function() {
    WScript.Echo(f.Line);
    WScript.Echo(f.Column);
    WScript.Echo(f.AtEndOfStream);
    WScript.Echo(f.AtEndOfLine);
};

// WScript.Echo(ts.Skip(4));
getStats();
// WScript.Echo(ts.ReadAll());
// WScript.Echo(ts.Read(8));
//getStats();