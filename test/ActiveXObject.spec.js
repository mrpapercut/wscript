'use strict';

require('./_config')()

var chai = require('chai'),
    path = require('path'),
    expect = chai.expect;

var getFilePath = function(filename) {
    return path.join(__dirname, '..', 'lib', filename);
}

var ActiveXObject   = require(getFilePath('COMobjects/ActiveXObject'));
var WshShell        = require(getFilePath('WshShell'));

describe('ActiveXObject', function() {
    describe('constructor()', function() {
        it('should return instanceof WshShell object', function() {
            expect(new ActiveXObject('WScript.Shell') instanceof WshShell);
        });
    });
});
