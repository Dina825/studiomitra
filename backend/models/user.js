const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

/**
 * User Model - StudioMitra
 *
 * Models for: Studio Admins, Studio Owners, Customers
 */
const userSchema = new mongoose.Schema(
	{
		firstname: { type: String, required: true, trim: true },
		surname: { type: String, required: true, trim: true },
		email_address: { type: String, required: true, unique: true, lowercase: true, trim: true },
		password: { type: String, required: true },
		phone_number: { type: String, trim: true },
		role: {
			type: String,
			enum: ["superadmin", "studio_owner", "customer"],
			default: "customer",
		},
		avatar: { type: String },
		status: { type: String, enum: ["active", "inactive", "pending"], default: "active" },
		is_verified: { type: Boolean, default: false },
	},
	{
		timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
	}
);

// Encrypt password before saving
userSchema.pre("save", async function (next) {
	if (this.isModified("password")) {
		this.password = await bcrypt.hash(this.password, 10);
	}
	next();
});

// Compare password method
userSchema.methods.comparePassword = async function (candidatePassword) {
	return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
