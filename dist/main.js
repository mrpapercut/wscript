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
