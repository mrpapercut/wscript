class imapi2fs_msftfilesystemimage_1 {
    constructor() {
        // IBootOptions BootImageOptions () {get} {set}
        this.BootImageOptions = undefined;

        // SAFEARRAY(Variant) BootImageOptionsArray () {get} {set}
        this.BootImageOptionsArray = undefined;

        // int ChangePoint () {get}
        this.ChangePoint = undefined;

        // bool CreateRedundantUdfMetadataFiles () {get} {set}
        this.CreateRedundantUdfMetadataFiles = undefined;

        // int DirectoryCount () {get}
        this.DirectoryCount = undefined;

        // int FileCount () {get}
        this.FileCount = undefined;

        // FsiFileSystems FileSystemsSupported () {get}
        this.FileSystemsSupported = undefined;

        // FsiFileSystems FileSystemsToCreate () {get} {set}
        this.FileSystemsToCreate = undefined;

        // int FreeMediaBlocks () {get} {set}
        this.FreeMediaBlocks = undefined;

        // string ImportedVolumeName () {get}
        this.ImportedVolumeName = undefined;

        // int ISO9660InterchangeLevel () {get} {set}
        this.ISO9660InterchangeLevel = undefined;

        // SAFEARRAY(Variant) ISO9660InterchangeLevelsSupported () {get}
        this.ISO9660InterchangeLevelsSupported = undefined;

        // SAFEARRAY(Variant) MultisessionInterfaces () {get} {set}
        this.MultisessionInterfaces = undefined;

        // IFsiDirectoryItem Root () {get}
        this.Root = undefined;

        // int SessionStartBlock () {get} {set}
        this.SessionStartBlock = undefined;

        // bool StageFiles () {get} {set}
        this.StageFiles = undefined;

        // bool StrictFileSystemCompliance () {get} {set}
        this.StrictFileSystemCompliance = undefined;

        // int UDFRevision () {get} {set}
        this.UDFRevision = undefined;

        // SAFEARRAY(Variant) UDFRevisionsSupported () {get}
        this.UDFRevisionsSupported = undefined;

        // int UsedBlocks () {get}
        this.UsedBlocks = undefined;

        // bool UseRestrictedCharacterSet () {get} {set}
        this.UseRestrictedCharacterSet = undefined;

        // string VolumeName () {get} {set}
        this.VolumeName = undefined;

        // string VolumeNameISO9660 () {get}
        this.VolumeNameISO9660 = undefined;

        // string VolumeNameJoliet () {get}
        this.VolumeNameJoliet = undefined;

        // string VolumeNameUDF () {get}
        this.VolumeNameUDF = undefined;

        // string WorkingDirectory () {get} {set}
        this.WorkingDirectory = undefined;

    }

    // string CalculateDiscIdentifier ()
    CalculateDiscIdentifier() {

    }

    // void ChooseImageDefaults (IDiscRecorder2)
    ChooseImageDefaults(IDiscRecorder2) {

    }

    // void ChooseImageDefaultsForMediaType (IMAPI_MEDIA_PHYSICAL_TYPE)
    ChooseImageDefaultsForMediaType(IMAPI_MEDIA_PHYSICAL_TYPE) {

    }

    // IFsiDirectoryItem CreateDirectoryItem (string)
    CreateDirectoryItem(string) {

    }

    // IFsiFileItem CreateFileItem (string)
    CreateFileItem(string) {

    }

    // IFileSystemImageResult CreateResultImage ()
    CreateResultImage() {

    }

    // FsiItemType Exists (string)
    Exists(string) {

    }

    // FsiFileSystems GetDefaultFileSystemForImport (FsiFileSystems)
    GetDefaultFileSystemForImport(FsiFileSystems) {

    }

    // FsiFileSystems IdentifyFileSystemsOnDisc (IDiscRecorder2)
    IdentifyFileSystemsOnDisc(IDiscRecorder2) {

    }

    // FsiFileSystems ImportFileSystem ()
    ImportFileSystem() {

    }

    // void ImportSpecificFileSystem (FsiFileSystems)
    ImportSpecificFileSystem(FsiFileSystems) {

    }

    // void LockInChangePoint ()
    LockInChangePoint() {

    }

    // bool ProbeSpecificFileSystem (FsiFileSystems)
    ProbeSpecificFileSystem(FsiFileSystems) {

    }

    // void RollbackToChangePoint (int)
    RollbackToChangePoint(int) {

    }

    // void SetMaxMediaBlocksFromDevice (IDiscRecorder2)
    SetMaxMediaBlocksFromDevice(IDiscRecorder2) {

    }

}

module.exports = imapi2fs_msftfilesystemimage_1;

