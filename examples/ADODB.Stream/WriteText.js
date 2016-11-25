var stream1 = WScript.CreateObject('ADODB.Stream'),
	stream2 = WScript.CreateObject('ADODB.Stream');
stream1.open();
stream1.writeText('Hello world', 1);
WScript.Echo(stream1.size, stream1.position);
stream1.position = 0;
stream1.writeText('Goodbye', 1);
WScript.Echo(stream1.size, stream1.position);
stream1.position = 0;
WScript.Echo(stream1.readText());