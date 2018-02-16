class x509enrollment_ccspstatus {
    constructor() {
        // ICspAlgorithm CspAlgorithm () {get}
        this.CspAlgorithm = undefined;

        // ICspInformation CspInformation () {get}
        this.CspInformation = undefined;

        // string DisplayName () {get}
        this.DisplayName = undefined;

        // IX509EnrollmentStatus EnrollmentStatus () {get}
        this.EnrollmentStatus = undefined;

        // int Ordinal () {get} {set}
        this.Ordinal = undefined;

    }

    // void Initialize (ICspInformation, ICspAlgorithm)
    Initialize(ICspInformation, ICspAlgorithm) {

    }

}

module.exports = x509enrollment_ccspstatus;

