class wscript_network {
    constructor() {
        // string ComputerName () {get}
        this.ComputerName = undefined;

        // string Organization () {get}
        this.Organization = undefined;

        // string Site () {get}
        this.Site = undefined;

        // string UserDomain () {get}
        this.UserDomain = undefined;

        // string UserName () {get}
        this.UserName = undefined;

        // string UserProfile () {get}
        this.UserProfile = undefined;

    }

    // void AddPrinterConnection (string, string, Variant, Variant, Variant)
    AddPrinterConnection(string, string, Variant, Variant, Variant) {

    }

    // void AddWindowsPrinterConnection (string, string, string)
    AddWindowsPrinterConnection(string, string, string) {

    }

    // IWshCollection EnumNetworkDrives ()
    EnumNetworkDrives() {

    }

    // IWshCollection EnumPrinterConnections ()
    EnumPrinterConnections() {

    }

    // void MapNetworkDrive (string, string, Variant, Variant, Variant)
    MapNetworkDrive(string, string, Variant, Variant, Variant) {

    }

    // void RemoveNetworkDrive (string, Variant, Variant)
    RemoveNetworkDrive(string, Variant, Variant) {

    }

    // void RemovePrinterConnection (string, Variant, Variant)
    RemovePrinterConnection(string, Variant, Variant) {

    }

    // void SetDefaultPrinter (string)
    SetDefaultPrinter(string) {

    }

}

module.exports = wscript_network;

