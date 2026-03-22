/**
 * Application jwt configuration
 *
 * @category Config
 * @module jwt
 */
require("dotenv").config();

module.exports = {
	/**
	 * JWT Encryption key
	 *
	 * @type {string}
	 */
	JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
	/**
	 * JWT Token expiration time
	 *
	 * @type {string}
	 */
	JWT_EXPIRY_TIME: process.env.JWT_EXPIRY_TIME,
	/**
	 * JWT Token expiration time for app
	 *
	 * @type {string}
	 */
	JWT_EXPIRY_TIME_APP: process.env.JWT_EXPIRY_TIME_APP,
	/**
	 * JWT Socket Encryption key
	 *
	 * @type {string}
	 */
	JWT_SOCKET_SECRET_KEY: process.env.JWT_SOCKET_SECRET_KEY,
	/**
	 * Socket Application secret key
	 *
	 * @type {string}
	 */
	SOCKET_APP_SECRET_KEY: process.env.SOCKET_APP_SECRET_KEY,
};
