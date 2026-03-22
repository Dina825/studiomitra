const fs = require("fs");
const path = require("path");
const dateTime = require("date-and-time");

/**
 * ErrorLogger
 *
 * @category Logger
 * @module logger/logger
 * @class ErrorLogger
 */

class ErrorLogger {
	constructor() {
		const folderPath = "logger/log";
		const filename = "log/exception.log";

		if (!fs.existsSync(folderPath))
			fs.mkdirSync(folderPath, { recursive: true });

		this.filePath = path.join(__dirname, filename);
		this.errorLogStream = fs.createWriteStream(this.filePath, { flags: "a" });

		const reqLogPath = "logger/log/requests";
		const reqLogFilename =
			"log/requests/request-" +
			dateTime.format(new Date(), "YYYY-MM-DD") +
			".log";

		if (!fs.existsSync(reqLogPath))
			fs.mkdirSync(reqLogPath, { recursive: true });

		const reqFilePath = path.join(__dirname, reqLogFilename);
		this.requestLogStream = fs.createWriteStream(reqFilePath, { flags: "a" });

		const infoLogFilename = "log/info.log";
		const infoFilePath = path.join(__dirname, infoLogFilename);
		this.infoLogStream = fs.createWriteStream(infoFilePath, { flags: "a" });
	}

	logError(err) {
		const timestamp = dateTime.format(new Date(), "DD-MM-YYYY hh:mm:ss");
		const statusCode = err.status || 500;
		const errorMsg = err.message;
		const reqUrl = `url:${err.req.originalUrl} - status:${statusCode} - method:${err.req.method}`;
		const errorLog = `[${timestamp}] ${reqUrl} \n ${errorMsg} \n ${err.error}\n`;

		this.errorLogStream.write(errorLog);
	}

	logRequest(request) {
		let bodyContent = request.body;
		if (request.method == "GET") {
			bodyContent = request.query;
		}
		const timestamp = dateTime.format(new Date(), "DD-MM-YYYY hh:mm:ss");
		const reqUrl = `url: ${request.originalUrl}`;
		const method = `method: ${request.method}`;
		const headers = `headers: ${JSON.stringify(request.headers)}`;
		const body = `body: ${JSON.stringify(bodyContent)}`;
		const files = `files: ${JSON.stringify(
			request.files ? request.files : ""
		)}`;
		const requestLog = `[${timestamp}] \n ${reqUrl} \n ${method} \n ${headers} \n ${body} \n ${files} \n\n`;

		this.requestLogStream.write(requestLog);
	}

	logInfo(info) {
		const timestamp = dateTime.format(new Date(), "DD-MM-YYYY hh:mm:ss");
		const infoLog = `[${timestamp}] ${info}\n`;
		this.infoLogStream.write(infoLog);
	}

	logAndHandleError(error, request, next) {
		this.logError({
			message: error.message,
			error: error.stack || error.error,
			req: request,
		});
		next(error);
	}
}
module.exports = ErrorLogger;
