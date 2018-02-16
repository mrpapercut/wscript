class bdatuner_isdbslocator {
    constructor() {
        // int Azimuth () {get} {set}
        this.Azimuth = undefined;

        // int CarrierFrequency () {get} {set}
        this.CarrierFrequency = undefined;

        // int Elevation () {get} {set}
        this.Elevation = undefined;

        // FECMethod InnerFEC () {get} {set}
        this.InnerFEC = undefined;

        // BinaryConvolutionCodeRate InnerFECRate () {get} {set}
        this.InnerFECRate = undefined;

        // ModulationType Modulation () {get} {set}
        this.Modulation = undefined;

        // int OrbitalPosition () {get} {set}
        this.OrbitalPosition = undefined;

        // FECMethod OuterFEC () {get} {set}
        this.OuterFEC = undefined;

        // BinaryConvolutionCodeRate OuterFECRate () {get} {set}
        this.OuterFECRate = undefined;

        // Polarisation SignalPolarisation () {get} {set}
        this.SignalPolarisation = undefined;

        // int SymbolRate () {get} {set}
        this.SymbolRate = undefined;

        // bool WestPosition () {get} {set}
        this.WestPosition = undefined;

    }

    // ILocator Clone ()
    Clone() {

    }

}

module.exports = bdatuner_isdbslocator;

