const mongoose = require("mongoose");

/**
 * Subscription Model - StudioMitra
 *
 * Defines the available tiers (Starter, Pro, Business)
 */
const subscriptionSchema = new mongoose.Schema(
	{
		name: { type: String, required: true, unique: true }, // e.g., Starter, Pro, Business
		price_monthly: { type: Number, required: true },
		price_annual: { type: Number, required: true },
		storage_limit_gb: { type: Number, required: true },
		album_limit_per_month: { type: Number, default: -1 }, // -1 for unlimited
		features: [{ type: String }],
		is_active: { type: Boolean, default: true },
	},
	{
		timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
	}
);

module.exports = mongoose.model("Subscription", subscriptionSchema);
