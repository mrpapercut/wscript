var WshNetwork = WScript.CreateObject("WScript.Network");
var oDrives = WshNetwork.EnumNetworkDrives();

WScript.Echo("Network drive mappings:");
for(i=0; i<oDrives.Count(); i+=2){
    WScript.Echo("Drive " + oDrives.Item(i) + " = " + oDrives.Item(i+1));
}
