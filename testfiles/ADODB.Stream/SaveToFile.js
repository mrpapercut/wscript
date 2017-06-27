var ADODBStream = WScript.CreateObject('ADODB.Stream');
ADODBStream.open();
ADODBStream.writeText('Hello world');
ADODBStream.saveToFile('filename.txt', 1);
ADODBStream.saveToFile('filename.txt', 1);