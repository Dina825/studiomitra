/**
 * S3 Storage functionalities
 *
 * @category Services
 * @module Storage
 */
const {
	S3Client,
	GetObjectCommand,
	PutObjectCommand,
	DeleteObjectCommand,
} = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const config = require("../config/storage");
const request = require("request");
const mime = require("mime");
const axios = require("axios");
const Settings_model = require("../models/settings");

class Storage {
	constructor() {
		this.s3Client = new S3Client({
			region: config.AWS_DEFAULT_REGION,
			accessKeyId: config.AWS_ACCESS_KEY_ID,
			secretAccessKey: config.AWS_SECRET_ACCESS_KEY,
		});
	}

	/**
	 * upload file on s3
	 *
	 * @param {string} path
	 * @param {file} file
	 * @returns
	 */
	upload(path, file) {
		try {
			const data = {
				Key: path,
				Body: file.buffer,
				Bucket: config.AWS_BUCKET,
				ContentEncoding: "base64",
				ContentType: file.mimetype,
			};
			return new Promise((resolve, _reject) => {
				this.s3Client
					.send(new PutObjectCommand(data))
					.then(async () => {
						const url = await this.getSignedUrl(path);
						resolve(url);
					})
					.catch((error) => {
						console.log("s3 put file upload error");
						console.log(error);
						resolve(false);
					});
			});
		} catch (error) {
			console.log("file upload error");
			console.log(error);
			return false;
		}
	}

	/**
	 * delete file from s3
	 * @param {string} path
	 * @returns
	 */
	delete(path) {
		try {
			const data = {
				Key: path,
				Bucket: config.AWS_BUCKET,
			};

			return new Promise((resolve, _reject) => {
				this.s3Client
					.send(new DeleteObjectCommand(data))
					.then(() => {
						resolve(true);
					})
					.catch((error) => {
						console.log("s3 file delete error");
						console.log(error);
						resolve(false);
					});
			});
		} catch (error) {
			console.log("s3 file delete error");
			console.log(error);
			return false;
		}
	}

	/**
	 * get temporary url from path
	 *
	 * @param {string} path
	 * @returns {any} signedUrl|false
	 */
	getSignedUrl(path, exp = false, defaulImg = false) {
		try {
			if (path) {
				let configExpTime = config.AWS_URL_EXPIRE_TIME;
				let expiresIn = !exp ? { configExpTime } : { exp };
				return getSignedUrl(
					this.s3Client,
					new GetObjectCommand({
						Bucket: config.AWS_BUCKET,
						Key: path,
					}),
					expiresIn
				)
					.then((data) => {
						if (data && exp) {
							const splitted = data.split("?");
							data = splitted.length ? splitted[0] : data;
						}
						return data;
						// Verify the signed URL to check if it returns a valid image
						// let data_result = this.verifyImage(data)
						//     .then((result) => {
						//         if (result) {
						//             console.log(result);
						//             return data;
						//         } else {
						//             return defaulImg;
						//         }
						//     })
						//     .catch((error) => {
						//         console.error('Image verification failed:', error);
						//         return data;
						//     });

						// return data_result;
					})
					.catch((error) => {
						console.log("s3 get signed url error");
						console.log(error);
						resolve(false);
					});
			}

			return "";
		} catch (error) {
			console.log("s3 get signed url error");
			console.log(error);
			return false;
		}
	}

	/**
	 * upload file from local path
	 *
	 * @param {string} path
	 * @param {file} file
	 * @param {string} mimetype
	 * @returns
	 */
	uploadLocalFile(path, file, mimetype) {
		try {
			const data = {
				Key: path,
				Body: file,
				Bucket: config.AWS_BUCKET,
				ContentEncoding: "base64",
				ContentType: mimetype,
			};
			return new Promise((resolve, _reject) => {
				this.s3Client
					.send(new PutObjectCommand(data))
					.then(async () => {
						const url = await this.getSignedUrl(path);
						resolve(url);
					})
					.catch((error) => {
						console.log("s3 put local file upload error");
						console.log(error);
						resolve(false);
					});
			});
		} catch (error) {
			console.log("local file upload error");
			console.log(error);
			return false;
		}
	}

	/**
	 * upload file from image url
	 *
	 * @param {string} url
	 * @param {string} path
	 * @returns
	 */
	async uploadFileFromUrl(url, path) {
		try {
			let result = false;
			let s3Client = this.s3Client;

			let fileRes = await this.getFileFromUrl(url);
			if (fileRes.status) {
				const data = {
					Key: path,
					Body: fileRes.body,
					Bucket: config.AWS_BUCKET,
					ContentEncoding: "base64",
					ContentType: fileRes.res.headers["content-type"],
				};
				return new Promise((resolve, _reject) => {
					s3Client
						.send(new PutObjectCommand(data))
						.then(async () => {
							resolve(true);
						})
						.catch((error) => {
							console.log("s3 put file upload error from url");
							console.log(error);
							resolve(false);
						});
				});
			}
			return result;
		} catch (error) {
			console.log("aws upload error from url");
			console.log(error);
			return false;
		}
	}

	/**
	 * get file from url
	 *
	 * @param {string} url
	 * @returns {any} response
	 */
	async getFileFromUrl(url) {
		let response = {
			status: 0,
			res: {},
			buffer: {},
		};

		const fileResponse = await axios.get(url, {
			responseType: "arraybuffer",
		});

		const buffer = Buffer.from(fileResponse.data);

		response.status = 1;
		response.buffer = buffer;
		response.res = fileResponse;
		return response;
	}

	// Function to verify that a URL returns a valid image
	async verifyImage(url) {
		try {
			// Make an HTTP GET request to the signed URL
			const response = await axios.get(url, { responseType: "stream" });

			// Check the content type of the response
			const contentType = response.headers["content-type"];
			if (contentType.startsWith("image")) {
				return true;
			} else {
				return false;
			}
		} catch (error) {
			console.error("Error retrieving image:", error.message);
		}
	}
}

module.exports = Storage;
