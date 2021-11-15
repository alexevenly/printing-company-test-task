const {setWorldConstructor} = require("@cucumber/cucumber");

class CustomWorld {
    constructor({parameters}) {
        this.context = {};
        this.variable = 0;
    }
}

setWorldConstructor(CustomWorld);