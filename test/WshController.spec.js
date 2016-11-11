'use strict';

var chai = require('chai'),
    path = require('path'),
    expect = chai.expect;

var getFilePath = function(filename) {
    return path.join(__dirname, '..', 'lib', filename);
}

var getNewInstance = function() {
    var instance = require(getFilePath('WshController'));
    return new instance();
}

var WshController;
var WshRemote = require(getFilePath('WshRemote'));

describe('WshController', function() {
    describe('constructor()', function() {
        WshController = getNewInstance();

		it('_name should equal WshController', function() {
			expect(WshController._name).to.equal('WshController');
		});
	});

	describe('CreateScript()', function() {
		WshController = getNewInstance();

		it('should return instance of WshRemote', function() {
			expect(WshController.CreateScript() instanceof WshRemote).to.be.true;
		});
	});
});
