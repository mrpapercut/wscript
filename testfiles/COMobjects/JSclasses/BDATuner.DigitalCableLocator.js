class bdatuner_digitalcablelocator {
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

        // int PhysicalChannel () {get} {set}
        this.PhysicalChannel = undefined;

        // int ProgramNumber () {get} {set}
        this.ProgramNumber = undefined;

        // int SymbolRate () {get} {set}
        this.SymbolRate = undefined;

        // int TSID () {get} {set}
        this.TSID = undefined;

    }

    // ILocator Clone ()
    Clone() {

    }

}

module.exports = bdatuner_digitalcablelocator;

