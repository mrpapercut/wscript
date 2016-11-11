var Controller = WScript.CreateObject("WSHController");
WScript.Echo(typeof Controller);
var RemoteScript = Controller.CreateScript("test.js", "remoteserver");
WScript.ConnectObject(RemoteScript, "remote_");
RemoteScript.Execute();

while (RemoteScript.Status != 2) {
    WScript.Sleep(100);
}

function remote_Error() {
    var theError = RemoteScript.Error;
    WScript.Echo("Error " + theError.Number + " - Line: " + theError.Line + ", Char: " + theError.Character + "\nDescription: " + theError.Description);
    WScript.Quit(-1);
}