var str = 'hello world\nhow are things?\npretty good right?\nthougth so';
var stream = WScript.CreateObject('ADODB.Stream');
stream.open();
stream.type = 2;
WScript.Echo(stream.size);
stream.writeText('Hello world!', 1);
WScript.Echo(stream.size);
stream.writeText('How are things?', 1);
WScript.Echo(stream.size);
stream.writeText('Pretty good, right?', 1);
WScript.Echo(stream.size);
stream.writeText('Thought so!', 1);
WScript.Echo(stream.size);

stream.position = 0;
WScript.Echo(stream.readText(16));
stream.skipLine();
WScript.Echo(stream.readText(10));