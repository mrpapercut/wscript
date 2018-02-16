class upnp_upnpservice {
    constructor() {
        // string Id () {get}
        this.Id = undefined;

        // int LastTransportStatus () {get}
        this.LastTransportStatus = undefined;

        // string ServiceTypeIdentifier () {get}
        this.ServiceTypeIdentifier = undefined;

    }

    // void AddCallback (IUnknown)
    AddCallback(IUnknown) {

    }

    // Variant InvokeAction (string, Variant, Variant)
    InvokeAction(string, Variant, Variant) {

    }

    // Variant QueryStateVariable (string)
    QueryStateVariable(string) {

    }

}

module.exports = upnp_upnpservice;

