var stream = WScript.CreateObject('MSXML2.XMLHTTP');
stream.OPEN('GET', 'http://example.com', false);

stream.onreadystatechange = function() {
    if (stream.readyState === 4) {
        WScript.Echo('responseHeaders: ' + stream.getAllResponseHeaders());
        WScript.Echo('responseHeader Content-Type: ' + stream.getResponseHeader('CONTENT-TYPE'));
        WScript.Echo('responseHeader X-FAKE-HEADER: ' + stream.getResponseHeader('X-FAKE-HEADER'));
        WScript.Echo('responseBody: ' + stream.responseBody);
        WScript.Echo('responseStream: ' + stream.responseStream);
        WScript.Echo('responseText: ' + stream.responseText);
        WScript.Echo('responseXML: ' + stream.responseXML);
        WScript.Echo('status: ' + stream.status);
        WScript.Echo('statusText: ' + stream.statusText);
    }
}

stream.send();
