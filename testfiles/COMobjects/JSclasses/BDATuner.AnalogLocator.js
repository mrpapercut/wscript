class bdatuner_analoglocator {
    constructor() {
        // int CarrierFrequency () {get} {set}
        this.CarrierFrequency = undefined;

        // FECMethod InnerFEC () {get} {set}
        this.InnerFEC = undefined;

        // BinaryConvolutionCodeRate InnerFECRate () {get} {set}
        this.InnerFECRate = undefined;

        // ModulationType Modulation () {get} {set}
        this.Modulation = undefined;

        // FECMethod OuterFEC () {get} {set}
        this.OuterFEC = undefined;

        // BinaryConvolutionCodeRate OuterFECRate () {get} {set}
        this.OuterFECRate = undefined;

        // int SymbolRate () {get} {set}
        this.SymbolRate = undefined;

        // tagAnalogVideoStandard VideoStandard () {get} {set}
        this.VideoStandard = undefined;

    }

    // ILocator Clone ()
    Clone() {

    }

}

module.exports = bdatuner_analoglocator;

