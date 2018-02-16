class sapi_spvoice_1 {
    constructor() {
        // SpeechVoiceEvents AlertBoundary () {get} {set}
        this.AlertBoundary = undefined;

        // bool AllowAudioOutputFormatChangesOnNextSet () {get} {set}
        this.AllowAudioOutputFormatChangesOnNextSet = undefined;

        // ISpeechObjectToken AudioOutput () {get} {set by ref}
        this.AudioOutput = undefined;

        // ISpeechBaseStream AudioOutputStream () {get} {set by ref}
        this.AudioOutputStream = undefined;

        // SpeechVoiceEvents EventInterests () {get} {set}
        this.EventInterests = undefined;

        // SpeechVoicePriority Priority () {get} {set}
        this.Priority = undefined;

        // int Rate () {get} {set}
        this.Rate = undefined;

        // ISpeechVoiceStatus Status () {get}
        this.Status = undefined;

        // int SynchronousSpeakTimeout () {get} {set}
        this.SynchronousSpeakTimeout = undefined;

        // ISpeechObjectToken Voice () {get} {set by ref}
        this.Voice = undefined;

        // int Volume () {get} {set}
        this.Volume = undefined;

    }

    // void DisplayUI (int, string, string, Variant)
    DisplayUI(int, string, string, Variant) {

    }

    // ISpeechObjectTokens GetAudioOutputs (string, string)
    GetAudioOutputs(string, string) {

    }

    // ISpeechObjectTokens GetVoices (string, string)
    GetVoices(string, string) {

    }

    // bool IsUISupported (string, Variant)
    IsUISupported(string, Variant) {

    }

    // void Pause ()
    Pause() {

    }

    // void Resume ()
    Resume() {

    }

    // int Skip (string, int)
    Skip(string, int) {

    }

    // int Speak (string, SpeechVoiceSpeakFlags)
    Speak(string, SpeechVoiceSpeakFlags) {

    }

    // int SpeakCompleteEvent ()
    SpeakCompleteEvent() {

    }

    // int SpeakStream (ISpeechBaseStream, SpeechVoiceSpeakFlags)
    SpeakStream(ISpeechBaseStream, SpeechVoiceSpeakFlags) {

    }

    // bool WaitUntilDone (int)
    WaitUntilDone(int) {

    }

}

module.exports = sapi_spvoice_1;

