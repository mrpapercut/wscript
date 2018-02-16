class imapi2_msftdiscformat2erase {
    constructor() {
        // string ClientName () {get} {set}
        this.ClientName = undefined;

        // IMAPI_MEDIA_PHYSICAL_TYPE CurrentPhysicalMediaType () {get}
        this.CurrentPhysicalMediaType = undefined;

        // bool FullErase () {get} {set}
        this.FullErase = undefined;

        // bool MediaHeuristicallyBlank () {get}
        this.MediaHeuristicallyBlank = undefined;

        // bool MediaPhysicallyBlank () {get}
        this.MediaPhysicallyBlank = undefined;

        // IDiscRecorder2 Recorder () {get} {set}
        this.Recorder = undefined;

        // SAFEARRAY(Variant) SupportedMediaTypes () {get}
        this.SupportedMediaTypes = undefined;

    }

    // void EraseMedia ()
    EraseMedia() {

    }

    // bool IsCurrentMediaSupported (IDiscRecorder2)
    IsCurrentMediaSupported(IDiscRecorder2) {

    }

    // bool IsRecorderSupported (IDiscRecorder2)
    IsRecorderSupported(IDiscRecorder2) {

    }

}

module.exports = imapi2_msftdiscformat2erase;

