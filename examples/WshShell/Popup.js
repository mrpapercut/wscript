var WshShell = WScript.CreateObject("WScript.Shell");

var intButton = WshShell.Popup("Hello World!", 10, "w00t", 0x4 + 0x20);
WScript.Echo(intButton);
