var Controller = WScript.CreateObject("WSHController");
var RemoteScript = Controller.CreateScript(".\\test1.vbs");
WScript.ConnectObject(RemoteScript, "remote_");
RemoteScript.Execute();

while (RemoteScript.Status != 2) {
    WScript.Sleep(100);
}

WScript.DisconnectObject(RemoteScript);

function remote_Error()
{
    var theError = RemoteScript.Error;
    WScript.Echo("Error " + theError.Number + " - Line: " + theError.Line + ", Char: " + theError.Character + "\nDescription: " + theError.Description);
    WScript.Quit(-1);
}