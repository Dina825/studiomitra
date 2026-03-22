const jwt = require("jose");
const crypto = require("crypto");
const config = require("../config/jwt");
const { APP_SECRET_KEY, CRYPTO_SECURE_MODE } = require("../config/app");

const secretKey = crypto.createSecretKey(
	new Buffer.from(config.JWT_SECRET_KEY),
	"utf-8"
);
const IV_LENGTH = 16;

/**
 * JWT Tokenization and Verification
 *
 * @category Services
 * @module services/jwt
 * @class JWT
 */
class JWT {
	/**
	 * Encrypts the given the string
	 *
	 * @param {string|object} data input that need to be encrypted
	 *
	 * @returns {string} encrypted string
	 */
	encrypt(data) {
		let message = "";
		if (typeof data == "object" && !Array.isArray(data)) {
			message = JSON.stringify(data);
		}
		const key = crypto.scryptSync(APP_SECRET_KEY, "salt", 32);
		let iv = crypto.randomBytes(IV_LENGTH);
		let cipher = crypto.createCipheriv(CRYPTO_SECURE_MODE, key, iv);
		let encrypted = cipher.update(message);

		encrypted = Buffer.concat([encrypted, cipher.final()]);

		return iv.toString("hex") + ":" + encrypted.toString("hex");
	}

	/**
	 * Decrypts the given the string
	 *
	 * @param {string} message input that need to be decrypted
	 *
	 * @returns {string|object} decrypted string/object
	 */
	decrypt(message) {
		let textParts = message.toString().split(":");
		let iv = Buffer.from(textParts.shift(), "hex");
		let encryptedText = Buffer.from(textParts.join(":"), "hex");
		const key = crypto.scryptSync(APP_SECRET_KEY, "salt", 32);
		let decipher = crypto.createDecipheriv(CRYPTO_SECURE_MODE, key, iv);
		let decrypted = decipher.update(encryptedText);
		decrypted = Buffer.concat([decrypted, decipher.final()]);
		let decryptedText = decrypted.toString();

		try {
			return JSON.parse(decryptedText);
		} catch (exception) {
			return decryptedText;
		}
	}

	/**
	 * Creates the jwt token for the given data
	 *
	 * @param   {object|string} data    jwt payload
	 * @param   {object}        options jwt configuration
	 * @param   {string}        loggedInFromApp    loggedin from app
	 *
	 * @returns {string}                jwt token
	 */
	create(data, _options = {}, loggedInFromApp = false) {
		let expiryTime = loggedInFromApp ? config.JWT_EXPIRY_TIME_APP : config.JWT_EXPIRY_TIME;
		return new jwt.SignJWT({ data: this.encrypt(data) })
			.setProtectedHeader({ alg: "HS256" })
			.setIssuedAt()
			.setExpirationTime(expiryTime)
			.sign(secretKey);
	}

	/**
	 * Checks whether given token is valid or not
	 *
	 * @param   {string}  token jwt token
	 *
	 * @returns {Promise<boolean>}       true on valid jwt token, false on invalid jwt token
	 */
	verify(token) {
		return jwt.jwtVerify(token, secretKey);
	}

	/**
	 * Encrypts the given the string for socket
	 *
	 * @param {string|object} data input that need to be encrypted
	 *
	 * @returns {string} encrypted string
	 */
	encryptSocket(data) {
		let message = "";
		if (typeof data == "object" && !Array.isArray(data)) {
			message = JSON.stringify(data);
		}
		const key = crypto.scryptSync(config.SOCKET_APP_SECRET_KEY, "salt", 32);
		let iv = crypto.randomBytes(IV_LENGTH);
		let cipher = crypto.createCipheriv(CRYPTO_SECURE_MODE, key, iv);
		let encrypted = cipher.update(message);

		encrypted = Buffer.concat([encrypted, cipher.final()]);

		return iv.toString("hex") + ":" + encrypted.toString("hex");
	}

	/**
	 * Decrypts the given the string
	 *
	 * @param {string} message input that need to be decrypted
	 *
	 * @returns {string|object} decrypted string/object
	 */
	decryptSocket(message) {
		let textParts = message.toString().split(":");
		let iv = Buffer.from(textParts.shift(), "hex");
		let encryptedText = Buffer.from(textParts.join(":"), "hex");
		const key = crypto.scryptSync(config.SOCKET_APP_SECRET_KEY, "salt", 32);
		let decipher = crypto.createDecipheriv(CRYPTO_SECURE_MODE, key, iv);
		let decrypted = decipher.update(encryptedText);
		decrypted = Buffer.concat([decrypted, decipher.final()]);
		let decryptedText = decrypted.toString();

		try {
			return JSON.parse(decryptedText);
		} catch (exception) {
			return decryptedText;
		}
	}

	/**
	 * Creates the jwt socket token for the given data
	 *
	 * @param {object|string} data jwt payload
	 * @param {string} expiryTime
	 *
	 * @returns {string} jwt token
	 */
	createSocketAuth(data, loggedInFromApp = false) {
		const socketAuthKey = crypto.createSecretKey(
			new Buffer.from(config.JWT_SOCKET_SECRET_KEY),
			"utf-8"
		);

		let expiryTime = loggedInFromApp ? config.JWT_EXPIRY_TIME_APP : config.JWT_EXPIRY_TIME;
		return new jwt.SignJWT({ data: this.encryptSocket(data) })
			.setProtectedHeader({ alg: "HS256" })
			.setIssuedAt()
			.setExpirationTime(expiryTime)
			.sign(socketAuthKey);
	}

	/**
	 * Checks whether given token is valid or not
	 *
	 * @param   {string}  token jwt token
	 *
	 * @returns {Promise<boolean>}       true on valid jwt token, false on invalid jwt token
	 */
	verifySocketAuth(token) {
		const socketAuthKey = crypto.createSecretKey(
			new Buffer.from(config.JWT_SOCKET_SECRET_KEY),
			"utf-8"
		);

		return jwt.jwtVerify(token, socketAuthKey);
	}
}

module.exports = JWT;
