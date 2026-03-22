/**
 * Application Helpers
 * 
 * @category Helpers
 * @module common
 */
 const responseCode = require('../config/response_code');
 
 const returnErrorResponse = async function (_request, response, _error) {
 
    return response
        .status(responseCode.INTERNAL_SERVER_ERROR)
        .json({
             'message': "Unexpected error occured. Please try again later",
             'data': {},
             'error': {}
        });
 }
 
 module.exports = {
     returnErrorResponse
 }
 