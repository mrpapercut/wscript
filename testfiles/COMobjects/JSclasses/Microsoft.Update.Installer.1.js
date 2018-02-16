class microsoft_update_installer_1 {
    constructor() {
        // bool AllowSourcePrompts () {get} {set}
        this.AllowSourcePrompts = undefined;

        // string ClientApplicationID () {get} {set}
        this.ClientApplicationID = undefined;

        // bool ForceQuiet () {get} {set}
        this.ForceQuiet = undefined;

        // bool IsBusy () {get}
        this.IsBusy = undefined;

        // bool IsForced () {get} {set}
        this.IsForced = undefined;

        // IUnknown parentWindow () {get} {set}
        this.parentWindow = undefined;

        // bool RebootRequiredBeforeInstallation () {get}
        this.RebootRequiredBeforeInstallation = undefined;

        // IUpdateCollection Updates () {get} {set}
        this.Updates = undefined;

    }

    // IInstallationJob BeginInstall (IUnknown, IUnknown, Variant)
    BeginInstall(IUnknown, IUnknown, Variant) {

    }

    // IInstallationJob BeginUninstall (IUnknown, IUnknown, Variant)
    BeginUninstall(IUnknown, IUnknown, Variant) {

    }

    // IInstallationResult EndInstall (IInstallationJob)
    EndInstall(IInstallationJob) {

    }

    // IInstallationResult EndUninstall (IInstallationJob)
    EndUninstall(IInstallationJob) {

    }

    // IInstallationResult Install ()
    Install() {

    }

    // IInstallationResult RunWizard (string)
    RunWizard(string) {

    }

    // IInstallationResult Uninstall ()
    Uninstall() {

    }

}

module.exports = microsoft_update_installer_1;

