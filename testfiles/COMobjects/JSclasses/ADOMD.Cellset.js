class adomd_cellset {
    constructor() {
        // Cell Item (SAFEARRAY(Variant)) {get}
        this.Parameterized = undefined;

        // IDispatch ActiveConnection () {get} {set} {set by ref}
        this.ActiveConnection = undefined;

        // Axes Axes () {get}
        this.Axes = undefined;

        // Axis FilterAxis () {get}
        this.FilterAxis = undefined;

        // Properties Properties () {get}
        this.Properties = undefined;

        // Variant Source () {get} {set} {set by ref}
        this.Source = undefined;

        // int State () {get}
        this.State = undefined;

    }

    // void Close ()
    Close() {

    }

    // void Open (Variant, Variant)
    Open(Variant, Variant) {

    }

}

module.exports = adomd_cellset;

