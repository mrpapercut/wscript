'use strict';

var chai = require('chai'),
	path = require('path');

var getFilePath = function(filename) {
	return path.join(__dirname, '..', 'lib', filename);
}

chai.should();

var WScript;

describe('WScript', function() {

	describe('#constructor', function() {
		beforeEach(function() {
			WScript = require(getFilePath('WScript'));
		});

		it('toString should equal Windows Script Host', function() {
			(WScript + '').should.equal('Windows Script Host');
		});
	});
});