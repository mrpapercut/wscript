var ADODBStream1 = WScript.CreateObject('ADODB.Stream'),
	ADODBStream2 = WScript.CreateObject('ADODB.Stream');

ADODBStream1.open();
ADODBStream2.open();
ADODBStream1.copyTo(ADODBStream2);