var WshShell = WScript.CreateObject("WScript.Shell");

WshShell.RegRead("HKCU\\Software\\ACME\\FortuneTeller\\MindReader");
