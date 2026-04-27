const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// File to save messages
const messagesFile = path.join(__dirname, 'messages.json');
if (!fs.existsSync(messagesFile)) {
  fs.writeFileSync(messagesFile, JSON.stringify([], null, 2));
}

// Email transporter — we'll use Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'YOUR_GMAIL@gmail.com',       // replace with your Gmail
    pass: 'YOUR_APP_PASSWORD'           // replace with your app password
  }
});

// Contact route
app.post('/contact', async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // 1 — Save to messages.json
  const existing = JSON.parse(fs.readFileSync(messagesFile));
  existing.push({
    id: Date.now(),
    name,
    email,
    subject: subject || '(no subject)',
    message,
    receivedAt: new Date().toISOString()
  });
  fs.writeFileSync(messagesFile, JSON.stringify(existing, null, 2));

  // 2 — Send email
  try {
    await transporter.sendMail({
      from: `"NOVA Website" <YOUR_GMAIL@gmail.com>`,
      to: 'YOUR_GMAIL@gmail.com',       // where you want to receive messages
      subject: `NOVA Contact: ${subject || 'New Message'} from ${name}`,
      html: `
        <h2>New message from NOVA website</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject || '(none)'}</p>
        <p><strong>Message:</strong><br>${message}</p>
        <p><small>Received at ${new Date().toLocaleString()}</small></p>
      `
    });
  } catch (err) {
    console.error('Email error:', err.message);
    // Still return success since message was saved
  }

  res.status(200).json({ success: true });
});

app.listen(3000, () => {
  console.log('NOVA server running on http://localhost:3000');
});