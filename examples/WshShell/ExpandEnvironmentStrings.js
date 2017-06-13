var WshShell = WScript.CreateObject("WScript.Shell");
WScript.Echo(WshShell.ExpandEnvironmentStrings("%RANDOM%"));
WScript.Echo(WshShell.ExpandEnvironmentStrings("%userprofile%" + "/folder"));
WScript.Echo(WshShell.ExpandEnvironmentStrings("%fakestr%"));
