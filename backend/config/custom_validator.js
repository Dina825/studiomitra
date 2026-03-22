
const sanitizeHtml = require('sanitize-html');
const { validator_regex } = require('../config/settings');

class CustomValidator {
    constructor() {
        this.Errors = {};
        this.same = [];
        this.setting = {};
        this.err_found = [];
    }

    validate = (settings, valid) => {
        this.Errors = {};
        this.same = [];
        settings.forEach((setting, index) => {
            this.setting = setting;
            this.err_found = [];
            this.validateSetting(valid, index);
        });
    };

    validateSetting = (valid, index) => {
        for (const key in valid) {
            const validators = valid[key];
            if (Object.hasOwnProperty.call(this.setting, key)) {
                validators.forEach(opt => {
                    if (!this.err_found[key]) this.validateOption(opt, key, index);
                });
            } else if (validators.includes('Required')) {
                this.Errors = this[`isRequired`](key, index);
            }
        }
    };

    validateOption = (opt, key, index) => {
        switch (typeof opt) {
            case "string":
                this.handleStringOption(opt, key, index);
                break;
            case "object":
                this.handleObjectOption(opt, key, index);
                break;
        }
    };

    handleStringOption = (opt, key, index) => {
        const regex = /^([^\[\]]+)(?:\[(\d+)\])?$/;
        const matches = opt.match(regex);

        if (matches) {
            const [, firstPart, limit] = matches;
            this.handleMatchedStringOption(firstPart, limit, key, index);
        } else {
            this.handleUnmatchedStringOption(opt, key, index);
        }
    };

    handleMatchedStringOption = (firstPart, limit, key, index) => {
        if (limit && this[`is${firstPart}`]) {
            this.Errors = this[`is${firstPart}`](key, index, false, limit);
        } else if (this[`is${firstPart}`]) {
            this.Errors = this[`is${firstPart}`](key, index);
        }
    };

    handleUnmatchedStringOption = (opt, key, index) => {
        if (this[`is${opt}`]) {
            this.Errors = this[`is${opt}`](key, index);
        }
    };

    handleObjectOption = (opt, key, index) => {
        if (this[`is${opt.type}`]) {
            this.Errors = this[`is${opt.type}`](key, index, opt.ref);
        }
    };

    isString = (key, index) => {
        let _this = this;
        return {
            ...this.Errors,
            ... typeof (this.setting[key]) != 'string' ? function () {
                _this.err_found[key] = true;
                return { [index]: { ..._this.Errors[index], [key]: `${key}.string.required` } };
            }() : {}
        }
    };

    isEmpty = (key, index) => {
        let empty_var = {};
        if (typeof (this.setting[key]) == 'string') {
            if (this.setting[key].trim().length === 0) {
                this.err_found[key] = true;
                empty_var = { [index]: { ...this.Errors[index], [key]: `${key}.empty` } };
            }
        }
        return {
            ...this.Errors,
            ...empty_var
        };
    }

    isNumber = (key, index) => {
        let _this = this;
        return {
            ...this.Errors,
            ... typeof (this.setting[key]) != 'number' ? function () {
                _this.err_found[key] = true;
                return { [index]: { ..._this.Errors[index], [key]: `${key}.number.required` } }
            }() : {}
        }
    };

    isRequired = (key, index) => {
        let _this = this;
        return {
            ...this.Errors,
            ... !this.setting.hasOwnProperty(key) ? function () {
                _this.err_found[key] = true;
                return { [index]: { ..._this.Errors[index], [key]: `${key}.required` } };
            }() : {}
        }
    }

    isSame = (key, index) => {
        let er = {};
        let theSame = {
            index: index,
            value: this.setting.key
        };

        this.same.forEach(_same => {
            if (this.setting.key == _same.value) {
                this.err_found[key] = true;
                er = { [index]: { ...this.Errors[index], [key]: `${key}.same||${_same.index}:${key}` } };
            }
        });
        this.same.push(theSame);
        return {
            ...this.Errors,
            ...er
        }
    }

    isFile = (key, index, ref = false) => {
        let er = {};
        if (ref) return {
            ...this.Errors,
            ... this.validateRef(key, index, ref)
        };
        return {
            ...this.Errors,
            ...er
        }
    }

