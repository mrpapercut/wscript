class imapi2_msftdiscformat2data {
    constructor() {
        // bool BufferUnderrunFreeDisabled () {get} {set}
        this.BufferUnderrunFreeDisabled = undefined;

        // string ClientName () {get} {set}
        this.ClientName = undefined;

        // IMAPI_FORMAT2_DATA_MEDIA_STATE CurrentMediaStatus () {get}
        this.CurrentMediaStatus = undefined;

        // IMAPI_MEDIA_PHYSICAL_TYPE CurrentPhysicalMediaType () {get}
        this.CurrentPhysicalMediaType = undefined;

        // bool CurrentRotationTypeIsPureCAV () {get}
        this.CurrentRotationTypeIsPureCAV = undefined;

        // int CurrentWriteSpeed () {get}
        this.CurrentWriteSpeed = undefined;

        // bool DisableConsumerDvdCompatibilityMode () {get} {set}
        this.DisableConsumerDvdCompatibilityMode = undefined;

        // bool ForceMediaToBeClosed () {get} {set}
        this.ForceMediaToBeClosed = undefined;

        // bool ForceOverwrite () {get} {set}
        this.ForceOverwrite = undefined;

        // int FreeSectorsOnMedia () {get}
        this.FreeSectorsOnMedia = undefined;

        // int LastWrittenAddressOfPreviousSession () {get}
        this.LastWrittenAddressOfPreviousSession = undefined;

        // bool MediaHeuristicallyBlank () {get}
        this.MediaHeuristicallyBlank = undefined;

        // bool MediaPhysicallyBlank () {get}
        this.MediaPhysicallyBlank = undefined;

        // SAFEARRAY(Variant) MultisessionInterfaces () {get}
        this.MultisessionInterfaces = undefined;

        // int NextWritableAddress () {get}
        this.NextWritableAddress = undefined;

        // bool PostgapAlreadyInImage () {get} {set}
        this.PostgapAlreadyInImage = undefined;

        // IDiscRecorder2 Recorder () {get} {set}
        this.Recorder = undefined;

        // bool RequestedRotationTypeIsPureCAV () {get}
        this.RequestedRotationTypeIsPureCAV = undefined;

        // int RequestedWriteSpeed () {get}
        this.RequestedWriteSpeed = undefined;

        // int StartAddressOfPreviousSession () {get}
        this.StartAddressOfPreviousSession = undefined;

        // SAFEARRAY(Variant) SupportedMediaTypes () {get}
        this.SupportedMediaTypes = undefined;

        // SAFEARRAY(Variant) SupportedWriteSpeedDescriptors () {get}
        this.SupportedWriteSpeedDescriptors = undefined;

        // SAFEARRAY(Variant) SupportedWriteSpeeds () {get}
        this.SupportedWriteSpeeds = undefined;

        // int TotalSectorsOnMedia () {get}
        this.TotalSectorsOnMedia = undefined;

        // IMAPI_MEDIA_WRITE_PROTECT_STATE WriteProtectStatus () {get}
        this.WriteProtectStatus = undefined;

    }

    // void CancelWrite ()
    CancelWrite() {

    }

    // bool IsCurrentMediaSupported (IDiscRecorder2)
    IsCurrentMediaSupported(IDiscRecorder2) {

    }

    // bool IsRecorderSupported (IDiscRecorder2)
    IsRecorderSupported(IDiscRecorder2) {

    }

    // void SetWriteSpeed (int, bool)
    SetWriteSpeed(int, bool) {

    }

    // void Write (IStream)
    Write(IStream) {

    }

}

module.exports = imapi2_msftdiscformat2data;

