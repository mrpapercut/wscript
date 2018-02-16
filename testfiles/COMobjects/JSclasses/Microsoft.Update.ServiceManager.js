class microsoft_update_servicemanager {
    constructor() {
        // string ClientApplicationID () {get} {set}
        this.ClientApplicationID = undefined;

        // IUpdateServiceCollection Services () {get}
        this.Services = undefined;

    }

    // IUpdateService AddScanPackageService (string, string, int)
    AddScanPackageService(string, string, int) {

    }

    // IUpdateService AddService (string, string)
    AddService(string, string) {

    }

    // IUpdateServiceRegistration AddService2 (string, int, string)
    AddService2(string, int, string) {

    }

    // IUpdateServiceRegistration QueryServiceRegistration (string)
    QueryServiceRegistration(string) {

    }

    // void RegisterServiceWithAU (string)
    RegisterServiceWithAU(string) {

    }

    // void RemoveService (string)
    RemoveService(string) {

    }

    // void SetOption (string, Variant)
    SetOption(string, Variant) {

    }

    // void UnregisterServiceWithAU (string)
    UnregisterServiceWithAU(string) {

    }

}

module.exports = microsoft_update_servicemanager;

