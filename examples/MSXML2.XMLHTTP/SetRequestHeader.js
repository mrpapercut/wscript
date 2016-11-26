var stream = WScript.CreateObject('MSXML2.XMLHTTP');
stream.open('GET', 'http://example.com');
stream.setRequestHeader('Content-Type', 'text/plain');