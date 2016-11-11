'use strict';

var chai = require('chai'),
    path = require('path'),
    expect = chai.expect;

var getFilePath = function(filename) {
    return path.join(__dirname, '..', 'lib', filename);
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

    describe('Default methods', function() {
        beforeEach(function() {
            WshNetwork = getNewInstance();
        });

        describe('AddWindowsPrinterConnection()', function() {
            it('should return undefined', function() {
                var PrinterPath = '\\\\printserv\\DefaultPrinter';
                var PrinterDriver = 'Lexmark Optra S 1650';
                expect(WshNetwork.AddWindowsPrinterConnection(PrinterPath, PrinterDriver)).to.equal(undefined);
            });
        });

        describe('AddPrinterConnection()', function() {
            it('should return undefined', function() {
                expect(WshNetwork.AddPrinterConnection ("LPT1", "\\\\Server\\Print1")).to.equal(undefined);
            });
        });

        describe('EnumNetworkDrives()', function() {
            var WshUnnamed = require(getFilePath('WshUnnamed'));

            it('should return instance of Unnamed collection', function() {
                expect(WshNetwork.EnumNetworkDrives() instanceof WshUnnamed).to.be.true;
            });

            it('should return empty Unnamed collection', function() {
                expect(WshNetwork.EnumNetworkDrives().Length).to.eql(0);
            });
        });

        describe('EnumPrinterConnections()', function() {
            var WshUnnamed = require(getFilePath('WshUnnamed'));

            it('should return instance of Unnamed collection', function() {
                expect(WshNetwork.EnumPrinterConnections() instanceof WshUnnamed).to.be.true;
            });

            it('should return empty Unnamed collection', function() {
                expect(WshNetwork.EnumPrinterConnections().Length).to.eql(0);
            });
        });
    });
});

