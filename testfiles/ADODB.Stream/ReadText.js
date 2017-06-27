var ADODBStream = WScript.CreateObject('ADODB.Stream');
ADODBStream.open();
ADODBStream.writeText('Hello world', 1);
ADODBStream.writeText('Hello again', 1);
ADODBStream.position = 0;
WScript.Echo(ADODBStream.readText(-2));
WScript.Echo(ADODBStream.position);
WScript.Echo(ADODBStream.readText(-2));
WScript.Echo(ADODBStream.position);
