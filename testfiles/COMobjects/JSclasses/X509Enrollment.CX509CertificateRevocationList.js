class x509enrollment_cx509certificaterevocationlist {
    constructor() {
        // string Signature (EncodingType) {get}
        this.Parameterized = undefined;

        // bool AlternateSignatureAlgorithm () {get} {set}
        this.AlternateSignatureAlgorithm = undefined;

        // bool BaseCRL () {get}
        this.BaseCRL = undefined;

        // int CAVersion () {get} {set}
        this.CAVersion = undefined;

        // IObjectIds CriticalExtensions () {get}
        this.CriticalExtensions = undefined;

        // IObjectId HashAlgorithm () {get} {set}
        this.HashAlgorithm = undefined;

        // IX500DistinguishedName Issuer () {get} {set}
        this.Issuer = undefined;

        // Date NextUpdate () {get} {set}
        this.NextUpdate = undefined;

        // bool NullSigned () {get}
        this.NullSigned = undefined;

        // IX509SignatureInformation SignatureInformation () {get}
        this.SignatureInformation = undefined;

        // ISignerCertificate SignerCertificate () {get} {set}
        this.SignerCertificate = undefined;

        // Date ThisUpdate () {get} {set}
        this.ThisUpdate = undefined;

        // IX509CertificateRevocationListEntries X509CRLEntries () {get}
        this.X509CRLEntries = undefined;

        // IX509Extensions X509Extensions () {get}
        this.X509Extensions = undefined;

    }

    // void CheckPublicKeySignature (IX509PublicKey)
    CheckPublicKeySignature(IX509PublicKey) {

    }

    // void CheckSignature ()
    CheckSignature() {

    }

    // void Encode ()
    Encode() {

    }

    // void Initialize ()
    Initialize() {

    }

    // void InitializeDecode (string, EncodingType)
    InitializeDecode(string, EncodingType) {

    }

    // void ResetForEncode ()
    ResetForEncode() {

    }

}

module.exports = x509enrollment_cx509certificaterevocationlist;

