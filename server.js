require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const multer = require('multer');

process.on('uncaughtException', (err) => { console.error('Uncaught exception:', err.message); });
process.on('unhandledRejection', (err) => { console.error('Unhandled rejection:', err?.message || err); });

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const upload = multer({ dest: path.join(__dirname, 'uploads') });

app.use(express.static(path.join(__dirname, 'public')));
app.set('trust proxy', true);

// ─── Site analytics (traffic capture for Director dashboard in CRM) ───
// Fire-and-forget: page views are logged AFTER the response, and any error is
// swallowed so analytics can never slow or break the live site.
const geoip = require('geoip-lite');
const STATIC_RE = /\.(png|jpe?g|gif|webp|svg|ico|css|js|mjs|json|woff2?|ttf|eot|pdf|mp4|webm|map|txt|xml|wasm|gz|zip)$/i;

app.use((req, res, next) => {
  if (req.method !== 'GET') return next();
  const path = req.path || (req.url || '').split('?')[0];
  if (!path || path === '/favicon.ico') return next();
  if (path.startsWith('/api') || path.startsWith('/admin') || path.startsWith('/uploads') || path.startsWith('/dist')) return next();
  if (STATIC_RE.test(path)) return next();

  res.on('finish', () => {
    if (res.statusCode >= 400) return;
    try {
      const fwd = (req.headers['x-forwarded-for'] || '').split(',')[0].trim();
      const ip = (fwd || req.ip || req.socket?.remoteAddress || '').replace(/^::ffff:/, '');
      const ua = (req.headers['user-agent'] || '').slice(0, 500);
      const geo = ip ? geoip.lookup(ip) : null;
      const deviceType = /mobile|iphone|android/i.test(ua) ? 'mobile' : /ipad|tablet/i.test(ua) ? 'tablet' : 'desktop';
      const visitorHash = crypto.createHash('sha256').update(ip + '|' + ua.slice(0, 200)).digest('hex');
      db.query(
        'INSERT INTO site_visits (path, referrer, ip, country_code, city, device_type, user_agent, visitor_hash) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)',
        [
          path,
          (req.headers.referer || '').slice(0, 500) || null,
          ip || null,
          geo?.country || null,
          geo?.city || null,
          deviceType,
          ua,
          visitorHash,
        ]
      ).catch((e) => console.error('[analytics] visit log failed:', e.message));
    } catch (_e) {
      /* analytics never breaks the site */
    }
  });
  next();
});

const db = require('./db/index');
const { sendEmail, hasResendConfigured, nlToBr, escapeHtml } = require('./lib/email');

const INBOX = 'info@cresdynamics.com';
const SENDER = process.env.SENDER_EMAIL || 'onboarding@resend.dev';

// ─── Auth helpers ───
const crypto = require('crypto');

function signAdminSession(email, secret) {
  const payload = JSON.stringify({ email, iat: Date.now() });
  const signature = crypto.createHmac('sha256', secret).update(payload).digest('hex');
  return Buffer.from(payload).toString('base64') + '.' + signature;
}

function verifyAdminSession(token, secret) {
  if (!token) return null;
  try {
    const [payloadB64, signature] = token.split('.');
    const payload = Buffer.from(payloadB64, 'base64').toString('utf8');
    const expected = crypto.createHmac('sha256', secret).update(payload).digest('hex');
    if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) return null;
    const data = JSON.parse(payload);
    if (Date.now() - data.iat > 24 * 60 * 60 * 1000) return null;
    return data;
  } catch { return null; }
}

function adminAuth(req, res, next) {
  const secret = process.env.ADMIN_SESSION_SECRET;
  const token = req.cookies.admin_session;
  const session = verifyAdminSession(token, secret);
  if (!session) return res.redirect('/admin/login');
  req.adminEmail = session.email;
  next();
}

// ─── Helper: markdown-ish body to HTML ───
function bodyToHtml(body) {
  if (!body) return '';
  return body
    .split('\n\n')
    .map(block => {
      if (block.startsWith('## ')) return `<h2 class="text-2xl font-bold mt-8 mb-4">${block.slice(3)}</h2>`;
      if (block.startsWith('### ')) return `<h3 class="text-xl font-bold mt-6 mb-3">${block.slice(4)}</h3>`;
      if (block.startsWith('- ')) {
        const items = block.split('\n').map(l => `<li class="mb-1">${l.replace(/^- /, '')}</li>`).join('');
        return `<ul class="list-disc pl-6 mb-4">${items}</ul>`;
      }
      return `<p class="mb-4 leading-relaxed">${block}</p>`;
    })
    .join('\n');
}

// ════════════════════════════════════════════════════════════════════
// PUBLIC API ROUTES
// ════════════════════════════════════════════════════════════════════

// Contact form
app.post('/api/contact', async (req, res) => {
  try {
    const { fullName, email, contactPhone, projectTitle, projectDetail, subscribe } = req.body;
    if (!fullName || !email || !contactPhone || !projectTitle) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    await db.query(
      'INSERT INTO contact_leads (full_name, email, contact_phone, project_title, project_detail, subscribe) VALUES ($1,$2,$3,$4,$5,$6)',
      [fullName, email, contactPhone, projectTitle, projectDetail || '', subscribe || false]
    );

    // Send notification to inbox
    if (hasResendConfigured()) {
      sendEmail({
        from: `CRES Dynamics <${SENDER}>`,
        to: INBOX,
        subject: `New Contact: ${escapeHtml(projectTitle)}`,
        html: `<h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${escapeHtml(fullName)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          <p><strong>Phone:</strong> ${escapeHtml(contactPhone)}</p>
          <p><strong>Project:</strong> ${escapeHtml(projectTitle)}</p>
          <p><strong>Details:</strong><br>${nlToBr(escapeHtml(projectDetail))}</p>
          <p><strong>Subscribe:</strong> ${subscribe ? 'Yes' : 'No'}</p>`,
        replyTo: email,
      }).catch(e => console.error('Email send failed:', e.message));
    }

    res.json({ message: 'Message sent. We will respond within 2 hours during working hours.' });
  } catch (err) {
    console.error('Contact form error:', err);
    res.status(500).json({ error: 'Failed to send message. Please try again.' });
  }
});

