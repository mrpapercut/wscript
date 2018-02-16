class x509enrollment_cx509enrollment {
    constructor() {
        // string Response (EncodingType) {get}
        this.Parameterized = undefined;

        // string CAConfigString () {get}
        this.CAConfigString = undefined;

        // string CertificateDescription () {get} {set}
        this.CertificateDescription = undefined;

        // string CertificateFriendlyName () {get} {set}
        this.CertificateFriendlyName = undefined;

        // X509CertificateEnrollmentContext EnrollmentContext () {get}
        this.EnrollmentContext = undefined;

        // IX509NameValuePairs NameValuePairs () {get}
        this.NameValuePairs = undefined;

        // int ParentWindow () {get} {set}
        this.ParentWindow = undefined;

        // IX509EnrollmentPolicyServer PolicyServer () {get}
        this.PolicyServer = undefined;

        // IX509CertificateRequest Request () {get}
        this.Request = undefined;

        // int RequestId () {get}
        this.RequestId = undefined;

        // string RequestIdString () {get}
        this.RequestIdString = undefined;

        // bool Silent () {get} {set}
        this.Silent = undefined;

        // IX509EnrollmentStatus Status () {get}
        this.Status = undefined;

        // IX509CertificateTemplate Template () {get}
        this.Template = undefined;

    }

    // string CreatePFX (string, PFXExportOptions, EncodingType)
    CreatePFX(string, PFXExportOptions, EncodingType) {

    }

    // string CreateRequest (EncodingType)
    CreateRequest(EncodingType) {

    }

    // void Enroll ()
    Enroll() {

    }

    // void Initialize (X509CertificateEnrollmentContext)
    Initialize(X509CertificateEnrollmentContext) {

    }

    // void InitializeFromRequest (IX509CertificateRequest)
    InitializeFromRequest(IX509CertificateRequest) {

    }

    // void InitializeFromTemplate (X509CertificateEnrollmentContext, IX50...
    InitializeFromTemplate() {

    }

    // void InitializeFromTemplateName (X509CertificateEnrollmentContext, ...
    InitializeFromTemplateName() {

    }

    // void InstallResponse (InstallResponseRestrictionFlags, string, Enco...
    InstallResponse() {

    }

    // void InstallResponse2 (InstallResponseRestrictionFlags, string, Enc...
    InstallResponse2() {

    }

}

module.exports = x509enrollment_cx509enrollment;

