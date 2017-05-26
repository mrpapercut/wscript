'use strict';

const pad = (str, len) => {
    len = len || 2;
    return (new Array(len).fill('0').join('') + str).substr(0 - len);
}

// Date
const getDate = exports.getDate = timestamp => formatDate(new Date(timestamp || +new Date));

// Format: Mon Jan 1 12:00:00 UTC-0100 2017
const formatDate = exports.formatDate = d => [
    d.toLocaleString(undefined, {weekday: 'short', month: 'short', day: 'numeric'}).replace(',', ''),
    [
        pad(d.getHours()),
        pad(d.getMinutes()),
        pad(d.getSeconds())
    ].join(':'),
    'UTC' + d.toString().match(/GMT([\-|\+][0-9]{4})/)[1],
    d.getFullYear()
].join(' ');

// Shortname
// https://en.wikipedia.org/wiki/8.3_filename#How_to_convert_a_long_filename_to_a_short_filename
const toShortname = exports.toShortname = filename => {
    let extension,
        filenameArr = filename.split('.'),
        shorten = str => str.replace(/[\s\.]/g, '').replace(/[\,\[\];=\+]/g, '_').toUpperCase();

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