// Career application
app.post('/api/careers/apply', upload.single('cv'), async (req, res) => {
  try {
    const { fullName, email, phone, role, linkedin, portfolio, experience, whyCres } = req.body;
    if (!fullName || !email || !role || !experience || !whyCres) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    const cvFilename = req.file ? req.file.originalname : null;
    await db.query(
      'INSERT INTO career_applications (full_name, email, phone, role, linkedin, portfolio, experience_summary, why_cres, cv_original_filename) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)',
      [fullName, email, phone || null, role, linkedin || null, portfolio || null, experience, whyCres, cvFilename]
    );

    if (hasResendConfigured()) {
      sendEmail({
        from: `CRES Careers <${SENDER}>`,
        to: INBOX,
        subject: `New Application: ${escapeHtml(role)} — ${escapeHtml(fullName)}`,
        html: `<h2>New Career Application</h2>
          <p><strong>Name:</strong> ${escapeHtml(fullName)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          <p><strong>Phone:</strong> ${escapeHtml(phone || '')}</p>
          <p><strong>Role:</strong> ${escapeHtml(role)}</p>
          <p><strong>LinkedIn:</strong> ${escapeHtml(linkedin || 'N/A')}</p>
          <p><strong>Experience:</strong><br>${nlToBr(escapeHtml(experience))}</p>
          <p><strong>Why CRES:</strong><br>${nlToBr(escapeHtml(whyCres))}</p>
          ${cvFilename ? `<p><strong>CV:</strong> ${escapeHtml(cvFilename)}</p>` : ''}`,
        replyTo: email,
      }).catch(e => console.error('Email send failed:', e.message));
    }

    res.json({ message: 'Application submitted successfully. We will review it shortly.' });
  } catch (err) {
    console.error('Career application error:', err);
    res.status(500).json({ error: 'Failed to submit application. Please try again.' });
  }
});

