class sppcomapi_licensingstatetools_1 {
    constructor() {
        // string WGAUrl (int, tagLICENSINGSTATUS) {get}
        this.Parameterized = undefined;

        // tagE_LICENSING_CHANNEL ActiveLicenseChannel () {get}
        this.ActiveLicenseChannel = undefined;

        // string DefaultKeyFromRegistry () {get}
        this.DefaultKeyFromRegistry = undefined;

        // bool IsLocalGenuine () {get}
        this.IsLocalGenuine = undefined;

        // int IsTimebasedKeyInstalled () {get}
        this.IsTimebasedKeyInstalled = undefined;

        // ILicensingStatusData LicensingState () {get}
        this.LicensingState = undefined;

        // Date LicensingSystemDate () {get}
        this.LicensingSystemDate = undefined;

        // string ProductKeyType () {get}
        this.ProductKeyType = undefined;

        // tagSYSTEM_STATE_FLAGS SystemStateFlags () {get}
        this.SystemStateFlags = undefined;

    }

    // void ConsumeWindowsRight (uint)
    ConsumeWindowsRight(uint) {

    }

    // void InstallProofOfPurchase (string)
    InstallProofOfPurchase(string) {

    }

}

module.exports = sppcomapi_licensingstatetools_1;

