class imapi2_msftdiscformat2rawcd {
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

        // int LastPossibleStartOfLeadout () {get}
        this.LastPossibleStartOfLeadout = undefined;

        // bool MediaHeuristicallyBlank () {get}
        this.MediaHeuristicallyBlank = undefined;

        // bool MediaPhysicallyBlank () {get}
        this.MediaPhysicallyBlank = undefined;

        // IDiscRecorder2 Recorder () {get} {set}
        this.Recorder = undefined;

        // bool RequestedRotationTypeIsPureCAV () {get}
        this.RequestedRotationTypeIsPureCAV = undefined;

        // IMAPI_FORMAT2_RAW_CD_DATA_SECTOR_TYPE RequestedSectorType () {get} {set}
        this.RequestedSectorType = undefined;

        // int RequestedWriteSpeed () {get}
        this.RequestedWriteSpeed = undefined;

        // int StartOfNextSession () {get}
        this.StartOfNextSession = undefined;

        // SAFEARRAY(Variant) SupportedMediaTypes () {get}
        this.SupportedMediaTypes = undefined;

        // SAFEARRAY(Variant) SupportedSectorTypes () {get}
        this.SupportedSectorTypes = undefined;

        // SAFEARRAY(Variant) SupportedWriteSpeedDescriptors () {get}
        this.SupportedWriteSpeedDescriptors = undefined;

        // SAFEARRAY(Variant) SupportedWriteSpeeds () {get}
        this.SupportedWriteSpeeds = undefined;

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

    // void PrepareMedia ()
    PrepareMedia() {

    }

    // void ReleaseMedia ()
    ReleaseMedia() {

    }

    // void SetWriteSpeed (int, bool)
    SetWriteSpeed(int, bool) {

    }

    // void WriteMedia (IStream)
    WriteMedia(IStream) {

    }

    // void WriteMedia2 (IStream, int)
    WriteMedia2(IStream, int) {

    }

}

module.exports = imapi2_msftdiscformat2rawcd;

