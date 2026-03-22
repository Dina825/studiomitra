/**
 * Application storage configuration
 *
 * @category Config
 * @module storage
 */
require("dotenv").config();

module.exports = {
	/**
	 * S3 Access key
	 *
	 * @type {string}
	 */
	AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,

	/**
	 * S3 Secret access key
	 *
	 * @type {string}
	 */
	AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,

	/**
	 * S3 region
	 *
	 * @type {string}
	 */
	AWS_DEFAULT_REGION: process.env.AWS_DEFAULT_REGION,

	/**
	 * S3 Bucket
	 *
	 * @type {string}
	 */
	AWS_BUCKET: process.env.AWS_BUCKET,

	/**
	 * S3 Signed url expire time in seconds
	 *
	 * @type {number}
	 */
	AWS_URL_EXPIRE_TIME: 60 * 15,

	/**
	 * S3 create news image path
	 *
	 * @type {string}
	 */
	NEWS_IMAGE_PATH: "news",
	/**
	 * S3 create media gallery image path
	 *
	 * @type {string}
	 */
	MEDIA_GALLERY_PATH: "media_gallery",
	/**
	 * S3 create category image path
	 *
	 * @type {string}
	 */
	CATEGORY_IMAGE_PATH: "category",
	/**
	 * S3 create category image path
	 *
	 * @type {string}
	 */
	USERS_IMAGE_PATH: "users",
	/**
	 * S3 create chat message attachments path
	 *
	 * @type {string}
	 */
	CHAT_ATTACHMENTS_PATH: "chat",
	/**
	 * S3 create comments chat attachments path
	 *
	 * @type {string}
	 */
	COMMENTS_ATTACHMENTS_PATH: "news_comments",
	/**
	 * S3 channel image path
	 *
	 * @type {string}
	 */
	NEWS_CHANNEL_PATH: "channel",
	/**
	 * S3 advertisements creative images path
	 *
	 * @type {string}
	 */
	ADS_FILE_PATH: "advertisements",

	/**
	 * S3 create category image path
	 *
	 * @type {string}
	 */
	AD_RATE_IMAGE_PATH: "advertisement_rates",

	/**
	 * S3 create category image path
	 *
	 * @type {string}
	 */
	ELECTION_IMAGE_PATH: "election_images",

	/**
	 * S3 create radio_programs image path
	 *
	 * @type {string}
	 */
	RADIO_PROGRAM_IMAGE_PATH: "radio_programs",
	/**
	 * S3 create admin_users image path
	 *
	 * @type {string}
	 */
	ADMIN_USERS_IMAGE_PATH: "admin_users",
};
