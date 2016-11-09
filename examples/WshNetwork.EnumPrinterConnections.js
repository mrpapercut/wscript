var WshNetwork = WScript.CreateObject("WScript.Network");
var oPrinters = WshNetwork.EnumPrinterConnections();

WScript.Echo("Network printer mappings:");
for(i=0; i<oPrinters.Count(); i+=2){
    WScript.Echo("Port " + oPrinters.Item(i) + " = " + oPrinters.Item(i+1));
}