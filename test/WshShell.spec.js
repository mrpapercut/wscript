'use strict';

var chai = require('chai'),
    path = require('path'),
    expect = chai.expect;

var getFilePath = function(filename) {
    return path.join(__dirname, '..', 'lib', filename);
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

            var Folders = require(getFilePath('config/SpecialFolders'));

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
            it('should be able to call .Terminate() on WshScriptExec object', function() {
                expect(WshShell.Exec().Terminate).to.be.a('function');
                expect(WshShell.Exec().Terminate()).to.be.an('undefined');
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

        describe('LogEvent()', function() {
            it('should return -1', function() {
                // Function deprecated
                // https://msdn.microsoft.com/en-us/library/b4ce6by3(v=vs.84).aspx#Remarks
                expect(WshShell.LogEvent(1, 'Log failed')).to.equal(-1);
            });
        });

        describe('Popup()', function() {
            it('should return -1 as if timed out', function() {
                expect(WshShell.Popup("Hello World!", 10, "Hi", 0x4 + 0x20)).to.equal(-1);
            });
        });

        describe('RegDelete()', function() {
            it('should throw Error when trying to delete a registry key', function() {
                expect(function() {
                    WshShell.RegDelete('HKCU\\Software\\ACME\\FortuneTeller\\MindReader');
                }).to.throw(Error);
            });
        });

        describe('RegRead()', function() {
            it('should throw Error when trying to read a registry key', function() {
                expect(function() {
                    WshShell.RegRead('HKCU\\Software\\ACME\\FortuneTeller\\MindReader');
                }).to.throw(Error);
            });
        });

        describe('RegWrite()', function() {
            it('should return undefined, regardless of registry key being written or not', function() {
                expect(WshShell.RegWrite('HKCU\\Software\\ACME\\FortuneTeller\\', 1, 'REG_BINARY')).to.equal(undefined);
            });
        });

        describe('Run()', function() {
            var WScript = require(getFilePath('index'));

            it('should return 0', function() {
                expect(WshShell.Run('notepad ' & WScript.ScriptFullName, 1, true)).to.equal(0);
            });

            it('should return 0 regardless of arguments provided', function() {
                expect(WshShell.Run('notepad')).to.equal(0);
            });
        });

        describe('SendKeys()', function() {
            it('should return undefined', function() {
                expect(WshShell.SendKeys()).to.equal(undefined);
            });
        });
    });
});
