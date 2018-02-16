class pla_systemdatacollectorset {
    constructor() {
        // IDataCollectorCollection DataCollectors () {get}
        this.DataCollectors = undefined;

        // IDataManager DataManager () {get}
        this.DataManager = undefined;

        // string Description () {get} {set}
        this.Description = undefined;

        // string DescriptionUnresolved () {get}
        this.DescriptionUnresolved = undefined;

        // string DisplayName () {get} {set}
        this.DisplayName = undefined;

        // string DisplayNameUnresolved () {get}
        this.DisplayNameUnresolved = undefined;

        // uint Duration () {get} {set}
        this.Duration = undefined;

        // SAFEARRAY(string) Keywords () {get} {set}
        this.Keywords = undefined;

        // string LatestOutputLocation () {get} {set}
        this.LatestOutputLocation = undefined;

        // string name () {get}
        this.name = undefined;

        // string OutputLocation () {get}
        this.OutputLocation = undefined;

        // string RootPath () {get} {set}
        this.RootPath = undefined;

        // IScheduleCollection Schedules () {get}
        this.Schedules = undefined;

        // bool SchedulesEnabled () {get} {set}
        this.SchedulesEnabled = undefined;

        // string Security () {get} {set}
        this.Security = undefined;

        // bool Segment () {get} {set}
        this.Segment = undefined;

        // uint SegmentMaxDuration () {get} {set}
        this.SegmentMaxDuration = undefined;

        // uint SegmentMaxSize () {get} {set}
        this.SegmentMaxSize = undefined;

        // uint SerialNumber () {get} {set}
        this.SerialNumber = undefined;

        // string Server () {get}
        this.Server = undefined;

        // DataCollectorSetStatus Status () {get}
        this.Status = undefined;

        // bool StopOnCompletion () {get} {set}
        this.StopOnCompletion = undefined;

        // string Subdirectory () {get} {set}
        this.Subdirectory = undefined;

        // AutoPathFormat SubdirectoryFormat () {get} {set}
        this.SubdirectoryFormat = undefined;

        // string SubdirectoryFormatPattern () {get} {set}
        this.SubdirectoryFormatPattern = undefined;

        // string Task () {get} {set}
        this.Task = undefined;

        // string TaskArguments () {get} {set}
        this.TaskArguments = undefined;

        // bool TaskRunAsSelf () {get} {set}
        this.TaskRunAsSelf = undefined;

        // string TaskUserTextArguments () {get} {set}
        this.TaskUserTextArguments = undefined;

        // string UserAccount () {get}
        this.UserAccount = undefined;

        // string Xml () {get}
        this.Xml = undefined;

    }

    // IValueMap Commit (string, string, CommitMode)
    Commit(string, string, CommitMode) {

    }

    // void Delete ()
    Delete() {

    }

    // string GetValue (string)
    GetValue(string) {

    }

    // void Query (string, string)
    Query(string, string) {

    }

    // void SetCredentials (string, string)
    SetCredentials(string, string) {

    }

    // void SetValue (string, string)
    SetValue(string, string) {

    }

    // IValueMap SetXml (string)
    SetXml(string) {

    }

    // void start (bool)
    start(bool) {

    }

    // void Stop (bool)
    Stop(bool) {

    }

}

module.exports = pla_systemdatacollectorset;

