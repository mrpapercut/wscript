var stream = new ActiveXObject("ADODB.Stream");
stream.open();
stream.type = 2;
stream.writeText(0x00);
stream.position = 0;
stream.saveToFile("Z:\\obscure\\wscript\\examples\\Scripting.FileSystemObject\\FSO/hello.txt");
stream.close();