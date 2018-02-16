class faxcomex_faxserver {
    constructor() {
        // IFaxActivity Activity () {get}
        this.Activity = undefined;

        // FAX_SERVER_APIVERSION_ENUM APIVersion () {get}
        this.APIVersion = undefined;

        // IFaxConfiguration Configuration () {get}
        this.Configuration = undefined;

        // IFaxAccount CurrentAccount () {get}
        this.CurrentAccount = undefined;

        // bool Debug () {get}
        this.Debug = undefined;

        // IFaxAccountSet FaxAccountSet () {get}
        this.FaxAccountSet = undefined;

        // IFaxFolders Folders () {get}
        this.Folders = undefined;

        // IFaxInboundRouting InboundRouting () {get}
        this.InboundRouting = undefined;

        // IFaxLoggingOptions LoggingOptions () {get}
        this.LoggingOptions = undefined;

        // int MajorBuild () {get}
        this.MajorBuild = undefined;

        // int MajorVersion () {get}
        this.MajorVersion = undefined;

        // int MinorBuild () {get}
        this.MinorBuild = undefined;

        // int MinorVersion () {get}
        this.MinorVersion = undefined;

        // IFaxOutboundRouting OutboundRouting () {get}
        this.OutboundRouting = undefined;

        // IFaxReceiptOptions ReceiptOptions () {get}
        this.ReceiptOptions = undefined;

        // FAX_SERVER_EVENTS_TYPE_ENUM RegisteredEvents () {get}
        this.RegisteredEvents = undefined;

        // IFaxSecurity Security () {get}
        this.Security = undefined;

        // IFaxSecurity2 Security2 () {get}
        this.Security2 = undefined;

        // string ServerName () {get}
        this.ServerName = undefined;

    }

    // void Connect (string)
    Connect(string) {

    }

    // void Disconnect ()
    Disconnect() {

    }

    // IFaxDeviceProviders GetDeviceProviders ()
    GetDeviceProviders() {

    }

    // IFaxDevices GetDevices ()
    GetDevices() {

    }

    // Variant GetExtensionProperty (string)
    GetExtensionProperty(string) {

    }

    // void ListenToServerEvents (FAX_SERVER_EVENTS_TYPE_ENUM)
    ListenToServerEvents(FAX_SERVER_EVENTS_TYPE_ENUM) {

    }

    // void RegisterDeviceProvider (string, string, string, string, int)
    RegisterDeviceProvider(string, string, string, string, int) {

    }

    // void RegisterInboundRoutingExtension (string, string, string, Variant)
    RegisterInboundRoutingExtension(string, string, string, Variant) {

    }

    // void SetExtensionProperty (string, Variant)
    SetExtensionProperty(string, Variant) {

    }

    // void UnregisterDeviceProvider (string)
    UnregisterDeviceProvider(string) {

    }

    // void UnregisterInboundRoutingExtension (string)
    UnregisterInboundRoutingExtension(string) {

    }

}

module.exports = faxcomex_faxserver;

