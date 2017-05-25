'use strict';

var chai = require('chai'),
    path = require('path'),
    expect = chai.expect;

var getFilePath = function(filename) {
    return path.join(__dirname, '..', 'lib', filename);
}

var getNewInstance = function() {
    var instance = require(getFilePath('objects/Scripting.Dictionary'));
    return new instance();
}

var Dict;

describe('Scripting.Dictionary', function() {
    beforeEach(function() {
        Dict = getNewInstance();
    });

    describe('constructor()', function() {
        var properties = {
            Count: 0,
            Key: null,
            CompareMode: null,
            _contents: {}
        };

        it('should have all properties', function() {
            expect(Dict).to.have.all.keys(Object.keys(properties));
        });

        it('should have all default values', function() {
            for (var i in properties) {
                expect(Dict[i]).to.eql(properties[i]);
            }
        });
    });

    describe('Add()', function() {
        it('should add a key, value pair', function() {
            Dict.Add('a', 'test');
            expect(Dict._contents['a']).to.equal('test');
        });

        it('should throw error if insufficient arguments given', function() {
            expect(function() {
                Dict.Add('a');
            }).to.throw(TypeError);

            expect(function() {
                Dict.Add();
            }).to.throw(TypeError);
        });

        it('should throw error if key already exists', function() {
            Dict.Add('a', 'test');
            expect(function() {
                Dict.Add('a', 'test2');
            }).to.throw(TypeError);
        });
    });

    describe('Exists()', function() {
        it('should return -1 if key exists', function() {
            Dict.Add('a', 'test');
            expect(Dict.Exists('a')).to.equal(-1);
        });

        it('should return 0 if key doesn\'t exist', function() {
            expect(Dict.Exists('a')).to.equal(0);
        });

        it('should throw error if no key is given', function() {
            expect(function() {
                Dict.Exists();
            }).to.throw(TypeError);
        });
    });

    describe('Item()', function() {
        it('should return value of key-value pair', function() {
            Dict.Add('a', 'test');
            expect(Dict.Item('a')).to.equal('test');
        });

        it('should return empty string if key doesn\'t exist', function() {
            expect(Dict.Item('a')).to.equal('');
        });

        it('should throw error if no key provided', function() {
            expect(function() {
                Dict.Item();
            }).to.throw(TypeError);
        });
    });

    describe('Items()', function() {
        it('should return an array of items', function() {
            Dict.Add('a', 'test');
            expect(Dict.Items()[0]).to.equal('test');
        });
    });

    describe('Keys()', function() {
        it('should return an array of keys', function() {
            Dict.Add('a', 'test');
            expect(Dict.Keys()[0]).to.equal('a');
        });
    });

    describe('Remove()', function() {
        it('should remove a key from contents', function() {
            Dict.Add('a', 'test');
            Dict.Remove('a');
            expect(Dict.Exists('a')).to.equal(0);
        });

        it('should throw error if no key is given', function() {
            expect(function() {
                Dict.Remove();
            }).to.throw(TypeError);
        });
    });

    describe('RemoveAll()', function() {
        it('should remove all key-value pairs from contents', function() {
            Dict.Add('a', 'test');
            Dict.Add('b', 'test2');
            Dict.RemoveAll();
            expect(Dict.Count).to.equal(0);
        });
    });
});
