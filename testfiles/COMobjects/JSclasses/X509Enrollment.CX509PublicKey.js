class x509enrollment_cx509publickey {
    constructor() {
        // string EncodedParameters (EncodingType) {get}
        this.Parameterized = undefined;

        // IObjectId Algorithm () {get}
        this.Algorithm = undefined;

        // int Length () {get}
        this.Length = undefined;

    }

    // string ComputeKeyIdentifier (KeyIdentifierHashAlgorithm, En...
    ComputeKeyIdentifier() {

    }

    // void Initialize (IObjectId, string, string, EncodingType)
    Initialize(IObjectId, string, string, EncodingType) {

    }

    // void InitializeFromEncodedPublicKeyInfo (string, EncodingType)
    InitializeFromEncodedPublicKeyInfo(string, EncodingType) {

    }

}

module.exports = x509enrollment_cx509publickey;

