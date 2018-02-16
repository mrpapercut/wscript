class x509enrollment_cx509extensiontemplate {
    constructor() {
        // string RawData (EncodingType) {get}
        this.Parameterized = undefined;

        // bool Critical () {get} {set}
        this.Critical = undefined;

        // int MajorVersion () {get}
        this.MajorVersion = undefined;

        // int MinorVersion () {get}
        this.MinorVersion = undefined;

        // IObjectId ObjectId () {get}
        this.ObjectId = undefined;

        // IObjectId TemplateOid () {get}
        this.TemplateOid = undefined;

    }

    // void Initialize (IObjectId, EncodingType, string)
    Initialize(IObjectId, EncodingType, string) {

    }

    // void InitializeDecode (EncodingType, string)
    InitializeDecode(EncodingType, string) {

    }

    // void InitializeEncode (IObjectId, int, int)
    InitializeEncode(IObjectId, int, int) {

    }

}

module.exports = x509enrollment_cx509extensiontemplate;

