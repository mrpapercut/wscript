class x509enrollment_cx509certificaterequestcmc_1 {
    constructor() {
        // string SenderNonce (EncodingType) {get} {set}
        this.Parameterized = undefined;

        // bool AlternateSignatureAlgorithm () {get} {set}
        this.AlternateSignatureAlgorithm = undefined;

        // bool ArchivePrivateKey () {get} {set}
        this.ArchivePrivateKey = undefined;

        // RequestClientInfoClientId ClientId () {get} {set}
        this.ClientId = undefined;

        // IObjectIds CriticalExtensions () {get}
        this.CriticalExtensions = undefined;

        // ICryptAttributes CryptAttributes () {get}
        this.CryptAttributes = undefined;

        // ICspInformations CspInformations () {get} {set}
        this.CspInformations = undefined;

        // IObjectId EncryptionAlgorithm () {get} {set}
        this.EncryptionAlgorithm = undefined;

        // int EncryptionStrength () {get} {set}
        this.EncryptionStrength = undefined;

        // X509CertificateEnrollmentContext EnrollmentContext () {...
        this.EnrollmentContext = undefined;

        // IObjectId HashAlgorithm () {get} {set}
        this.HashAlgorithm = undefined;

        // IX509NameValuePairs NameValuePairs () {get}
        this.NameValuePairs = undefined;

        // bool NullSigned () {get}
        this.NullSigned = undefined;

        // int ParentWindow () {get} {set}
        this.ParentWindow = undefined;

        // IX509EnrollmentPolicyServer PolicyServer () {get}
        this.PolicyServer = undefined;

        // string RequesterName () {get} {set}
        this.RequesterName = undefined;

        // IX509SignatureInformation SignatureInformation () {get}
        this.SignatureInformation = undefined;

        // ISignerCertificate SignerCertificate () {get} {set}
        this.SignerCertificate = undefined;

        // ISignerCertificates SignerCertificates () {get}
        this.SignerCertificates = undefined;

        // bool Silent () {get} {set}
        this.Silent = undefined;

        // bool SuppressDefaults () {get} {set}
        this.SuppressDefaults = undefined;

        // IObjectIds SuppressOids () {get}
        this.SuppressOids = undefined;

        // IX509CertificateTemplate Template () {get}
        this.Template = undefined;

        // IObjectId TemplateObjectId () {get}
        this.TemplateObjectId = undefined;

        // int TransactionId () {get} {set}
        this.TransactionId = undefined;

        // X509RequestType Type () {get}
        this.Type = undefined;

        // string UIContextMessage () {get} {set}
        this.UIContextMessage = undefined;

        // IX509Extensions X509Extensions () {get}
        this.X509Extensions = undefined;

    }

    // void CheckCertificateSignature (ISignerCertificate, bool)
    CheckCertificateSignature(ISignerCertificate, bool) {

    }

    // void CheckSignature (Pkcs10AllowedSignatureTypes)
    CheckSignature(Pkcs10AllowedSignatureTypes) {

    }

    // void Encode ()
    Encode() {

    }

    // IX509CertificateRequest GetInnerRequest (InnerRequestLe...
    GetInnerRequest() {

    }

    // void Initialize (X509CertificateEnrollmentContext)
    Initialize(X509CertificateEnrollmentContext) {

    }

    // void InitializeDecode (string, EncodingType)
    InitializeDecode(string, EncodingType) {

    }

    // void InitializeFromCertificate (X509CertificateEnrollme...
    InitializeFromCertificate() {

    }

    // void InitializeFromInnerRequest (IX509CertificateRequest)
    InitializeFromInnerRequest(IX509CertificateRequest) {

    }

    // void InitializeFromInnerRequestTemplate (IX509Certifica...
    InitializeFromInnerRequestTemplate() {

    }

    // void InitializeFromInnerRequestTemplateName (IX509Certi...
    InitializeFromInnerRequestTemplateName() {

    }

    // void InitializeFromTemplate (X509CertificateEnrollmentC...
    InitializeFromTemplate() {

    }

    // void InitializeFromTemplateName (X509CertificateEnrollm...
    InitializeFromTemplateName() {

    }

    // void ResetForEncode ()
    ResetForEncode() {

    }

}

module.exports = x509enrollment_cx509certificaterequestcmc_1;

