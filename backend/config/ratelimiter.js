/**
 * Application RateLimit configuration
 *
 * @category Config
 * @module RateLimit
 */
require("dotenv").config();

module.exports = {
	/**
	 * Application Rate Limit Request Hit Count
	 *
	 * @type {number}
	 */
	RL_HIT_COUNT: process.env.RL_HIT_COUNT || 100,

	/**
	 * Application Rate Limit Request Hit Duration in minutes
	 *
	 * @type {number}
	 */
	RL_DURATION_IN_MINS: process.env.RL_DURATION_IN_MINS || 1,
	/**
	 * Application Rate Limit Request Hit Count
	 *
	 * @type {number}
	 */
	RL_BOT_HIT_COUNT: 5,

	/**
	 * Application Rate Limit Request Hit Duration in minutes
	 *
	 * @type {number}
	 */
	RL_BOT_DURATION_IN_MINS: 1,
};
