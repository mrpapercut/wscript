class hnetcfg_fwrule {
    constructor() {
        // NET_FW_ACTION_ Action () {get} {set}
        this.Action = undefined;

        // string ApplicationName () {get} {set}
        this.ApplicationName = undefined;

        // string Description () {get} {set}
        this.Description = undefined;

        // NET_FW_RULE_DIRECTION_ Direction () {get} {set}
        this.Direction = undefined;

        // bool EdgeTraversal () {get} {set}
        this.EdgeTraversal = undefined;

        // int EdgeTraversalOptions () {get} {set}
        this.EdgeTraversalOptions = undefined;

        // bool Enabled () {get} {set}
        this.Enabled = undefined;

        // string Grouping () {get} {set}
        this.Grouping = undefined;

        // string IcmpTypesAndCodes () {get} {set}
        this.IcmpTypesAndCodes = undefined;

        // Variant Interfaces () {get} {set}
        this.Interfaces = undefined;

        // string InterfaceTypes () {get} {set}
        this.InterfaceTypes = undefined;

        // string LocalAddresses () {get} {set}
        this.LocalAddresses = undefined;

        // string LocalAppPackageId () {get} {set}
        this.LocalAppPackageId = undefined;

        // string LocalPorts () {get} {set}
        this.LocalPorts = undefined;

        // string LocalUserAuthorizedList () {get} {set}
        this.LocalUserAuthorizedList = undefined;

        // string LocalUserOwner () {get} {set}
        this.LocalUserOwner = undefined;

        // string Name () {get} {set}
        this.Name = undefined;

        // int Profiles () {get} {set}
        this.Profiles = undefined;

        // int Protocol () {get} {set}
        this.Protocol = undefined;

        // string RemoteAddresses () {get} {set}
        this.RemoteAddresses = undefined;

        // string RemoteMachineAuthorizedList () {get} {set}
        this.RemoteMachineAuthorizedList = undefined;

        // string RemotePorts () {get} {set}
        this.RemotePorts = undefined;

        // string RemoteUserAuthorizedList () {get} {set}
        this.RemoteUserAuthorizedList = undefined;

        // int SecureFlags () {get} {set}
        this.SecureFlags = undefined;

        // string serviceName () {get} {set}
        this.serviceName = undefined;

    }

}

module.exports = hnetcfg_fwrule;

