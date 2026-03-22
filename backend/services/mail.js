/**
 * Application Email Service
 *
 * @category Helpers
 * @module services/mailer
 */

const fs = require("fs");
const path = require("path");
const formData = require("form-data");
const Mailgun = require("mailgun.js");
const Handlebars = require("handlebars");
const mailConfig = require("../config/mail.js");
const AppLogger = require("../logger/app_logger.js");

const appLogger = new AppLogger();

class MailService {
	constructor() {
		this.mailgun = new Mailgun(formData);
		this.mailgunClient = this.mailgun.client({
			username: "api",
			key: mailConfig.MAILGUN_API_KEY,
		});

		this.__filename = __filename;
		this.__dirname = __dirname;
	}

	/**
	 * send email
	 * @param {object} emailInput,
	 * @param {object} request
	 */
	async send(emailInput, request = null) {
		try {
			await this.registerHelpers();

			await this.registerPartials();

			const htmlContent = await this.compileTemplate(
				emailInput.template,
				emailInput.data
			);
			const logoPath = path.resolve(
				this.__dirname,
				"../public/images/revo_logo.png"
			);

			const mailOptions = {
				from: emailInput.from_address
					? emailInput.from_address
					: mailConfig.MAIL_FROM_ADDRESS,
				to: emailInput.to,
				subject: emailInput.subject,
				html: htmlContent,
				inline: {
					filename: "logo",
					data: fs.createReadStream(logoPath),
				},
			};

			const response = await this.mailgunClient.messages.create(
				mailConfig.MAILGUN_DOMAIN,
				mailOptions
			);
			appLogger.logMail({
				request: emailInput,
				response: response,
			});
		} catch (error) {
			appLogger.logMail({
				request: emailInput,
				response: error,
			});
		}
	}

	/**
	 * register partial handlebar files
	 */
	registerPartials = async () => {
		const partialsDir = path.resolve(this.__dirname, "../views/mail/partials");
		const partialFiles = ["header.hbs", "footer.hbs"];

		for (const file of partialFiles) {
			const filePath = path.join(partialsDir, file);
			const partialName = path.basename(file, ".hbs");
			const partialContent = await fs.readFileSync(filePath, {
				encoding: "utf8",
				flag: "r",
			});
			Handlebars.registerPartial(partialName, partialContent);
		}
	};

	/**
	 * register helpers
	 */
	registerHelpers = async () => {
		Handlebars.registerHelper("getCurrentYear", () => {
			return new Date().getFullYear();
		});
	};

	/**
	 * compile the email template
	 * @param {string} templateName
	 * @param {object} data
	 * @returns
	 */
	compileTemplate = async (templateName, data) => {
		let encoding_option = {
			encoding: "utf8",
			flag: "r",
		};
		const layoutPath = path.resolve(
			this.__dirname,
			`../views/mail/layouts/main.hbs`
		);
		const layoutContent = await fs.readFileSync(layoutPath, encoding_option);
		const layoutTemplate = Handlebars.compile(layoutContent);

		const contentPath = path.resolve(
			this.__dirname,
			`../views/mail/content/${templateName}.hbs`
		);
		const templateContent = await fs.readFileSync(contentPath, encoding_option);
		const contentTemplate = Handlebars.compile(templateContent);

		const renderedContent = contentTemplate(data);

		return layoutTemplate({ body: renderedContent, ...data });
	};
}

module.exports = MailService;
