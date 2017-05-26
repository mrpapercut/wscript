//var app = new ActiveXObject('Shell.Application');
var app = new ActiveXObject('System.Random');
WScript.Echo(app.GetHashCode());
for (var i in app) {
    WScript.Echo(i, app[i]);
}