var WshShell = WScript.CreateObject("WScript.Shell");

WshShell.RegDelete("HKCU\\Software\\ACME\\FortuneTeller\\MindReader");
// throw new Error("Key does not exist");
// Err.Raise("Whoops");