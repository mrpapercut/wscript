var WshShell = WScript.CreateObject("WScript.Shell");
WScript.Echo(WshShell.ExpandEnvironmentStrings("%RANDOM%"));