// Overwrite JS objects
const nop = () => {};

// Disable HTTP requests
window.fetch = window.XMLHttpRequest = nop;

// Using proxy_config to redirect output
window.proxy_config = {
    logFunction: function() {
        if (arguments) {
            [...arguments].map(l => {
                var out = document.getElementById('tracer');
                out.innerHTML += typeof l === 'string' ? markString(l) : JSON.stringify(l, false, 2);
                out.innerHTML += '<br>\n';
            });
        }
    }
}

// Coloring strings
var markString = function(string) {
    return string.replace(/^\>\s(CALL|CONSTRUCT|SET|GET)/, function(match, p) {
        switch(p) {
            case 'CALL':
                p = '<span class="blue">' + p + '</span>      ';
                break;
            case 'CONSTRUCT':
                p = '<span class="green">' + p + '</span>   ';
                break;
            case 'SET':
                p = '<span class="red">' + p + '</span>      ';
                break;
            case 'GET':
                p = '<span class="orange">' + p + '</span>      ';
                break;

            default:
                p = p;
        }

        return '> ' + p;
    });
};

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
