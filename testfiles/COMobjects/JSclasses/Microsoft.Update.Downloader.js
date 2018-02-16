class microsoft_update_downloader {
    constructor() {
        // string ClientApplicationID () {get} {set}
        this.ClientApplicationID = undefined;

        // bool IsForced () {get} {set}
        this.IsForced = undefined;

        // DownloadPriority Priority () {get} {set}
        this.Priority = undefined;

        // IUpdateCollection Updates () {get} {set}
        this.Updates = undefined;

    }

    // IDownloadJob BeginDownload (IUnknown, IUnknown, Variant)
    BeginDownload(IUnknown, IUnknown, Variant) {

    }

    // IDownloadResult Download ()
    Download() {

    }

    // IDownloadResult EndDownload (IDownloadJob)
    EndDownload(IDownloadJob) {

    }

}

module.exports = microsoft_update_downloader;

