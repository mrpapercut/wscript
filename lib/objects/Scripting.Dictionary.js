'use strict';

/**
 * Scripting.Dictionary.js
 * This Object spoofs the Scripting.Dictionary Object
 * Properties and methods taken from Microsoft documentation
 * https://msdn.microsoft.com/en-us/library/x4k5wbx4(v=vs.84).aspx
 */

var ScriptingDictionary = function() {
    // Default properties
    this.Count = null;
    this.Item  = null;
    this.Key   = null;
    this.CompareMode = null;
}

// https://msdn.microsoft.com/en-us/library/5h92h863(v=vs.84).aspx
ScriptingDictionary.prototype.Add = function() {

};

// https://msdn.microsoft.com/en-us/library/57hdf10z(v=vs.84).aspx
ScriptingDictionary.prototype.Exists = function() {

};

// https://msdn.microsoft.com/en-us/library/8aet97f2(v=vs.84).aspx
ScriptingDictionary.prototype.Items = function() {

};

// https://msdn.microsoft.com/en-us/library/etzd1tzc(v=vs.84).aspx
ScriptingDictionary.prototype.Keys = function() {

};

// https://msdn.microsoft.com/en-us/library/ywyayk03(v=vs.84).aspx
ScriptingDictionary.prototype.Remove = function() {

};

// https://msdn.microsoft.com/en-us/library/45731e2w(v=vs.84).aspx
ScriptingDictionary.prototype.RemoveAll = function() {

};

module.exports = ScriptingDictionary;
