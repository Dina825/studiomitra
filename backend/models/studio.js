const mongoose = require("mongoose");
const slugify = require("slugify");

/**
 * Studio Model - StudioMitra
 *
 * Models for: Photographers/Studio businesses
 */
const studioSchema = new mongoose.Schema(
	{
		owner_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
		name: { type: String, required: true, trim: true },
		slug: { type: String, unique: true },
		description: { type: String },
		address: {
			street: { type: String },
			city: { type: String },
			state: { type: String },
			pincode: { type: String },
			country: { type: String },
		},
		contact: {
			phone: { type: String },
			email: { type: String },
			website: { type: String },
		},
		amenities: { type: [String] },
		images: { type: [String] }, // URLs to storage
		pricing: {
			base_rate: { type: Number, default: 0 },
			rate_type: { type: String, enum: ["hourly", "daily"], default: "hourly" },
			currency: { type: String, default: "INR" },
		},
		status: { type: String, enum: ["open", "closed", "maintenance"], default: "open" },
		is_verified: { type: Boolean, default: false },
	},
	{
		timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
	}
);

// Auto-generate slug from studio name
studioSchema.pre("save", function (next) {
	if (this.isModified("name")) {
		this.slug = slugify(this.name, { lower: true, strict: true });
	}
	next();
});

module.exports = mongoose.model("Studio", studioSchema);
