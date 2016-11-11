var WshNetwork = WScript.CreateObject('WScript.Network');
var PrinterPath = '\\\\printserv\\DefaultPrinter';
var PrinterDriver = 'Lexmark Optra S 1650';
WshNetwork.AddWindowsPrinterConnection(PrinterPath, PrinterDriver);