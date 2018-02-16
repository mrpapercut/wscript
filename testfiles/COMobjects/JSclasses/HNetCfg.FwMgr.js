class hnetcfg_fwmgr {
    constructor() {
        // NET_FW_PROFILE_TYPE_ CurrentProfileType () {get}
        this.CurrentProfileType = undefined;

        // INetFwPolicy LocalPolicy () {get}
        this.LocalPolicy = undefined;

    }

    // void IsIcmpTypeAllowed (NET_FW_IP_VERSION_, string, byte, Variant, Variant)
    IsIcmpTypeAllowed(NET_FW_IP_VERSION_, string, byte, Variant, Variant) {

    }

    // void IsPortAllowed (string, NET_FW_IP_VERSION_, int, string, NET_FW_IP_PROTOCOL_, Vari...
    IsPortAllowed() {

    }

    // void RestoreDefaults ()
    RestoreDefaults() {

    }

}

module.exports = hnetcfg_fwmgr;

