const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const { report } = require('../utils/errorHelpers');
const client = require('twilio')(accountSid, authToken);

const sendSMS = async () => {
	try {
		const message = await client.messages.create({
			body: `Hie Faith,\n Your booking at 42 Castens Ave, Belvedere, Harare, Zimbabwe for room no. 1 was successful.`,
			from: process.env.TWILIO_CONTACT,
			to: '+263778618403'
		});
		console.log(message);
		return message.id;
	} catch (error) {
		report(error.message);
		res.json({ success: false, error: error.message });
	}
};

module.exports = { sendSMS };
