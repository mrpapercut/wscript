var WshNetwork = WScript.CreateObject("WScript.Network");
var PrinterPath = "\\\\research\\library1";
WshNetwork.SetDefaultPrinter(PrinterPath);