var fso = WScript.CreateObject('Scripting.FileSystemObject');
var inputfile = fso.openTextFile('shared-objects.txt');

var axo = fso.createTextFile('supported-in-axo.txt');
// var wsc = fso.createTextFile('supported-in-wscript.txt');

while (!inputfile.atEndOfStream) {
	var comobj = inputfile.readLine();
	try {
		// WScript.CreateObject(comobj);
		new ActiveXObject(comobj);
	} catch (e) {
		continue;
	}
	// wsc.write(comobj + "\n");
	axo.write(comobj + "\n");
}
/*
while (!inputfile.atEndOfStream) {
	var comobj = inputfile.readLine();
	try {
	} catch (e) {
	}
}*/
axo.close();
// wsc.close();
WScript.Quit();