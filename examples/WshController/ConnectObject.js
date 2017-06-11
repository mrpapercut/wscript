var Controller = WScript.CreateObject("WSHController");
var RemoteScript = Controller.CreateScript("Z:\\obscure\\wscript\\examples\\WshController\\test.vbs");

var _eventError = RemoteScript._eventError;

console.log(RemoteScript);
WScript.ConnectObject(RemoteScript, 'remote');
console.log(RemoteScript._eventError, _eventError);