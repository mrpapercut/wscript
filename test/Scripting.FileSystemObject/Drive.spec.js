'use strict';

var chai = require('chai'),
    path = require('path'),
    expect = chai.expect;

var getFilePath = function(filename) {
    return path.join(__dirname, '../..', 'lib', filename);
}

var getNewInstance = function(drivespec) {
    var instance = require(getFilePath('COMobjects/scriptingFSO/objects/Drive'));
    return new instance(drivespec);
}

var Drive;

describe('Drive', function() {
    describe('constructor()', function() {
        Drive = getNewInstance('C');

        var properties = {
            AvailableSpace: 7156948992,
            DriveLetter: 'C',
            DriveType: 2,
            FileSystem: 'NFTS',
            FreeSpace: 7156948992,
            IsReady: true,
            Path: 'C:',
            RootFolder: 'C:\\',
            SerialNumber: -1225924828,
            ShareName: '',
            TotalSize: 7725907968,
            VolumeName: '',
            _name: 'Drive'
        };

        it('should have all properties', function() {
            expect(Drive).to.have.all.keys(Object.keys(properties));
        });

        it('should have all default values', function() {
            for (var i in properties) {
                expect(Drive[i]).to.eql(properties[i]);
            }
        });
    });
});
