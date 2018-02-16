class x509enrollment_cobjectid {
    constructor() {
        // string FriendlyName () {get} {set}
        this.FriendlyName = undefined;

        // CERTENROLL_OBJECTID Name () {get}
        this.Name = undefined;

        // string Value () {get}
        this.Value = undefined;

    }

    // string GetAlgorithmName (ObjectIdGroupId, ObjectIdPublicKeyFlags)
    GetAlgorithmName(ObjectIdGroupId, ObjectIdPublicKeyFlags) {

    }

    // void InitializeFromAlgorithmName (ObjectIdGroupId, ObjectIdPublicKeyFlags, Al...
    InitializeFromAlgorithmName() {

    }

    // void InitializeFromName (CERTENROLL_OBJECTID)
    InitializeFromName(CERTENROLL_OBJECTID) {

    }

    // void InitializeFromValue (string)
    InitializeFromValue(string) {

    }

}

module.exports = x509enrollment_cobjectid;

