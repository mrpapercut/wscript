class x509enrollment_cx509certificaterequestpkcs10 {
    constructor() {
        // string Signature (EncodingType) {get}
        this.Parameterized = undefined;

        // bool AlternateSignatureAlgorithm () {get} {set}
        this.AlternateSignatureAlgorithm = undefined;

        // bool AttestPrivateKey () {get} {set}
        this.AttestPrivateKey = undefined;

        // bool AttestPrivateKeyPreferred () {get} {set}
        this.AttestPrivateKeyPreferred = undefined;

        // string ChallengePassword () {get} {set}
        this.ChallengePassword = undefined;

        // KeyAttestationClaimType ClaimType () {get} {set}
        this.ClaimType = undefined;

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

        // IObjectId EncryptionAlgorithm () {get} {set}
        this.EncryptionAlgorithm = undefined;

        // int EncryptionStrength () {get} {set}
        this.EncryptionStrength = undefined;

        // X509CertificateEnrollmentContext EnrollmentContext () {get}
        this.EnrollmentContext = undefined;

        // IObjectId HashAlgorithm () {get} {set}
        this.HashAlgorithm = undefined;

        // string KeyContainerNamePrefix () {get} {set}
        this.KeyContainerNamePrefix = undefined;

        // IX509NameValuePairs NameValuePairs () {get}
        this.NameValuePairs = undefined;

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

    // void InitializeFromPublicKeyTemplate (X509CertificateEnrollme...
    InitializeFromPublicKeyTemplate() {

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

module.exports = x509enrollment_cx509certificaterequestpkcs10;

