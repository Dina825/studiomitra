/**
 * password generator services functions
 * 
 * @category Services
 * @module services/password_generator
 */

const bcrypt     = require("bcryptjs");
const saltRounds = 10;

/**
* generate password
*  
* @param {string} password
* 
* @returns {Promise<string>} hash_value 
*/
const generatePassword = async function (password) {
    const hashedPassword = await new Promise((resolve, _reject) => {
        bcrypt.genSalt(saltRounds, function (saltError, salt) {
            if (saltError) {
                console.log(saltError);
                resolve(null);
            } else {
                bcrypt.hash(password, salt, function(hashError, hash) {
                    if (hashError) {
                        console.log(hashError);
                        resolve(null);
                    } else {
                        resolve(hash);
                    }
                });
            }
        });
    });
    return hashedPassword;
}

/**
* verify the password with hash password
*  
* @param {string} password
* @param {string} hash
* 
* @returns {Promise<boolean>} true/false 
*/
const verifyPassword = async function (password, hash) {
    const isMatched = await new Promise((resolve, _reject) => {
        bcrypt.compare(password, hash, function (error, isMatch) {
            if (error) {
                console.log(error);
                resolve(false);
            } else if (!isMatch) {
                resolve(false);
            } else {
                resolve(true);
            }
        });
    });
    return isMatched;
}

module.exports = {
	generate: generatePassword,
    verify: verifyPassword
}