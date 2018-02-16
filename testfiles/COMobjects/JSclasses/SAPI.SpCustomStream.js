class sapi_spcustomstream {
    constructor() {
        // IUnknown BaseStream () {get} {set by ref}
        this.BaseStream = undefined;

        // ISpeechAudioFormat Format () {get} {set by ref}
        this.Format = undefined;

    }

    // int Read (Variant, int)
    Read(Variant, int) {

    }

    // Variant Seek (Variant, SpeechStreamSeekPositionType)
    Seek(Variant, SpeechStreamSeekPositionType) {

    }

    // int Write (Variant)
    Write(Variant) {

    }

}

module.exports = sapi_spcustomstream;

