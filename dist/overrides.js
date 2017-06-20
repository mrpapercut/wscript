// Overwrite JS objects
const nop = () => {};

// Disable HTTP requests
window.fetch = window.XMLHttpRequest = nop;

// Using proxy_config to redirect output
window.proxy_config = {
    logFunction: function() {
		if (arguments) {
			var out = document.getElementById('tracer');
			[...arguments].map(l => {
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
                p = '<span class="red">' + p + '</span>';
                break;
            case 'CONSTRUCT':
                p = '<span class="blue">' + p + '</span>';
                break;
            case 'SET':
                p = '<span class="green">' + p + '</span>';
                break;
            case 'GET':
                p = '<span class="orange">' + p + '</span>';
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

// Attach right-panel tabs
var attachTabs = function() {
	var tabbtns = [
		document.getElementById('inputbtn'),
		document.getElementById('vfsbtn'),
		document.getElementById('consolebtn')
	];

	var tabs = [
		document.getElementById('input'),
		document.getElementById('vfs'),
		document.getElementById('console')
	];

	var hideTabs = function() {
		for (var i = 0; i < tabs.length; i++) {
			tabs[i].classList.remove('show');
		}

		for (var i = 0; i < tabbtns.length; i++) {
			tabbtns[i].classList.remove('active');
		}
	}

	for (var i = 0; i < tabbtns.length; i++) {
		tabbtns[i].addEventListener('click', function(e) {
			hideTabs();

			e.target.classList.add('active');
			for (var i = 0; i < tabs.length; i++) {
				if (tabs[i].id === e.target.id.replace('btn', '')) {
					tabs[i].classList.add('show');
				}
			}
		});
	}
}
