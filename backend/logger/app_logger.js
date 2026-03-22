/**
 * AppLogger
 *
 * @category Logger
 * @module logger/logger
 * @class AppLogger
 */

const fs = require("fs");
const dateTime = require("date-and-time");

class AppLogger {
	constructor() {
		//Log folder path
		this.folderPath = "logger/log";

		//Error log
		this.errorLogPath = "logger/log/exception";
		this.expLogFilename = `logger/log/exception/exception-${dateTime.format(
			new Date(),
			"YYYY-MM-DD"
		)}.log`;

		//Request log
		this.reqLogPath = "logger/log/requests";
		this.reqLogFilename = `logger/log/requests/request-${dateTime.format(
			new Date(),
			"YYYY-MM-DD"
		)}.log`;

		//Info log
		this.infoLogPath = "logger/log/info";
		this.infoLogFilename = `logger/log/info/info-${dateTime.format(
			new Date(),
			"YYYY-MM-DD"
		)}.log`;

		//Mail log
		this.mailLogPath = "logger/log/mail";
		this.mailLogFilename = `logger/log/mail/mail-${dateTime.format(
			new Date(),
			"YYYY-MM-DD"
		)}.log`;

		//Socket log
		this.socketLogPath = "logger/log/socket";
		this.socketLogFilename = `logger/log/socket/socket-${dateTime.format(
			new Date(),
			"YYYY-MM-DD"
		)}.log`;
	}

	/**
	 * write the log message
	 * @param {string} log_message
	 */
	writeLogStream(log_type = "request", log_message = null) {
		if (!fs.existsSync(this.reqLogPath) && log_type == "request") {
			fs.mkdirSync(this.reqLogPath, { recursive: true });
		}

		if (!fs.existsSync(this.errorLogPath) && log_type == "error") {
			fs.mkdirSync(this.errorLogPath, { recursive: true });
		}

		if (!fs.existsSync(this.infoLogPath) && log_type == "info") {
			fs.mkdirSync(this.infoLogPath, { recursive: true });
		}

		if (!fs.existsSync(this.mailLogPath) && log_type == "mail") {
			fs.mkdirSync(this.mailLogPath, { recursive: true });
		}

		if (!fs.existsSync(this.socketLogPath) && log_type == "socket") {
			fs.mkdirSync(this.socketLogPath, { recursive: true });
		}

		let logFilePath = this.reqLogFilename;
		if (log_type == "error") {
			logFilePath = this.expLogFilename;
		} else if (log_type == "info") {
			logFilePath = this.infoLogFilename;
		} else if (log_type == "mail") {
			logFilePath = this.mailLogFilename;
		} else if (log_type == "socket") {
			logFilePath = this.socketLogFilename;
		}

		fs.access(logFilePath, fs.constants.F_OK, (err) => {
			let writeStream = fs.createWriteStream(logFilePath, {
				flags: "a",
			});

			// Write the log entry to the file
			writeStream.write(log_message);

			writeStream.on("error", (error) => {
				console.error("Error writing to the log file:");
				console.log(error);
			});

			writeStream.end(() => {});
		});
	}

	/**
	 * Log the error information
	 *
	 * @param {object} error - The error object
	 *
	 */
	logError(error) {
		this.expLogFilename = `logger/log/exception/exception-${dateTime.format(
			new Date(),
			"YYYY-MM-DD"
		)}.log`;

		const timestamp = dateTime.format(new Date(), "DD-MM-YYYY hh:mm:ss");
		const statusCode = error.status || 500;
		const errorMsg = error.message;
		const reqUrl = `url:${error.req.originalUrl} - status:${statusCode} - method:${error.req.method}`;
		const errorLog = `[${timestamp}] ${reqUrl} \n ${errorMsg} \n ${error.error}\n`;

		this.writeLogStream("error", errorLog);
	}

	/**
	 * Log the request information
	 *
	 * @param {object} request - The request object
	 *
	 */
	logRequest(request) {
		let bodyContent = request.body;
		if (request.method === "GET") {
			bodyContent = request.query;
		}

		this.reqLogFilename = `logger/log/requests/request-${dateTime.format(
			new Date(),
			"YYYY-MM-DD"
		)}.log`;

		const timestamp = dateTime.format(new Date(), "DD-MM-YYYY hh:mm:ss");
		const reqUrl = `url: ${request.originalUrl}`;
		const method = `method: ${request.method}`;
		const headers = `headers: ${JSON.stringify(request.headers)}`;
		const body = `body: ${JSON.stringify(bodyContent)}`;
		const files = `files: ${JSON.stringify(request.files || "")}`;
		const requestLog = `[${timestamp}] \n ${reqUrl} \n ${method} \n ${headers} \n ${body} \n ${files} \n\n`;

		this.writeLogStream("request", requestLog);
	}

	/**
	 * Log the information
	 *
	 * @param {object} info - The info object
	 *
	 */
	logInfo(info) {
		this.infoLogFilename = `logger/log/info/info-${dateTime.format(
			new Date(),
			"YYYY-MM-DD"
		)}.log`;

		const timestamp = dateTime.format(new Date(), "DD-MM-YYYY hh:mm:ss");
		const infoLog = `[${timestamp}] ${info}\n`;

		this.writeLogStream("info", infoLog);
	}

	/**
	 * Log the mail request and response details
	 *
	 * @param {object} info - The info object
	 *
	 */
	logMail(info) {
		this.mailLogFilename = `logger/log/mail/mail-${dateTime.format(
			new Date(),
			"YYYY-MM-DD"
		)}.log`;

		const timestamp = dateTime.format(new Date(), "DD-MM-YYYY hh:mm:ss");
		const infoLog = `[${timestamp}] ${JSON.stringify(info)}\n`;

		this.writeLogStream("mail", infoLog);
	}

	/**
	 * Log the socket request and response details
	 *
	 * @param {object} info - The info object
	 *
	 */
	async logSocket(info) {
		this.socketLogFilename = `logger/log/socket/socket-${dateTime.format(
			new Date(),
			"YYYY-MM-DD"
		)}.log`;

		const timestamp = dateTime.format(new Date(), "DD-MM-YYYY hh:mm:ss");
		const infoLog = `[${timestamp}] ${JSON.stringify(info)}\n`;

		this.writeLogStream("socket", infoLog);
	}

	/**
	 * Log the information
	 *
	 * @param {object} error - The error object
	 * @param {object} request - The request object
	 * @param {function} next - The next middleware function
	 *
	 */
	logAndHandleError(error, request, next) {
		this.logError({
			message: error.message,
			error: error.stack || error.error,
			req: request,
		});
		next(error);
	}
}

module.exports = AppLogger;
