var ADODBStream1 = WScript.CreateObject('ADODB.Stream'),
	ADODBStream2 = WScript.CreateObject('ADODB.Stream');

ADODBStream1.open();
ADODBStream2.open();

ADODBStream1.writeText('Hello world');
ADODBStream1.position = 0;
ADODBStream1.copyTo(ADODBStream2, 4);
ADODBStream2.position = 0;
WScript.Echo(ADODBStream1.position, ADODBStream2.size, ADODBStream2.readText(-1));