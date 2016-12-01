/*
function ShowDriveList()
{
   var fso, s, n, e, x;
   fso = new ActiveXObject("Scripting.FileSystemObject");
   e = new Enumerator(fso.Drives);
   s = "";
   for (; !e.atEnd(); e.moveNext())
   {
      x = e.item();
      s = s + x.DriveLetter;
      s += " - ";
      if (x.DriveType == 3)
         n = x.ShareName;
      else if (x.IsReady)
         n = x.VolumeName;
      else
         n = "[Drive not ready]";
      s +=   n + "<br>";
   }
   return(s);
}
*/

var FSO = function() {
    this.fso = WScript.createObject('Scripting.FileSystemObject');
};

FSO.prototype.enm = function(collection) {
    return new Enumerator(collection);
};

FSO.prototype.getdrives = function() {
    var e = this.enm(this.fso.Drives),
        res = [];

    for (;!e.atEnd();e.moveNext()) res.push(this.driveproperties(e.item()));

    return res;
};

FSO.prototype.driveproperties = function(item) {
    var res = [],
        properties = ['AvailableSpace', 'DriveLetter', 'DriveType', 'FileSystem', 'FreeSpace', 'IsReady', 'Path', 'RootFolder', 'SerialNumber', 'ShareName', 'TotalSize', 'VolumeName'];

    for (var i = 0; i < properties.length; i++) {
        res.push(properties[i] + ': ' + item[properties[i]]);
    }

    return res.join('\n');
};

var fso = new FSO();
var drives = fso.getdrives();
for (var i = 0; i < drives.length; i++) {
    WScript.Echo(drives[i]);
}
