class wscript_shell {
    constructor() {
        // IWshEnvironment Environment (Variant) {get}
        this.Parameterized = undefined;

        // string CurrentDirectory () {get} {set}
        this.CurrentDirectory = undefined;

        // IWshCollection SpecialFolders () {get}
        this.SpecialFolders = undefined;

    }

    // bool AppActivate (Variant, Variant)
    AppActivate(Variant, Variant) {

    }

    // IDispatch CreateShortcut (string)
    CreateShortcut(string) {

    }

    // IWshExec Exec (string)
    Exec(string) {

    }

    // string ExpandEnvironmentStrings (string)
    ExpandEnvironmentStrings(string) {

    }

    // bool LogEvent (Variant, string, string)
    LogEvent(Variant, string, string) {

    }

    // int Popup (string, Variant, Variant, Variant)
    Popup(string, Variant, Variant, Variant) {

    }

    // void RegDelete (string)
    RegDelete(string) {

    }

    // Variant RegRead (string)
    RegRead(string) {

    }

    // void RegWrite (string, Variant, Variant)
    RegWrite(string, Variant, Variant) {

    }

    // int Run (string, Variant, Variant)
    Run(string, Variant, Variant) {

    }

    // void SendKeys (string, Variant)
    SendKeys(string, Variant) {

    }

}

module.exports = wscript_shell;

