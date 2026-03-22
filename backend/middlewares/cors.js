/**
 * @name Cors
 *
 * @category Middleware
 * @module Cors
 * @description Creates the cors response headers
 */

const {
	ACCESS_CONTROL_ALLOWED_ORIGINS,
	CONTENT_SECURITY_POLICY,
} = require("../config/app");

/**
 * Returns the cors response headers
 *
 * @param   {object}   request
 * @param   {object}   response
 * @param   {function} next
 *
 * @returns {void}
 */
const corsMiddleware = function (request, response, next) {
	const allowedOrigins = ACCESS_CONTROL_ALLOWED_ORIGINS
		? ACCESS_CONTROL_ALLOWED_ORIGINS.split(",")
		: [];
	const origin = request.headers.origin;
	if (allowedOrigins.includes(origin)) {
		response.header("Access-Control-Allow-Origin", origin);
	}

	// const userAgent = request.get("user-agent") || "";
	// console.log("userAgent", userAgent);
	// if (
	// 	userAgent.includes("facebookexternalhit") ||
	// 	userAgent.includes("Facebot") ||
	// 	userAgent.includes("FacebookBot") ||
	// 	userAgent.includes("Go-http-client")
	// ) {
	// 	response.header("Access-Control-Allow-Origin", "*");
	// }

	response.header("Content-Security-Policy", CONTENT_SECURITY_POLICY);
	response.header("Access-Control-Allow-Methods", "GET,POST,DELETE,OPTIONS");
	response.header("Access-Control-Allow-Headers", "*");
	response.header(
		"Access-Control-Expose-Headers",
		"Authorization, Content-Type, content-type, X-Timezone, X-Csrf-Token"
	);
	response.setHeader("Access-Control-Allow-Credentials", true);
	response.header("Cache-Control", "no-cache, no-store, must-revalidate");
	response.header("pragma", "no-cache");
	response.header("expires", "0");

	if (request.method === "OPTIONS") {
		return response.status(200).end();
	}

	next();
};

module.exports = corsMiddleware;
