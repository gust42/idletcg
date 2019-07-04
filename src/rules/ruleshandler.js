import rules from './rules.json';

export default class RulesHandler {
    constructor() {
        this.rules = rules;
    }

    checkActiveRules(state) {
        let changed = false;
        if (!state.tradebindertab.acquired && state.badcards.amount + state.goodcards.amount + state.metacards.amount >= this.rules['CardsForTradebinder'].value) {
            state.tradebindertab.acquired = true;
            changed = true;
        }
        return changed ? state : false;
    }

    getRule(name) {
        if (this.rules[name])
            return this.rules[name];
        else 
            throw new Error('No rule with name' + name);
    }

    getRuleValue(name) {
        if (this.rules[name])
            return this.rules[name].value;
        else 
            throw new Error('No rule with name' + name);
    }
}