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
    loadedDiv = document.getElementById('loaded');

var uploadhandler = function(e) {
    var file = e.target.files[0];
    var reader = new FileReader();

    reader.onload = function(f) {
        setIframeCode(f.target.result);
        loaded.innerHTML = `Loaded: <span class="green">${file.name}</span> (${file.size} bytes)`;
    }

    if (file.size > 1048576) return false;

    reader.readAsBinaryString(file);
}

fileupload.addEventListener('change', uploadhandler);

var setIframeCode = function(usercode) {
    var ifr = document.getElementById('output-iframe'),
        srcdoc;

    srcdoc = '<!doctype html><html><head><link href="styles.css" rel="styleshe'
           + 'et"></head><body id="innerframe"><div id="tracer"><textarea></te'
           + 'xtarea></div><div id="vfs"><textarea></textarea></div><div id="c'
           + 'onsole"><textarea></textarea></div>';

    srcdoc += '<script src="overrides.js"></script><script src="WScript.js"></'
            + 'script><script>(function() {' + usercode + '})();</script><scri'
            + 'pt>if(window.WScript&&window.VFS)window.setInterval(_=>{documen'
            + 't.getElementById("vfs").children[0].value=VFS._printVFS()},100)'
            + '</script></body></html>';

    ifr.srcdoc = srcdoc;
}