    isRegex = (key, index) => {
        let _this = this;
        var special_char_pattern = /[$\!\@\#\%\^\&\*\(\)<>]/;
        return {
            ...this.Errors,
            ...special_char_pattern.test(this.setting[key]) ? function () {
                _this.err_found[key] = true;
                return { [index]: { ..._this.Errors[index], [key]: `${key}.regex` } };
            }() : {}
        };
    }

    isSanitize = (key, index) => {
        let _this = this;
        return {
            ...this.Errors,
            ...sanitizeHtml(this.setting[key]) !== this.setting[key] ? function () {
                _this.err_found[key] = true;
                return { [index]: { ..._this.Errors[index], [key]: `${key}.sanitized_html` } };
            }() : {}
        };
    }

    isMin = (key, index, limit) => {
        let min_var = {};
        if (typeof (this.setting[key]) == 'string') {
            if (this.setting[key].trim().length < limit) {
                this.err_found[key] = true;
                min_var = { [index]: { ...this.Errors[index], [key]: `${key}.min` } };
            }
        }
        return {
            ...this.Errors,
            ...min_var
        };
    }

    isMax = (key, index, limit) => {
        let max_var = {};
        if (typeof (this.setting[key]) == 'string') {
            if (this.setting[key].trim().length > limit) {
                this.err_found[key] = true;
                max_var = { [index]: { ...this.Errors[index], [key]: `${key}.max` } };
            }
        }
        return {
            ...this.Errors,
            ...max_var
        }
    }

    validateRef = (key, index, ref) => {
        let _this = this;
        let regexPattern = false;
        let validate = ref.valid[this.setting[ref.target]];
        if (validate) {
            regexPattern = new RegExp(`\\.(${validate.join('|')})$`, 'i');
            return !regexPattern.test(this.setting[key]) ?
                function () {
                    _this.err_found[key] = true;
                    return { [index]: { ..._this.Errors[index], [key]: `${key}.extension||${ref.valid[_this.setting[ref.target]]}` } }
                }() : {};
        }
        return ref.unique ? function () {
            _this.err_found[key] = true;
            return { [index]: { ..._this.Errors[index], [ref.target]: `${ref.target}.types` } }
        }() : {};
    }

    testErrorMessage = (message, err, key) => {
        const code = err.code[key];
        for (const errKey in code) {
            message = this.checkMessage(message, err, key, code, errKey);
        }
        return message;
    }

    checkMessage = (message, err, key, code, errKey) => {
        if (Object.hasOwnProperty.call(code, errKey)) {
            const error = code[errKey];
            let check = error.split("||");
            if (check) {
                message = this.validateMessage(message, check, err, key, errKey);
            }
        }
        return message
    }

    validateMessage = (message, check, err, key, errKey) => {
        let errorMessage = err.prefs.messages[check[0]];
        let errorType = check[0].split(".");
        switch (errorType[1]) {
            case "same":
                if (check[1]) {
                    let check1 = check[1].split(":");
                    if (errorMessage) message = { ...message, [key]: { ...message[key], [errKey]: this.rewrite(errorMessage.rendered, { index: check1 }) } };
                }
                break;
            case "extension":
                if (errorMessage) message = { ...message, [key]: { ...message[key], [errKey]: this.rewrite(errorMessage.rendered, { extension: check[1] }) } };
                break;
            default:
                if (errorMessage) message = { ...message, [key]: { ...message[key], [errKey]: errorMessage.rendered } };
                break;
        }
        return message;
    }

    setErrorMessage = (errors) => {
        errors.forEach((err) => {
            let message = {};
            if (typeof (err.code) == 'object') {
                for (const key in err.code) {
                    if (Object.hasOwnProperty.call(err.code, key)) {
                        message = this.testErrorMessage(message, err, key);
                    }
                }
                err.message = message;
            }
            else {
                let error = err.prefs.messages[err.code];
                if (error) err.message = { ...message, [err.code]: error.rendered };
            }
        })
        return errors
    }

    rewrite = (given_string, data) => {
        Object.keys(data).forEach((k) => {
            const regex = new RegExp(`{#${k}}`, 'g');
            given_string = given_string.replace(regex, data[k]);
        })
        return given_string;
    }

    isValid = () => Object.keys(this.Errors).length === 0;


    commonRegexValidate = (opt, key) => {
        // const regex = /[0-9!@#$%^&*()\-_+={}[\]:;"'<>,.?\/|\\]/;
        let regex = "";
        if (key == 'email' || key == 'email_address') {
            regex = validator_regex.filter_email;
        } else if(key == 'mobile_number' || key == 'contact_number') {
            regex = validator_regex.filter_num;
        } else if(key == 'status' || key == 'label' || key == 'name' || key == 'order' || key == 'is_active' || key == 'code' || key == 'media_type' || key == 'program_name' || key == 'campaign_name' || key == 'reference_method' || key == 'total_amount') {
            regex = validator_regex.filter_char_num_underscore;
        } else if(key == 'title'){
            regex = validator_regex.filter_title;
        } else if(key == 'news_datetime'){
            regex = validator_regex.filter_date_time;
        } else {
            regex = validator_regex.filter_char_only;
        }
        const matches = regex.test(opt);
        if (matches) {
            opt = opt.replace(regex, "");
        }
        return opt;
    };
}

module.exports = CustomValidator;
