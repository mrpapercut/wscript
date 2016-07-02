'use strict';

var chai = require('chai'),
	path = require('path'),
	expect = chai.expect;

var getFilePath = function(filename) {
	return path.join(__dirname, '..', 'lib', filename);
}

var WScript;

describe('WScript', function() {
	describe('constructor()', function() {
		WScript = require(getFilePath('WScript'));

		var properties = {
			Arguments: [],
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
				expect(WScript[i]).to.eql(properties[i]);
			}
		});
	});

	describe('toString()', function() {
		WScript = require(getFilePath('WScript'));
		it('should equal Windows Script Host', function() {
			expect(WScript + '').to.equal('Windows Script Host');
		});
	});

	describe('Property setters', function() {
		beforeEach(function() {
			WScript = require(getFilePath('WScript'));
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
			WScript = require(getFilePath('WScript'));
		});

		describe('ConnectObject()', function() {

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
				expect(WScript.CreateObject('WScript.Shell')+'').to.equal('WshShell');
			});

			it('should return WshNetwork object', function() {
				// expect(WScript.CreateObject('WScript.Network')+'').to.equal('WshNetwork');
			});

			it('should return undefined if no or invalid strProgId is provided', function() {
				expect(WScript.CreateObject()).to.be.undefined;
				expect(WScript.CreateObject('Invalid.strProgId')).to.be.undefined;
			});
		});

		describe('DisconnectObject()', function() {

		});

		describe('Echo()', function() {

		});

		describe('GetObject()', function() {

		});

		describe('Quit()', function() {

		});

		describe('Sleep()', function() {
			it('should sleep for (at least) 50ms', function() {
				var sleepTime = 0.05,
					now = +new Date;

				WScript.Sleep(sleepTime);
				expect(+new Date >= now + (sleepTime * 1000)).to.be.true;
			});
		});
	});
});