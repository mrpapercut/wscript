var ADODBStream = WScript.CreateObject('ADODB.Stream');
ADODBStream.open();
ADODBStream.type = 1;
// ADODBStream.loadFromFile('examples//ADODB.Stream//Write.js');
ADODBStream.write(01011001);
ADODBStream.position = 0;
var bA = ADODBStream.read();

var stream = WScript.CreateObject('ADODB.Stream');
stream.open();
stream.type = 1;
stream.write(bA);
stream.position = 0;
WScript.Echo(stream.read(2));