var stream1 = WScript.CreateObject('ADODB.Stream'),
	stream2 = WScript.CreateObject('ADODB.Stream');
stream1.open();
stream1.type = 2;
var str = 'hello world';
//WScript.Echo(str.length);

stream1.writeText(str);
WScript.Echo(stream1.size, stream1.position);
stream1.position = 0;
while (stream1.EOS === false) {
	WScript.Echo(stream1.position, stream1.readText());
}

stream2.open();
stream2.type = 2;
stream2.writeText(str, 1);
WScript.Echo(stream2.size, stream2.position);

/*
stream2.position = 0;
while (stream2.EOS === false) {
	WScript.Echo(stream2.readText(1).charCodeAt(0));
}
*/