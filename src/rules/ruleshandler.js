import rules from './rules.json';

export default class RulesHandler {
    constructor() {
        this.rules = rules;
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