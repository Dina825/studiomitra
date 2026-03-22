/**
 * Booking Controller - StudioMitra
 *
 * @category Controllers
 * @module controllers/booking
 */

class BookingController {
	/** GET /api/v1/bookings */
	async list(req, res, next) {
		try {
			// TODO: List bookings for authenticated user / studio owner
			res.status(200).json({ status: 200, message: "Booking list - coming soon.", data: [] });
		} catch (error) {
			next(error);
		}
	}

	/** POST /api/v1/bookings */
	async create(req, res, next) {
		try {
			// TODO: Create new booking
			res.status(201).json({ status: 201, message: "Create booking - coming soon.", data: {} });
		} catch (error) {
			next(error);
		}
	}

	/** GET /api/v1/bookings/:id */
	async show(req, res, next) {
		try {
			// TODO: Get booking details
			res.status(200).json({ status: 200, message: "Booking show - coming soon.", data: {} });
		} catch (error) {
			next(error);
		}
	}

	/** PUT /api/v1/bookings/:id */
	async update(req, res, next) {
		try {
			// TODO: Update booking (reschedule / status change)
			res.status(200).json({ status: 200, message: "Update booking - coming soon.", data: {} });
		} catch (error) {
			next(error);
		}
	}

	/** DELETE /api/v1/bookings/:id */
	async remove(req, res, next) {
		try {
			// TODO: Cancel booking
			res.status(200).json({ status: 200, message: "Cancel booking - coming soon.", data: {} });
		} catch (error) {
			next(error);
		}
	}
}

module.exports = BookingController;