// Event registration
app.post('/api/events/register', async (req, res) => {
  try {
    const { eventTitle, eventDate, firstName, lastName, email, phone, company, ticketType, attendanceType, lanyardCategory, additionalAttendees } = req.body;
    if (!firstName || !email) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    const result = await db.query(
      `INSERT INTO event_reservations (event_title, event_date, first_name, last_name, email, phone, company, ticket_type, attendance_type, lanyard_category, additional_attendees)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
       ON CONFLICT (event_title, event_date, email) DO UPDATE SET
         first_name = EXCLUDED.first_name, last_name = EXCLUDED.last_name,
         phone = EXCLUDED.phone, company = EXCLUDED.company,
         ticket_type = EXCLUDED.ticket_type, lanyard_category = EXCLUDED.lanyard_category,
         additional_attendees = EXCLUDED.additional_attendees, updated_at = now()
       RETURNING id`,
       [eventTitle || 'The Future of AI in Business', eventDate || '31 October 2026', firstName, lastName || null, email, phone || null, company || null, ticketType || 'standard', attendanceType || null, lanyardCategory || null, additionalAttendees || 0]
    );

    if (hasResendConfigured()) {
      const title = eventTitle || 'The Future of AI in Business';
      const date = eventDate || '31 October 2026';
      const ticketLabel = (ticketType || 'standard') === 'vip' ? 'VIP' : 'Standard';
      const lanyardLabel = ({ developer: 'Developer', founder: 'Business Owner', hiring: 'Hiring', jobSeeker: 'Job Seeker', speaker: 'Speaker' }[lanyardCategory] || 'Not selected');
      // Notify admin
      sendEmail({
        from: `CRES Events <${SENDER}>`,
        to: INBOX,
        subject: `New Registration: ${escapeHtml(firstName)} for ${escapeHtml(title)}`,
        html: `<h2>New Event Registration</h2>
          <p><strong>Event:</strong> ${escapeHtml(title)} — ${escapeHtml(date)}</p>
          <p><strong>Name:</strong> ${escapeHtml(firstName)} ${escapeHtml(lastName || '')}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          <p><strong>Phone:</strong> ${escapeHtml(phone || '')}</p>
          <p><strong>Company:</strong> ${escapeHtml(company || '')}</p>
          <p><strong>Ticket:</strong> ${escapeHtml(ticketLabel)}</p>
          <p><strong>Lanyard:</strong> ${escapeHtml(lanyardLabel)}</p>
          <p><strong>Attendance:</strong> ${escapeHtml(attendanceType || 'in-person')}</p>
          <p><strong>Additional attendees:</strong> ${additionalAttendees || 0}</p>`,
        replyTo: email,
      }).catch(e => console.error('Email send failed:', e.message));

      // Confirmation + Payment email to registrant
      const logoUrl = 'https://cresdynamics.com/images/logo.png';
      const paybillNumber = process.env.EVENT_PAYBILL || '542542';
      const accountRef = process.env.EVENT_PAYBILL_ACCOUNT || '43869';
      sendEmail({
        from: `CRES Events <${SENDER}>`,
        to: email,
        subject: `You're In — ${title}`,
        html: `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head><body style="margin:0;padding:0;background:#f4f6f8;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f6f8;"><tr><td align="center" style="padding:40px 20px;">
<table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.08);">

  <!-- Header -->
  <tr><td style="background:#2F3B52;padding:32px 40px;text-align:center;">
    <img src="${logoUrl}" alt="CRES Dynamics" width="140" style="display:block;margin:0 auto 16px;">
    <h1 style="margin:0;color:#ffffff;font-size:22px;font-weight:700;letter-spacing:-0.3px;">You're registered!</h1>
  </td></tr>

  <!-- Body -->
  <tr><td style="padding:36px 40px;">
    <p style="margin:0 0 8px;color:#2F3B52;font-size:15px;">Hi ${escapeHtml(firstName)},</p>
    <p style="margin:0 0 24px;color:#4a5568;font-size:15px;line-height:1.6;">Welcome to <strong>${escapeHtml(title)}</strong>. Here are your registration details.</p>

    <!-- Event Card -->
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;margin-bottom:24px;">
      <tr><td style="padding:20px 24px;">
        <p style="margin:0 0 4px;color:#2FA6B3;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1.2px;">Event</p>
        <p style="margin:0 0 16px;color:#1a202c;font-size:17px;font-weight:700;">${escapeHtml(title)}</p>
        <table width="100%" cellpadding="0" cellspacing="0"><tr>
          <td style="padding:6px 0;color:#4a5568;font-size:14px;vertical-align:top;width:24px;">📅</td>
          <td style="padding:6px 0;color:#4a5568;font-size:14px;">${escapeHtml(date)}</td>
        </tr><tr>
          <td style="padding:6px 0;color:#4a5568;font-size:14px;vertical-align:top;">📍</td>
          <td style="padding:6px 0;color:#4a5568;font-size:14px;">Sarit Expo Centre, Westlands, Nairobi</td>
        </tr><tr>
          <td style="padding:6px 0;color:#4a5568;font-size:14px;vertical-align:top;">🕐</td>
          <td style="padding:6px 0;color:#4a5568;font-size:14px;">1:30 PM – 7:00 PM EAT</td>
        </tr><tr>
          <td style="padding:6px 0;color:#4a5568;font-size:14px;vertical-align:top;">🎫</td>
          <td style="padding:6px 0;color:#4a5568;font-size:14px;"><strong>${escapeHtml(ticketLabel)} Ticket</strong> · ${escapeHtml(attendanceType || 'In-Person')}</td>
        </tr></table>
      </td></tr>
    </table>

    <!-- What's Included -->
    <p style="margin:0 0 12px;color:#2F3B52;font-size:14px;font-weight:700;text-transform:uppercase;letter-spacing:0.8px;">What's Included</p>
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
      <tr><td style="padding:6px 0;color:#4a5568;font-size:14px;">✓ Full-day programme with live demos</td></tr>
      <tr><td style="padding:6px 0;color:#4a5568;font-size:14px;">✓ Networking with 300+ founders, developers, and executives</td></tr>
      <tr><td style="padding:6px 0;color:#4a5568;font-size:14px;">✓ Colour-coded lanyard for smart networking</td></tr>
      <tr><td style="padding:6px 0;color:#4a5568;font-size:14px;">✓ Lunch and refreshments</td></tr>
      <tr><td style="padding:6px 0;color:#4a5568;font-size:14px;">✓ Monday Action Plan — walk out with a system you can use immediately</td></tr>
      ${ticketLabel === 'VIP' ? '<tr><td style="padding:6px 0;color:#2FA6B3;font-size:14px;font-weight:600;">✓ Priority seating and speaker Q&A access</td></tr><tr><td style="padding:6px 0;color:#2FA6B3;font-size:14px;font-weight:600;">✓ Exclusive VIP lounge</td></tr><tr><td style="padding:6px 0;color:#2FA6B3;font-size:14px;font-weight:600;">✓ Personalised AI readiness assessment for your business</td></tr>' : ''}
    </table>

    <!-- Payment Section -->
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#fffbeb;border:1px solid #fcd34d;border-radius:10px;margin-bottom:24px;">
      <tr><td style="padding:20px 24px;">
        <p style="margin:0 0 4px;color:#F39C24;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1.2px;">Complete Your Payment</p>
        <p style="margin:0 0 16px;color:#92400e;font-size:15px;font-weight:600;">${escapeHtml(ticketLabel)} Ticket — ${ticketLabel === 'VIP' ? 'KES 4,000' : 'KES 2,500'}</p>

        <!-- M-Pesa -->
        <p style="margin:0 0 8px;color:#1a202c;font-size:14px;font-weight:700;">M-Pesa (Safaricom)</p>
        <table width="100%" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:8px;margin-bottom:16px;">
          <tr><td style="padding:14px 16px;border:1px solid #e5e7eb;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr><td style="padding:3px 0;color:#6b7280;font-size:13px;">1. Lipa na M-Pesa → Pay Bill</td></tr>
              <tr><td style="padding:3px 0;color:#1a202c;font-size:13px;font-weight:600;">2. Business Number: ${escapeHtml(paybillNumber)}</td></tr>
              <tr><td style="padding:3px 0;color:#1a202c;font-size:13px;font-weight:600;">3. Account: ${escapeHtml(accountRef)}</td></tr>
              <tr><td style="padding:3px 0;color:#6b7280;font-size:13px;">4. Amount: ${ticketLabel === 'VIP' ? 'KES 4,000' : 'KES 2,500'}</td></tr>
              <tr><td style="padding:3px 0;color:#6b7280;font-size:13px;">5. Enter your M-Pesa PIN and confirm</td></tr>
            </table>
          </td></tr>
        </table>

        <!-- Bank Transfer -->
        <p style="margin:0 0 8px;color:#1a202c;font-size:14px;font-weight:700;">Bank Transfer</p>
        <table width="100%" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:8px;">
          <tr><td style="padding:14px 16px;border:1px solid #e5e7eb;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr><td style="padding:3px 0;color:#6b7280;font-size:13px;">Bank: KCB Bank</td></tr>
              <tr><td style="padding:3px 0;color:#1a202c;font-size:13px;font-weight:600;">Account: CRES Dynamics Ltd</td></tr>
              <tr><td style="padding:3px 0;color:#1a202c;font-size:13px;font-weight:600;">Account Number: 1234567890</td></tr>
              <tr><td style="padding:3px 0;color:#6b7280;font-size:13px;">Reference: ${escapeHtml(accountRef)}-${escapeHtml(firstName.substring(0,4).toUpperCase())}</td></tr>
            </table>
          </td></tr>
        </table>

        <p style="margin:16px 0 0;color:#92400e;font-size:13px;line-height:1.5;">After payment, reply to this email with your M-Pesa confirmation code or bank slip so we can confirm your seat.</p>
      </td></tr>
    </table>

    <!-- Next Steps -->
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
      <tr><td style="padding:14px 16px;background:#f0fdfa;border-left:4px solid #2FA6B3;border-radius:0 8px 8px 0;">
        <p style="margin:0 0 6px;color:#1a202c;font-size:14px;font-weight:700;">What happens next?</p>
        <p style="margin:0;color:#4a5568;font-size:13px;line-height:1.6;">1. Complete your payment using M-Pesa or bank transfer<br>2. Reply with your payment confirmation<br>3. We'll send your ticket and event guide 3 days before the event</p>
      </td></tr>
    </table>

    <!-- Contact -->
    <p style="margin:0 0 6px;color:#1a202c;font-size:14px;font-weight:700;">Questions?</p>
    <p style="margin:0;color:#4a5568;font-size:14px;line-height:1.6;">WhatsApp <a href="https://wa.me/254708805496" style="color:#2FA6B3;">+254 708 805 496</a> or email <a href="mailto:events@cresdynamics.com" style="color:#2FA6B3;">events@cresdynamics.com</a></p>
  </td></tr>

  <!-- Footer -->
  <tr><td style="background:#f8fafc;padding:24px 40px;border-top:1px solid #e2e8f0;">
    <p style="margin:0 0 4px;color:#9ca3af;font-size:12px;text-align:center;">CRES Dynamics Ltd · Westlands, Nairobi, Kenya</p>
    <p style="margin:0;color:#9ca3af;font-size:12px;text-align:center;">You registered as ${escapeHtml(email)}</p>
  </td></tr>

</table></td></tr></table></body></html>`,
      }).catch(e => console.error('Email send failed:', e.message));
    }

    res.json({ message: 'Registration received', id: result.rows[0].id });
  } catch (err) {
    console.error('Event registration error:', err);
    res.status(500).json({ error: 'Failed to register. Please try again.' });
  }
});

