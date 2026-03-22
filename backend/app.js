/**
 * App Initiator - StudioMitra API
 *
 * @category Main
 * @module app
 * @class App
 */

require("dotenv").config();

const helmet = require("helmet");
const express = require("express");
const compression = require("compression");
const sanitizeHtml = require("sanitize-html");
const { APP_PORT, RL_ENABLED } = require("./config/app.js");
const routes = require("./routes");
const Database = require("./models/database.js");
const cors = require("./middlewares/cors");
const errorHandler = require("./middlewares/error_handler");
const { rateLimiter } = require("./middlewares/ratelimiter");
const requestLogger = require("./middlewares/request_log");

class App {
	constructor() {
		this.app = express();

		// Rate Limiter
		if (RL_ENABLED) {
			this.app.use(rateLimiter);
		}

		this.config();
		this.middlewares();
		this.routes();
		this.errorHandling();
	}

	config() {
		// Sanitize HTML defaults
		sanitizeHtml.defaults.allowedTags = [];
		sanitizeHtml.defaults.allowedAttributes = {};

		// Express configuration
		this.app.use(express.json({ limit: "50mb" }));
		this.app.use(express.urlencoded({ extended: true, limit: "50mb" }));
	}

	middlewares() {
		// Logger middleware
		this.app.use(requestLogger);

		// Security middleware
		this.app.use(helmet());

		// CORS middleware
		this.app.use(cors);

		// Compression middleware
		this.app.use(compression({ level: 8 }));
	}

	routes() {
		// API routes
		this.app.use(routes);
	}

	errorHandling() {
		// Error handling middleware
		this.app.use(errorHandler);
	}

	async listen() {
		// Start the server
		this.app.listen(APP_PORT, async () => {
			console.log(`StudioMitra API is running on port ${APP_PORT}.`);

			const database = new Database();
			await database.setupConnection();
		});
	}
}

module.exports = App;
