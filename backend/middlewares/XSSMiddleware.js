/**
 * @name ValidateRequest
 *
 * @category Middleware
 * @description Restrict html tags from request.
 */
const sanitizeHtml = require('sanitize-html');


const ValidateRequestMiddleware = async function (req, _res, next) {
	let str = '';
	if (req.method == 'GET') {
		str = JSON.stringify(req.query);
		let Model = sanitizeHtml(str);
		req.query = JSON.parse(Model);
	} else {
		str = JSON.stringify(req.body);
		let Model = sanitizeHtml(str);
		try {
			req.body = JSON.parse(Model);
		} catch (err) {
			console.error(err);
		}

	}
	next();
};



module.exports = ValidateRequestMiddleware;
