class microsoft_diskquota {
    constructor() {
        // double DefaultQuotaLimit () {get} {set}
        this.DefaultQuotaLimit = undefined;

        // string DefaultQuotaLimitText () {get}
        this.DefaultQuotaLimitText = undefined;

        // double DefaultQuotaThreshold () {get} {set}
        this.DefaultQuotaThreshold = undefined;

        // string DefaultQuotaThresholdText () {get}
        this.DefaultQuotaThresholdText = undefined;

        // bool LogQuotaLimit () {get} {set}
        this.LogQuotaLimit = undefined;

        // bool LogQuotaThreshold () {get} {set}
        this.LogQuotaThreshold = undefined;

        // bool QuotaFileIncomplete () {get}
        this.QuotaFileIncomplete = undefined;

        // bool QuotaFileRebuilding () {get}
        this.QuotaFileRebuilding = undefined;

        // QuotaStateConstants QuotaState () {get} {set}
        this.QuotaState = undefined;

        // UserNameResolutionConstants UserNameResolution () {get} {set}
        this.UserNameResolution = undefined;

    }

    // DIDiskQuotaUser AddUser (string)
    AddUser(string) {

    }

    // void DeleteUser (DIDiskQuotaUser)
    DeleteUser(DIDiskQuotaUser) {

    }

    // DIDiskQuotaUser FindUser (string)
    FindUser(string) {

    }

    // void GiveUserNameResolutionPriority (DIDiskQuotaUser)
    GiveUserNameResolutionPriority(DIDiskQuotaUser) {

    }

    // void Initialize (string, bool)
    Initialize(string, bool) {

    }

    // void InvalidateSidNameCache ()
    InvalidateSidNameCache() {

    }

    // void ShutdownNameResolution ()
    ShutdownNameResolution() {

    }

    // string TranslateLogonNameToSID (string)
    TranslateLogonNameToSID(string) {

    }

    // IDispatch _NewEnum ()
    _NewEnum() {

    }

}

module.exports = microsoft_diskquota;

