/**
 * @name ErrorHandler
 *
 * @category Middleware
 * @module ErrorHandler
 * @description Handles the error on the application
 */
const appConfig = require("../config/app.js");
const MailService = require("../services/mail.js");
const AppLogger = require("../logger/app_logger.js");
const { getAuthData } = require("../helpers/helper.js");

const appLogger = new AppLogger();

/**
 * Handles ther error response
 *
 * @param {Error}    error     error object
 * @param {object}   request   request object
 * @param {object}   response  response object
 * @param {function} next      next lifecycle callback
 *
 * @returns {void}
 */
module.exports = errorHandler = async function (
	error,
	request,
	_response,
	_next
) {
	if (error) {
		console.log(error);
		//log the error on the exception log
		appLogger.logError({
			message: error.message ? error.message : error.toString(),
			error: error.stack || error.error,
			req: request,
		});

		//email the error to developers
		if (appConfig.ERROR_REPORTING_NOTIFY == "true") {
			let user = {};
			var token = request.headers?.authorization;
			if (token) {
				let authUser = await getAuthData(token);
				user = {
					id: authUser.id,
					firstname: authUser.firstname,
					surname: authUser.surname,
					email_address: authUser.email_address,
					role: authUser.role?.name,
				};
			}

			var fullUrl =
				request?.protocol + "://" + request.get("host") + request?.originalUrl;

			var emailInput = {
				to: appConfig.ERROR_REPORTING_MAIL,
				subject: appConfig.ERROR_REPORTING_SUBJECT,
				template: "error",
				data: {
					message: error.toString(),
					url: fullUrl,
					stack: error.stack,
					inputs: {
						query: JSON.stringify(request.query),
						param: JSON.stringify(request.params),
						body: JSON.stringify(request.body),
					},
					authUser: JSON.stringify(user),
				},
			};

			const mailHelper = new MailService();
			await mailHelper.send(emailInput);
		}
	}
};
