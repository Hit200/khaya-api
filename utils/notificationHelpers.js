const accountSid = 'ACa53a74bbb275882fc8ffda66fb19a9c6'; //process.env.TWILIO_SID ;
const authToken = '6871ffa01d925909efa15fc01d65dfe8'; //process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

const sendSMS = async () => {
	try {
		const message = await client.messages.create({
			body: `Hie Faith,\n Your booking at 42 Castens Ave, Belvedere, Harare, Zimbabwe for room no. 1 was successful.`,
			from: '+12543122731', //process.env.TWILIO_CONTACT,
			to: '+263778618403'
		});
		console.log(message);
		return message.id;
	} catch (error) {
		report(error);
		res.json({ success: false, error: error.message });
	}
};

module.exports = { sendSMS };
