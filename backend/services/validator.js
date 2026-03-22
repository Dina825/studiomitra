/**
 * Joi Validator
 *
 * @category Services
 * @module services/validator
 * @class Validator
 */
class Validator {
	/**
	 * Class constructor
	 *
	 * @constructor
	 *
	 * @param {object} schema  joi validation schema
	 * @param {object} input   input values
	 * @param {object} options joi validation options
	 *
	 * @returns {void}
	 */
	constructor(schema, input, options) {
		this._validatorInstance = undefined;
		this._schema = schema;
		this._input = input;
		this._options = options;

		if (!this._options) {
			this._options = {
				allowUnknown: true,
				stripUnknown: true,
				abortEarly: false,
				errors: {
					escapeHtml: true,
					label: false,
				},
			};
		}
	}

	/**
	 * Validates the input
	 *
	 * @returns {object} validation class object
	 */
	validate() {
		this._validatorInstance = this._schema.validate(this._input, this._options);
		return this;
	}

	/**
	 * Formats the validation joi error message
	 *
	 * @param {string} message
	 *
	 * @returns {object}  validation error message
	 */
	formatErrors(message) {
		let errorMessages = {};
		if (this._validatorInstance.error) {
			this._validatorInstance.error.details.map((x) => {
				const path = x.path.join(".");
				const msg = x.message;
				const keys = path.split(".");

				let currentLevel = errorMessages;

				keys.forEach((key, index) => {
					if (index === keys.length - 1) {
						currentLevel[key] = msg;
					} else {
						if (!currentLevel[key]) {
							currentLevel[key] = {};
						}
						currentLevel = currentLevel[key];
					}
				});
			});
		}

		return {
			message: message ? message : "Validation failed. Please check the inputs",
			data: {},
			error: errorMessages,
		};
	}

	/**
	 * Formats the validation error messages in JSON format
	 *
	 * @param {string} message
	 *
	 * @returns {object} validation error messages in JSON format
	 */
	formatArrayErrors(message) {
		let errorMessages = {};
		if (this._validatorInstance.error) {
			this._validatorInstance.error.details.map((x) => {
				const path = x.path.join(".");
				const msg = x.message;
				const keys = path.split(".");

				let currentLevel = errorMessages;
				keys.forEach((key, index) => {
					if (index === keys.length - 1) {
						currentLevel[key] = msg;
					} else {
						if (!currentLevel[key]) {
							currentLevel[key] = {};
						}
						currentLevel = currentLevel[key];
					}
				});
			});
		}

		return {
			message: message ? message : "Validation failed",
			data: {},
			error: errorMessages,
		};
	}

	/**
	 * Checks whether validation passed/failed
	 *
	 * @returns {boolean} true on validation passed, else returns false
	 */
	isValid() {
		if (this._validatorInstance.error) {
			return false;
		}

		return true;
	}
}

module.exports = Validator;
