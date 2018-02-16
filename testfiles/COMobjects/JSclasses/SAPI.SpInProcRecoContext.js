class sapi_spinprocrecocontext {
    constructor() {
        // bool AllowVoiceFormatMatchingOnNextSet () {get} {set}
        this.AllowVoiceFormatMatchingOnNextSet = undefined;

        // SpeechInterference AudioInputInterferenceStatus () {get}
        this.AudioInputInterferenceStatus = undefined;

        // int CmdMaxAlternates () {get} {set}
        this.CmdMaxAlternates = undefined;

        // SpeechRecoEvents EventInterests () {get} {set}
        this.EventInterests = undefined;

        // ISpeechRecognizer Recognizer () {get}
        this.Recognizer = undefined;

        // string RequestedUIType () {get}
        this.RequestedUIType = undefined;

        // SpeechRetainedAudioOptions RetainedAudio () {get} {set}
        this.RetainedAudio = undefined;

        // ISpeechAudioFormat RetainedAudioFormat () {get} {set by ref}
        this.RetainedAudioFormat = undefined;

        // SpeechRecoContextState State () {get} {set}
        this.State = undefined;

        // ISpeechVoice Voice () {get} {set by ref}
        this.Voice = undefined;

        // SpeechRecoEvents VoicePurgeEvent () {get} {set}
        this.VoicePurgeEvent = undefined;

    }

    // void Bookmark (SpeechBookmarkOptions, Variant, Variant)
    Bookmark(SpeechBookmarkOptions, Variant, Variant) {

    }

    // ISpeechRecoGrammar CreateGrammar (Variant)
    CreateGrammar(Variant) {

    }

    // ISpeechRecoResult CreateResultFromMemory (Variant)
    CreateResultFromMemory(Variant) {

    }

    // void Pause ()
    Pause() {

    }

    // void Resume ()
    Resume() {

    }

    // void SetAdaptationData (string)
    SetAdaptationData(string) {

    }

}

module.exports = sapi_spinprocrecocontext;

