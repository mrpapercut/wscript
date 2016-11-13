var WshShell = WScript.CreateObject("WScript.Shell");
var WshEnv = WshShell.Environment("PROCESS");
WshEnv("TestVar") = "Windows Script Host";
WScript.Echo(WshShell.ExpandEnvironmentStrings("The value of the test variable is: '%TestVar%'"));
WshEnv.Remove("TestVar");
WScript.Echo(WshShell.ExpandEnvironmentStrings("The value of the test variable is: '%TestVar%'"));