/**
 * Application crypto configuration
 *
 * @category Config
 * @module crypto
 */
require("dotenv").config();

module.exports = {
	/**
	 * Admin crypto private key
	 *
	 * @type {string}
	 */
	ADMIN_CRYPTO_PRIVATE_KEY: process.env.ADMIN_CRYPTO_PRIVATE_KEY,
	/**
	 * Web crypto private key
	 *
	 * @type {string}
	 */
	WEB_CRYPTO_PRIVATE_KEY: process.env.WEB_CRYPTO_PRIVATE_KEY,
	/**
	 * Encryption key for internal use
	 *
	 * @type {string}
	 */
	INTERNAL_ENCRYPTION_KEY: process.env.CRYPTO_TOKEN_KEY,
	/**
	 * Encryption mode for internal use
	 *
	 * @type {string}
	 */
	INTERNAL_ENCRYPTION_MODE: process.env.CRYPTO_SECURE_MODE,
};
