const mongoose = require("mongoose");

/**
 * StudioSubscription Model - StudioMitra
 *
 * Tracks which plan a specific studio is on and when it expires
 */
const studioSubscriptionSchema = new mongoose.Schema(
	{
		studio_id: { type: mongoose.Schema.Types.ObjectId, ref: "Studio", required: true },
		subscription_id: { type: mongoose.Schema.Types.ObjectId, ref: "Subscription", required: true },
		start_date: { type: Date, default: Date.now },
		expiry_date: { type: Date, required: true },
		billing_cycle: { type: String, enum: ["monthly", "annual"], default: "monthly" },
		status: { type: String, enum: ["active", "expired", "cancelled"], default: "active" },
		auto_renew: { type: Boolean, default: true },
	},
	{
		timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
	}
);

module.exports = mongoose.model("StudioSubscription", studioSubscriptionSchema);
