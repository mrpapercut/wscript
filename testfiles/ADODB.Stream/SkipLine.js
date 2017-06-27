var ADODBStream = WScript.CreateObject('ADODB.Stream');

ADODBStream.open();
ADODBStream.writeText('Foo', 1);
ADODBStream.writeText('Bar', 1);
ADODBStream.writeText('Qud', 1);
ADODBStream.position = 0;
WScript.Echo(ADODBStream.readText(-2));
WScript.Echo(ADODBStream.position);
ADODBStream.skipLine();
WScript.Echo(ADODBStream.position);
WScript.Echo(ADODBStream.readText(-2));
WScript.Echo(ADODBStream.position);
