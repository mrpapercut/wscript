class rdpcorets_wrdsprotocolmanager {
    constructor() {
        // IRDPSRAPIApplicationFilter ApplicationFilter () {get}
        this.ApplicationFilter = undefined;

        // IRDPSRAPIAttendeeManager Attendees () {get}
        this.Attendees = undefined;

        // int colordepth () {get} {set}
        this.colordepth = undefined;

        // IRDPSRAPIFrameBuffer FrameBuffer () {get}
        this.FrameBuffer = undefined;

        // IRDPSRAPIInvitationManager Invitations () {get}
        this.Invitations = undefined;

        // IRDPSRAPISessionProperties Properties () {get}
        this.Properties = undefined;

        // IRDPSRAPIVirtualChannelManager VirtualChannelManager () {get}
        this.VirtualChannelManager = undefined;

    }

    // void Close ()
    Close() {

    }

    // void ConnectToClient (string)
    ConnectToClient(string) {

    }

    // void ConnectUsingTransportStream (IRDPSRAPITransportStream, string, string)
    ConnectUsingTransportStream(IRDPSRAPITransportStream, string, string) {

    }

    // void GetDesktopSharedRect (int, int, int, int)
    GetDesktopSharedRect(int, int, int, int) {

    }

    // void Open ()
    Open() {

    }

    // void Pause ()
    Pause() {

    }

    // void Resume ()
    Resume() {

    }

    // void SendControlLevelChangeResponse (IRDPSRAPIAttendee, CTRL_LEVEL, int)
    SendControlLevelChangeResponse(IRDPSRAPIAttendee, CTRL_LEVEL, int) {

    }

    // void SetDesktopSharedRect (int, int, int, int)
    SetDesktopSharedRect(int, int, int, int) {

    }

}

module.exports = rdpcorets_wrdsprotocolmanager;