// Auto-save event registration draft
app.post('/api/events/register-draft', async (req, res) => {
  try {
    const { eventTitle, eventDate, firstName, lastName, email, phone, company, ticketType, attendanceType, lanyardCategory, additionalAttendees } = req.body;
    if (!email) return res.json({ ok: true, mode: 'skip' });
    const eTitle = eventTitle || 'The Future of AI in Business';
    const eDate = eventDate || '31 October 2026';
    if (db.pool) {
      await db.query(
        `INSERT INTO event_reservations (event_title, event_date, first_name, last_name, email, phone, company, ticket_type, attendance_type, lanyard_category, additional_attendees)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
         ON CONFLICT (event_title, event_date, email) DO UPDATE SET
           first_name = COALESCE(NULLIF(EXCLUDED.first_name,''), event_reservations.first_name),
           last_name = COALESCE(NULLIF(EXCLUDED.last_name,''), event_reservations.last_name),
           phone = COALESCE(NULLIF(EXCLUDED.phone,''), event_reservations.phone),
           company = COALESCE(NULLIF(EXCLUDED.company,''), event_reservations.company),
           ticket_type = EXCLUDED.ticket_type,
           attendance_type = COALESCE(NULLIF(EXCLUDED.attendance_type,''), event_reservations.attendance_type),
           lanyard_category = COALESCE(NULLIF(EXCLUDED.lanyard_category,''), event_reservations.lanyard_category),
           additional_attendees = EXCLUDED.additional_attendees,
           updated_at = now()`,
        [eTitle, eDate, firstName || null, lastName || null, email, phone || null, company || null, ticketType || 'standard', attendanceType || null, lanyardCategory || null, additionalAttendees || 0]
      );
    } else {
      if (!global._draftRegistrations) global._draftRegistrations = new Map();
      const existing = global._draftRegistrations.get(email) || {};
      global._draftRegistrations.set(email, {
        event_title: eTitle, event_date: eDate,
        first_name: firstName || existing.first_name || null,
        last_name: lastName || existing.last_name || null,
        email, phone: phone || existing.phone || null,
        company: company || existing.company || null,
        ticket_type: ticketType || existing.ticket_type || 'standard',
        attendance_type: attendanceType || existing.attendance_type || null,
        lanyard_category: lanyardCategory || existing.lanyard_category || null,
        additional_attendees: additionalAttendees || existing.additional_attendees || 0,
        updated_at: new Date().toISOString(),
      });
    }
    res.json({ ok: true });
  } catch (err) {
    console.error('Draft save error:', err.message);
    res.json({ ok: true });
  }
});

// Speaker application
app.post('/api/events/speakers/apply', upload.fields([{ name: 'bioPdf' }, { name: 'image' }]), async (req, res) => {
  try {
    const { fullName, email, phone, company, topic, linkedin, audienceWhy } = req.body;
    if (!fullName || !email || !phone || !topic || !audienceWhy) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    const bioPdfFilename = req.files?.bioPdf?.[0]?.originalname || '';
    const imageFilename = req.files?.image?.[0]?.originalname || '';
    await db.query(
      'INSERT INTO speaker_applications (full_name, email, phone, company, topic, linkedin, audience_why, bio_pdf_filename, image_filename) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)',
      [fullName, email, phone, company || null, topic, linkedin || null, audienceWhy, bioPdfFilename, imageFilename]
    );

    if (hasResendConfigured()) {
      sendEmail({
        from: `CRES Events <${SENDER}>`,
        to: INBOX,
        subject: `Speaker Application: ${escapeHtml(fullName)} — ${escapeHtml(topic)}`,
        html: `<h2>New Speaker Application</h2>
          <p><strong>Name:</strong> ${escapeHtml(fullName)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
          <p><strong>Company:</strong> ${escapeHtml(company || '')}</p>
          <p><strong>Topic:</strong> ${escapeHtml(topic)}</p>
          <p><strong>LinkedIn:</strong> ${escapeHtml(linkedin || 'N/A')}</p>
          <p><strong>Why this audience:</strong><br>${nlToBr(escapeHtml(audienceWhy))}</p>
          ${bioPdfFilename ? `<p><strong>Bio PDF:</strong> ${escapeHtml(bioPdfFilename)}</p>` : ''}
          ${imageFilename ? `<p><strong>Image:</strong> ${escapeHtml(imageFilename)}</p>` : ''}`,
        replyTo: email,
      }).catch(e => console.error('Email send failed:', e.message));
    }

    res.json({ message: 'Application received. We will get back to you within 48 hours.' });
  } catch (err) {
    console.error('Speaker application error:', err);
    res.status(500).json({ error: 'Failed to submit application.' });
  }
});

// Sponsor application
app.post('/api/events/sponsors/apply', async (req, res) => {
  try {
    const { companyName, contactFullName, jobTitle, email, phone, companyWebsite, packageSelected, packageTier, whySponsor, howHeard } = req.body;
    if (!companyName || !contactFullName || !email || !phone || !packageSelected || !whySponsor) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    await db.query(
      'INSERT INTO sponsors_applications (company_name, contact_full_name, job_title, email, phone, company_website, package_selected, package_tier, why_sponsor, how_heard) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)',
      [companyName, contactFullName, jobTitle || '', email, phone, companyWebsite || null, packageSelected, packageTier || packageSelected, whySponsor, howHeard || null]
    );

    if (hasResendConfigured()) {
      sendEmail({
        from: `CRES Events <${SENDER}>`,
        to: INBOX,
        subject: `Sponsor Application: ${escapeHtml(companyName)} — ${escapeHtml(packageSelected)}`,
        html: `<h2>New Sponsor Application</h2>
          <p><strong>Company:</strong> ${escapeHtml(companyName)}</p>
          <p><strong>Contact:</strong> ${escapeHtml(contactFullName)}</p>
          <p><strong>Job Title:</strong> ${escapeHtml(jobTitle || '')}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
          <p><strong>Website:</strong> ${escapeHtml(companyWebsite || 'N/A')}</p>
          <p><strong>Package:</strong> ${escapeHtml(packageSelected)}</p>
          <p><strong>Why Sponsor:</strong><br>${nlToBr(escapeHtml(whySponsor))}</p>
          <p><strong>How heard:</strong> ${escapeHtml(howHeard || 'N/A')}</p>`,
        replyTo: email,
      }).catch(e => console.error('Email send failed:', e.message));
    }

    res.json({ message: 'Application received. We will review and respond within 48 hours.' });
  } catch (err) {
    console.error('Sponsor application error:', err);
    res.status(500).json({ error: 'Failed to submit application.' });
  }
});

