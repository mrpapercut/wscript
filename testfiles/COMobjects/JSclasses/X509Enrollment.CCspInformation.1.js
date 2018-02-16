class x509enrollment_ccspinformation_1 {
    constructor() {
        // ICspAlgorithms CspAlgorithms () {get}
        this.CspAlgorithms = undefined;

        // bool HasHardwareRandomNumberGenerator () {get}
        this.HasHardwareRandomNumberGenerator = undefined;

        // bool IsHardwareDevice () {get}
        this.IsHardwareDevice = undefined;

        // bool IsRemovable () {get}
        this.IsRemovable = undefined;

        // bool IsSmartCard () {get}
        this.IsSmartCard = undefined;

        // bool IsSoftwareDevice () {get}
        this.IsSoftwareDevice = undefined;

        // X509KeySpec KeySpec () {get}
        this.KeySpec = undefined;

        // bool LegacyCsp () {get}
        this.LegacyCsp = undefined;

        // int MaxKeyContainerNameLength () {get}
        this.MaxKeyContainerNameLength = undefined;

        // string Name () {get}
        this.Name = undefined;

        // X509ProviderType Type () {get}
        this.Type = undefined;

        // bool Valid () {get}
        this.Valid = undefined;

        // int Version () {get}
        this.Version = undefined;

    }

    // ICspStatus GetCspStatusFromOperations (IObjectId, AlgorithmOperationFlags)
    GetCspStatusFromOperations(IObjectId, AlgorithmOperationFlags) {

    }

    // string GetDefaultSecurityDescriptor (bool)
    GetDefaultSecurityDescriptor(bool) {

    }

    // void InitializeFromName (string)
    InitializeFromName(string) {

    }

    // void InitializeFromType (X509ProviderType, IObjectId, bool)
    InitializeFromType(X509ProviderType, IObjectId, bool) {

    }

}

module.exports = x509enrollment_ccspinformation_1;

