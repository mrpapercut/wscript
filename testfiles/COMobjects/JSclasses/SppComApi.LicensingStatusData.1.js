class sppcomapi_licensingstatusdata_1 {
    constructor() {
        // string WGAUrl (int, tagLICENSINGSTATUS) {get}
        this.Parameterized = undefined;

        // tagE_LICENSING_CHANNEL ActiveLicenseChannel () {get}
        this.ActiveLicenseChannel = undefined;

        // string DefaultKeyFromRegistry () {get}
        this.DefaultKeyFromRegistry = undefined;

        // bool IsAtWinlogon () {get}
        this.IsAtWinlogon = undefined;

        // bool IsLocalGenuine () {get}
        this.IsLocalGenuine = undefined;

        // int IsTimebasedKeyInstalled () {get}
        this.IsTimebasedKeyInstalled = undefined;

        // bool IsWinlogonNotificationProcess () {get}
        this.IsWinlogonNotificationProcess = undefined;

        // ILicensingStatusData LicensingState () {get}
        this.LicensingState = undefined;

        // Date LicensingSystemDate () {get}
        this.LicensingSystemDate = undefined;

        // tagNOTIFICATIONPOLICYSTATUS NotificationPolicy () {get}
        this.NotificationPolicy = undefined;

        // string ProductKeyType () {get}
        this.ProductKeyType = undefined;

        // tagSYSTEM_STATE_FLAGS SystemStateFlags () {get}
        this.SystemStateFlags = undefined;

    }

    // void ConsumeWindowsRight (uint)
    ConsumeWindowsRight(uint) {

    }

    // void FireStateChanged ()
    FireStateChanged() {

    }

    // void InstallProofOfPurchase (string)
    InstallProofOfPurchase(string) {

    }

}

module.exports = sppcomapi_licensingstatusdata_1;

