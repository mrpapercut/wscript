var ADODBStream = WScript.CreateObject('ADODB.Stream');
ADODBStream.open();
WScript.Echo(ADODBStream.Stat());