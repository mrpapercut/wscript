var WshNetwork = WScript.CreateObject("WScript.Network");
var oPrinters = WshNetwork.EnumPrinterConnections();

WScript.Echo("Found " + oDrives.Length + " drives");
for(i=0; i<oPrinters.Count(); i+=2){
    WScript.Echo("Port " + oPrinters.Item(i) + " = " + oPrinters.Item(i+1));
}