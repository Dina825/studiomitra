/**
 * @name rateLimiter
 *
 * @category Middleware
 * @module Cors
 * @description ratelimit
 */

const rateLimit = require("express-rate-limit");
const rateLimiterConfig = require("../config/ratelimiter");

const rateLimiter = rateLimit({
	windowMs: rateLimiterConfig.RL_DURATION_IN_MINS * 60 * 1000,
	limit: rateLimiterConfig.RL_HIT_COUNT,
	standardHeaders: "draft-7",
	legacyHeaders: false,
	message: {
		message: "Too many requests, please try again later.",
		data: {},
		error: {},
	},
});

module.exports = {
	rateLimiter,
};
