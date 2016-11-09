var WshShell = WScript.CreateObject("WScript.Shell");

var wr = WshShell.RegWrite("HKCU\\Software\\ACME\\FortuneTeller\\", 1, "REG_BINARY");
WScript.Echo(typeof wr);