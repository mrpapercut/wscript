class imapi2_msftdiscformat2trackatonce_1 {
    constructor() {
        // bool BufferUnderrunFreeDisabled () {get} {set}
        this.BufferUnderrunFreeDisabled = undefined;

        // string ClientName () {get} {set}
        this.ClientName = undefined;

        // IMAPI_MEDIA_PHYSICAL_TYPE CurrentPhysicalMediaType () {get}
        this.CurrentPhysicalMediaType = undefined;

        // bool CurrentRotationTypeIsPureCAV () {get}
        this.CurrentRotationTypeIsPureCAV = undefined;

        // int CurrentWriteSpeed () {get}
        this.CurrentWriteSpeed = undefined;

        // bool DoNotFinalizeMedia () {get} {set}
        this.DoNotFinalizeMedia = undefined;

        // SAFEARRAY(Variant) ExpectedTableOfContents () {get}
        this.ExpectedTableOfContents = undefined;

        // int FreeSectorsOnMedia () {get}
        this.FreeSectorsOnMedia = undefined;

        // bool MediaHeuristicallyBlank () {get}
        this.MediaHeuristicallyBlank = undefined;

        // bool MediaPhysicallyBlank () {get}
        this.MediaPhysicallyBlank = undefined;

        // int NumberOfExistingTracks () {get}
        this.NumberOfExistingTracks = undefined;

        // IDiscRecorder2 Recorder () {get} {set}
        this.Recorder = undefined;

        // bool RequestedRotationTypeIsPureCAV () {get}
        this.RequestedRotationTypeIsPureCAV = undefined;

        // int RequestedWriteSpeed () {get}
        this.RequestedWriteSpeed = undefined;

        // SAFEARRAY(Variant) SupportedMediaTypes () {get}
        this.SupportedMediaTypes = undefined;

        // SAFEARRAY(Variant) SupportedWriteSpeedDescriptors () {get}
        this.SupportedWriteSpeedDescriptors = undefined;

        // SAFEARRAY(Variant) SupportedWriteSpeeds () {get}
        this.SupportedWriteSpeeds = undefined;

        // int TotalSectorsOnMedia () {get}
        this.TotalSectorsOnMedia = undefined;

        // int UsedSectorsOnMedia () {get}
        this.UsedSectorsOnMedia = undefined;

    }

    // void AddAudioTrack (IStream)
    AddAudioTrack(IStream) {

    }

    // void CancelAddTrack ()
    CancelAddTrack() {

    }

    // bool IsCurrentMediaSupported (IDiscRecorder2)
    IsCurrentMediaSupported(IDiscRecorder2) {

    }

    // bool IsRecorderSupported (IDiscRecorder2)
    IsRecorderSupported(IDiscRecorder2) {

    }

    // void PrepareMedia ()
    PrepareMedia() {

    }

    // void ReleaseMedia ()
    ReleaseMedia() {

    }

    // void SetWriteSpeed (int, bool)
    SetWriteSpeed(int, bool) {

    }

}

module.exports = imapi2_msftdiscformat2trackatonce_1;

