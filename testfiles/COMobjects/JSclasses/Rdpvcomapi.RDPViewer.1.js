class rdpvcomapi_rdpviewer_1 {
    constructor() {
        // IRDPSRAPIApplicationFilter ApplicationFilter () {get}
        this.ApplicationFilter = undefined;

        // IRDPSRAPIAttendeeManager Attendees () {get}
        this.Attendees = undefined;

        // string DisconnectedText () {get} {set}
        this.DisconnectedText = undefined;

        // IRDPSRAPIInvitationManager Invitations () {get}
        this.Invitations = undefined;

        // IRDPSRAPISessionProperties Properties () {get}
        this.Properties = undefined;

        // bool SmartSizing () {get} {set}
        this.SmartSizing = undefined;

        // IRDPSRAPIVirtualChannelManager VirtualChannelManager () {get}
        this.VirtualChannelManager = undefined;

    }

    // void Connect (string, string, string)
    Connect(string, string, string) {

    }

    // void Disconnect ()
    Disconnect() {

    }

    // void RequestColorDepthChange (int)
    RequestColorDepthChange(int) {

    }

    // void RequestControl (CTRL_LEVEL)
    RequestControl(CTRL_LEVEL) {

    }

    // string StartReverseConnectListener (string, string, string)
    StartReverseConnectListener(string, string, string) {

    }

}

module.exports = rdpvcomapi_rdpviewer_1;

