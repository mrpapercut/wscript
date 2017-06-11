'use strict';

var chai = require('chai'),
    path = require('path'),
    expect = chai.expect;

var getFilePath = function(filename) {
    return path.join(__dirname, '..', 'vendor', 'ProxyGenerator');
}

var getNewInstance = function() {
    var instance = require(getFilePath());
    return instance;
}

class FakeClass {
    constructor() {
        this.property = true;
    }
}

var FakeProxy = null;
var PG = null;

describe('ProxyGenerator', function() {
    describe('constructor()', function() {
        it('should use console.log if no global config', function() {
            var proxy_config = global.proxy_config;
            global.proxy_config = null;

            PG = getNewInstance();
            FakeProxy = new PG(FakeClass);

            global.proxy_config = proxy_config;

            expect(new FakeProxy().property).to.be.true;
        });
    });
});
