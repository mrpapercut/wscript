class x509enrollment_cx509extensionalternativenames {
    constructor() {
        // string RawData (EncodingType) {get}
        this.Parameterized = undefined;

        // IAlternativeNames AlternativeNames () {get}
        this.AlternativeNames = undefined;

        // bool Critical () {get} {set}
        this.Critical = undefined;

        // IObjectId ObjectId () {get}
        this.ObjectId = undefined;

    }

    // void Initialize (IObjectId, EncodingType, string)
    Initialize(IObjectId, EncodingType, string) {

    }

    // void InitializeDecode (EncodingType, string)
    InitializeDecode(EncodingType, string) {

    }

    // void InitializeEncode (IAlternativeNames)
    InitializeEncode(IAlternativeNames) {

    }

}

module.exports = x509enrollment_cx509extensionalternativenames;

