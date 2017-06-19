'use strict';

var chai = require('chai'),
    path = require('path'),
    expect = chai.expect;

var getFilePath = function(filename) {
    return path.join(__dirname, '../..', 'lib/', filename);
}

var Drive = require(getFilePath('objects/scriptingFSO/objects/Drive'));

// Collection of drives
var testCollection = [new Drive(), new Drive()];

var getNewInstance = function() {
    var instance = require(getFilePath('common/Enumerator'));
    return new instance(testCollection);
}

var Enumerator;

describe('Enumerator', function() {
    beforeEach(function() {
        Enumerator = getNewInstance();
    });

    describe('constructor()', function() {
        var properties = {
            _collection: testCollection,
            _index: 0,
            _length: testCollection.length,
        };

        it('should have all default values', function() {
            for (var i in properties) {
                expect(Enumerator[i]).to.not.be.undefined;
                expect(Enumerator[i]).to.eql(properties[i]);
            }
        });

        it('should throw TypeError if instantiated with wrong type', function() {
            var instance = require(getFilePath('common/Enumerator'));
            expect(function() {
                new instance();
            }).to.throw(TypeError);
        });
    });

    describe('atEnd', function() {
        it('should return false when index is not at the end', function() {
            expect(Enumerator.atEnd()).to.be.false;
        });

        it('should return true when index is at or over the end', function() {
            Enumerator.moveNext();
            Enumerator.moveNext();
            expect(Enumerator.atEnd()).to.be.true;
            Enumerator.moveNext();
            expect(Enumerator.atEnd()).to.be.true;
        });
    });

    describe('item()', function() {
        it('should return instanceof Drive', function() {
            expect(Enumerator.item().toString()).to.eql('Drive');
        });

        it('should return undefined if atEnd is true', function() {
            Enumerator.moveNext();
            Enumerator.moveNext();
            expect(Enumerator.item()).to.be.undefined;
        });
    });

    describe('moveFirst()', function() {
        it('should reset the index to 0', function() {
            Enumerator.moveNext();
            expect(Enumerator._index).to.equal(1);
            Enumerator.moveFirst();
            expect(Enumerator._index).to.equal(0);
        });
    });

    describe('moveNext()', function() {
        it('should increment the index', function() {
            expect(Enumerator._index).to.equal(0);
            Enumerator.moveNext();
            expect(Enumerator._index).to.equal(1);
            Enumerator.moveNext();
            expect(Enumerator._index).to.equal(2);
        });
    });
});
