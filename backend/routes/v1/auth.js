/**
 * Auth Routes - StudioMitra
 *
 * POST /api/v1/auth/register    - Register new user
 * POST /api/v1/auth/login       - Login
 * POST /api/v1/auth/logout      - Logout
 * POST /api/v1/auth/forgot-password   - Send password reset OTP
 * POST /api/v1/auth/reset-password    - Reset password with OTP
 * POST /api/v1/auth/refresh-token     - Refresh JWT token
 */

const express = require("express");
const router = express.Router();
const AuthController = require("../../controllers/auth");

const auth = new AuthController();

router.post("/register", auth.register.bind(auth));
router.post("/verify-mfa", auth.verifyMfa.bind(auth));
router.post("/login", auth.login.bind(auth));
router.post("/logout", auth.logout.bind(auth));
router.post("/forgot-password", auth.forgotPassword.bind(auth));
router.post("/reset-password", auth.resetPassword.bind(auth));
router.post("/refresh-token", auth.refreshToken.bind(auth));

module.exports = router;
