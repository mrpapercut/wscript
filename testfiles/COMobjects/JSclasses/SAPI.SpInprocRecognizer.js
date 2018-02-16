class sapi_spinprocrecognizer {
    constructor() {
        // bool AllowAudioInputFormatChangesOnNextSet () {get} {set}
        this.AllowAudioInputFormatChangesOnNextSet = undefined;

        // ISpeechObjectToken AudioInput () {get} {set by ref}
        this.AudioInput = undefined;

        // ISpeechBaseStream AudioInputStream () {get} {set by ref}
        this.AudioInputStream = undefined;

        // bool IsShared () {get}
        this.IsShared = undefined;

        // ISpeechObjectToken Profile () {get} {set by ref}
        this.Profile = undefined;

        // ISpeechObjectToken Recognizer () {get} {set by ref}
        this.Recognizer = undefined;

        // SpeechRecognizerState State () {get} {set}
        this.State = undefined;

        // ISpeechRecognizerStatus Status () {get}
        this.Status = undefined;

    }

    // ISpeechRecoContext CreateRecoContext ()
    CreateRecoContext() {

    }

    // void DisplayUI (int, string, string, Variant)
    DisplayUI(int, string, string, Variant) {

    }

    // void EmulateRecognition (Variant, Variant, int)
    EmulateRecognition(Variant, Variant, int) {

    }

    // ISpeechObjectTokens GetAudioInputs (string, string)
    GetAudioInputs(string, string) {

    }

    // ISpeechAudioFormat GetFormat (SpeechFormatType)
    GetFormat(SpeechFormatType) {

    }

    // ISpeechObjectTokens GetProfiles (string, string)
    GetProfiles(string, string) {

    }

    // bool GetPropertyNumber (string, int)
    GetPropertyNumber(string, int) {

    }

    // bool GetPropertyString (string, string)
    GetPropertyString(string, string) {

    }

    // ISpeechObjectTokens GetRecognizers (string, string)
    GetRecognizers(string, string) {

    }

    // bool IsUISupported (string, Variant)
    IsUISupported(string, Variant) {

    }

    // bool SetPropertyNumber (string, int)
    SetPropertyNumber(string, int) {

    }

    // bool SetPropertyString (string, string)
    SetPropertyString(string, string) {

    }

}

module.exports = sapi_spinprocrecognizer;

