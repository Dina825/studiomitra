/**
 * @name RequestLogMiddleware
 *
 * @category Middleware
 * @module RequestLogMiddleware
 * @description Writes all the requests into the log file
 */
const appSetting = require("../config/settings");
const AppLogger = require("../logger/app_logger");
const appLogger = new AppLogger();

/**
 * Writes all the requests into the log file
 *
 * @param {object}   request   request object
 * @param {object}   response  response object
 * @param {function} next      next lifecycle callback
 *
 * @returns {void}
 */
const requestLogMiddleware = function (request, _response, next) {
	const url = request.originalUrl.replace(/\/$/, "");
	if (request.method != "OPTIONS" && url) {
		if (!appSetting.LOG_RESTRICTED_ENDPOINTS.includes(request.originalUrl)) {
			appLogger.logRequest(request);
		}
	}

	next();
};

module.exports = requestLogMiddleware;
