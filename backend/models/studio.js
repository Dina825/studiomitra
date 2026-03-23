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
		tagline: { type: String, trim: true },
		description: { type: String },
		about: { type: String },
		specialization: { type: [String] }, // e.g., Wedding, Portrait, Product
		experience_years: { type: Number, default: 0 },

		address: {
			street: { type: String },
			city: { type: String },
			state: { type: String },
			pincode: { type: String },
			country: { type: String, default: "India" },
			full_address: { type: String },
		},

		contact: {
			phone: { type: String },
			email: { type: String },
			website: { type: String },
			instagram: { type: String },
		},

		working_hours: {
			weekdays: {
				start: { type: String, default: "09:00" },
				end: { type: String, default: "18:00" },
			},
			weekends: {
				start: { type: String, default: "10:00" },
				end: { type: String, default: "20:00" },
			},
		},

		stats: {
			total_shoots: { type: Number, default: 0 },
			average_rating: { type: Number, default: 0 },
			reviews_count: { type: Number, default: 0 },
		},

		images: {
			logo: { type: String },
			cover: { type: String },
			portfolio: { type: [String] }, // Array of portfolio image URLs
		},

		pricing: {
			currency: { type: String, default: "INR" },
			packages: [
				{
					name: { type: String }, // e.g., Starter, Popular, Premium
					price: { type: Number },
					description: { type: String },
					features: { type: [String] },
				},
			],
		},

		amenities: { type: [String] },
		status: { type: String, enum: ["active", "inactive", "maintenance"], default: "active" },
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
