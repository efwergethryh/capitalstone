const Message = require('../Models/message')

const sendMessage = async (req, res) => {
    try {
        const { email, name, subject, message } = req.body;

        const newMessage = new Message({ email, name, subject, message });
        await newMessage.save();
        res.status(200).json({ success: true, message: 'Message sent successfully' });
    } catch (error) {
        console.error('Error sending message:', error);
        res.status(500).json({ success: false, error: 'Failed to send message' });
    }
}


module.exports = {
    sendMessage
}