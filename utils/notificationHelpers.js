const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

const sendSMS = async (name, contact, location, room) => {
	try {
		const message = await client.messages.create({
			body: `Hie ${name},\n Your booking at ${location} for room no. ${room} was successful.`,
			from: process.env.TWILIO_CONTACT,
			to: `${contact}`
		});
		console.log(message);
		return message.id;
	} catch (error) {
		report(error);
		res.json({ success: false, error: error.message });
	}
};

module.exports = { sendSMS };
