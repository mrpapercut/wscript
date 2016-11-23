var stream = WScript.CreateObject('ADODB.Stream');
stream.open();
stream.type = 2;
stream.writeText('Hello world');
WScript.Echo(stream.position);
stream.position = 0;
WScript.Echo(stream.readText(4));
WScript.Echo(stream.position);
WScript.Echo(stream.readText(-1));
