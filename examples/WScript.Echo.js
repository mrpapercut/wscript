var WshNetwork = WScript.CreateObject("WScript.Network");
var oDrives = WshNetwork.EnumNetworkDrives();
var oPrinters = WshNetwork.EnumPrinterConnections();
WScript.Echo("Domain = " + WshNetwork.UserDomain);
WScript.Echo("Computer Name = " + WshNetwork.ComputerName);
WScript.Echo("User Name = " + WshNetwork.UserName);
WScript.Echo();
WScript.Echo("Network drive mappings:");
for(i=0; i<oDrives.Count(); i+=2){
	WScript.Echo("Drive " + oDrives.Item(i) + " = " + oDrives.Item(i+1));
}
var e = WScript.Echo();
WScript.Echo("Network printer mappings:");
for(i=0; i<oPrinters.Count(); i+=2){
	WScript.Echo("Port " + oPrinters.Item(i) + " = " + oPrinters.Item(i+1));
}
WScript.Echo(typeof e);