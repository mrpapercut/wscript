class fsrm_fsrmclassificationmanager {
    constructor() {
        // string ClassificationLastError () {get}
        this.ClassificationLastError = undefined;

        // string ClassificationLastReportPathWithoutExtension () {get}
        this.ClassificationLastReportPathWithoutExtension = undefined;

        // bool ClassificationReportEnabled () {get} {set}
        this.ClassificationReportEnabled = undefined;

        // SAFEARRAY(Variant) ClassificationReportFormats () {get} {set}
        this.ClassificationReportFormats = undefined;

        // string ClassificationReportMailTo () {get} {set}
        this.ClassificationReportMailTo = undefined;

        // _FsrmReportRunningStatus ClassificationRunningStatus () {get}
        this.ClassificationRunningStatus = undefined;

        // int Logging () {get} {set}
        this.Logging = undefined;

    }

    // void CancelClassification ()
    CancelClassification() {

    }

    // void ClassifyFiles (SAFEARRAY(Variant), SAFEARRAY(Variant), ...
    ClassifyFiles() {

    }

    // void ClearFileProperty (string, string)
    ClearFileProperty(string, string) {

    }

    // IFsrmPipelineModuleDefinition CreateModuleDefinition (_FsrmP...
    CreateModuleDefinition() {

    }

    // IFsrmPropertyDefinition CreatePropertyDefinition ()
    CreatePropertyDefinition() {

    }

    // IFsrmRule CreateRule (_FsrmRuleType)
    CreateRule(_FsrmRuleType) {

    }

    // IFsrmCollection EnumFileProperties (string, _FsrmGetFileProp...
    EnumFileProperties() {

    }

    // IFsrmCollection EnumModuleDefinitions (_FsrmPipelineModuleTy...
    EnumModuleDefinitions() {

    }

    // IFsrmCollection EnumPropertyDefinitions (_FsrmEnumOptions)
    EnumPropertyDefinitions(_FsrmEnumOptions) {

    }

    // IFsrmCollection EnumRules (_FsrmRuleType, _FsrmEnumOptions)
    EnumRules(_FsrmRuleType, _FsrmEnumOptions) {

    }

    // IFsrmProperty GetFileProperty (string, string, _FsrmGetFileP...
    GetFileProperty() {

    }

    // IFsrmPipelineModuleDefinition GetModuleDefinition (string, _...
    GetModuleDefinition() {

    }

    // IFsrmPropertyDefinition GetPropertyDefinition (string)
    GetPropertyDefinition(string) {

    }

    // IFsrmRule GetRule (string, _FsrmRuleType)
    GetRule(string, _FsrmRuleType) {

    }

    // void RunClassification (_FsrmReportGenerationContext, string)
    RunClassification(_FsrmReportGenerationContext, string) {

    }

    // void SetFileProperty (string, string, string)
    SetFileProperty(string, string, string) {

    }

    // bool WaitForClassificationCompletion (int)
    WaitForClassificationCompletion(int) {

    }

}

module.exports = fsrm_fsrmclassificationmanager;

