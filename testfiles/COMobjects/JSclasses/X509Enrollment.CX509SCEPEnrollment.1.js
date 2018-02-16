class x509enrollment_cx509scepenrollment_1 {
    constructor() {
        // string TransactionId (EncodingType) {get} {set}
        this.Parameterized = undefined;

        // string ActivityId () {get} {set}
        this.ActivityId = undefined;

        // string CertificateFriendlyName () {get} {set}
        this.CertificateFriendlyName = undefined;

        // DelayRetryAction DelayRetry () {get}
        this.DelayRetry = undefined;

        // X509SCEPFailInfo FailInfo () {get}
        this.FailInfo = undefined;

        // ISignerCertificate OldCertificate () {get} {set}
        this.OldCertificate = undefined;

        // IX509CertificateRequestPkcs10 Request () {get}
        this.Request = undefined;

        // string ResultMessageText () {get}
        this.ResultMessageText = undefined;

        // string ServerCapabilities () {set}
        this.ServerCapabilities = undefined;

        // ISignerCertificate SignerCertificate () {get} {set}
        this.SignerCertificate = undefined;

        // bool Silent () {get} {set}
        this.Silent = undefined;

        // IX509EnrollmentStatus Status () {get}
        this.Status = undefined;

    }

    // string CreateChallengeAnswerMessage (EncodingType)
    CreateChallengeAnswerMessage(EncodingType) {

    }

    // string CreateRequestMessage (EncodingType)
    CreateRequestMessage(EncodingType) {

    }

    // string CreateRetrieveCertificateMessage (X509CertificateEnrol...
    CreateRetrieveCertificateMessage() {

    }

    // string CreateRetrievePendingMessage (EncodingType)
    CreateRetrievePendingMessage(EncodingType) {

    }

    // void DeleteRequest ()
    DeleteRequest() {

    }

    // void Initialize (IX509CertificateRequestPkcs10, string, Encod...
    Initialize() {

    }

    // void InitializeForPending (X509CertificateEnrollmentContext)
    InitializeForPending(X509CertificateEnrollmentContext) {

    }

    // X509SCEPDisposition ProcessResponseMessage (string, EncodingT...
    ProcessResponseMessage() {

    }

    // X509SCEPDisposition ProcessResponseMessage2 (X509SCEPProcessM...
    ProcessResponseMessage2() {

    }

}

module.exports = x509enrollment_cx509scepenrollment_1;

