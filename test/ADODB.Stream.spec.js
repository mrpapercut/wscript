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
var emptyBuffer = getNewInstance()._stringToArrayBuffer('\ufeff');

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
            type: 2,
            _data: {}
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

    describe('getters', function() {
        describe('_getLineSeparator()', function() {
            ADODBStream = getNewInstance();
            it('should return \r\n', function() {
                expect(ADODBStream._getLineSeparator()).to.equal('\r\n');
            });

            it('should return \n', function() {
                ADODBStream.lineSeparator = 10;
                expect(ADODBStream._getLineSeparator()).to.equal('\n');
            });

            it('should return \r', function() {
                ADODBStream.lineSeparator = 13;
                expect(ADODBStream._getLineSeparator()).to.equal('\r');
            });
        });
    });

    describe('default methods', function() {
        beforeEach(function() {
            ADODBStream = getNewInstance();
        });

        describe('cancel()', function() {
            it('should set State to 0', function() {
                ADODBStream.cancel();
                expect(ADODBStream.state).to.eql(0);
            });
        });

        describe('close()', function() {
            it('should set State to 0 and _data to null', function() {
                ADODBStream.close();
                expect(ADODBStream.state).to.eql(0);
                expect(ADODBStream._data).to.eql(emptyBuffer);
            });
        });

        describe('copyTo()', function() {
            it('should throw TypeError if destStream doesn\'t exist', function() {
                expect(function() {
                    ADODBStream.copyTo();
                }).to.throw(TypeError);
            });

            it('should throw TypeError if destStream is not a stream', function() {
                expect(function() {
                    ADODBStream.copyTo({});
                }).to.throw(TypeError);
            });

            it('should throw TypeError if destStream is not opened', function() {
                var ADODBStream2 = getNewInstance();
                expect(function() {
                    ADODBStream.copyTo(ADODBStream2);
                }).to.throw(TypeError);
            });

            it('should copy data from stream1 to stream2', function() {
                var ADODBStream1 = getNewInstance(),
                    ADODBStream2 = getNewInstance();

                ADODBStream2.open();

                ADODBStream1.mode = 3;
                ADODBStream1._data = 'Hello world';
                ADODBStream1.copyTo(ADODBStream2);

                expect(ADODBStream2._data).to.equal(ADODBStream1._data);
                expect(ADODBStream2.mode).to.equal(ADODBStream1.mode);
                expect(ADODBStream2.type).to.equal(ADODBStream1.type);
            });

            it('should throw TypeError if numChars is not a number', function() {
                var ADODBStream1 = getNewInstance(),
                    ADODBStream2 = getNewInstance();

                ADODBStream2.open();
                expect(function() {
                    ADODBStream1.copyTo(ADODBStream2, false);
                }).to.throw(TypeError);
            });

            it('should copy n characters in data from stream1 to stream2', function() {
                var ADODBStream1 = getNewInstance(),
                    ADODBStream2;

                ADODBStream1.writeText('Hello world');
                ADODBStream1.position = 0;

                ADODBStream2 = getNewInstance();
                ADODBStream2.open();
                ADODBStream1.copyTo(ADODBStream2, 4);
                ADODBStream2.position = 0;
                expect(ADODBStream2.readText()).to.equal('Hell');

                ADODBStream2 = getNewInstance();
                ADODBStream2.open();
                ADODBStream1.position = 0;
                ADODBStream1.copyTo(ADODBStream2, -1);
                ADODBStream2.position = 0;
                expect(ADODBStream2.readText()).to.equal('Hello world');

                ADODBStream2 = getNewInstance();
                ADODBStream2.open();
                ADODBStream1.position = 0;
                ADODBStream1.copyTo(ADODBStream2, 16);
                ADODBStream2.position = 0;
                expect(ADODBStream2.readText()).to.equal('Hello world');
            });
        });

        describe('flush()', function() {
            it('should set data to null', function() {
                ADODBStream._data = 'Hello world';
                ADODBStream.flush();
                expect(ADODBStream._data).to.eql(emptyBuffer);
            });
        });

        describe('loadFromFile()', function() {
            it('should throw Error if Stream is not open', function() {
                expect(function() {
                    ADODBStream.loadFromFile('test.js');
                }).to.throw(Error);
            });

            it('should throw Error if file cannot be opened', function() {
                ADODBStream = getNewInstance();
                ADODBStream.open();
                expect(function() {
                    ADODBStream.loadFromFile('test.js');
                }).to.throw(Error);
            });
        });

        describe('open()', function() {
            it('should set State to open', function() {
                ADODBStream.open();
                expect(ADODBStream.state).to.eql(1);
            });

            it('should set Mode if provided', function() {
                ADODBStream = getNewInstance();
                ADODBStream.open(null, 2);
                expect(ADODBStream.mode).to.eql(2);
            });

            it('should throw TypeError if value is not allowed', function() {
                ADODBStream = getNewInstance();
                expect(function() {
                    ADODBStream.open(null, -1);
                }).to.throw(TypeError);

                expect(function() {
                    ADODBStream.open(null, 5);
                }).to.throw(TypeError);

                expect(function() {
                    ADODBStream.open(null, false);
                }).to.throw(TypeError);

                expect(function() {
                    ADODBStream.open(null, 'abc');
                }).to.throw(TypeError);
            });
        });

        describe('read()', function() {
            it('should throw Error when called on TextStream', function() {
                ADODBStream.open();
                ADODBStream.type = 2;
                expect(function() {
                    ADODBStream.read();
                }).to.throw(TypeError);
            });

			it('should not throw Error when called on ByteStream', function() {
				ADODBStream = getNewInstance();
				ADODBStream.type = 1;
				expect(function() {
					ADODBStream.read();
				}).to.not.throw(TypeError);
			});
        });

        describe('readText()', function() {
            it('should throw Error when called on ByteStream', function() {
                ADODBStream.open();
                ADODBStream.type = 1;
                expect(function() {
                    ADODBStream.readText();
                }).to.throw(TypeError);
            });

            it('should read written text', function() {
                ADODBStream = getNewInstance();
                ADODBStream.open();
                ADODBStream.type = 2;
                ADODBStream.writeText('Hello world');
                ADODBStream.position = 0;

                expect(ADODBStream.readText()).to.equal('Hello world');
            });

            it('should return n characters from buffer', function() {
                ADODBStream = getNewInstance();
                ADODBStream.open();
                ADODBStream.type = 2;
                ADODBStream.writeText('Hello world');
                ADODBStream.position = 0;

                expect(ADODBStream.readText(4)).to.equal('Hell');
                // Not resetting position
                expect(ADODBStream.readText(-1)).to.equal('o world');

                expect(function() {
                    ADODBStream.readText(true);
                }).to.throw(TypeError);
            });

            it('should return 1 line from buffer', function() {
                ADODBStream = getNewInstance();
                ADODBStream.open();
                ADODBStream.writeText('Hello world', 1);
                ADODBStream.writeText('Hello again', 1);
                ADODBStream.position = 0;
                expect(ADODBStream.readText(-2)).to.equal('Hello world');
            });
        });

        describe('saveToFile()', function() {
			it('should throw error when arguments are invalid', function() {
				ADODBStream.open();
				expect(function() {
					ADODBStream.saveToFile('filename', true);
				}).to.throw(TypeError);
			});

			it('should set position to 0 after saveToFile()', function() {
				ADODBStream = getNewInstance();
				ADODBStream.open();
				ADODBStream.writeText('Hello world');
				expect(ADODBStream.position).to.equal(24);
				ADODBStream.saveToFile('filename', 1);
				expect(ADODBStream.position).to.equal(0);
				ADODBStream.writeText('Hello');
				expect(ADODBStream.position).to.equal(12);
				ADODBStream.saveToFile('filename', 2);
				expect(ADODBStream.position).to.equal(0);
			});
        });

        describe('setEOS()', function() {
            it('should truncate all characters after this.position', function() {
                ADODBStream.open();
                ADODBStream.writeText('Hello world');
                ADODBStream.position -= 14;
                ADODBStream.setEOS();
				ADODBStream.position = 0;
                expect(ADODBStream.readText()).to.equal('Hello');
            });
        });

        describe('skipLine()', function() {
            it('should read text, skip to next line, read text', function() {
                ADODBStream.open();
                ADODBStream.writeText('Foo', 1);
                ADODBStream.writeText('Bar', 1);
                ADODBStream.writeText('Qud', 1);
                ADODBStream.position = 0;
                expect(ADODBStream.readText(-2)).to.equal('Foo');
                ADODBStream.skipLine();
                expect(ADODBStream.readText(-2)).to.equal('Qud');
            });
        });

        describe('stat()', function() {
            it('should not do anything', function() {
                expect(ADODBStream.stat()).to.be.undefined;
            });
        });

        describe('write()', function() {
            it('should throw Error when called on TextStream', function() {
                ADODBStream.open();
                ADODBStream.type = 2;
                expect(function() {
                    ADODBStream.write();
                }).to.throw(TypeError);
            });

			it('should not throw Error when called on ByteStream', function() {
				ADODBStream = getNewInstance();
				ADODBStream.type = 1;
				expect(function() {
					ADODBStream.write();
				}).to.not.throw(TypeError);
			});
        });

        describe('writeText()', function() {
            it('should throw Error when called on ByteStream', function() {
                ADODBStream.open();
                ADODBStream.type = 1;
                expect(function() {
                    ADODBStream.writeText();
                }).to.throw(TypeError);
            });

            it('should throw Error when second argument is set but not === 1', function() {
                ADODBStream = getNewInstance();
                ADODBStream.open();
                ADODBStream.type = 2;
                expect(function() {
                    ADODBStream.writeText('Hello world', true);
                }).to.throw(TypeError);
            });

            it('should write text to _data', function() {
                ADODBStream = getNewInstance();
                ADODBStream.open();
                ADODBStream.type = 2;
                ADODBStream.writeText('Hello world');
                ADODBStream.position = 0;
                expect(ADODBStream.readText()).to.equal('Hello world');
            });

            it('should add newline to end of string', function() {
                ADODBStream = getNewInstance();
                ADODBStream.open();
                ADODBStream.type = 2;
                ADODBStream.lineSeparator = 10;
                ADODBStream.writeText('Hello world', 1);
                ADODBStream.position = 0;
                expect(ADODBStream.readText()).to.equal('Hello world\n');
            });

            it('should set position to strlen', function() {
                ADODBStream = getNewInstance();
                ADODBStream.open();
                ADODBStream.type = 2;
                ADODBStream.writeText('Hello world');
                expect(ADODBStream.position).to.equal(24);
            });
        });
    });
});
