class x509enrollment_cx509certificaterequestpkcs7_1 {
    constructor() {
        // string RenewalCertificate (EncodingType) {get} {set}
        this.Parameterized = undefined;

        // bool AlternateSignatureAlgorithm () {get} {set}
        this.AlternateSignatureAlgorithm = undefined;

        // RequestClientInfoClientId ClientId () {get} {set}
        this.ClientId = undefined;

        // ICspInformations CspInformations () {get} {set}
        this.CspInformations = undefined;

        // X509CertificateEnrollmentContext EnrollmentContext () {get}
        this.EnrollmentContext = undefined;

        // IObjectId HashAlgorithm () {get} {set}
        this.HashAlgorithm = undefined;

        // int ParentWindow () {get} {set}
        this.ParentWindow = undefined;

        // IX509EnrollmentPolicyServer PolicyServer () {get}
        this.PolicyServer = undefined;

        // string RequesterName () {get} {set}
        this.RequesterName = undefined;

        // ISignerCertificate SignerCertificate () {get} {set}
        this.SignerCertificate = undefined;

        // bool Silent () {get} {set}
        this.Silent = undefined;

        // bool SuppressDefaults () {get} {set}
        this.SuppressDefaults = undefined;

        // IX509CertificateTemplate Template () {get}
        this.Template = undefined;

        // X509RequestType Type () {get}
        this.Type = undefined;

        // string UIContextMessage () {get} {set}
        this.UIContextMessage = undefined;

    }

    // void CheckCertificateSignature (bool)
    CheckCertificateSignature(bool) {

    }

    // void Encode ()
    Encode() {

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

    // void InitializeFromCertificate (X509CertificateEnrollmentContext, ...
    InitializeFromCertificate() {

    }

    // void InitializeFromInnerRequest (IX509CertificateRequest)
    InitializeFromInnerRequest(IX509CertificateRequest) {

    }

    // void InitializeFromTemplate (X509CertificateEnrollmentContext, IX5...
    InitializeFromTemplate() {

    }

    // void InitializeFromTemplateName (X509CertificateEnrollmentContext,...
    InitializeFromTemplateName() {

    }

    // void ResetForEncode ()
    ResetForEncode() {

    }

}

module.exports = x509enrollment_cx509certificaterequestpkcs7_1;

