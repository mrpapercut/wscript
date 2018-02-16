class cdo_message {
    constructor() {
        // IBodyParts Attachments () {get}
        this.Attachments = undefined;

        // bool AutoGenerateTextBody () {get} {set}
        this.AutoGenerateTextBody = undefined;

        // string BCC () {get} {set}
        this.BCC = undefined;

        // IBodyPart BodyPart () {get}
        this.BodyPart = undefined;

        // string CC () {get} {set}
        this.CC = undefined;

        // IConfiguration Configuration () {get} {set} {set by ref}
        this.Configuration = undefined;

        // IDataSource DataSource () {get}
        this.DataSource = undefined;

        // CdoDSNOptions DSNOptions () {get} {set}
        this.DSNOptions = undefined;

        // Fields EnvelopeFields () {get}
        this.EnvelopeFields = undefined;

        // Fields Fields () {get}
        this.Fields = undefined;

        // string FollowUpTo () {get} {set}
        this.FollowUpTo = undefined;

        // string From () {get} {set}
        this.From = undefined;

        // string HTMLBody () {get} {set}
        this.HTMLBody = undefined;

        // IBodyPart HTMLBodyPart () {get}
        this.HTMLBodyPart = undefined;

        // string Keywords () {get} {set}
        this.Keywords = undefined;

        // bool MDNRequested () {get} {set}
        this.MDNRequested = undefined;

        // bool MimeFormatted () {get} {set}
        this.MimeFormatted = undefined;

        // string Newsgroups () {get} {set}
        this.Newsgroups = undefined;

        // string Organization () {get} {set}
        this.Organization = undefined;

        // Date ReceivedTime () {get}
        this.ReceivedTime = undefined;

        // string ReplyTo () {get} {set}
        this.ReplyTo = undefined;

        // string Sender () {get} {set}
        this.Sender = undefined;

        // Date SentOn () {get}
        this.SentOn = undefined;

        // string Subject () {get} {set}
        this.Subject = undefined;

        // string TextBody () {get} {set}
        this.TextBody = undefined;

        // IBodyPart TextBodyPart () {get}
        this.TextBodyPart = undefined;

        // string To () {get} {set}
        this.To = undefined;

    }

    // IBodyPart AddAttachment (string, string, string)
    AddAttachment(string, string, string) {

    }

    // IBodyPart AddRelatedBodyPart (string, string, CdoReferenceType, string, string)
    AddRelatedBodyPart(string, string, CdoReferenceType, string, string) {

    }

    // void CreateMHTMLBody (string, CdoMHTMLFlags, string, string)
    CreateMHTMLBody(string, CdoMHTMLFlags, string, string) {

    }

    // IMessage Forward ()
    Forward() {

    }

    // IDispatch GetInterface (string)
    GetInterface(string) {

    }

    // _Stream GetStream ()
    GetStream() {

    }

    // void Post ()
    Post() {

    }

    // IMessage PostReply ()
    PostReply() {

    }

    // IMessage Reply ()
    Reply() {

    }

    // IMessage ReplyAll ()
    ReplyAll() {

    }

    // void Send ()
    Send() {

    }

}

module.exports = cdo_message;

