var ADODBStream = WScript.CreateObject('ADODB.Stream');
WScript.Echo(ADODBStream.mode);
ADODBStream.open(null, 5);
WScript.Echo(ADODBStream.mode);