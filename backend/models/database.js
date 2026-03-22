const mongoose = require("mongoose");
const dbConfig = require("../config/database.js");

/**
 * Database Management Class - StudioMitra
 *
 * @category Models
 * @module models/database
 * @class Database
 */
class Database {
	constructor() {
		this.connection_url = `mongodb://${dbConfig.host}:${dbConfig.port}/${dbConfig.database}`;
		if (dbConfig.username) {
			this.connection_url = `mongodb://${
				dbConfig.username
			}:${encodeURIComponent(dbConfig.password)}@${dbConfig.host}:${
				dbConfig.port
			}/${dbConfig.database}`;
		}
		this.mongoose = mongoose;
		this.connection = null;

		// Set Mongoose options
		this.mongoose.set("strictQuery", true);
		this.mongoose.set("strictPopulate", false);

		this.MAX_RETRIES = 5;
		this.RETRY_DELAY = 5000;
		this.currentRetry = 0;
	}

	/**
	 * Setup Database Connection
	 *
	 * @returns {Promise<boolean>} true on success, false on failure (with retry)
	 */
	async setupConnection() {
		try {
			await this.mongoose.connect(this.connection_url, {
				useNewUrlParser: true,
				useUnifiedTopology: true,
				socketTimeoutMS: 30000,
				maxPoolSize: 50,
			});

			this.connection = this.mongoose.connection;
			console.info(`Connected to database [${dbConfig.database}] successfully.`);
			return true;
		} catch (error) {
			console.error("Database connection failure:", error.message);

			this.currentRetry++;
			if (this.currentRetry >= this.MAX_RETRIES) {
				console.error("Max retries reached. Database critical failure.");
				process.exit(1);
				return false;
			}

			console.log(`Retrying [${this.currentRetry}/${this.MAX_RETRIES}] in ${this.RETRY_DELAY / 1000}s...`);
			setTimeout(() => this.setupConnection(), this.RETRY_DELAY);

			return false;
		}
	}

	getConnection() {
		return this.connection;
	}

	getMongoose() {
		return this.mongoose;
	}

	getUrl() {
		return this.connection_url;
	}
}

module.exports = Database;
