/**
 * JWT Authentication Middleware - StudioMitra
 *
 * @category Middleware
 * @module middlewares/jwt
 * @description Verifies all authenticated requests using Jose JWT.
 */

const JWT = require("../services/jwt");
const responseCode = require("../config/response_code");

const jwtMiddleware = async function (request, response, next) {
	const jwtService = new JWT();

	const authToken = request.headers.authorization;

	if (!authToken) {
		return response.status(responseCode.UNAUTHORIZED).json({
			status: responseCode.UNAUTHORIZED,
			message: "Unauthorized. Access token is missing.",
			data: {},
			error: {},
		});
	}

	try {
		const jwtRes = await jwtService.verify(authToken);
		const userData = jwtService.decrypt(jwtRes["payload"]["data"]);

		// Attach authenticated user to request
		request.authUser = userData;

		next();
	} catch (error) {
		if (error.message && error.message.includes("exp")) {
			return response.status(responseCode.UNAUTHORIZED).json({
				status: responseCode.UNAUTHORIZED,
				message: "Access token has expired. Please login again.",
				data: {},
				error: { tokenExpired: true },
			});
		}

		return response.status(responseCode.UNAUTHORIZED).json({
			status: responseCode.UNAUTHORIZED,
			message: "Unauthorized. Invalid access token.",
			data: {},
			error: {},
		});
	}
};

module.exports = jwtMiddleware;
