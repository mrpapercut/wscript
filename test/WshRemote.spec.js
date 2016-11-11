'use strict';

var chai = require('chai'),
    path = require('path'),
	spies = require('chai-spies');

chai.use(spies);

var expect = chai.expect;

var getFilePath = function(filename) {
    return path.join(__dirname, '..', 'lib', filename);
}

var getNewInstance = function() {
    var instance = require(getFilePath('WshRemote'));
    return new instance();
}

var WshRemote;

describe('WshRemote', function() {
    describe('constructor()', function() {
        WshRemote = getNewInstance();

		it('_name should equal WshRemote', function() {
			expect(WshRemote._name).to.equal('WshRemote');
		});
	});

	describe('toString()', function() {
		WshRemote = getNewInstance();

		it('should return WshRemote', function() {
			expect(WshRemote.toString()).to.equal('WshRemote');
		});
	});

	describe('Execute()', function() {

	});

	describe('Terminate()', function() {

	});

	// Events
	describe('_eventEnd()', function() {

	});

	describe('_eventError()', function() {

	});

	describe('_eventStart()', function() {

	});
});
