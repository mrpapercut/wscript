class adodb_command_6_0 {
    constructor() {
        // _Connection ActiveConnection () {get} {set} {set by ref}
        this.ActiveConnection = undefined;

        // Variant CommandStream () {get} {set by ref}
        this.CommandStream = undefined;

        // string CommandText () {get} {set}
        this.CommandText = undefined;

        // int CommandTimeout () {get} {set}
        this.CommandTimeout = undefined;

        // CommandTypeEnum CommandType () {get} {set}
        this.CommandType = undefined;

        // string Dialect () {get} {set}
        this.Dialect = undefined;

        // string Name () {get} {set}
        this.Name = undefined;

        // bool NamedParameters () {get} {set}
        this.NamedParameters = undefined;

        // Parameters Parameters () {get}
        this.Parameters = undefined;

        // bool Prepared () {get} {set}
        this.Prepared = undefined;

        // Properties Properties () {get}
        this.Properties = undefined;

        // int State () {get}
        this.State = undefined;

    }

    // void Cancel ()
    Cancel() {

    }

    // _Parameter CreateParameter (string, DataTypeEnum, ParameterDirectionEnum, int, Variant)
    CreateParameter(string, DataTypeEnum, ParameterDirectionEnum, int, Variant) {

    }

    // _Recordset Execute (Variant, Variant, int)
    Execute(Variant, Variant, int) {

    }

}

module.exports = adodb_command_6_0;

