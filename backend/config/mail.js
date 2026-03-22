/**
 * Application mail configuration
 *
 * @category Config
 * @module mail
 */
require("dotenv").config();

module.exports = {
	/**
	 * Application mailgun api key
	 *
	 * @type {string}
	 */
	MAILGUN_API_KEY: process.env.MAILGUN_API_KEY,
	/**
	 * Application mailgun domain
	 *
	 * @type {string}
	 */
	MAILGUN_DOMAIN: process.env.MAILGUN_DOMAIN,
	/**
	 * Application mailgun mail from email address
	 *
	 * @type {string}
	 */
	MAIL_FROM_ADDRESS: process.env.MAIL_FROM_ADDRESS,
	/**
	 * Application mailgun mail from name
	 *
	 * @type {string}
	 */
	MAIL_FROM_NAME: process.env.MAIL_FROM_NAME,
};
