/**
 * User Routes - StudioMitra
 *
 * GET    /api/v1/users/profile        - Get current user profile
 * PUT    /api/v1/users/profile        - Update current user profile
 * PUT    /api/v1/users/change-password - Change password
 */

const express = require("express");
const router = express.Router();
const UserController = require("../../controllers/user");

const user = new UserController();

router.get("/profile", user.profile.bind(user));
router.put("/profile", user.updateProfile.bind(user));
router.put("/change-password", user.changePassword.bind(user));

module.exports = router;
