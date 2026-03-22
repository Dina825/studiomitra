/**
 * Image Processing Service
 * Handles image compression, format conversion, and file preparation
 *
 * @module services/imageProcessor
 */

const sharp = require("sharp");

/**
 * Image Processing Service Class
 * Provides methods for image compression, format conversion, and file preparation
 */
class ImageProcessor {
	/**
	 * Default compression options
	 */
	static DEFAULT_OPTIONS = {
		quality: 80,
		effort: 4,
		resize: false,
		width: 1024,
		withoutEnlargement: true,
		logging: false,
	};

	/**
	 * Creates an instance of ImageProcessor
	 * @param {Object} defaultOptions - Override default options for this instance
	 */
	constructor(defaultOptions = {}) {
		this.options = { ...ImageProcessor.DEFAULT_OPTIONS, ...defaultOptions };
	}

	/**
	 * Compresses an image and converts it to WebP format
	 *
	 * @param {Buffer} imageBuffer - Original image buffer
	 * @param {Object} options - Compression options (merged with instance defaults)
	 * @returns {Promise<Object>} Compressed file object with buffer and metadata
	 */
	async compressImage(imageBuffer, options = {}) {
		const config = { ...this.options, ...options };

		try {
			const maxSize = 50 * 1024;
			const actualSize = imageBuffer.length;
			//console.log("Actual Size");
			//console.log(actualSize);

			if (actualSize <= maxSize) {
				return {
					buffer: imageBuffer,
					originalSize: actualSize,
					compressedSize: actualSize,
					compressionRatio: 0,
				};
			}

			let sharpInstance = sharp(imageBuffer);

			if (config.resize) {
				sharpInstance = sharpInstance.resize({
					width: config.width,
					withoutEnlargement: config.withoutEnlargement,
				});
			}

			let compressedBuffer = null;
			let quality = config.quality;

			while (quality >= 20) {
				compressedBuffer = await sharpInstance
					.webp({ quality: quality })
					.toBuffer();
				if (compressedBuffer.length <= maxSize) {
					quality = 10;
				}
				quality = quality - 5;
			}

			const compressedSize = compressedBuffer.length;

			if (config.logging) {
				console.log(`
			Original Size: ${actualSize} bytes
			Compressed Size: ${compressedSize} bytes
			Compression Ratio: ${(
				((actualSize - compressedSize) / actualSize) *
				100
			).toFixed(2)}%
		  `);
			}

			return {
				buffer: compressedBuffer,
				originalSize: actualSize,
				compressedSize,
				compressionRatio: (
					((actualSize - compressedSize) / actualSize) *
					100
				).toFixed(2),
			};
		} catch (error) {
			console.error(`Error compressing image: ${error.message}`);
			throw new Error(`Image compression failed: ${error.message}`);
		}
	}

	/**
	 * Creates a compressed file object with a WebP extension
	 *
	 * @param {Buffer} compressedBuffer - Compressed image buffer
	 * @param {string} originalFilename - Original filename
	 * @returns {Object} File object compatible with upload handlers
	 */
	createWebpFile(compressedBuffer, originalFilename) {
		try {
			return {
				buffer: compressedBuffer,
				originalname: originalFilename.replace(/\.[^/.]+$/, "") + ".webp",
			};
		} catch (error) {
			console.error(`Error creating WebP file object: ${error.message}`);
			throw new Error(`WebP file creation failed: ${error.message}`);
		}
	}

	/**
	 * Processes an image file for storage
	 *
	 * @param {Object} originalFile - Original file object with buffer and originalname
	 * @param {Object} options - Processing options (passed to compressImage)
	 * @returns {Promise<Object>} Result object with processed file and stats
	 */
	async processImageForStorage(originalFile, options = {}) {
		if (!originalFile || !originalFile.buffer) {
			return {
				success: false,
				error: "Invalid file object",
				originalFile: originalFile?.originalname || "unknown",
			};
		}

		try {
			const compressionResult = await this.compressImage(
				originalFile.buffer,
				options
			);

			const processedFile = this.createWebpFile(
				compressionResult.buffer,
				originalFile?.originalname || "unknown"
			);

			return { file: processedFile, stats: compressionResult, success: true };
		} catch (error) {
			console.error(`Error processing image: ${error.message}`);
			return {
				success: false,
				error: error.message,
				originalFile: originalFile.originalname,
			};
		}
	}

	/**
	 * Static method to create an instance with default options
	 * @returns {ImageProcessor} New ImageProcessor instance
	 */
	static create(options = {}) {
		return new ImageProcessor(options);
	}
}

module.exports = ImageProcessor;
