class search_gathermgr {
    constructor() {
        // ISearchAccessList AccessList () {get}
        this.AccessList = undefined;

        // string ByPassList () {get}
        this.ByPassList = undefined;

        // int ConnectTimeout () {get} {set}
        this.ConnectTimeout = undefined;

        // string DataPath () {get}
        this.DataPath = undefined;

        // int DataTimeout () {get} {set}
        this.DataTimeout = undefined;

        // string DefaultAccountName () {get}
        this.DefaultAccountName = undefined;

        // string DefaultApplicationsPath () {get} {set}
        this.DefaultApplicationsPath = undefined;

        // string DefaultPluginAccountName () {get}
        this.DefaultPluginAccountName = undefined;

        // string ExportPassword () {set}
        this.ExportPassword = undefined;

        // string From () {get} {set}
        this.From = undefined;

        // IGatherApplications GatherApplications () {get}
        this.GatherApplications = undefined;

        // bool IgnoreCertCNError () {get} {set}
        this.IgnoreCertCNError = undefined;

        // string InstallationPath () {get}
        this.InstallationPath = undefined;

        // bool LocalByPassProxy () {get}
        this.LocalByPassProxy = undefined;

        // string LocalStoreAccountName () {get}
        this.LocalStoreAccountName = undefined;

        // int MaxGrowFactor () {get} {set}
        this.MaxGrowFactor = undefined;

        // int PerformanceLevel () {get} {set}
        this.PerformanceLevel = undefined;

        // int PortNumber () {get}
        this.PortNumber = undefined;

        // string ProxyName () {get}
        this.ProxyName = undefined;

        // int RetryLimit () {get} {set}
        this.RetryLimit = undefined;

        // IGatherSiteHits Servers () {get}
        this.Servers = undefined;

        // string TempPath () {get} {set}
        this.TempPath = undefined;

        // short UseProxy () {get}
        this.UseProxy = undefined;

        // string UserAgent () {get} {set}
        this.UserAgent = undefined;

    }

    // void FlushLogsToDW ()
    FlushLogsToDW() {

    }

    // void ForceBackoffTemporarily (uint, int)
    ForceBackoffTemporarily(uint, int) {

    }

    // bool GetBackoffFeatureState (int)
    GetBackoffFeatureState(int) {

    }

    // int GetBackoffParameter (int)
    GetBackoffParameter(int) {

    }

    // int GetBackoffReason ()
    GetBackoffReason() {

    }

    // IDispatch GetProtocolConfigHelper (string)
    GetProtocolConfigHelper(string) {

    }

    // void SetBackoffFeatureState (int, bool)
    SetBackoffFeatureState(int, bool) {

    }

    // void SetBackoffParameter (int, int)
    SetBackoffParameter(int, int) {

    }

    // void SetDefaultAccount (string, string)
    SetDefaultAccount(string, string) {

    }

    // void SetDefaultPluginAccount (string, string)
    SetDefaultPluginAccount(string, string) {

    }

    // void SetLocalStoreAccount (string, string)
    SetLocalStoreAccount(string, string) {

    }

    // void SetProxy (short, bool, int, string, string)
    SetProxy(short, bool, int, string, string) {

    }

    // void TerminateFilterDaemons ()
    TerminateFilterDaemons() {

    }

}

module.exports = search_gathermgr;

