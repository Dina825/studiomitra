const mongoose = require("mongoose");

/**
 * AlbumTemplate Model - StudioMitra
 *
 * For storing studio-specific or system-wide album viewer layouts
 */
const albumTemplateSchema = new mongoose.Schema(
	{
		studio_id: { type: mongoose.Schema.Types.ObjectId, ref: "Studio" }, // null means system-wide
		name: { type: String, required: true },
		thumbnail: { type: String },
		config: { type: mongoose.Schema.Types.Mixed }, // JSON configuration for the viewer
		is_active: { type: Boolean, default: true },
	},
	{
		timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
	}
);

module.exports = mongoose.model("AlbumTemplate", albumTemplateSchema);
