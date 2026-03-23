const mongoose = require("mongoose");

/**
 * Album Model - StudioMitra
 *
 * For managing client photoshoots and digital albums
 */
const albumSchema = new mongoose.Schema(
	{
		studio_id: { type: mongoose.Schema.Types.ObjectId, ref: "Studio", required: true },
		user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
		title: { type: String, required: true, trim: true },
		description: { type: String },
		category: { type: String }, // e.g., Wedding, Pre-Wedding, Corporate
		cover_image: { type: String },
		photos: [{ type: String }], // Array of photo URLs
		status: { type: String, enum: ["draft", "published"], default: "draft" },
		password_protected: { type: Boolean, default: false },
		password: { type: String },
		template_id: { type: mongoose.Schema.Types.ObjectId, ref: "AlbumTemplate" },
	},
	{
		timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
	}
);

module.exports = mongoose.model("Album", albumSchema);
