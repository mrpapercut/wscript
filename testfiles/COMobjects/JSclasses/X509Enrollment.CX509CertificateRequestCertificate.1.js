class x509enrollment_cx509certificaterequestcertificate_1 {
    constructor() {
        // string Signature (EncodingType) {get}
        this.Parameterized = undefined;

        // bool AlternateSignatureAlgorithm () {get} {set}
        this.AlternateSignatureAlgorithm = undefined;

        // RequestClientInfoClientId ClientId () {get} {set}
        this.ClientId = undefined;

        // IObjectIds CriticalExtensions () {get}
        this.CriticalExtensions = undefined;

        // ICryptAttributes CryptAttributes () {get}
        this.CryptAttributes = undefined;

        // ICspInformations CspInformations () {get} {set}
        this.CspInformations = undefined;

        // ICspStatuses CspStatuses () {get}
        this.CspStatuses = undefined;

        // X509CertificateEnrollmentContext EnrollmentContext () {get}
        this.EnrollmentContext = undefined;

        // IObjectId HashAlgorithm () {get} {set}
        this.HashAlgorithm = undefined;

        // IX500DistinguishedName Issuer () {get} {set}
        this.Issuer = undefined;

        // string KeyContainerNamePrefix () {get} {set}
        this.KeyContainerNamePrefix = undefined;

        // Date NotAfter () {get} {set}
        this.NotAfter = undefined;

        // Date NotBefore () {get} {set}
        this.NotBefore = undefined;

        // bool NullSigned () {get}
        this.NullSigned = undefined;

        // int ParentWindow () {get} {set}
        this.ParentWindow = undefined;

        // IX509EnrollmentPolicyServer PolicyServer () {get}
        this.PolicyServer = undefined;

        // IX509PrivateKey PrivateKey () {get}
        this.PrivateKey = undefined;

        // IX509PublicKey PublicKey () {get}
        this.PublicKey = undefined;

        // bool ReuseKey () {get}
        this.ReuseKey = undefined;

        // IX509SignatureInformation SignatureInformation () {get}
        this.SignatureInformation = undefined;

        // ISignerCertificate SignerCertificate () {get} {set}
        this.SignerCertificate = undefined;

        // bool Silent () {get} {set}
        this.Silent = undefined;

        // bool SmimeCapabilities () {get} {set}
        this.SmimeCapabilities = undefined;

        // IX500DistinguishedName Subject () {get} {set}
        this.Subject = undefined;

        // bool SuppressDefaults () {get} {set}
        this.SuppressDefaults = undefined;

        // IObjectIds SuppressOids () {get}
        this.SuppressOids = undefined;

        // IX509CertificateTemplate Template () {get}
        this.Template = undefined;

        // IObjectId TemplateObjectId () {get}
        this.TemplateObjectId = undefined;

        // X509RequestType Type () {get}
        this.Type = undefined;

        // string UIContextMessage () {get} {set}
        this.UIContextMessage = undefined;

        // IX509Extensions X509Extensions () {get}
        this.X509Extensions = undefined;

    }

    // void CheckPublicKeySignature (IX509PublicKey)
    CheckPublicKeySignature(IX509PublicKey) {

    }

    // void CheckSignature (Pkcs10AllowedSignatureTypes)
    CheckSignature(Pkcs10AllowedSignatureTypes) {

    }

    // void Encode ()
    Encode() {

    }

    // ICspStatuses GetCspStatuses (X509KeySpec)
    GetCspStatuses(X509KeySpec) {

    }

    // IX509CertificateRequest GetInnerRequest (InnerRequestLevel)
    GetInnerRequest(InnerRequestLevel) {

    }

    // void Initialize (X509CertificateEnrollmentContext)
    Initialize(X509CertificateEnrollmentContext) {

    }

    // void InitializeDecode (string, EncodingType)
    InitializeDecode(string, EncodingType) {

    }

    // void InitializeFromCertificate (X509CertificateEnrollmentCont...
    InitializeFromCertificate() {

    }

    // void InitializeFromPrivateKey (X509CertificateEnrollmentConte...
    InitializeFromPrivateKey() {

    }

    // void InitializeFromPrivateKeyTemplate (X509CertificateEnrollm...
    InitializeFromPrivateKeyTemplate() {

    }

    // void InitializeFromPublicKey (X509CertificateEnrollmentContex...
    InitializeFromPublicKey() {

    }

    // void InitializeFromTemplate (X509CertificateEnrollmentContext...
    InitializeFromTemplate() {

    }

    // void InitializeFromTemplateName (X509CertificateEnrollmentCon...
    InitializeFromTemplateName() {

    }

    // bool IsSmartCard ()
    IsSmartCard() {

    }

    // void ResetForEncode ()
    ResetForEncode() {

    }

}

module.exports = x509enrollment_cx509certificaterequestcertificate_1;

