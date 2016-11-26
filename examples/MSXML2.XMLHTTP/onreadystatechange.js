var stream = WScript.CreateObject('MSXML2.XMLHTTP');
stream.open('GET', 'http://x0f.re', false);

// 0 UNINTIALIZED
// 1 LOADING
// 2 LOADED
// 3 INTERACTIVE
// 4 COMPLETED

var ts = ots = null;

var states = {
    0: {
        readyState: 'UNINITIALIZED',
        time: 0
    },
    1: {
        readyState: 'LOADING',
        time: null
    },
    2: {
        readyState: 'LOADED',
        time: null
    },
    3: {
        readyState: 'INTERACTIVE',
        time: null
    },
    4: {
        readyState: 'COMPLETED',
        time: null
    }
}

stream.onreadystatechange = function() {
    var msg = '';

    switch(stream.readyState) {
        default:
            var newts = +new Date;
            states[stream.readyState].time = newts - ts;
            ts = newts;
            break;
    }

    if (stream.readyState === 4) {
        var res = [];
        for (var i in states) {
            res.push([states[i].readyState, states[i].time + 'ms'].join('\r\n'));
        }
        WScript.Echo(res.join('\r\n') + '\r\nTotal time: ' + (ts - ots) + 'ms');
    }
}

ts = ots = +new Date;
stream.send();
