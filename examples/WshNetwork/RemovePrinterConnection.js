var WshNetwork = WScript.CreateObject("WScript.Network");
var PrinterPath = "\\\\PRN-CORP1\\B41-4523-A";
WshNetwork.RemovePrinterConnection(PrinterPath, true, true);