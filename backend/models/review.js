const mongoose = require("mongoose");

/**
 * Review Model - StudioMitra
 *
 * For storing client feedback for studios
 */
const reviewSchema = new mongoose.Schema(
	{
		studio_id: { type: mongoose.Schema.Types.ObjectId, ref: "Studio", required: true },
		user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
		rating: { type: Number, required: true, min: 1, max: 5 },
		comment: { type: String, required: true },
		images: [{ type: String }], // Optional review images
		date: { type: Date, default: Date.now },
	},
	{
		timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
	}
);

module.exports = mongoose.model("Review", reviewSchema);