// Chat lead capture
app.post('/api/chat-lead', async (req, res) => {
  try {
    const { name, phone, email, pageUrl, userAgent, sessionPublicId } = req.body;
    if (!name || !phone || !sessionPublicId) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    await db.query(
      `INSERT INTO chat_sessions (session_public_id, visitor_name, phone, email, page_url, user_agent)
       VALUES ($1,$2,$3,$4,$5,$6)
       ON CONFLICT (session_public_id) DO UPDATE SET visitor_name = EXCLUDED.visitor_name, phone = EXCLUDED.phone, email = EXCLUDED.email`,
      [sessionPublicId, name, phone, email || null, pageUrl || null, userAgent || null]
    );
    res.json({ message: 'Lead captured' });
  } catch (err) {
    console.error('Chat lead error:', err);
    res.status(500).json({ error: 'Failed to capture lead.' });
  }
});

// AI Chat
app.post('/api/chat', async (req, res) => {
  const { message, conversationHistory, clientDetails, sessionPublicId } = req.body;
  if (!message) return res.status(400).json({ error: 'Message is required' });

  try {
    const groqKey = process.env.GROQ_API_KEY;
    const geminiKey = process.env.GEMINI_API_KEY;

    if (groqKey || geminiKey) {
      const historyForAI = (conversationHistory || []).map(m => ({
        role: m.role === 'assistant' ? 'assistant' : 'user',
        content: m.content
      }));

      if (groqKey) {
        try {
          const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${groqKey}` },
            body: JSON.stringify({
              model: 'llama3-70b-8192',
              messages: [
                { role: 'system', content: 'You are Frank, a helpful AI assistant at CRES Dynamics. Be concise and helpful. If asked about pricing or complex topics, suggest booking a strategy session.' },
                ...historyForAI
              ],
              temperature: 0.7,
              max_tokens: 500
            })
          });
          const data = await response.json();
          if (data.choices?.[0]?.message?.content) {
            const reply = data.choices[0].message.content;
            if (sessionPublicId) {
              await db.query(
                'INSERT INTO chat_messages (session_public_id, role, content) VALUES ($1,$2,$3)',
                [sessionPublicId, 'user', message]
              ).catch(() => {});
              await db.query(
                'INSERT INTO chat_messages (session_public_id, role, content) VALUES ($1,$2,$3)',
                [sessionPublicId, 'assistant', reply]
              ).catch(() => {});
            }
            return res.json({ response: reply });
          }
        } catch (e) {
          console.error('Groq error:', e);
        }
      }
    }

    res.json({ response: "Thanks for your message! To get a detailed response, please book a strategy session at https://wa.me/254708805496" });
  } catch (err) {
    console.error('Chat error:', err);
    res.status(500).json({ error: 'Chat is temporarily unavailable.' });
  }
});

// ════════════════════════════════════════════════════════════════════
// BLOG API
// ════════════════════════════════════════════════════════════════════

app.get('/api/blog', async (req, res) => {
  try {
    const posts = await db.queryMany(
      'SELECT id, slug, title, excerpt, category, body, status, author, published_at, created_at, updated_at FROM blog_posts WHERE status = $1 ORDER BY published_at DESC',
      ['published']
    );
    res.json(posts.map(p => ({ ...p, body: undefined })));
  } catch (err) {
    console.error('Blog list error:', err);
    res.status(500).json({ error: 'Failed to load blog posts' });
  }
});

app.get('/api/blog/:slug', async (req, res) => {
  try {
    const post = await db.queryOne(
      'SELECT * FROM blog_posts WHERE slug = $1 AND status = $2',
      [req.params.slug, 'published']
    );
    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.json(post);
  } catch (err) {
    console.error('Blog post error:', err);
    res.status(500).json({ error: 'Failed to load blog post' });
  }
});

// ════════════════════════════════════════════════════════════════════
// ADMIN API ROUTES
// ════════════════════════════════════════════════════════════════════

app.post('/api/admin/login', (req, res) => {
  const { email, password } = req.body;
  if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
    const token = signAdminSession(email, process.env.ADMIN_SESSION_SECRET);
    res.cookie('admin_session', token, {
      httpOnly: true,
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 1000,
      path: '/'
    });
    return res.json({ success: true });
  }
  res.status(401).json({ error: 'Invalid credentials' });
});

app.post('/api/admin/logout', (req, res) => {
  res.clearCookie('admin_session', { path: '/' });
  res.json({ success: true });
});

app.get('/api/admin/me', adminAuth, (req, res) => {
  res.json({ email: req.adminEmail });
});

// Blog CRUD (admin)
app.get('/api/admin/blog', adminAuth, async (req, res) => {
  try {
    const posts = await db.queryMany(
      'SELECT * FROM blog_posts ORDER BY updated_at DESC'
    );
    res.json(posts.map(mapPost));
  } catch (err) {
    res.status(500).json({ error: 'Failed to load posts' });
  }
});

app.get('/api/admin/blog/:id', adminAuth, async (req, res) => {
  try {
    const row = await db.queryOne('SELECT * FROM blog_posts WHERE id = $1', [req.params.id]);
    if (!row) return res.status(404).json({ error: 'Post not found' });
    res.json(mapPost(row));
  } catch (err) {
    res.status(500).json({ error: 'Failed to load post' });
  }
});

function mapPost(row) {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    category: row.category,
    body: row.body,
    status: row.status,
    published: (row.status === 'published'),
    metaTitle: row.meta_title,
    metaDescription: row.meta_description,
    author: row.author,
    publishedAt: row.published_at,
    updatedAt: row.updated_at
  };
}

app.post('/api/admin/blog', adminAuth, async (req, res) => {
  try {
    const { title, slug, excerpt, category, body, status, metaTitle, metaDescription, author } = req.body;
    if (!title || !title.trim()) return res.status(400).json({ error: 'Title is required' });
    if (!slug || !slug.trim()) return res.status(400).json({ error: 'Slug is required' });
    if (!body || !body.trim()) return res.status(400).json({ error: 'Body is required' });
    const normalizedStatus = normalizeBlogStatus(status, req.body.published);
    const publishedAt = normalizedStatus === 'published' ? new Date().toISOString() : null;
    const result = await db.query(
      `INSERT INTO blog_posts (slug, title, excerpt, category, body, status, meta_title, meta_description, author, published_at)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING id`,
      [slug, title, excerpt || null, category || null, body, normalizedStatus, metaTitle || null, metaDescription || null, author || 'CRES Dynamics', publishedAt]
    );
    res.json({ id: result.rows[0].id });
  } catch (err) {
    console.error('Blog create error:', err);
    if (err && err.code === '23505') return res.status(409).json({ error: 'A post with this slug already exists' });
    res.status(500).json({ error: 'Failed to create post' });
  }
});

function normalizeBlogStatus(status, published) {
  if (status === 'published' || status === 'draft') return status;
  return published ? 'published' : 'draft';
}

app.patch('/api/admin/blog/:id', adminAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const existing = await db.queryOne('SELECT * FROM blog_posts WHERE id = $1', [id]);
    if (!existing) return res.status(404).json({ error: 'Post not found' });
    const { title, slug, excerpt, category, body, status, metaTitle, metaDescription, author } = req.body;
    const normalizedStatus = normalizeBlogStatus(status, req.body.published) || existing.status || 'draft';
    if ((title && !title.trim()) || (slug && !slug.trim())) return res.status(400).json({ error: 'Title and slug are required' });
    const merged = {
      title: title ?? existing.title,
      slug: slug ?? existing.slug,
      excerpt: (excerpt !== undefined ? excerpt : existing.excerpt) || null,
      category: (category !== undefined ? category : existing.category) || null,
      body: body ?? existing.body,
      status: normalizedStatus,
      metaTitle: (metaTitle !== undefined ? metaTitle : existing.meta_title) || null,
      metaDescription: (metaDescription !== undefined ? metaDescription : existing.meta_description) || null,
      author: author || existing.author || 'CRES Dynamics'
    };
    await db.query(
      `UPDATE blog_posts SET title=$2, slug=$3, excerpt=$4, category=$5, body=$6, status=$7, meta_title=$8, meta_description=$9, author=$10, updated_at=now(), published_at=CASE WHEN $7='published' THEN COALESCE(published_at, now()) ELSE published_at END WHERE id=$1`,
      [id, merged.title, merged.slug, merged.excerpt, merged.category, merged.body, merged.status, merged.metaTitle, merged.metaDescription, merged.author]
    );
    res.json({ success: true });
  } catch (err) {
    console.error('Blog update error:', err);
    if (err && err.code === '23505') return res.status(409).json({ error: 'A post with this slug already exists' });
    res.status(500).json({ error: 'Failed to update post' });
  }
});

app.delete('/api/admin/blog/:id', adminAuth, async (req, res) => {
  try {
    await db.query('DELETE FROM blog_posts WHERE id = $1', [req.params.id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete post' });
  }
});

// Event reservations (admin)
app.get('/api/admin/events/reservations', adminAuth, async (req, res) => {
  try {
    const rows = await db.queryMany('SELECT * FROM event_reservations ORDER BY created_at DESC LIMIT 500');
    res.json(rows.map(r => ({
      id: r.id,
      ticketNumber: r.ticket_number || '-',
      name: [r.first_name, r.last_name].filter(Boolean).join(' ') || '-',
      company: r.company || '-',
      email: r.email,
      phone: r.phone || '',
      ticketType: r.ticket_type || '-',
      attendanceType: r.attendance_type || '',
      lanyardCategory: r.lanyard_category || '',
      bookingStatus: r.booking_status || 'pending',
      paid: (r.booking_status === 'paid'),
      createdAt: r.created_at
    })));
  } catch (err) {
    res.status(500).json({ error: 'Failed to load reservations' });
  }
});

app.patch('/api/admin/events/reservations/:id', adminAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const { bookingStatus } = req.body;
    const paidAt = bookingStatus === 'paid' ? new Date().toISOString() : null;
    const paidBy = bookingStatus === 'paid' ? req.adminEmail : null;
    const paidSource = bookingStatus === 'paid' ? 'manual' : null;
    await db.query(
      'UPDATE event_reservations SET booking_status=$2, paid_at=$3, paid_by=$4, paid_source=$5, updated_at=now() WHERE id=$1',
      [id, bookingStatus, paidAt, paidBy, paidSource]
    );
    res.json({ ok: true, bookingStatus, paidAt, paidBy });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update reservation' });
  }
});

app.delete('/api/admin/events/reservations/:id', adminAuth, async (req, res) => {
  try {
    await db.query('DELETE FROM event_reservations WHERE id = $1', [req.params.id]);
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete reservation' });
  }
});

// Speaker applications (admin)
app.get('/api/admin/speakers', adminAuth, async (req, res) => {
  try {
    const rows = await db.queryMany('SELECT * FROM speaker_applications ORDER BY created_at DESC');
    res.json(rows.map(s => ({
      id: s.id,
      name: s.full_name,
      email: s.email,
      phone: s.phone,
      company: s.company,
      topic: s.topic,
      createdAt: s.created_at
    })));
  } catch (err) {
    res.status(500).json({ error: 'Failed to load speakers' });
  }
});

// Sponsor applications (admin)
app.get('/api/admin/sponsors', adminAuth, async (req, res) => {
  try {
    const rows = await db.queryMany('SELECT * FROM sponsors_applications ORDER BY created_at DESC');
    res.json(rows.map(s => ({
      id: s.id,
      company: s.company_name,
      contactName: s.contact_full_name,
      jobTitle: s.job_title,
      email: s.email,
      phone: s.phone,
      companyWebsite: s.company_website,
      package: s.package_selected,
      packageTier: s.package_tier,
      status: s.status,
      createdAt: s.created_at
    })));
  } catch (err) {
    res.status(500).json({ error: 'Failed to load sponsors' });
  }
});

app.patch('/api/admin/sponsors/:id', adminAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const { status, notes } = req.body;
    await db.query('UPDATE sponsors_applications SET status=$2, notes=$3 WHERE id=$1', [id, status, notes || null]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update sponsor' });
  }
});

// Career applications (admin)
app.get('/api/admin/applications', adminAuth, async (req, res) => {
  try {
    const rows = await db.queryMany('SELECT * FROM career_applications ORDER BY created_at DESC');
    res.json(rows.map(a => ({
      id: a.id,
      name: a.full_name,
      role: a.role,
      email: a.email,
      phone: a.phone,
      cvFileName: a.cv_original_filename || '',
      createdAt: a.created_at
    })));
  } catch (err) {
    res.status(500).json({ error: 'Failed to load applications' });
  }
});

// Chat sessions (admin)
app.get('/api/admin/messages', adminAuth, async (req, res) => {
  try {
    const rows = await db.queryMany(`
      SELECT cs.*, 
        (SELECT content FROM chat_messages WHERE session_public_id = cs.session_public_id ORDER BY created_at DESC LIMIT 1) as last_message
      FROM chat_sessions cs 
      ORDER BY cs.last_message_at DESC NULLS LAST, cs.created_at DESC 
      LIMIT 200
    `);
    res.json(rows.map(m => ({
      id: m.id,
      sessionPublicId: m.session_public_id,
      name: m.visitor_name || 'Anonymous',
      phone: m.phone || '',
      email: m.email || '',
      pageUrl: m.page_url || '',
      lastMessage: m.last_message || '',
      lastMessageAt: m.last_message_at || m.created_at,
      updatedAt: m.last_message_at || m.created_at
    })));
  } catch (err) {
    res.status(500).json({ error: 'Failed to load messages' });
  }
});

// Payments (admin)
app.get('/api/admin/payments', adminAuth, async (req, res) => {
  try {
    const rows = await db.queryMany('SELECT * FROM payments ORDER BY created_at DESC LIMIT 200');
    res.json(rows.map(p => ({
      id: p.id,
      source: p.source || '-',
      reference: p.reference || '-',
      email: p.email,
      phone: p.phone,
      amount: p.amount_kes || 0,
      currency: p.currency || 'KES',
      status: p.status || 'pending',
      purpose: p.purpose || '-',
      createdAt: p.created_at
    })));
  } catch (err) {
    res.status(500).json({ error: 'Failed to load payments' });
  }
});

// Dashboard stats
app.get('/api/admin/dashboard', adminAuth, async (req, res) => {
  try {
    const [events, messages, applications, speakers, sponsors, payments, blog] = await Promise.all([
      db.queryOne(`SELECT COUNT(*) as total, COUNT(*) FILTER (WHERE booking_status='paid') as paid, COUNT(*) FILTER (WHERE booking_status='pending') as pending FROM event_reservations`),
      db.queryOne(`SELECT COUNT(*) as total, COUNT(*) FILTER (WHERE subscribe=true) as subscribed FROM contact_leads`),
      db.queryOne('SELECT COUNT(*) as total FROM career_applications'),
      db.queryOne('SELECT COUNT(*) as total FROM speaker_applications'),
      db.queryOne(`SELECT COUNT(*) as total, COUNT(*) FILTER (WHERE status='Confirmed') as confirmed FROM sponsors_applications`),
      db.queryOne(`SELECT COUNT(*) as total, COUNT(*) FILTER (WHERE status='paid') as paid, COALESCE(SUM(amount_kes) FILTER (WHERE status='paid'),0) as amount_paid FROM payments`),
      db.queryOne(`SELECT COUNT(*) as total, COUNT(*) FILTER (WHERE status='published') as published, COUNT(*) FILTER (WHERE status='draft') as drafts FROM blog_posts`),
    ]);
    res.json({
      events: events.total,
      messages: messages.total,
      careers: applications.total,
      speakers: speakers.total,
      sponsors: sponsors.total,
      payments: payments.total,
      blog: blog.total
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to load dashboard stats' });
  }
});

// Attendees CSV export
app.get('/api/admin/events/attendees-export', adminAuth, async (req, res) => {
  try {
    const rows = await db.queryMany('SELECT * FROM event_reservations WHERE booking_status = $1 ORDER BY created_at', ['paid']);
    const headers = ['Ticket #', 'First Name', 'Last Name', 'Email', 'Phone', 'Company', 'Ticket Type', 'Lanyard', 'Paid At', 'Paid By'];
    const csv = [headers.join(',')];
    for (const r of rows) {
      csv.push([r.ticket_number, r.first_name, r.last_name, r.email, r.phone, r.company, r.ticket_type, r.lanyard_category, r.paid_at, r.paid_by].map(v => `"${(v || '').toString().replace(/"/g, '""')}"`).join(','));
    }
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="attendees.csv"');
    res.send(csv.join('\n'));
  } catch (err) {
    res.status(500).json({ error: 'Export failed' });
  }
});

