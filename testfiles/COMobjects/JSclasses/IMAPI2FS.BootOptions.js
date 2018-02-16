class imapi2fs_bootoptions {
    constructor() {
        // IStream BootImage () {get}
        this.BootImage = undefined;

        // EmulationType Emulation () {get} {set}
        this.Emulation = undefined;

        // uint ImageSize () {get}
        this.ImageSize = undefined;

        // string Manufacturer () {get} {set}
        this.Manufacturer = undefined;

        // PlatformId PlatformId () {get} {set}
        this.PlatformId = undefined;

    }

    // void AssignBootImage (IStream)
    AssignBootImage(IStream) {

    }

}

module.exports = imapi2fs_bootoptions;

