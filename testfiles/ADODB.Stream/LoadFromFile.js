var ADODBStream = WScript.CreateObject('ADODB.Stream');
ADODBStream.open();
ADODBStream.loadFromFile('Open.js');
WScript.Echo(ADODBStream.Size);
