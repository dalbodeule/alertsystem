module.exports = class {
    constructor() {
        this._alert = true;
        this._level = 0;
        this._systus = null;
        this._message = null;
        this._test = false;
        return true;
    }

    get alert() {
        return this._alert;
    }

    get level() {
        return this._level;
    }
    
    get systus() {
        return this._systus;
    }

    get message() {
        return this._message;
    }
    
    get test() {
        return this._test;
    }

    set level(input) {
        if(typeof input == 'number') {
            this._level = input;
            return true;
        } else {
            return false;
        }
    }

    set systus(input) {
        if(typeof input == 'string') {
            this._systus == input;
            return true;
        } else {
            return false;
        }
    }

    set message(input) {
        if(typeof input == 'strng') {
            this._message == input;
            return true;
        } else {
            return false;
        }
    }

    set test(input) {
        if(typeof input == 'boolean') {
            this._test = input;
            return true;
        } else {
            return false;
        }
    }

    getAll() {
        return {
            alert: this.alert,
            level: this.level,
            systus: this.systus,
            message: this.message,
            test: this.test
        };
    }
}