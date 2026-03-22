/**
 * Application Localization Configuration
 *
 * @category Config
 * @module database
 */

require('dotenv').config();

const { I18n }  = require('i18n');
const path      = require('path');

const i18n = new I18n({
    locales: ['en'],
    defaultLocale: process.env.APP_LANG,
    directory: path.join('./', 'locales'),
    objectNotation: true,
    updateFiles: false
});

module.exports = i18n;
