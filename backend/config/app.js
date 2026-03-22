/**
 * Application Configuration - StudioMitra
 *
 * @category Config
 * @module app
 *
 * Custom Types
 * @typedef {{status:number, message:string, data:object, error:object}} TResponse
 */
require("dotenv").config();

module.exports = {
	/**
	 * Application port number
	 * @type {number}
	 */
	APP_PORT: process.env.APP_PORT || 8081,

	/**
	 * Application environment (local | staging | production)
	 * @type {string}
	 */
	APP_ENV: process.env.APP_ENV || "local",

	/**
	 * Application base URL
	 * @type {string}
	 */
	APP_URL: process.env.APP_URL || "http://localhost:8081",

	/**
	 * Application name
	 * @type {string}
	 */
	APP_NAME: process.env.APP_NAME || "StudioMitra",

	/**
	 * Application secret key (used for encryption)
	 * @type {string}
	 */
	APP_SECRET_KEY: process.env.APP_SECRET_KEY,

	/**
	 * Application default timezone
	 * @type {string}
	 */
	APP_TIMEZONE: process.env.TZ || "Asia/Kolkata",

	/**
	 * Frontend / Web client URL
	 * @type {string}
	 */
	WEB_URL: process.env.WEB_URL,

	/**
	 * Admin portal URL
	 * @type {string}
	 */
	PORTAL_URL: process.env.PORTAL_URL,

	/**
	 * Error reporting — notify via email when enabled
	 * @type {boolean}
	 */
	ERROR_REPORTING_NOTIFY: process.env.ERROR_REPORTING_NOTIFY || false,

	/**
	 * Error reporting recipient email addresses (comma-separated)
	 * @type {string[]}
	 */
	ERROR_REPORTING_MAIL: process.env.ERROR_REPORTING_MAIL
		? process.env.ERROR_REPORTING_MAIL.split(",")
		: [],

	/**
	 * Error reporting email subject
	 * @type {string}
	 */
	ERROR_REPORTING_SUBJECT: process.env.ERROR_REPORTING_SUBJECT || "StudioMitra API Error",

	/**
	 * Google OAuth Client ID (for social login)
	 * @type {string}
	 */
	GOOGLE_OAUTH_CLIENT_ID: process.env.GOOGLE_OAUTH_CLIENT_ID,

	/**
	 * Access-Control allowed origins (comma-separated)
	 * @type {string}
	 */
	ACCESS_CONTROL_ALLOWED_ORIGINS: process.env.ALLOWED_ORIGINS || "http://localhost:3000",

	/**
	 * Content-Security-Policy header value
	 * @type {string}
	 */
	CONTENT_SECURITY_POLICY: process.env.CONTENT_SECURITY_POLICY,

	/**
	 * OTP expiry duration in minutes
	 * @type {number}
	 */
	OTP_EXPIRY_TIME: process.env.OTP_EXPIRY_TIME || 10,

	/**
	 * Crypto token key for AES encryption/decryption
	 * @type {string}
	 */
	CRYPTO_TOKEN_KEY: process.env.CRYPTO_TOKEN_KEY,

	/**
	 * Crypto secure mode (e.g. aes-256-cbc)
	 * @type {string}
	 */
	CRYPTO_SECURE_MODE: process.env.CRYPTO_SECURE_MODE || "aes-256-cbc",

	/**
	 * Rate limiting — enabled flag
	 * @type {boolean}
	 */
	RL_ENABLED: process.env.RL_ENABLED || false,
};
