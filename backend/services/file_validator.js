/**
 * Custom FileValidator
 *
 * @category Services
 * @module services/FileValidator
 * @class Validator
 */

const sizeOfImage = require("buffer-image-size");
const path = require("path");

class FileValidator {
	/**
	 * Class constructor
	 *
	 * @constructor
	 *
	 * @param {object} validation  validation rules
	 * @param {object} input   input values
	 *
	 * @returns {void}
	 */
	constructor(validation, input) {
		this._validation = validation;
		this._input = input;
	}

	/**
	 * Validates the input
	 *
	 * @returns {object} response
	 */
	async validate() {
		let response = {
			isValid: 1,
			errors: {},
		};

		for (let key in this._validation) {
			let settings = this._validation[key].settings;
			let rules = this._validation[key].rules;
			let messages = this._validation[key].messages;

			let isError = false;

			for (let r in rules) {
				let rule = rules[r];

				if (!isError) {
					if (settings.is_array && rule !== "length") {
						for (let i in this._input[key]) {
							let arrayError = await this.applyRule(
								rule,
								this._input[key][i],
								settings
							);
							if (arrayError) {
								isError = true;
								response.isValid = 0;
								if (response.errors[key]) {
									let existingErrors = response.errors[key];
									existingErrors[i] = messages[rule];
									response.errors[key] = existingErrors;
								} else {
									let errord = {};
									errord[i] = messages[rule];
									response.errors[key] = errord;
								}
							}
						}
					} else {
						let inputError = await this.applyRule(
							rule,
							this._input[key],
							settings
						);
						if (inputError) {
							isError = true;
							response.isValid = 0;
							response.errors[key] = messages[rule];
						}
					}
				}
			}
		}

		return response;
	}

	/**
	 * Validates the input, specifically the 'image' field within the sections of the input JSON object.
	 *
	 * @returns {object} response - The validation response object.
	 * @property {number} response.isValid - Flag indicating if the input is valid (1) or not (0).
	 * @property {object} response.errors - Object containing any encountered validation errors.
	 */
	async validateSection() {
		let response = {
			isValid: 1,
			errors: {},
		};

		for (let sectionIndex in this._input.sections) {
			let section = this._input.sections[sectionIndex];
			let sectionErrors = {};

			for (let key in this._validation) {
				let settings = this._validation[key].settings;
				let rules = this._validation[key].rules;
				let messages = this._validation[key].messages;

				for (let r in rules) {
					let rule = rules[r];
					let inputError = await this.applyRule(rule, section.image, settings);

					if (inputError) {
						response.isValid = 0;
						sectionErrors[key] = messages[rule];
					}
				}

				if (Object.keys(sectionErrors).length > 0) {
					response.errors[sectionIndex] = sectionErrors;
				}
			}
		}

		return response;
	}

	/**
	 * apply rule and validate
	 * @param {string} rule
	 * @param {string} inputValue
	 * @param {object} settings
	 * @returns {boolean} response
	 */
	async applyRule(rule, inputValue, settings) {
		let response = false;
		switch (rule) {
			case "required":
				if (
					inputValue == undefined ||
					inputValue == "" ||
					inputValue == "null"
				) {
					response = true;
				}
				break;
			case "extensions":
				let allowedExtensions = settings.extensions ? settings.extensions : [];

				if (inputValue && allowedExtensions) {
					response = await this.validateExtension(
						inputValue,
						allowedExtensions
					);
				}
				break;
			case "max":
				if (inputValue) {
					let allowedSize = settings.size ? settings.size : 0;
					if (inputValue.size && allowedSize) {
						if (inputValue.size / (1024 * 1024) > allowedSize) {
							response = true;
						}
					}
				}
				break;
			case "length":
				if (inputValue?.length > settings?.length) {
					response = true;
				}
				break;
			case "dimension":
				if (inputValue) {
					try {
						let size = sizeOfImage(inputValue.buffer);
						if (settings.dimension) {
							let dimension = settings.dimension;
							if (
								dimension["width"] != size["width"] ||
								dimension["height"] != size["height"]
							) {
								response = true;
							}
						}
					} catch (error) {
						response = true;
					}
				}
				break;
		}

		return response;
	}

	/**
	 * validate extensions
	 *
	 * @param {file} inputValue
	 * @param {array} allowed_extensions
	 * @returns
	 */
	async validateExtension(inputValue, allowed_extensions) {
		let response = false;

		let extname = path.extname(inputValue.originalname).toLowerCase();
		extname = extname ? extname.split(".").pop() : "";

		if (!allowed_extensions.includes(extname)) {
			return true;
		}

		const fileType = await import("file-type");

		const fileTypes = await fileType.fileTypeFromBuffer(inputValue.buffer);

		if (!fileTypes || !allowed_extensions.includes(fileTypes.ext)) {
			return true;
		}

		return response;
	}
}

module.exports = FileValidator;
