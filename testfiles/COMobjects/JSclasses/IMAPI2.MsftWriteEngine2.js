class imapi2_msftwriteengine2 {
    constructor() {
        // int BytesPerSector () {get} {set}
        this.BytesPerSector = undefined;

        // int EndingSectorsPerSecond () {get} {set}
        this.EndingSectorsPerSecond = undefined;

        // IDiscRecorder2Ex Recorder () {get} {set}
        this.Recorder = undefined;

        // int StartingSectorsPerSecond () {get} {set}
        this.StartingSectorsPerSecond = undefined;

        // bool UseStreamingWrite12 () {get} {set}
        this.UseStreamingWrite12 = undefined;

        // bool WriteInProgress () {get}
        this.WriteInProgress = undefined;

    }

    // void CancelWrite ()
    CancelWrite() {

    }

    // void WriteSection (IStream, int, int)
    WriteSection(IStream, int, int) {

    }

}

module.exports = imapi2_msftwriteengine2;

