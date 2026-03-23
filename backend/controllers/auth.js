/**
 * Auth Controller - StudioMitra
 *
 * @category Controllers
 * @module controllers/auth
 */

const User = require("../models/User");
const MailService = require("../services/mail");
const JWTService = require("../services/jwt");
const { APP_NAME, OTP_EXPIRY_TIME } = require("../config/app");

/**
 * Auth Controller - StudioMitra
 *
 * @category Controllers
 * @module controllers/auth
 */

class AuthController {
	/**
	 * Register a new studio owner with MFA
	 * POST /api/v1/auth/register-studio
	 */
	async register(req, res, next) {
		try {
			const { firstname, surname, email_address, password } = req.body;

			// Check if user already exists
			const existingUser = await User.findOne({ email_address });
			if (existingUser) {
				return res.status(400).json({
					status: 400,
					message: "User with this email already exists.",
				});
			}

			// Generate 6-digit OTP
			const otp = Math.floor(100000 + Math.random() * 900000).toString();
			const otpExpiry = new Date(Date.now() + OTP_EXPIRY_TIME * 60000);

			// Create pending user
			const newUser = new User({
				firstname,
				surname,
				email_address,
				password,
				role: "studio_owner",
				status: "pending",
				mfa_otp: otp,
				mfa_expiry: otpExpiry,
			});

			await newUser.save();

			// Send OTP via Email
			const mailService = new MailService();
			await mailService.send({
				to: email_address,
				subject: `Verify your registration - ${APP_NAME}`,
				template: "otp_verify",
				data: {
					authUser: { username: firstname },
					otp: otp,
					otpExpiryTime: OTP_EXPIRY_TIME,
					app_name: APP_NAME,
				},
			});

			res.status(201).json({
				status: 201,
				message: "Registration initiated. Please check your email for the MFA code.",
				data: { email: email_address },
			});
		} catch (error) {
			next(error);
		}
	}

	/**
	 * Verify MFA OTP and activate account
	 * POST /api/v1/auth/verify-mfa
	 */
	async verifyMfa(req, res, next) {
		try {
			const { email_address, otp } = req.body;

			const user = await User.findOne({ email_address }).select("+mfa_otp +mfa_expiry");

			if (!user) {
				return res.status(404).json({
					status: 404,
					message: "User not found.",
				});
			}

			// Check if OTP matches and is not expired
			if (user.mfa_otp !== otp || new Date() > user.mfa_expiry) {
				return res.status(400).json({
					status: 400,
					message: "Invalid or expired OTP.",
				});
			}

			// Activate user
			user.status = "active";
			user.is_verified = true;
			user.is_mfa_enabled = true;
			user.mfa_otp = undefined;
			user.mfa_expiry = undefined;
			await user.save();

			// Generate JWT Token
			const jwtService = new JWTService();
			const token = await jwtService.create({
				id: user._id,
				email: user.email_address,
				role: user.role,
			});

			res.status(200).json({
				status: 200,
				message: "MFA verified successfully. Account is now active.",
				data: {
					token,
					user: {
						id: user._id,
						firstname: user.firstname,
						surname: user.surname,
						email: user.email_address,
						role: user.role,
					},
				},
			});
		} catch (error) {
			next(error);
		}
	}

	/**
	 * Login user
	 * POST /api/v1/auth/login
	 */
	async login(req, res, next) {
		try {
			const { email_address, password } = req.body;

			const user = await User.findOne({ email_address });
			if (!user || !(await user.comparePassword(password))) {
				return res.status(401).json({
					status: 401,
					message: "Invalid email or password.",
				});
			}

			if (user.status === "pending") {
				return res.status(403).json({
					status: 403,
					message: "Account pending verification. Please complete MFA.",
				});
			}

			// Generate JWT Token
			const jwtService = new JWTService();
			const token = await jwtService.create({
				id: user._id,
				email: user.email_address,
				role: user.role,
			});

			res.status(200).json({
				status: 200,
				message: "Login successful.",
				data: {
					token,
					user: {
						id: user._id,
						firstname: user.firstname,
						surname: user.surname,
						email: user.email_address,
						role: user.role,
					},
				},
			});
		} catch (error) {
			next(error);
		}
	}

	/**
	 * Logout user
	 * POST /api/v1/auth/logout
	 */
	async logout(req, res, next) {
		try {
			res.status(200).json({
				status: 200,
				message: "Logout successful.",
				data: {},
			});
		} catch (error) {
			next(error);
		}
	}

	/**
	 * Forgot password — send OTP to email
	 */
	async forgotPassword(req, res, next) {
		try {
			const { email_address } = req.body;
			const user = await User.findOne({ email_address });

			if (user) {
				const otp = Math.floor(100000 + Math.random() * 900000).toString();
				user.mfa_otp = otp;
				user.mfa_expiry = new Date(Date.now() + OTP_EXPIRY_TIME * 60000);
				await user.save();

				const mailService = new MailService();
				await mailService.send({
					to: email_address,
					subject: `Reset Password OTP - ${APP_NAME}`,
					template: "otp_verify",
					data: {
						authUser: { username: user.firstname },
						otp: otp,
						otpExpiryTime: OTP_EXPIRY_TIME,
						app_name: APP_NAME,
					},
				});
			}

			res.status(200).json({
				status: 200,
				message: "If an account exists, an OTP has been sent to your email.",
				data: {},
			});
		} catch (error) {
			next(error);
		}
	}

	/**
	 * Reset password with OTP
	 */
	async resetPassword(req, res, next) {
		try {
			const { email_address, otp, new_password } = req.body;
			const user = await User.findOne({ email_address }).select("+mfa_otp +mfa_expiry");

			if (!user || user.mfa_otp !== otp || new Date() > user.mfa_expiry) {
				return res.status(400).json({
					status: 400,
					message: "Invalid or expired OTP.",
				});
			}

			user.password = new_password;
			user.mfa_otp = undefined;
			user.mfa_expiry = undefined;
			await user.save();

			res.status(200).json({
				status: 200,
				message: "Password reset successful.",
				data: {},
			});
		} catch (error) {
			next(error);
		}
	}

	/**
	 * Refresh JWT token
	 */
	async refreshToken(req, res, next) {
		try {
			res.status(200).json({
				status: 200,
				message: "Refresh token endpoint - implementation pending session management.",
				data: {},
			});
		} catch (error) {
			next(error);
		}
	}
}

module.exports = AuthController;
