class sapi_spobjecttoken {
    constructor() {
        // ISpeechObjectTokenCategory Category () {get}
        this.Category = undefined;

        // ISpeechDataKey DataKey () {get}
        this.DataKey = undefined;

        // string Id () {get}
        this.Id = undefined;

    }

    // IUnknown CreateInstance (IUnknown, SpeechTokenContext)
    CreateInstance(IUnknown, SpeechTokenContext) {

    }

    // void DisplayUI (int, string, string, Variant, IUnknown)
    DisplayUI(int, string, string, Variant, IUnknown) {

    }

    // string GetAttribute (string)
    GetAttribute(string) {

    }

    // string GetDescription (int)
    GetDescription(int) {

    }

    // string GetStorageFileName (string, string, string, SpeechTokenShellFolder)
    GetStorageFileName(string, string, string, SpeechTokenShellFolder) {

    }

    // bool IsUISupported (string, Variant, IUnknown)
    IsUISupported(string, Variant, IUnknown) {

    }

    // bool MatchesAttributes (string)
    MatchesAttributes(string) {

    }

    // void Remove (string)
    Remove(string) {

    }

    // void RemoveStorageFileName (string, string, bool)
    RemoveStorageFileName(string, string, bool) {

    }

    // void SetId (string, string, bool)
    SetId(string, string, bool) {

    }

}

module.exports = sapi_spobjecttoken;

