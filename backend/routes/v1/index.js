/**
 * API v1 Routes - StudioMitra
 *
 * @category Routes
 * @module routes/v1/index
 */

const express = require("express");
const router = express.Router();

// -----------------------------------------------------------------
// Auth Routes (public)
// -----------------------------------------------------------------
const authRoutes = require("./auth");
router.use("/auth", authRoutes);

// -----------------------------------------------------------------
// Protected Routes (require JWT)
// -----------------------------------------------------------------
const jwtMiddleware = require("../../middlewares/jwt");

const studioRoutes = require("./studio");
router.use("/studios", jwtMiddleware, studioRoutes);

const userRoutes = require("./user");
router.use("/users", jwtMiddleware, userRoutes);

const bookingRoutes = require("./booking");
router.use("/bookings", jwtMiddleware, bookingRoutes);

module.exports = router;
