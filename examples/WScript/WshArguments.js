// Show all of the arguments.
WScript.Echo(WScript.Arguments.ShowUsage());
WScript.Echo(WScript.Arguments.Count() + " arguments")

for (var i = 0; i <= WScript.Arguments.length - 1; i++) {
    WScript.Echo(" " + WScript.Arguments.Item(i));

}

// Show the unnamed arguments.
WScript.Echo(WScript.Arguments.Unnamed.length + " unnamed arguments")

for (var i = 0; i <= WScript.Arguments.Unnamed.length - 1; i++) {
    WScript.Echo(" " + WScript.Arguments.Unnamed.Item(i));
}

// Show the named arguments.
WScript.Echo (WScript.Arguments.Named.length + " named arguments")
WScript.Echo (" ab: " + WScript.Arguments.Named.Item("ab"));

// execute: wscript WshArguments.js 321 /ab:cd 123 "scripts are wonderful"