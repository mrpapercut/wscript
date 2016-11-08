'use strict';

var chai = require('chai'),
    path = require('path'),
    expect = chai.expect;

var getFilePath = function(filename) {
    return path.join(__dirname, '..', 'lib/WScript', filename);
}

var getNewInstance = function() {
    var instance = require(getFilePath('WshNetwork'));
    return new instance();
}

var WshNetwork;

describe('WshNetwork', function() {
    describe('constructor()', function() {
        WshNetwork = getNewInstance();

        var properties = {
            ComputerName: 'USERPC',
            UserDomain: 'USERDOMAIN',
            UserName: 'USER',
            _name: 'WshNetwork'
        };

        it('should have all properties', function() {
            expect(WshNetwork).to.have.all.keys(Object.keys(properties));
        });

        it('should have all default values', function() {
            for (var i in properties) {
                expect(WshNetwork[i]).to.eql(properties[i]);
            }
        });
    });

    describe('toString()', function() {
        WshNetwork = getNewInstance();
        it('should equal WshNetwork', function() {
            expect(WshNetwork + '').to.equal('WshNetwork');
        });
    });

    describe('Property setters', function() {
        beforeEach(function() {
            WshNetwork = getNewInstance();
        });


    });

    describe('Default methods', function() {
        beforeEach(function() {
            WshNetwork = getNewInstance();
        });
    });
});

