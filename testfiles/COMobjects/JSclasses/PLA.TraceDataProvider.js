class pla_tracedataprovider {
    constructor() {
        // string DisplayName () {get} {set}
        this.DisplayName = undefined;

        // SAFEARRAY(byte) FilterData () {get} {set}
        this.FilterData = undefined;

        // bool FilterEnabled () {get} {set}
        this.FilterEnabled = undefined;

        // uint FilterType () {get} {set}
        this.FilterType = undefined;

        // GUID Guid () {get} {set}
        this.Guid = undefined;

        // IValueMap KeywordsAll () {get}
        this.KeywordsAll = undefined;

        // IValueMap KeywordsAny () {get}
        this.KeywordsAny = undefined;

        // IValueMap Level () {get}
        this.Level = undefined;

        // IValueMap Properties () {get}
        this.Properties = undefined;

    }

    // void GetRegisteredProcesses (IValueMap)
    GetRegisteredProcesses(IValueMap) {

    }

    // string GetSecurity (uint)
    GetSecurity(uint) {

    }

    // void Query (string, string)
    Query(string, string) {

    }

    // void Resolve (IDispatch)
    Resolve(IDispatch) {

    }

    // void SetSecurity (string)
    SetSecurity(string) {

    }

}

module.exports = pla_tracedataprovider;

