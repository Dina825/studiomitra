const mongoose = require("mongoose");

/**
 * Booking Model - StudioMitra
 *
 * Models for: User bookings of a specific Studio
 */
const bookingSchema = new mongoose.Schema(
	{
		user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
		studio_id: { type: mongoose.Schema.Types.ObjectId, ref: "Studio", required: true },
		date: { type: Date, required: true },
		start_time: { type: String, required: true }, // Format "HH:mm"
		end_time: { type: String, required: true },   // Format "HH:mm"
		total_hours: { type: Number },
		total_amount: { type: Number, required: true },
		service_type: { type: String, required: true }, // e.g., "Wedding", "Portrait"
		payment_status: { type: String, enum: ["pending", "paid", "refunded"], default: "pending" },
		booking_status: {
			type: String,
			enum: ["pending", "confirmed", "cancelled", "completed"],
			default: "pending",
		},
		notes: { type: String },
	},
	{
		timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
	}
);

module.exports = mongoose.model("Booking", bookingSchema);
