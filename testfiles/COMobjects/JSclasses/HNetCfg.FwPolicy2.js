class hnetcfg_fwpolicy2 {
    constructor() {
        // bool UnicastResponsesToMulticastBroadcastDisabled...
        this.Parameterized = undefined;

        // int CurrentProfileTypes () {get}
        this.CurrentProfileTypes = undefined;

        // NET_FW_MODIFY_STATE_ LocalPolicyModifyState () {g...
        this.LocalPolicyModifyState = undefined;

        // INetFwRules Rules () {get}
        this.Rules = undefined;

        // INetFwServiceRestriction ServiceRestriction () {g...
        this.ServiceRestriction = undefined;

    }

    // void EnableRuleGroup (int, string, bool)
    EnableRuleGroup(int, string, bool) {

    }

    // bool IsRuleGroupEnabled (int, string)
    IsRuleGroupEnabled(int, string) {

    }

    // void RestoreLocalFirewallDefaults ()
    RestoreLocalFirewallDefaults() {

    }

}

module.exports = hnetcfg_fwpolicy2;

