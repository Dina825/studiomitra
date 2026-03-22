/**
 * @name SanitizeXssMiddleware
 *
 * @category Middleware
 * @description Restrict html tags from request, but skip sanitization if input is encrypted (base64 or hex).
 *              Also, do not sanitize fields that are already valid JSON (e.g., arrays/objects sent as JSON strings).
 */

const SanitizeXssMiddleware = async function (req, _res, next) {
	function escapeHtml(str) {
		let Model = str
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;');
		return Model;
	}

	function sanitizeObject(obj) {
		if (typeof obj === 'string') {
			// If string is probably encrypted, skip sanitization
			if (isProbablyEncrypted(obj)) {
				return obj;
			}
			// If string is valid JSON (array/object), skip sanitization
			if (isValidJsonString(obj)) {
				return obj;
			}
			// Remove all HTML tags
			let sanitized = obj.replace(/<[^>]*>/g, '');
			// Remove dangerous attributes like onclick, onerror, etc.
			sanitized = sanitized.replace(/on\w+\s*=\s*(['"]).*?\1/gi, '');
			sanitized = sanitized.replace(/javascript:/gi, '');
			sanitized = sanitized.replace(/alert\s*\(/gi, '');
			return escapeHtml(sanitized);
		} else if (Array.isArray(obj)) {
			return obj.map(sanitizeObject);
		} else if (typeof obj === 'object' && obj !== null) {
			const newObj = {};
			for (const key in obj) {
				if (Object.prototype.hasOwnProperty.call(obj, key)) {
					newObj[key] = sanitizeObject(obj[key]);
				}
			}
			return newObj;
		}
		return obj;
	}

    function isProbablyEncrypted(str) {
        // Heuristic: if string is long, contains only base64 or hex chars, and no spaces, it's probably encrypted
        if (typeof str !== 'string') return false;
        const base64Regex = /^[A-Za-z0-9+/=]+$/;
        const hexRegex = /^[A-Fa-f0-9]+$/;
        // If string is long and matches base64 or hex, and has no spaces, treat as encrypted
        if (str.length > 32 && (base64Regex.test(str) || hexRegex.test(str)) && !/\s/.test(str)) {
            return true;
        }
        return false;
    }
    
    // Helper: check if a string is valid JSON (array or object)
    function isValidJsonString(str) {
        if (typeof str !== 'string') return false;
        try {
            const parsed = JSON.parse(str);
            return typeof parsed === 'object' && parsed !== null;
        } catch (e) {
            return false;
        }
    }

	if (req.method === 'GET') {
		// Only sanitize if not encrypted
		try {
			const str = JSON.stringify(req.query);
			if (!isProbablyEncrypted(str)) {
				let Model = sanitizeObject(str);
				req.query = JSON.parse(Model);
			}
		} catch (err) {
			console.error(err);
		}
	} else {
		// Only sanitize if not encrypted
		try {
			if (typeof req.body === 'string' && isProbablyEncrypted(req.body)) {
				// skip
			} else if (typeof req.body === 'object' && req.body !== null) {
				// For each key in req.body, if value is a string and valid JSON, skip sanitization for that key
				const sanitizedBody = {};
				for (const key in req.body) {
					if (!Object.prototype.hasOwnProperty.call(req.body, key)) continue;
					const value = req.body[key];
					if (typeof value === 'string' && isValidJsonString(value)) {
						sanitizedBody[key] = value;
					} else {
						sanitizedBody[key] = sanitizeObject(value);
					}
				}
				req.body = sanitizedBody;
			}
		} catch (err) {
			console.error(err);
		}
	}
	next();
};

module.exports = SanitizeXssMiddleware;