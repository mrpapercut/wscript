class adox_group {
    constructor() {
        // string Name () {get} {set}
        this.Name = undefined;

        // _Catalog ParentCatalog () {get} {set} {set by ref}
        this.ParentCatalog = undefined;

        // Properties Properties () {get}
        this.Properties = undefined;

        // Users Users () {get}
        this.Users = undefined;

    }

    // RightsEnum GetPermissions (Variant, ObjectTypeEnum, Variant)
    GetPermissions(Variant, ObjectTypeEnum, Variant) {

    }

    // void SetPermissions (Variant, ObjectTypeEnum, ActionEnum, RightsEnum, InheritTypeEnum, Var...
    SetPermissions() {

    }

}

module.exports = adox_group;

