const request = require('superagent');
const { report } = require('../utils/errorHelpers');
// const accountSid = process.env.TWILIO_SID;
// const authToken = process.env.TWILIO_AUTH_TOKEN;
// const client = require('twilio')(accountSid, authToken);

const sendSMS = async () => {};
const sendEmail = async (name, email, number, location) =>
	await request
		.post('https://api.sendgrid.com/v3/mail/send')
		.set('content-type', 'application/json')
		.set('authorization', `Bearer ${process.env.SENDGRID_KEY}`)
		.type('json')
		.send({
			personalizations: [
				{
					to: [
						{
							email,
							name
						}
					],
					dynamic_template_data: {
						name,
						room: {
							number
						},
						location
					}
				}
			],
			from: {
				email: process.env.FROM_EMAIL,
				name: 'KHAYA BOOKINGS'
			},
			template_id: `${process.env.SENDGRID_TEMPLATE_ID}`
		})
		.then(response => console.log(response))
		.catch(error => report(error));

module.exports = { sendSMS, sendEmail };
