/**
 * Booking Routes - StudioMitra
 *
 * GET    /api/v1/bookings          - List bookings for current user/studio
 * POST   /api/v1/bookings          - Create a booking
 * GET    /api/v1/bookings/:id      - Get booking by ID
 * PUT    /api/v1/bookings/:id      - Update booking
 * DELETE /api/v1/bookings/:id      - Cancel booking
 */

const express = require("express");
const router = express.Router();
const BookingController = require("../../controllers/booking");

const booking = new BookingController();

router.get("/", booking.list.bind(booking));
router.post("/", booking.create.bind(booking));
router.get("/:id", booking.show.bind(booking));
router.put("/:id", booking.update.bind(booking));
router.delete("/:id", booking.remove.bind(booking));

module.exports = router;
