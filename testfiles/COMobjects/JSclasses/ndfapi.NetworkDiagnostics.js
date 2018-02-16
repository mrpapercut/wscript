class ndfapi_networkdiagnostics {
    constructor() {
        // uint DiagnoseResult () {get}
        this.DiagnoseResult = undefined;

        // string EntryPoint () {get}
        this.EntryPoint = undefined;

        // string FollowUpSession () {get}
        this.FollowUpSession = undefined;

        // string HelperAttributes () {get}
        this.HelperAttributes = undefined;

        // string IncidentID () {get}
        this.IncidentID = undefined;

        // string Progress () {get}
        this.Progress = undefined;

        // uint RepairResult () {get}
        this.RepairResult = undefined;

        // IRootCauseInfoEnum RootCauses () {get}
        this.RootCauses = undefined;

        // uint SessionStatus () {get}
        this.SessionStatus = undefined;

        // string TraceFile () {get}
        this.TraceFile = undefined;

        // uint ValidateResult () {get}
        this.ValidateResult = undefined;

    }

    // void CreateIncident (string, string)
    CreateIncident(string, string) {

    }

    // IDiagnosticsWaitHandle Diagnose (uint, uint)
    Diagnose(uint, uint) {

    }

    // void OpenExistingIncident (string)
    OpenExistingIncident(string) {

    }

    // IDiagnosticsWaitHandle Repair (uint, uint)
    Repair(uint, uint) {

    }

    // void RepairShown (uint)
    RepairShown(uint) {

    }

    // void SetFollowUpSession (INetworkDiagnostics)
    SetFollowUpSession(INetworkDiagnostics) {

    }

    // uint ShouldSkipRepair (IRepairInfo)
    ShouldSkipRepair(IRepairInfo) {

    }

    // uint ShouldSkipRootCause (IRootCauseInfo)
    ShouldSkipRootCause(IRootCauseInfo) {

    }

    // void SkipRepair (uint)
    SkipRepair(uint) {

    }

    // IDiagnosticsWaitHandle Validate (uint)
    Validate(uint) {

    }

}

module.exports = ndfapi_networkdiagnostics;