// ════════════════════════════════════════════════════════════════════
// SERVER-RENDERED PAGES
// ════════════════════════════════════════════════════════════════════

const fs = require('fs');

function renderPage(res, pageFile, data = {}) {
  try {
    const layout = fs.readFileSync(path.join(__dirname, 'views', 'layout.html'), 'utf8');
    const page = fs.readFileSync(path.join(__dirname, 'views', pageFile), 'utf8');
    let html = layout.replace('{{content}}', page);
    for (const [key, val] of Object.entries(data)) {
      html = html.replace(new RegExp(`{{${key}}}`, 'g'), val || '');
    }
    html = html.replace(/\{\{title\}\}/g, data.title || 'CRES Dynamics — Digital Innovation, Websites & AI in Nairobi');
    html = html.replace(/\{\{description\}\}/g, data.description || 'CRES Dynamics builds high-performing websites, e-commerce platforms, ERPs, AI automation and predictive systems for growing businesses in Kenya and beyond.');
    res.send(html);
  } catch (err) {
    console.error(`Render error for ${pageFile}:`, err);
    res.status(500).send('Page not found');
  }
}

// Public pages
app.get('/', (req, res) => renderPage(res, 'index.html'));
app.get('/about', (req, res) => renderPage(res, 'about.html'));
app.get('/who-we-are', (req, res) => res.redirect('/about'));
app.get('/why-us', (req, res) => renderPage(res, 'why-us.html'));
app.get('/how-we-build', (req, res) => renderPage(res, 'how-we-build.html'));
app.get('/how-we-work', (req, res) => renderPage(res, 'how-we-work.html'));
app.get('/websites', (req, res) => renderPage(res, 'services/websites.html'));
app.get('/erp', (req, res) => renderPage(res, 'services/erp.html'));
app.get('/e-commerce', (req, res) => renderPage(res, 'services/e-commerce.html'));
app.get('/ai-automation', (req, res) => renderPage(res, 'services/ai-automation.html'));
app.get('/finance-platforms', (req, res) => renderPage(res, 'services/finance-platforms.html'));
app.get('/operations-workflow', (req, res) => renderPage(res, 'services/operations-workflow.html'));
app.get('/software', (req, res) => renderPage(res, 'services/software.html'));
app.get('/cresos', (req, res) => renderPage(res, 'cresos.html'));
app.get('/contact', (req, res) => renderPage(res, 'contact.html'));
app.get('/partners', (req, res) => renderPage(res, 'partners.html'));
app.get('/careers', (req, res) => renderPage(res, 'careers.html'));
app.get('/pricing', (req, res) => renderPage(res, 'pricing.html'));
app.get('/book-strategy-call', (req, res) => renderPage(res, 'book-strategy-call.html'));
app.get('/projects', (req, res) => renderPage(res, 'projects.html'));
app.get('/client-testimonials', (req, res) => renderPage(res, 'client-testimonials.html'));
app.get('/growth-guides', (req, res) => renderPage(res, 'growth-guides.html'));
app.get('/insights', (req, res) => renderPage(res, 'insights.html'));
app.get('/terms', (req, res) => renderPage(res, 'terms.html'));
app.get('/privacy', (req, res) => renderPage(res, 'privacy.html'));
app.get('/data-security', (req, res) => renderPage(res, 'data-security.html'));

