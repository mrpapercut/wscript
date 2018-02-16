class x509enrollment_cx509certificaterevocationlistentry_1 {
    constructor() {
        // string SerialNumber (EncodingType) {get}
        this.Parameterized = undefined;

        // IObjectIds CriticalExtensions () {get}
        this.CriticalExtensions = undefined;

        // Date RevocationDate () {get}
        this.RevocationDate = undefined;

        // CRLRevocationReason RevocationReason () {get} {set}
        this.RevocationReason = undefined;

        // IX509Extensions X509Extensions () {get}
        this.X509Extensions = undefined;

    }

    // void Initialize (EncodingType, string, Date)
    Initialize(EncodingType, string, Date) {

    }

}

module.exports = x509enrollment_cx509certificaterevocationlistentry_1;

