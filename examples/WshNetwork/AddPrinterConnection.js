var WshNetwork = WScript.CreateObject('WScript.Network');
WshNetwork.AddPrinterConnection ("LPT1", "\\\\Server\\Print1")