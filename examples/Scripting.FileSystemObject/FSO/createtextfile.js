var stream = new ActiveXObject("ADODB.Stream");
stream.open();
stream.type = 2;
stream.writeText(0x00);
stream.position = 0;
stream.saveToFile("C:\\temp/hello.txt");
stream.close();