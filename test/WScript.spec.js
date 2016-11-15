'use strict';

var chai = require('chai'),
    path = require('path'),
    expect = chai.expect;

var getFilePath = function(filename) {
    return path.join(__dirname, '..', 'lib', filename);
}

var getNewInstance = function() {
    var instance = require(getFilePath('WScript'));
    return new instance();
}

var WScript;

describe('WScript', function() {
    describe('constructor()', function() {
        WScript = getNewInstance();
        var WshArguments = require(getFilePath('WshArguments'));

        var properties = {
            Arguments: new WshArguments(),
            BuildVersion: 0,
            FullName: 'C:\\WINDOWS\\system32\\wscript.exe',
            Interactive: true,
            Name: 'Windows Script Host',
            Path: 'C:\\WINDOWS\\SysWOW64',
            ScriptFullName: '',
            ScriptName: '',
            StdErr: null,
            StdIn: null,
            StdOut: null,
            Version: 5.6,
            _objects: []
        };

        it('should have all properties', function() {
            expect(WScript).to.have.all.keys(Object.keys(properties));
        });

        it('should have all default values', function() {
            for (var i in properties) {
                if (i === 'Arguments') {
                    expect(WScript[i] instanceof WshArguments).to.be.true;
                } else {
                    expect(WScript[i]).to.eql(properties[i]);
                }
            }
        });
    });

    describe('toString()', function() {
        WScript = getNewInstance();
        it('should equal Windows Script Host', function() {
            expect(WScript + '').to.equal('Windows Script Host');
        });
    });

    describe('Property setters', function() {
        beforeEach(function() {
            WScript = getNewInstance();
        });

        describe('_setArguments()', function() {
            it('should set WScript.Arguments', function() {
                WScript._setArguments([1, 2]);
                expect(WScript.Arguments).to.eql([1, 2]);
            });

            it('should set WScript.Arguments as Array', function() {
                WScript._setArguments('string');
                expect(WScript.Arguments).to.eql(['string']);
            });
        });

        describe('_setScriptName()', function() {
            it('should set WScript.ScriptName', function() {
                WScript._setScriptName('scriptName');
                expect(WScript.ScriptName).to.equal('scriptName');
            });

            it('should throw TypeError when ScriptName is not a string', function() {
                expect(function() {
                    WScript._setScriptName();
                }).to.throw(TypeError);
            });
        });

        describe('_setScriptFullName()', function() {
            it('should set WScript.ScriptFullName', function() {
                WScript._setScriptFullName('scriptFullName');
                expect(WScript.ScriptFullName).to.equal('scriptFullName');
            });

            it('should throw TypeError when ScriptFullName is not a string', function() {
                expect(function() {
                    WScript._setScriptFullName();
                }).to.throw(TypeError);
            });
        });
    });

    describe('Default methods', function() {
        beforeEach(function() {
            WScript = getNewInstance();
        });

        describe('ConnectObject()', function() {
            it('should throw TypeError if called with wrong arguments', function() {
                var RemoteScript = 'Hello world';
                expect(function() {
                    WScript.ConnectObject(RemoteScript);
                }).to.throw(TypeError);
            });

            it('should throw TypeError if strPrefix is not a string', function() {
                var WshController = WScript.CreateObject('WSHController');
                var RemoteScript = WshController.CreateScript('test.vbs');
                expect(function() {
                    WScript.ConnectObject(RemoteScript);
                }).to.throw(TypeError);

                expect(function() {
                    WScript.ConnectObject(RemoteScript, {});
                }).to.throw(TypeError);
            });

            it('should attach eventFunctions when connecting to object', function() {
                global.remote_Start = function() {};
                global.remote_End = function() {};

                var WshController = WScript.CreateObject('WSHController');
                var RemoteScript = WshController.CreateScript('test.vbs');
                var _eventError = RemoteScript._eventError;

                WScript.ConnectObject(RemoteScript, 'remote');

                expect(RemoteScript._eventStart).to.equal(global.remote_Start);
                expect(RemoteScript._eventEnd).to.equal(global.remote_End);
                expect(RemoteScript._eventError).to.equal(_eventError);
            });
        });

        describe('CreateObject()', function() {
            /*
            switch (strProgId) {
                case 'WScript.Shell':
                    Obj = new WshShell();
                case 'WScript.Network':
                    Obj = new WshNetwork();
                case 'MSXML2.XMLHTTP':
                    Obj = new XMLHttpRequest();
                case 'ADODB.Stream':
                    Obj = new ADODBStream();
            */
            it('should initially not contain any objects', function() {
                expect(WScript._objects.length).to.equal(0);
            });

            it('should return WshShell object', function() {
                var WshShell = require(getFilePath('WshShell'));
                expect(WScript.CreateObject('WScript.Shell') instanceof WshShell).to.be.true;
            });

            it('should return WshNetwork object', function() {
                var WshNetwork = require(getFilePath('WshNetwork'));
                expect(WScript.CreateObject('WScript.Network') instanceof WshNetwork).to.be.true;
            });

            it('should return WshController object', function() {
                var WshController = require(getFilePath('WshController'));
                expect(WScript.CreateObject('WSHController') instanceof WshController).to.be.true;
            });

            it('should return ADODB.Stream object', function() {
                var ADODBStream = require(getFilePath('objects/ADODB.Stream'));
                expect(WScript.CreateObject('ADODB.Stream') instanceof ADODBStream).to.be.true;
            });

            it('should return undefined if no or invalid strProgId is provided', function() {
                expect(WScript.CreateObject()).to.be.undefined;
                expect(WScript.CreateObject('Invalid.strProgId')).to.be.undefined;
            });
        });

        describe('DisconnectObject()', function() {
            it('should return undefined', function() {
                expect(WScript.DisconnectObject()).to.be.undefined;
            });
        });

        describe('Echo()', function() {
            it('should return undefined regardless of input', function() {
                expect(WScript.Echo()).to.equal(undefined);
                expect(WScript.Echo('Hello World!')).to.equal(undefined);
            });
        });

        describe('GetObject()', function() {
            it('should return undefined', function() {
                expect(WScript.GetObject()).to.eql(undefined);
            });
        });

        describe('Quit()', function() {
            it('should return errorCode or undefined if no code provided', function() {
                expect(WScript.Quit()).to.equal(undefined);
                expect(WScript.Quit(1)).to.equal(1);
            });
        });

        describe('Sleep()', function() {
            it('should sleep for (at least) 50ms', function() {
                var sleepTime = 50,
                    now = +new Date;

                WScript.Sleep(sleepTime);
                expect(+new Date >= now + (sleepTime)).to.be.true;
            });
        });
    });
});