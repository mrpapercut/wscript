var WshShell = WScript.CreateObject("WScript.Shell");
var WshSysEnv = WshShell.Environment("SYSTEM");
var WshUserEnv = WshShell.Environment("USER");
var WshProcessEnv = WshShell.Environment("PROCESS");

var SYSTEM = [
    'NUMBER_OF_PROCESSORS',
    'PROCESSOR_ARCHITECTURE',
    'PROCESSOR_IDENTIFIER',
    'PROCESSOR_LEVEL',
    'PROCESSOR_REVISION',
    'OS',
    'COMSPEC',
    'PATH',
    'PATHEXT',
    'WINDIR'
];

var PROCESS = [
    'NUMBER_OF_PROCESSORS',
    'PROCESSOR_ARCHITECTURE',
    'PROCESSOR_IDENTIFIER',
    'PROCESSOR_LEVEL',
    'PROCESSOR_REVISION',
    'OS',
    'COMSPEC',
    'HOMEDRIVE',
    'HOMEPATH',
    'PATH',
    'PATHEXT',
    'PROMPT',
    'SYSTEMDRIVE',
    'SYSTEMROOT',
    'WINDIR',
    'TEMP',
    'TMP'
];

var USER = [
    'PATH',
    'TEMP',
    'TMP'
];

for (var i = 0; i < SYSTEM.length; i++) {
    WScript.Echo('SYSTEM ' + SYSTEM[i] + ': ' + WshSysEnv.Item(SYSTEM[i]));
}

for (var i = 0; i < PROCESS.length; i++) {
    WScript.Echo('PROCESS ' + PROCESS[i] + ': ' + WshProcessEnv.Item(PROCESS[i]));
}

for (var i = 0; i < USER.length; i++) {
    WScript.Echo('USER ' + USER[i] + ': ' + WshProcessEnv.Item(USER[i]));
}
