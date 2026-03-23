const mongoose = require("mongoose");

/**
 * StudioClient Model - StudioMitra
 *
 * Stores studio-specific relationships and statuses for clients
 */
const studioClientSchema = new mongoose.Schema(
	{
		studio_id: { type: mongoose.Schema.Types.ObjectId, ref: "Studio", required: true },
		user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
		type: {
			type: String,
			enum: ["lead", "regular", "vip"],
			default: "regular",
		},
		notes: { type: String },
		total_shoots: { type: Number, default: 0 },
		last_shoot_date: { type: Date },
	},
	{
		timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
	}
);

// Ensure a user is linked to a studio only once in this context
studioClientSchema.index({ studio_id: 1, user_id: 1 }, { unique: true });

module.exports = mongoose.model("StudioClient", studioClientSchema);
