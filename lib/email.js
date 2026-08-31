const { Resend } = require('resend');

function getResendApiKeys() {
  const keys = new Set();
  if (process.env.RESEND_API_KEY) keys.add(process.env.RESEND_API_KEY.trim());
  if (process.env.RESEND_API_KEY_FALLBACK) keys.add(process.env.RESEND_API_KEY_FALLBACK.trim());
  return [...keys];
}

function hasResendConfigured() {
  return getResendApiKeys().length > 0;
}

async function sendEmail({ from, to, subject, html, text, replyTo, attachments }) {
  const testOverride = process.env.NODE_ENV === 'production' ? '' : (process.env.EMAIL_TEST_OVERRIDE || '').trim();
  if (testOverride) {
    if (subject) subject = `[TEST→${to}] ${subject}`;
    console.warn(`[email:test-override] website redirected '${to}' -> ${testOverride}`);
    to = testOverride;
  }

  const keys = getResendApiKeys();
  if (keys.length === 0) {
    return { sent: false, error: 'RESEND_API_KEY not configured' };
  }

  let lastError = 'Send failed';
  for (let i = 0; i < keys.length; i++) {
    try {
      const client = new Resend(keys[i]);
      const result = await client.emails.send({
        from: from || `CRES Dynamics <${process.env.SENDER_EMAIL || 'onboarding@resend.dev'}>`,
        to,
        subject,
        html,
        text,
        replyTo,
        attachments,
      });
      if (result.error) {
        lastError = result.error.message;
        continue;
      }
      return { sent: true, keyIndex: i };
    } catch (err) {
      lastError = err.message;
    }
  }
  return { sent: false, error: lastError };
}

function nlToBr(text) {
  return (text || '').replace(/\n/g, '<br>');
}

function escapeHtml(str) {
  return (str || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

module.exports = { sendEmail, hasResendConfigured, nlToBr, escapeHtml };
