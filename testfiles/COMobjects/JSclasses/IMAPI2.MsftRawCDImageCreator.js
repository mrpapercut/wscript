class imapi2_msftrawcdimagecreator {
    constructor() {
        // IRawCDImageTrackInfo TrackInfo (int) {get}
        this.Parameterized = undefined;

        // bool DisableGaplessAudio () {get} {set}
        this.DisableGaplessAudio = undefined;

        // SAFEARRAY(Variant) ExpectedTableOfContents () {get}
        this.ExpectedTableOfContents = undefined;

        // int LastUsedUserSectorInImage () {get}
        this.LastUsedUserSectorInImage = undefined;

        // string MediaCatalogNumber () {get} {set}
        this.MediaCatalogNumber = undefined;

        // int NumberOfExistingTracks () {get}
        this.NumberOfExistingTracks = undefined;

        // IMAPI_FORMAT2_RAW_CD_DATA_SECTOR_TYPE ResultingImageType () {get} {s...
        this.ResultingImageType = undefined;

        // int StartingTrackNumber () {get} {set}
        this.StartingTrackNumber = undefined;

        // int StartOfLeadout () {get}
        this.StartOfLeadout = undefined;

        // int StartOfLeadoutLimit () {get} {set}
        this.StartOfLeadoutLimit = undefined;

    }

    // void AddSpecialPregap (IStream)
    AddSpecialPregap(IStream) {

    }

    // void AddSubcodeRWGenerator (IStream)
    AddSubcodeRWGenerator(IStream) {

    }

    // int AddTrack (IMAPI_CD_SECTOR_TYPE, IStream)
    AddTrack(IMAPI_CD_SECTOR_TYPE, IStream) {

    }

    // IStream CreateResultImage ()
    CreateResultImage() {

    }

}

module.exports = imapi2_msftrawcdimagecreator;

