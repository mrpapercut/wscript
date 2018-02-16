class comadmin_comadmincatalog_1 {
    constructor() {
        // string CurrentPartition () {set}
        this.CurrentPartition = undefined;

        // string CurrentPartitionID () {get}
        this.CurrentPartitionID = undefined;

        // string CurrentPartitionName () {get}
        this.CurrentPartitionName = undefined;

        // string GlobalPartitionID () {get}
        this.GlobalPartitionID = undefined;

        // bool Is64BitCatalogServer () {get}
        this.Is64BitCatalogServer = undefined;

        // bool IsApplicationInstanceDumpSupported () {get}
        this.IsApplicationInstanceDumpSupported = undefined;

        // int MajorVersion () {get}
        this.MajorVersion = undefined;

        // int MinorVersion () {get}
        this.MinorVersion = undefined;

    }

    // void AliasComponent (string, string, string, string, string)
    AliasComponent(string, string, string, string, string) {

    }

    // bool AreApplicationInstancesPaused (Variant)
    AreApplicationInstancesPaused(Variant) {

    }

    // void BackupREGDB (string)
    BackupREGDB(string) {

    }

    // IDispatch Connect (string)
    Connect(string) {

    }

    // void CopyApplications (string, Variant, string)
    CopyApplications(string, Variant, string) {

    }

    // void CopyComponents (string, Variant, string)
    CopyComponents(string, Variant, string) {

    }

    // void CreateServiceForApplication (string, string, string, string, s...
    CreateServiceForApplication() {

    }

    // void DeleteServiceForApplication (string)
    DeleteServiceForApplication(string) {

    }

    // string DumpApplicationInstance (string, string, int)
    DumpApplicationInstance(string, string, int) {

    }

    // void ExportApplication (string, string, int)
    ExportApplication(string, string, int) {

    }

    // void ExportPartition (string, string, int)
    ExportPartition(string, string, int) {

    }

    // void FlushPartitionCache ()
    FlushPartitionCache() {

    }

    // string GetApplicationInstanceIDFromProcessID (int)
    GetApplicationInstanceIDFromProcessID(int) {

    }

    // IDispatch GetCollection (string)
    GetCollection(string) {

    }

    // IDispatch GetCollectionByQuery (string, SAFEARRAY(Variant))
    GetCollectionByQuery() {

    }

    // IDispatch GetCollectionByQuery2 (string, Variant)
    GetCollectionByQuery2(string, Variant) {

    }

    // int GetComponentVersionCount (string)
    GetComponentVersionCount(string) {

    }

    // void GetEventClassesForIID (string, SAFEARRAY(Variant), SAFEARRAY(V...
    GetEventClassesForIID() {

    }

    // void GetMultipleComponentsInfo (string, SAFEARRAY(Variant), SAFEARR...
    GetMultipleComponentsInfo() {

    }

    // string GetPartitionID (string)
    GetPartitionID(string) {

    }

    // string GetPartitionName (string)
    GetPartitionName(string) {

    }

    // void ImportComponent (string, string)
    ImportComponent(string, string) {

    }

    // void ImportComponents (string, Variant, Variant)
    ImportComponents(string, Variant, Variant) {

    }

    // void ImportUnconfiguredComponents (string, Variant, Variant)
    ImportUnconfiguredComponents(string, Variant, Variant) {

    }

    // void InstallApplication (string, string, int, string, string, string)
    InstallApplication(string, string, int, string, string, string) {

    }

    // void InstallComponent (string, string, string, string)
    InstallComponent(string, string, string, string) {

    }

    // void InstallEventClass (string, string, string, string)
    InstallEventClass(string, string, string, string) {

    }

    // void InstallMultipleComponents (string, SAFEARRAY(Variant), SAFEARR...
    InstallMultipleComponents() {

    }

    // void InstallMultipleEventClasses (string, SAFEARRAY(Variant), SAFEA...
    InstallMultipleEventClasses() {

    }

    // void InstallPartition (string, string, int, string, string, string)
    InstallPartition(string, string, int, string, string, string) {

    }

    // COMAdminInUse IsSafeToDelete (string)
    IsSafeToDelete(string) {

    }

    // void MoveComponents (string, Variant, string)
    MoveComponents(string, Variant, string) {

    }

    // void PauseApplicationInstances (Variant)
    PauseApplicationInstances(Variant) {

    }

    // void PromoteUnconfiguredComponents (string, Variant, Variant)
    PromoteUnconfiguredComponents(string, Variant, Variant) {

    }

    // void QueryApplicationFile (string, string, string, bool, bool, SAFE...
    QueryApplicationFile() {

    }

    // IDispatch QueryApplicationFile2 (string)
    QueryApplicationFile2(string) {

    }

    // void RecycleApplicationInstances (Variant, int)
    RecycleApplicationInstances(Variant, int) {

    }

    // void RefreshComponents ()
    RefreshComponents() {

    }

    // void RefreshRouter ()
    RefreshRouter() {

    }

    // void Reserved1 ()
    Reserved1() {

    }

    // void Reserved2 ()
    Reserved2() {

    }

    // void RestoreREGDB (string)
    RestoreREGDB(string) {

    }

    // void ResumeApplicationInstances (Variant)
    ResumeApplicationInstances(Variant) {

    }

    // int ServiceCheck (int)
    ServiceCheck(int) {

    }

    // void ShutdownApplication (string)
    ShutdownApplication(string) {

    }

    // void ShutdownApplicationInstances (Variant)
    ShutdownApplicationInstances(Variant) {

    }

    // void StartApplication (string)
    StartApplication(string) {

    }

    // void StartRouter ()
    StartRouter() {

    }

    // void StopRouter ()
    StopRouter() {

    }

}

module.exports = comadmin_comadmincatalog_1;

