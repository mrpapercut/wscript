'use strict';

var chai = require('chai'),
    path = require('path'),
    expect = chai.expect;

var getFilePath = function(filename) {
    return path.join(__dirname, '..', 'lib', filename);
}

var getNewInstance = function() {
    var instance = require(getFilePath('WshRemote'));
    return new instance();
}

var WshRemote;

describe('WshRemote', function() {
    beforeEach(function() {
        WshRemote = getNewInstance();
    });

    describe('constructor()', function() {
        var properties = {
            Error: null,
            _CommandLine: undefined,
            _MachineName: undefined,
            _status: 0,
            _started: false,
            _ended: false,
            _name: 'WshRemote'
        };

        it('should have all properties', function() {
            expect(WshRemote).to.have.all.keys(Object.keys(properties));
        });

        it('should have all default values', function() {
            for (var i in properties) {
                expect(WshRemote[i]).to.eql(properties[i]);
            }
        });
	});

	describe('toString()', function() {
		it('should return WshRemote', function() {
			expect(WshRemote.toString()).to.equal('WshRemote');
		});
	});

	describe('Execute()', function() {
        it('should have Status set to 1', function() {
            WshRemote.Execute();
            expect(WshRemote.Status).to.equal(1);
        });
    });

    describe('.Status', function() {
        it('should not increment Status without triggering Execute()', function() {
            expect(WshRemote.Status).to.equal(0);
            expect(WshRemote.Status).to.equal(0);
        });

        it('should have Status set to 2 when we check twice', function() {
            WshRemote.Execute();
            expect(WshRemote.Status).to.equal(1);
            expect(WshRemote.Status).to.equal(2);
        });

        it('should never have Status go over 2', function() {
            WshRemote.Execute();
            expect(WshRemote.Status).to.equal(1);
            expect(WshRemote.Status).to.equal(2);
            expect(WshRemote.Status).to.equal(2);
        });
	});

	describe('Terminate()', function() {
        it('should set Status to 2', function() {
            WshRemote.Terminate();
            expect(WshRemote.Status).to.equal(2);
        });
	});

	// Events
	describe('_eventEnd()', function() {
        it('should return undefined', function() {
            expect(WshRemote._eventEnd()).to.be.undefined;
        });
	});

	describe('_eventError()', function() {
        var WshRemoteError = require(getFilePath('WshRemoteError'));
        it('should set Error to instanceof WshRemoteError', function() {
            WshRemote._eventError();
            expect(WshRemote.Error instanceof WshRemoteError).to.be.true;
        });
	});

	describe('_eventStart()', function() {
        it('should return undefined', function() {
            expect(WshRemote._eventStart()).to.be.undefined;
        });
	});
});
