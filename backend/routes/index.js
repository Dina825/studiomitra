/**
 * Routes Entry Point - StudioMitra API
 *
 * @category Routes
 * @module routes/index
 */

const express = require("express");
const router = express.Router();

// Health check
router.get("/", (req, res) => {
	res.json({
		status: 200,
		message: "StudioMitra API is running.",
		data: {},
	});
});

// -----------------------------------------------------------------
// API v1 Routes
// -----------------------------------------------------------------
const v1Routes = require("./v1");
router.use("/api/v1", v1Routes);

module.exports = router;
