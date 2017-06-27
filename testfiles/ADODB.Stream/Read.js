var ADODBStream = WScript.CreateObject('ADODB.Stream');
ADODBStream.open();
ADODBStream.type = 2;
ADODBStream.loadFromFile('examples//ADODB.Stream//Open.js');
WScript.Echo(ADODBStream.read(64));
