// Overwrite JS objects
const nop = () => {};

// Disable HTTP requests
window.fetch = window.XMLHttpRequest = nop;

// Using proxy_config to redirect output
window.proxy_config = {
    logFunction: function() {
        if (arguments) {
            [...arguments].map(l => {
                var out = document.getElementById('tracer').children[0];
                out.value += typeof l === 'string' ? l : JSON.stringify(l, false, 2);
                out.value += '\n';
            });
        }
    }
}

console._log = console.log;
console._warn = console.warn;
console._error = console.error;

const cons = document.getElementById('console').children[0];
console.log = console.warn = console.error = function() {
    [...arguments].map(l => {
        if (arguments) {
            cons.value += typeof l === 'string' ? l : JSON.stringify(l, false, 2);
            cons.value += '\n';
        }
    });
}
