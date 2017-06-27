var FSO = function() {
    this.fso = WScript.createObject('Scripting.FileSystemObject');
};

FSO.prototype.enm = function(collection) {
    return new Enumerator(collection);
};

FSO.prototype.getfiles = function(f) {
   // fso = new ActiveXObject("Scripting.FileSystemObject");
   //get the folder by giving its path
   return this.enm(f.files);

};

FSO.prototype.getFolder = function(path) {
    return this.fso.getFolder(path);
};

FSO.prototype.fileproperties = function(item) {
    var res = [],
        properties = ['Attributes', 'DateCreated', 'DateLastAccessed', 'DateLastModified', 'Drive', 'Name', 'ParentFolder', 'Path', 'ShortName', 'ShortPath', 'Size', 'Type'];

    for (var i = 0; i < properties.length; i++) {
        res.push(properties[i] + ': ' + item[properties[i]]);
    }

    return res.join('\n');
};

var fso = new FSO();
var WshShell = WScript.CreateObject("WScript.Shell");
var folder = fso.getFolder('testfiles');
var files = fso.getfiles(folder);
for (; !files.atEnd(); files.moveNext()) {
    WScript.Echo(fso.fileproperties(files.item()));
    // WScript.Echo(typeof files.item().Attributes === 'number');
}
