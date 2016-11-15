'use strict';

var chai = require('chai'),
    path = require('path'),
    expect = chai.expect;

var getFilePath = function(filename) {
    return path.join(__dirname, '..', 'lib', filename);
}

var getNewInstance = function() {
    var instance = require(getFilePath('objects/ADODB.Stream'));
    return new instance();
}

var ADODBStream;

describe('ADODBStream', function() {
    describe('constructor()', function() {
        ADODBStream = getNewInstance();

        var properties = {
            charset: 'unicode',
            EOS: false,
            lineSeparator: -1,
            mode: 1,
            position: 0,
            size: Infinity,
            state: 0,
            type: 2
        };

        it('should have all properties', function() {
            expect(ADODBStream).to.have.all.keys(Object.keys(properties));
        });

        it('should have all default values', function() {
            for (var i in properties) {
                expect(ADODBStream[i]).to.eql(properties[i]);
            }
        });
    });

    describe('default methods', function() {
        beforeEach(function() {
            ADODBStream = getNewInstance();
        });

        describe('cancel()', function() {
            it('should return nothing', function() {
                expect(ADODBStream.cancel()).to.equal.undefined;
            });

            it('should set State to 0', function() {
                ADODBStream.cancel();
                expect(ADODBStream.state).to.eql(0);
            });
        });
    });
});
