'use strict';

var pad = function(str, len) {
    return ('00' + str).substr(0 - (len || 2));
}

// Date
var getDate = exports.getDate = function(timestamp) {
    return formatDate(timestamp || +new Date);
}

var formatDate = exports.formatDate = function(timestamp) {
    var d = new Date(timestamp);

    // Format: Mon Jan 1 12:00:00 UTC-0100 2017
    return [
        d.toLocaleString(undefined, {weekday: 'short', month: 'short', day: 'numeric'}).replace(',', ''),
        [
            pad(d.getHours()),
            pad(d.getMinutes()),
            pad(d.getSeconds())
        ].join(':'),
        'UTC+' + pad(d.getTimezoneOffset() * (0 - (100 / 60)), 4),
        d.getFullYear()
    ].join(' ');
}

// Shortname
// https://en.wikipedia.org/wiki/8.3_filename#How_to_convert_a_long_filename_to_a_short_filename
var toShortname = exports.toShortname = function(filename) {
    var extension,
        filenameArr = filename.split('.'),
        shorten = function(str) {
            return str.replace(/[\s\.]/g, '').replace(/[\,\[\];=\+]/g, '_').toUpperCase();
        };

    if (filenameArr.length > 1 && filenameArr[0].length > 1) {
        extension = filenameArr.pop();
    }

    filename = filenameArr.join('.');

    if (filename.length > 8) {
        filename = shorten(filename).slice(0, 6) + '~1';
    }

    if (extension && extension.length > 3) {
        extension = shorten(extension).slice(0, 3);
    }

    return extension ? [filename, extension].join('.') : filename;
}
