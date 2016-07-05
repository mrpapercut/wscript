'use strict';

var chai = require('chai'),
    path = require('path'),
    expect = chai.expect;

var getFilePath = function(filename) {
    return path.join(__dirname, '..', 'lib/WScript', filename);
}

var getNewInstance = function() {
	var instance = require(getFilePath('WshShell'));
	return new instance();
}

var WshShell;

describe('WshShell', function() {
    describe('constructor()', function() {
        WshShell = getNewInstance();

        var properties = {
            CurrentDirectory: 'C:\\Temp',
            Environment: null,
            _name: 'WshShell'
        };

        it('should have all properties', function() {
            expect(WshShell).to.have.all.keys(Object.keys(properties));
        });

        it('should have all default values', function() {
            for (var i in properties) {
                expect(WshShell[i]).to.eql(properties[i]);
            }
        });
    });

    describe('toString()', function() {
        WshShell = getNewInstance();
        it('should equal WshShell', function() {
            expect(WshShell + '').to.equal('WshShell');
        });
    });

    describe('Property setters', function() {
        beforeEach(function() {
            WshShell = getNewInstance();
        });

        describe('_setCurrentDirectory()', function() {
            it('should return the provided directory', function() {
                WshShell._setCurrentDirectory('C:\\');
                expect(WshShell.CurrentDirectory).to.equal('C:\\');
            });
        });
    });

    describe('Default methods', function() {
        beforeEach(function() {
            WshShell = getNewInstance();
        });

        describe('SpecialFolders()', function() {
            it('should return empty string without argument', function() {
                expect(WshShell.SpecialFolders()).to.equal('');
            });

            var Folders = require('../config/SpecialFolders');

            it('should return the correct SpecialFolders paths', function() {
                for (var i in Folders) {
                    expect(WshShell.SpecialFolders([i])).to.eql(Folders[i]);
                }
            });

            it('should return the correct number of folders', function() {
                expect(WshShell.SpecialFolders.count()).to.equal(16);
            });
        });

        describe('AppActivate()', function() {
            it('should return boolean true', function() {
                expect(WshShell.AppActivate('Command Prompt')).to.be.true;
            });
        });

        describe('CreateShortcut()', function() {
            var WScript = require(getFilePath('index'));
            var WshShortcut = require(getFilePath('WshShortcut'));

            it('should return a WshShortcut object', function() {
                expect(WshShell.CreateShortcut() instanceof WshShortcut).to.be.true;
            });

            it('should be able to create example from MS docs', function() {
                // Example from https://msdn.microsoft.com/en-us/library/xsy6k3ys(v=vs.84).aspx
                var strDesktop = WshShell.SpecialFolders('Desktop'),
                oShellLink = WshShell.CreateShortcut(strDesktop + '\\Shortcut Script.lnk');
                oShellLink.TargetPath       = WScript.ScriptFullName;
                oShellLink.WindowStyle      = 1;
                oShellLink.Hotkey           = 'CTRL+SHIFT+F';
                oShellLink.IconLocation     = 'notepad.exe, 0';
                oShellLink.Description      = 'Shortcut Script';
                oShellLink.WorkingDirectory = strDesktop;
                oShellLink.RelativePath     = '';
                oShellLink.WindowStyle      = '';
                oShellLink.Save();
            });
        });

        describe('Exec()', function() {
            var WshScriptExec = require(getFilePath('WshScriptExec'));

            it('should return a WshScriptExec object', function() {
                expect(WshShell.Exec() instanceof WshScriptExec).to.be.true;
            });
        });

        describe('ExpandEnvironmentStrings()', function() {
            it('should return C:\\Windir', function() {
                expect(WshShell.ExpandEnvironmentStrings('%WINDIR%')).to.equal('C:\\Windows');
            });

            it('should return empty string when no or invalid strString is provided', function() {
                expect(WshShell.ExpandEnvironmentStrings()).to.equal('');
            });
        });
    });
});
