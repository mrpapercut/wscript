var FSO = function() {
    this.fso = WScript.createObject('Scripting.FileSystemObject');
};

FSO.prototype.enm = function(collection) {
    return new Enumerator(collection);
};

FSO.prototype.getFolder = function(folderspec) {
    var e = this.enm(this.fso.GetFolder(folderspec).SubFolders),
        res = [];

    for (;!e.atEnd();e.moveNext()) res.push(this.folderProperties(e.item()));

    return res;
};

FSO.prototype.folderProperties = function(item) {
    var res = [],
        properties = ['Attributes', 'DateCreated', 'DateLastAccessed', 'DateLastModified', 'Drive', 'Files', 'IsRootFolder', 'Name', 'ParentFolder', 'Path', 'ShortName', 'ShortPath', 'Size', 'SubFolders', 'Type'];

    for (var i = 0; i < properties.length; i++) {
        try {
			if (item[properties[i]] || item[properties[i]] === false) res.push(properties[i] + ': ' + item[properties[i]]);
		} catch(e) {
			WScript.echo(properties[i] + ': ' + e.message);
		}
    }

    return res.join('\n');
};

var fso = new FSO();

var absolutePathFolder = fso.fso.getFolder('C:\\temp');
WScript.echo(fso.folderProperties(absolutePathFolder));
WScript.echo(fso.folderProperties(absolutePathFolder.parentFolder));
/*
var relativePathFolder = fso.fso.getFolder('examples');
WScript.echo(fso.folderProperties(relativePathFolder));
WScript.echo(fso.folderProperties(relativePathFolder.parentFolder));
*/