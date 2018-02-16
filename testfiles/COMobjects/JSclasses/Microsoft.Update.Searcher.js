class microsoft_update_searcher {
    constructor() {
        // bool CanAutomaticallyUpgradeService () {get} {set}
        this.CanAutomaticallyUpgradeService = undefined;

        // string ClientApplicationID () {get} {set}
        this.ClientApplicationID = undefined;

        // bool IgnoreDownloadPriority () {get} {set}
        this.IgnoreDownloadPriority = undefined;

        // bool IncludePotentiallySupersededUpdates () {get} {set}
        this.IncludePotentiallySupersededUpdates = undefined;

        // bool Online () {get} {set}
        this.Online = undefined;

        // SearchScope SearchScope () {get} {set}
        this.SearchScope = undefined;

        // ServerSelection ServerSelection () {get} {set}
        this.ServerSelection = undefined;

        // string ServiceID () {get} {set}
        this.ServiceID = undefined;

    }

    // ISearchJob BeginSearch (string, IUnknown, Variant)
    BeginSearch(string, IUnknown, Variant) {

    }

    // ISearchResult EndSearch (ISearchJob)
    EndSearch(ISearchJob) {

    }

    // string EscapeString (string)
    EscapeString(string) {

    }

    // int GetTotalHistoryCount ()
    GetTotalHistoryCount() {

    }

    // IUpdateHistoryEntryCollection QueryHistory (int, int)
    QueryHistory(int, int) {

    }

    // ISearchResult Search (string)
    Search(string) {

    }

}

module.exports = microsoft_update_searcher;

