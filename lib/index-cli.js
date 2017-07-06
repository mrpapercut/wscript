'use strict';

const fs = require('fs');
const argv = require('yargs').argv;

const getbasename = filename => {
    const filenameArr = filename.split('.');

    if (filenameArr.length > 1 && filenameArr[0].length > 1) {
        filenameArr.pop();
    }

    return filenameArr.join('.').split(/(\\|\/)/).pop();
}

const usageText = `Usage: node ${argv.$0} [ -i script.js ] [ -o <output filename> ][options]`;
let helpText  = usageText + '\n\n';
    helpText += 'Run a script against the WScript emulator.\n\n';
    helpText += 'Running with a specified output filename, it will create 2 scripts:\n';
    helpText += ' - filename.tracer.json\n';
    helpText += ' - filename.vfs.json\n\n';
    helpText += 'If no output is specified, output filename is same as input filename.\n\n';
    helpText += 'WARNING: This software does not protect you against malware in any way.\n';
    helpText += 'Only run malware against the emulator in protected environments.\n\n';
    helpText += 'Options:\n';
    helpText += '  -i, --input             input file\n';
    helpText += '  -o, --output            output filename.\n';
    helpText += '  -t, --disable-tracer    do not output tracer\n';
    helpText += '  -v, --disable-vfs       do not output vfs\n';

// Handle argv
if (argv.h) {
    console.log(helpText);
    process.exit(0);
} else if (!argv.i && !argv.input) {
    console.log(usageText);
    process.exit(0);
}

const inputfile = argv.i || argv.input;
const filebasename = getbasename(inputfile);
const outputfile = argv.o || argv.output || filebasename;

fs.readFile(inputfile, 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        process.exit(0);
    } else {
        runInWscript(data);
    }
});

const runInWscript = function(filecontents) {
    // Store tracer
    const tracerlog = [];

    // Override log function
    global.proxy_config = {
        logFunction: function() {
            if (arguments) {
                [...arguments].map(l => {
                    tracerlog.push(typeof l === 'string' ? l : JSON.stringify(l, false, 2));
                });
            }
        }
    }

    // Setup WScript, VFS, ActiveXObject
    const wscript = require('./WScript');

    global.WScript = new wscript();
    global.VFS = global.WScript.CreateObject('Scripting.FileSystemObject')._vfs;

    global.ActiveXObject = function(strProgId) {
        return global.WScript.CreateObject(strProgId);
    };

    // Run the input file. Uses a workaround for eval. If called directly,
    // it will automatically use strict-mode. Most malware does not play nice
    // with strict-mode
    (0, eval)(filecontents);

    if (!argv.t && !argv.disableTracer) {
        let tracerlogdata = tracerlog.join('\n') + '\n';

        fs.writeFile(`${outputfile}.tracer.json`, tracerlogdata, err => {
            if (err) {
                console.error(err);
            } else {
                console.log(`${outputfile}.tracer.json written`);
            }
        });
    }

    if (!argv.v && !argv.disableVfs) {
        let vfsdata = global.VFS._printVFS() + '\n';

        fs.writeFile(`${outputfile}.vfs.json`, vfsdata, err => {
            if (err) {
                console.error(err);
            } else {
                console.log(`${outputfile}.vfs.json written`);
            }
        });
    }
}
