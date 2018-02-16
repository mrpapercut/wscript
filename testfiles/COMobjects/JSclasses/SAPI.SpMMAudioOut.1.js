class sapi_spmmaudioout_1 {
    constructor() {
        // ISpeechAudioBufferInfo BufferInfo () {get}
        this.BufferInfo = undefined;

        // int BufferNotifySize () {get} {set}
        this.BufferNotifySize = undefined;

        // ISpeechAudioFormat DefaultFormat () {get}
        this.DefaultFormat = undefined;

        // int DeviceId () {get} {set}
        this.DeviceId = undefined;

        // int EventHandle () {get}
        this.EventHandle = undefined;

        // ISpeechAudioFormat Format () {get} {set by ref}
        this.Format = undefined;

        // int LineId () {get} {set}
        this.LineId = undefined;

        // int MMHandle () {get}
        this.MMHandle = undefined;

        // ISpeechAudioStatus Status () {get}
        this.Status = undefined;

        // int Volume () {get} {set}
        this.Volume = undefined;

    }

    // int Read (Variant, int)
    Read(Variant, int) {

    }

    // Variant Seek (Variant, SpeechStreamSeekPositionType)
    Seek(Variant, SpeechStreamSeekPositionType) {

    }

    // void SetState (SpeechAudioState)
    SetState(SpeechAudioState) {

    }

    // int Write (Variant)
    Write(Variant) {

    }

}

module.exports = sapi_spmmaudioout_1;

