var ADODBStream = WScript.CreateObject('ADODB.Stream');
ADODBStream.open();
ADODBStream.type = 1;
ADODBStream.loadFromFile('examples//ADODB.Stream//Open.js');
WScript.Echo(ADODBStream.read(4));
var bA = ADODBStream.read();

var stream = WScript.CreateObject('ADODB.Stream');
stream.open();
stream.type = 1;
stream.write(bA);
WScript.Echo(stream.read(2));