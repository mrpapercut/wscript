class bdatuner_digitalcabletunerequest {
    constructor() {
        // int Channel () {get} {set}
        this.Channel = undefined;

        // IComponents Components () {get}
        this.Components = undefined;

        // ILocator Locator () {get} {set}
        this.Locator = undefined;

        // int MajorChannel () {get} {set}
        this.MajorChannel = undefined;

        // int MinorChannel () {get} {set}
        this.MinorChannel = undefined;

        // int SourceID () {get} {set}
        this.SourceID = undefined;

        // ITuningSpace TuningSpace () {get}
        this.TuningSpace = undefined;

    }

    // ITuneRequest Clone ()
    Clone() {

    }

}

module.exports = bdatuner_digitalcabletunerequest;

