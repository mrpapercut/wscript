class faxcomex_faxdocument_1 {
    constructor() {
        // bool AttachFaxToReceipt () {get} {set}
        this.AttachFaxToReceipt = undefined;

        // Variant Bodies () {get} {set}
        this.Bodies = undefined;

        // string Body () {get} {set}
        this.Body = undefined;

        // int CallHandle () {get} {set}
        this.CallHandle = undefined;

        // string CoverPage () {get} {set}
        this.CoverPage = undefined;

        // FAX_COVERPAGE_TYPE_ENUM CoverPageType () {get} {set}
        this.CoverPageType = undefined;

        // string DocumentName () {get} {set}
        this.DocumentName = undefined;

        // bool GroupBroadcastReceipts () {get} {set}
        this.GroupBroadcastReceipts = undefined;

        // string Note () {get} {set}
        this.Note = undefined;

        // FAX_PRIORITY_TYPE_ENUM Priority () {get} {set}
        this.Priority = undefined;

        // string ReceiptAddress () {get} {set}
        this.ReceiptAddress = undefined;

        // FAX_RECEIPT_TYPE_ENUM ReceiptType () {get} {set}
        this.ReceiptType = undefined;

        // IFaxRecipients Recipients () {get}
        this.Recipients = undefined;

        // Date ScheduleTime () {get} {set}
        this.ScheduleTime = undefined;

        // FAX_SCHEDULE_TYPE_ENUM ScheduleType () {get} {set}
        this.ScheduleType = undefined;

        // IFaxSender Sender () {get}
        this.Sender = undefined;

        // string Subject () {get} {set}
        this.Subject = undefined;

        // string SubmissionId () {get}
        this.SubmissionId = undefined;

        // IDispatch TapiConnection () {get} {set by ref}
        this.TapiConnection = undefined;

    }

    // Variant ConnectedSubmit (IFaxServer)
    ConnectedSubmit(IFaxServer) {

    }

    // int ConnectedSubmit2 (IFaxServer, Variant)
    ConnectedSubmit2(IFaxServer, Variant) {

    }

    // Variant Submit (string)
    Submit(string) {

    }

    // int Submit2 (string, Variant)
    Submit2(string, Variant) {

    }

}

module.exports = faxcomex_faxdocument_1;

