/**
 * Application Helpers - StudioMitra
 *
 * @category Helpers
 * @module common
 */
const path = require("path");
const mongoose = require("mongoose");
const JWTService = require("../services/jwt");
const dateTime = require("date-and-time");
const StorageService = require("../services/storage");
const { BAD_REQUEST } = require("../config/response_code");
const appValidator = require("../services/validator");

require("dotenv").config();

/**
 * Get auth user data from token
 *
 * @param {string} token
 * @returns {Promise<object>} authData
 */
const getAuthData = async function (token) {
	const jwtService = new JWTService();
	try {
		const jwtResp = await jwtService.verify(token);
		return jwtService.decrypt(jwtResp["payload"]["data"]);
	} catch (error) {
		console.error("Helper getAuthData Error:", error.message);
		return null;
	}
};

/**
 * Check if Id is a valid Mongodb ObjectId
 *
 * @param {string} id
 * @returns {boolean}
 */
const isValidObjectId = (id) => {
	if (typeof id !== "string") return false;
	const regex = /^[0-9a-fA-F]{24}$/;
	return regex.test(id);
};

/**
 * Validator helper for requests
 */
const reqValidator = (schema, data, response) => {
	const validator = new appValidator(schema, data);
	validator.validate();

	if (!validator.isValid()) {
		return response.status(BAD_REQUEST).json(validator.formatErrors());
	}
	return null;
};

/**
 * Store a single file (uses the storage service)
 */
const storeSingleFile = async (file, filePath) => {
	let extens = path.extname(file.originalname);
	let fileLocation = filePath + "/" + new Date().getTime() + extens;
	const storage = new StorageService();
	let res = await storage.upload(fileLocation, file);
	return res ? fileLocation : "";
};

/**
 * App Timezone
 */
const appTimeZone = () => {
	return process.env.TZ || "Asia/Kolkata";
};

/**
 * Date Formatter
 */
const formatDate = (date, format = "DD-MMM-YYYY") => {
	if (!date) return "";
	return dateTime.format(
		typeof date === "string" ? new Date(date) : date,
		format
	);
};

/**
 * Time Ago Formatter
 */
const formatTimeAgo = (date) => {
	const d = new Date(date);
	const now = new Date();
	const diff = now.getTime() - d.getTime();

	if (diff < 0) return "in the future";

	const sec = Math.floor(diff / 1000);
	if (sec < 60) return `${sec}s ago`;

	const min = Math.floor(sec / 60);
	if (min < 60) return `${min}m ago`;

	const hour = Math.floor(min / 60);
	if (hour < 24) return `${hour}h ago`;

	const day = Math.floor(hour / 24);
	if (day < 30) return `${day}d ago`;

	const month = Math.floor(day / 30);
	if (month < 12) return `${month}mo ago`;

	return `${Math.floor(month / 12)}y ago`;
};

/**
 * Convert string to Sentence Case
 */
const convertToSentenceCase = (str) => {
	if (!str) return "";
	return str
		.toLowerCase()
		.split(" ")
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(" ");
};

/**
 * Check if string is valid JSON
 */
function isValidJSON(str) {
	try {
		JSON.parse(str);
		return true;
	} catch (e) {
		return false;
	}
}

/**
 * Remove HTML tags from content
 */
async function removeHtmlTags(content) {
	if (!content) return "";
	return content.replace(/<[^>]*>/g, "");
}

module.exports = {
	getAuthData,
	isValidObjectId,
	reqValidator,
	storeSingleFile,
	appTimeZone,
	formatDate,
	formatTimeAgo,
	convertToSentenceCase,
	isValidJSON,
	removeHtmlTags,
};
