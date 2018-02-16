class msvidctl_msvidencoder {
    constructor() {
        // IUnknown AudioEncoderInterface () {get}
        this.AudioEncoderInterface = undefined;

        // string Category () {get}
        this.Category = undefined;

        // string ClassID () {get}
        this.ClassID = undefined;

        // string Name () {get}
        this.Name = undefined;

        // bool Power () {get} {set}
        this.Power = undefined;

        // int Status () {get}
        this.Status = undefined;

        // IUnknown VideoEncoderInterface () {get}
        this.VideoEncoderInterface = undefined;

    }

    // bool IsEqualDevice (IMSVidDevice)
    IsEqualDevice(IMSVidDevice) {

    }

}

module.exports = msvidctl_msvidencoder;