// Blog (dynamic from DB)
app.get('/blog', async (req, res) => {
  try {
    const posts = await db.queryMany(
      "SELECT id, slug, title, excerpt, category, published_at FROM blog_posts WHERE status = 'published' ORDER BY published_at DESC"
    );
    renderPage(res, 'blog/index.html', { posts: JSON.stringify(posts) });
  } catch (err) {
    renderPage(res, 'blog/index.html', { posts: '[]' });
  }
});

app.get('/blog/:slug', async (req, res) => {
  try {
    const post = await db.queryOne(
      "SELECT * FROM blog_posts WHERE slug = $1 AND status = 'published'",
      [req.params.slug]
    );
    if (!post) return res.redirect('/blog');
    const htmlBody = bodyToHtml(post.body);
    renderPage(res, 'blog/post.html', {
      title: post.title,
      body: htmlBody,
      category: post.category || '',
      author: post.author,
      date: post.published_at ? new Date(post.published_at).toLocaleDateString('en-KE', { year: 'numeric', month: 'long', day: 'numeric' }) : '',
      excerpt: post.excerpt || '',
      slug: post.slug,
    });
  } catch (err) {
    res.redirect('/blog');
  }
});

// Events
app.get('/events', (req, res) => renderPage(res, 'events/index.html'));
app.get('/events/the-future-of-ai-in-business', (req, res) => renderPage(res, 'events/future-ai.html'));
app.get('/events/the-future-of-ai-in-business/programme', (req, res) => renderPage(res, 'events/programme.html'));
app.get('/events/speak', (req, res) => renderPage(res, 'events/speak.html'));

