'use strict';

var chai = require('chai'),
    path = require('path'),
    expect = chai.expect;

var getFilePath = function(filename) {
    return path.join(__dirname, '..', 'lib', filename);
}

var getNewInstance = function() {
    var instance = require(getFilePath('WshRemoteError'));
    return new instance();
}

var WshRemoteError;

describe('WshRemoteError', function() {
    beforeEach(function() {
        WshRemoteError = getNewInstance();
    });

    describe('constructor()', function() {
        var properties = {
            Description:    '',
            Line:           0,
            Character:      0,
            Number:         0,
            SourceText:     '',
            Source:         '',
            _name:          'WshRemoteError'
        };

        it('should have all properties', function() {
            expect(WshRemoteError).to.have.all.keys(Object.keys(properties));
        });

        it('should have all default values', function() {
            for (var i in properties) {
                expect(WshRemoteError[i]).to.eql(properties[i]);
            }
        });
    });

    describe('toString()', function() {
        it('should return WshRemoteError', function() {
            expect(WshRemoteError.toString()).to.equal('WshRemoteError');
        });
    });
});
