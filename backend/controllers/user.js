/**
 * User Controller - StudioMitra
 *
 * @category Controllers
 * @module controllers/user
 */

class UserController {
	/** GET /api/v1/users/profile */
	async profile(req, res, next) {
		try {
			// TODO: Return authenticated user's profile
			res.status(200).json({ status: 200, message: "User profile - coming soon.", data: {} });
		} catch (error) {
			next(error);
		}
	}

	/** PUT /api/v1/users/profile */
	async updateProfile(req, res, next) {
		try {
			// TODO: Update user profile details
			res.status(200).json({ status: 200, message: "Update profile - coming soon.", data: {} });
		} catch (error) {
			next(error);
		}
	}

	/** PUT /api/v1/users/change-password */
	async changePassword(req, res, next) {
		try {
			// TODO: Validate old password and set new password
			res.status(200).json({ status: 200, message: "Change password - coming soon.", data: {} });
		} catch (error) {
			next(error);
		}
	}
}

module.exports = UserController;