// Case studies
app.get('/case-studies', (req, res) => renderPage(res, 'case-studies/index.html'));
app.get('/case-studies/:slug', (req, res) => {
  const slug = req.params.slug;
  const file = path.join(__dirname, 'views', 'case-studies', `${slug}.html`);
  if (!fs.existsSync(file)) return res.redirect('/case-studies');
  renderPage(res, `case-studies/${slug}.html`);
});

// Solutions
app.get('/solutions/:slug', (req, res) => {
  const validSlugs = ['ai-automation', 'consulting-strategy', 'content-brand', 'digital-sales', 'seo-visibility', 'web-growth'];
  if (!validSlugs.includes(req.params.slug)) return res.redirect('/');
  renderPage(res, `solutions/${req.params.slug}.html`);
});

// Services
app.get('/services/:slug', (req, res) => {
  const validSlugs = ['automation', 'finance', 'operations', 'websites'];
  if (!validSlugs.includes(req.params.slug)) return res.redirect('/');
  renderPage(res, `services/${req.params.slug}.html`);
});

// Admin pages (own minimal layout: no site nav/footer/chat, dedicated admin.css)
function renderAdminPage(res, pageFile, data = {}) {
  try {
    const layout = fs.readFileSync(path.join(__dirname, 'views', 'admin-layout.html'), 'utf8');
    const page = fs.readFileSync(path.join(__dirname, 'views', pageFile), 'utf8');
    let html = layout.replace('{{content}}', page);
    for (const [key, val] of Object.entries(data)) {
      html = html.replace(new RegExp(`{{${key}}}`, 'g'), val || '');
    }
    html = html.replace(/\{\{title\}\}/g, data.title || 'Admin — CRES Dynamics');
    res.send(html);
  } catch (err) {
    console.error(`Render admin error for ${pageFile}:`, err);
    res.status(500).send('Admin page not found');
  }
}

app.get('/admin/login', (req, res) => renderAdminPage(res, 'admin/login.html'));
app.get('/admin', adminAuth, (req, res) => renderAdminPage(res, 'admin/dashboard.html'));
app.get('/admin/blog', adminAuth, (req, res) => renderAdminPage(res, 'admin/blog.html'));
app.get('/admin/blog/new', adminAuth, (req, res) => renderAdminPage(res, 'admin/blog-editor.html'));
app.get('/admin/blog-editor', adminAuth, (req, res) => renderAdminPage(res, 'admin/blog-editor.html'));
app.get('/admin/blog/:id/edit', adminAuth, (req, res) => renderAdminPage(res, 'admin/blog-editor.html'));
app.get('/admin/events', adminAuth, (req, res) => renderAdminPage(res, 'admin/events.html'));
app.get('/admin/applications', adminAuth, (req, res) => renderAdminPage(res, 'admin/applications.html'));
app.get('/admin/speakers', adminAuth, (req, res) => renderAdminPage(res, 'admin/speakers.html'));
app.get('/admin/sponsors', adminAuth, (req, res) => renderAdminPage(res, 'admin/sponsors.html'));
app.get('/admin/messages', adminAuth, (req, res) => renderAdminPage(res, 'admin/messages.html'));
app.get('/admin/payments', adminAuth, (req, res) => renderAdminPage(res, 'admin/payments.html'));

// Catch-all
app.use((req, res) => res.redirect('/'));

app.listen(PORT, () => {
  console.log(`CRES Dynamics server running on http://localhost:${PORT}`);
});

// Prune site analytics older than 6 months (covers the director's longest window)
const PRUNE_AFTER_DAYS = 183;
async function pruneSiteVisits() {
  try {
    const r = await db.query(
      'DELETE FROM site_visits WHERE visited_at < now() - make_interval(days => $1)',
      [PRUNE_AFTER_DAYS]
    );
    if (r.rowCount > 0) {
      console.log(`[analytics] pruned ${r.rowCount} visits older than ${PRUNE_AFTER_DAYS} days`);
    }
  } catch (e) {
    console.error('[analytics] prune failed:', e.message);
  }
}
pruneSiteVisits();
setInterval(pruneSiteVisits, 24 * 60 * 60 * 1000);
