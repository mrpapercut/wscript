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
            it('should throw Error', function() {
                var PrinterPath = '\\\\printserv\\DefaultPrinter';
                var PrinterDriver = 'Lexmark Optra S 1650';
                expect(function() {
					WshNetwork.AddWindowsPrinterConnection(PrinterPath, PrinterDriver)
				}).to.throw(Error);
            });
        });

        describe('AddPrinterConnection()', function() {
            it('should throw Error', function() {
                expect(function() {
					WshNetwork.AddPrinterConnection ("LPT1", "\\\\Server\\Print1")
				}).to.throw(Error);
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

		describe('MapNetworkDrive()', function() {
			it('should throw Error', function() {
				expect(function() {
					WshNetwork.MapNetworkDrive ("E:", "\\\\Server\\Public");
				}).to.throw(Error);
			});
		});

		describe('RemoveNetworkDrive()', function() {
			it('should throw Error', function() {
				expect(function() {
					WshNetwork.RemoveNetworkDrive ("E:");
				}).to.throw(Error);
			});
		});

		describe('RemovePrinterConnection()', function() {
			it('should throw Error', function() {
				expect(function() {
					var PrinterPath = "\\\\PRN-CORP1\\B41-4523-A";
					WshNetwork.RemovePrinterConnection(PrinterPath, true, true);
				}).to.throw(Error);
			});
		});

		describe('SetDefaultPrinter()', function() {
			it('should throw Error', function() {
				expect(function() {
					var PrinterPath = "\\\\research\\library1";
					WshNetwork.SetDefaultPrinter(PrinterPath);
				}).to.throw(Error);
			});
		});
    });
});

