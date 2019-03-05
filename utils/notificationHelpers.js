const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

const sendSMS = (name, contact, location, room) => {
	client.messages
		.create({
			body: `Hie ${name},\n Your booking at ${location} for room no. ${room} was successful.`,
			from: process.env.TWILIO_CONTACT,
			to: `${contact}`
		})
		.then(message => message.sid)
		.catch(error => {
			report(error);
			res.json({ success: false, error: error.message });
		});
};

module.exports = { sendSMS };
