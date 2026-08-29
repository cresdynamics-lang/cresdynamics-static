// CRES Dynamics — Main JS
(function() {
  'use strict';

  // ─── SCROLL REVEAL ───
  const revealElements = document.querySelectorAll('.scroll-reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
  revealElements.forEach(el => revealObserver.observe(el));

  // ─── NAV SCROLL ───
  const header = document.getElementById('main-header');
  if (header) {
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          header.classList.toggle('nav-glass-scrolled', window.scrollY > 40);
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  // ─── DESKTOP DROPDOWNS ───
  let activeDropdown = null;
  document.querySelectorAll('.nav-item[data-dropdown]').forEach(item => {
    const key = item.dataset.dropdown;
    const dropdown = document.getElementById('dropdown-' + key);
    if (!dropdown) return;

    let closeTimer = null;

    item.addEventListener('mouseenter', () => {
      if (closeTimer) { clearTimeout(closeTimer); closeTimer = null; }
      if (activeDropdown && activeDropdown !== dropdown) {
        activeDropdown.classList.remove('open');
      }
      dropdown.classList.add('open');
      activeDropdown = dropdown;
    });

    item.addEventListener('mouseleave', () => {
      closeTimer = setTimeout(() => {
        dropdown.classList.remove('open');
        if (activeDropdown === dropdown) activeDropdown = null;
      }, 150);
    });

    dropdown.addEventListener('mouseenter', () => {
      if (closeTimer) { clearTimeout(closeTimer); closeTimer = null; }
    });

    dropdown.addEventListener('mouseleave', () => {
      closeTimer = setTimeout(() => {
        dropdown.classList.remove('open');
        if (activeDropdown === dropdown) activeDropdown = null;
      }, 150);
    });
  });

  // Close dropdowns on click outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-item') && !e.target.closest('.nav-dropdown')) {
      document.querySelectorAll('.nav-dropdown.open').forEach(d => d.classList.remove('open'));
      activeDropdown = null;
    }
  });

  // ─── MOBILE MENU ───
  const mobileBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const desktopNav = document.getElementById('desktop-nav');

  function checkMobile() {
    const isMobile = window.innerWidth <= 1024;
    if (mobileBtn) mobileBtn.style.display = isMobile ? 'block' : 'none';
    if (desktopNav) desktopNav.style.display = isMobile ? 'none' : 'flex';
  }
  checkMobile();
  window.addEventListener('resize', checkMobile);

  if (mobileBtn && mobileMenu) {
    mobileBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
    });
    document.querySelectorAll('.mobile-dropdown-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const sub = document.getElementById('mobile-' + btn.dataset.mobile);
        if (sub) sub.style.display = sub.style.display === 'none' ? 'flex' : 'none';
      });
    });
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => mobileMenu.classList.remove('open'));
    });
  }

  // ─── ACTIVE NAV LINK ───
  const path = window.location.pathname;
  document.querySelectorAll('.nav-link-glass').forEach(link => {
    const href = link.getAttribute('href');
    if (href && path === href) link.classList.add('active');
    else if (href && href !== '/' && path.startsWith(href)) link.classList.add('active');
  });

  // ─── CHAT WIDGET ───
  const chatWidget = document.getElementById('chat-widget');
  const isChatPage = path.startsWith('/events') || path.startsWith('/admin') || path.startsWith('/management');
  if (chatWidget && !isChatPage) {
    initChatWidget(chatWidget);
  }

  function initChatWidget(container) {
    let phase = 'closed';
    let sessionPublicId = '';
    let messages = [];
    let clientDetails = null;
    let showDetailsForm = true;
    let messageCount = 0;
    const MAX_MESSAGES = 4;

    try { sessionPublicId = crypto.randomUUID(); } catch(e) { sessionPublicId = 'sess_' + Date.now() + '_' + Math.random().toString(36).slice(2); }

    const PEEK_MSG = "Hi! I'm Frank from CRES Dynamics. I can help you understand how our systems work for businesses like yours.";
    const GREETING = "Hey there! I'm Frank, your guide at CRES Dynamics. What business challenge can I help you with today?";
    const LIMIT_MSG = "Thanks for chatting! For deeper questions, book a free strategy session.";
    const UNAVAIL_MSG = "I'm temporarily unavailable. Please reach us on WhatsApp at +254 708 805 496.";

    function render() {
      if (phase === 'closed') {
        container.innerHTML = `<div class="chat-launcher" id="chat-launch" title="Chat with Frank"><span class="chat-launcher-ring"></span><span class="chat-launcher-btn"><svg style="width:20px;height:20px;color:#fff" fill="none" stroke="currentColor" stroke-width="2.25" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 20.105V4.875A2.625 2.625 0 016.375 2.25h11.25A2.625 2.625 0 0120.25 4.875v10.5A2.625 2.625 0 0117.625 18H6.375a2.625 2.625 0 01-2.625-2.625z"/></svg></span><span class="chat-launcher-dot"></span></div>`;
        setTimeout(() => {
          document.getElementById('chat-launch')?.addEventListener('click', () => { phase = 'peek'; render(); });
        }, 50);
        return;
      }

      if (phase === 'peek') {
        container.innerHTML = `<div class="chat-peek"><div style="display:flex;gap:8px;align-items:flex-start;"><div style="width:24px;height:24px;border-radius:50%;background:linear-gradient(135deg,var(--teal-accent),#1A3A8A);display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:bold;color:#fff;flex-shrink:0;">F</div><div style="flex:1;"><p style="font-size:10px;font-weight:600;color:var(--teal-accent);">Frank · CRES Dynamics</p><p style="font-size:12px;color:rgba(255,255,255,0.95);margin-top:4px;">${PEEK_MSG}</p></div></div><button id="chat-peek-cta" style="width:100%;margin-top:12px;padding:8px 12px;border-radius:8px;background:linear-gradient(90deg,var(--orange-energy),#E87528);border:none;color:#fff;font-size:12px;font-weight:600;cursor:pointer;">Chat with Frank →</button><button id="chat-peek-dismiss" style="position:absolute;top:8px;right:8px;background:none;border:none;color:rgba(255,255,255,0.45);cursor:pointer;font-size:14px;">✕</button></div>`;
        setTimeout(() => {
          document.getElementById('chat-peek-cta')?.addEventListener('click', () => { phase = 'open'; render(); });
          document.getElementById('chat-peek-dismiss')?.addEventListener('click', () => { phase = 'closed'; render(); });
        }, 50);
        return;
      }

      if (phase === 'open') {
        const msgsHtml = messages.map(m => `<div class="chat-msg ${m.role}">${escapeHtml(m.content)}</div>`).join('');
        const formHtml = showDetailsForm ? `
          <div style="padding:12px;flex:1;overflow-y:auto;">
            <div class="chat-msg assistant"><p style="font-size:12px;color:rgba(255,255,255,0.95);">Hi! I'm Frank from CRES Dynamics. Let me know your name and number so I can assist you better.</p></div>
            <form id="chat-lead-form" style="margin-top:12px;border:1px solid rgba(255,255,255,0.1);border-radius:12px;padding:12px;background:rgba(255,255,255,0.03);">
              <div style="margin-bottom:8px;"><label style="display:block;font-size:11px;font-weight:500;color:rgba(255,255,255,0.8);margin-bottom:4px;">Full name *</label><input type="text" id="chat-name" required style="width:100%;padding:8px 12px;border-radius:8px;border:1px solid rgba(255,255,255,0.12);background:rgba(255,255,255,0.06);color:#fff;font-size:12px;outline:none;"></div>
              <div style="margin-bottom:8px;"><label style="display:block;font-size:11px;font-weight:500;color:rgba(255,255,255,0.8);margin-bottom:4px;">Phone / WhatsApp *</label><input type="tel" id="chat-phone" required placeholder="+254 712 345 678" style="width:100%;padding:8px 12px;border-radius:8px;border:1px solid rgba(255,255,255,0.12);background:rgba(255,255,255,0.06);color:#fff;font-size:12px;outline:none;"></div>
              <div style="margin-bottom:8px;"><label style="display:block;font-size:11px;font-weight:500;color:rgba(255,255,255,0.8);margin-bottom:4px;">Email (optional)</label><input type="email" id="chat-email" placeholder="you@company.co.ke" style="width:100%;padding:8px 12px;border-radius:8px;border:1px solid rgba(255,255,255,0.12);background:rgba(255,255,255,0.06);color:#fff;font-size:12px;outline:none;"></div>
              <button type="submit" style="width:100%;padding:8px;border-radius:8px;background:linear-gradient(90deg,var(--orange-energy),#E87528);border:none;color:#fff;font-size:12px;font-weight:600;cursor:pointer;">Start chat</button>
            </form>
          </div>` : `
          <div class="chat-messages" id="chat-messages">${msgsHtml}</div>
          <form id="chat-form" class="chat-input-area"><input type="text" id="chat-input" placeholder="Type a message..." autocomplete="off"><button type="submit" class="chat-send-btn">Send</button></form>`;

        container.innerHTML = `<div class="chat-window"><div class="chat-header"><div style="width:32px;height:32px;border-radius:50%;background:rgba(47,166,179,0.2);display:flex;align-items:center;justify-content:center;"><svg style="width:16px;height:16px;color:var(--teal-accent)" fill="none" stroke="currentColor" stroke-width="2.25" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 20.105V4.875A2.625 2.625 0 016.375 2.25h11.25A2.625 2.625 0 0120.25 4.875v10.5A2.625 2.625 0 0117.625 18H6.375a2.625 2.625 0 01-2.625-2.625z"/></svg></div><div style="flex:1;"><div style="display:flex;align-items:center;gap:6px;"><h3 style="font-size:14px;font-weight:700;color:#fff;">Frank</h3><span style="display:inline-flex;align-items:center;gap:4px;border-radius:20px;background:rgba(52,211,153,0.15);padding:2px 6px;font-size:9px;font-weight:600;color:#34d399;">● Online</span></div><p style="font-size:10px;color:rgba(255,255,255,0.6);">${showDetailsForm ? 'CRES Dynamics' : 'AI Business Guide'}</p></div><button id="chat-close" style="background:none;border:none;color:rgba(255,255,255,0.6);cursor:pointer;padding:4px;"><svg style="width:16px;height:16px" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg></button></div>${formHtml}</div>`;

        setTimeout(() => {
          document.getElementById('chat-close')?.addEventListener('click', () => { phase = 'closed'; messages = []; clientDetails = null; showDetailsForm = true; messageCount = 0; render(); });

          if (showDetailsForm) {
            document.getElementById('chat-lead-form')?.addEventListener('submit', async (e) => {
              e.preventDefault();
              const name = document.getElementById('chat-name').value.trim();
              const phone = document.getElementById('chat-phone').value.trim();
              const email = document.getElementById('chat-email').value.trim();
              if (!name || !phone) return;

              clientDetails = { name, phone, email: email || undefined };
              showDetailsForm = false;
              messages = [{ role: 'assistant', content: GREETING }];

              try {
                await fetch('/api/chat-lead', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ name, phone, email: email || undefined, pageUrl: window.location.href, userAgent: navigator.userAgent, sessionPublicId })
                });
              } catch(e) {}

              render();
            });
          } else {
            const msgDiv = document.getElementById('chat-messages');
            if (msgDiv) msgDiv.scrollTop = msgDiv.scrollHeight;

            document.getElementById('chat-form')?.addEventListener('submit', async (e) => {
              e.preventDefault();
              const input = document.getElementById('chat-input');
              const text = input.value.trim();
              if (!text) return;
              input.value = '';

              if (messageCount >= MAX_MESSAGES) {
                messages.push({ role: 'assistant', content: LIMIT_MSG });
                render();
                return;
              }

              messages.push({ role: 'user', content: text });
              messageCount++;
              render();

              try {
                const res = await fetch('/api/chat', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ message: text, conversationHistory: messages, clientDetails, sessionPublicId })
                });
                const data = await res.json().catch(() => ({}));
                messages.push({ role: 'assistant', content: data.response || UNAVAIL_MSG });
              } catch(e) {
                messages.push({ role: 'assistant', content: UNAVAIL_MSG });
              }
              render();
            });
          }
        }, 50);
      }
    }

    // Auto-show peek after 6 seconds
    setTimeout(() => {
      if (phase === 'closed') { phase = 'peek'; render(); }
    }, 6000);

    render();
  }

  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  // ─── MARQUEE ───
  const marqueeItems = ['Custom ERP Systems', 'Business Automation', 'Finance Platforms', 'AI Integration', 'E-Commerce', 'M-Pesa Integration', 'Node.js Development', 'Web Applications', 'Operations Systems'];
  document.querySelectorAll('.cres-marquee').forEach(el => {
    el.innerHTML = marqueeItems.map(item => `<span class="cres-marquee-item">${item}</span>`).join('');
  });

  // ─── FORM SUBMISSIONS ───
  document.querySelectorAll('[data-form]').forEach(form => {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const type = form.dataset.form;
      const btn = form.querySelector('button[type="submit"]');
      const origText = btn?.textContent;
      if (btn) btn.textContent = 'Sending…';
      if (btn) btn.disabled = true;

      try {
        const formData = new FormData(form);
        let endpoint, payload;

        switch(type) {
          case 'contact':
            endpoint = '/api/contact';
            payload = {
              fullName: formData.get('fullName'),
              email: formData.get('email'),
              contactPhone: formData.get('contactPhone'),
              projectTitle: formData.get('businessName'),
              projectDetail: formData.get('businessDescription') + '\n\nBiggest problem: ' + formData.get('biggestProblem') + '\n\nReferral: ' + formData.get('referralSource'),
              subscribe: false
            };
            break;
          case 'career':
            endpoint = '/api/careers/apply';
            const res = await fetch(endpoint, { method: 'POST', body: formData });
            const data = await res.json();
            showFormMessage(form, data.message || data.error, res.ok);
            return;
          case 'event-register':
            endpoint = '/api/events/register';
            payload = {
              eventTitle: formData.get('eventTitle') || 'The Future of AI in Business',
              eventDate: formData.get('eventDate') || '31 October 2026',
              firstName: formData.get('firstName'),
              lastName: formData.get('lastName'),
              email: formData.get('email'),
              phone: formData.get('phone'),
              company: formData.get('company'),
              ticketType: formData.get('ticketType'),
              attendanceType: formData.get('attendanceType'),
              lanyardCategory: formData.get('lanyardCategory'),
              additionalAttendees: parseInt(formData.get('additionalAttendees') || '0')
            };
            break;
          case 'speaker':
            endpoint = '/api/events/speakers/apply';
            const sRes = await fetch(endpoint, { method: 'POST', body: formData });
            const sData = await sRes.json();
            showFormMessage(form, sData.message || sData.error, sRes.ok);
            return;
          case 'sponsor':
            endpoint = '/api/events/sponsors/apply';
            payload = {
              companyName: formData.get('companyName'),
              contactFullName: formData.get('contactFullName'),
              jobTitle: formData.get('jobTitle'),
              email: formData.get('email'),
              phone: formData.get('phone'),
              companyWebsite: formData.get('companyWebsite'),
              packageSelected: formData.get('packageSelected'),
              packageTier: formData.get('packageTier'),
              whySponsor: formData.get('whySponsor'),
              howHeard: formData.get('howHeard')
            };
            break;
        }

        if (endpoint && payload) {
          const res = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
          });
          const data = await res.json();
          showFormMessage(form, data.message || data.error, res.ok);
          if (type === 'event-register' && res.ok) {
            try { localStorage.removeItem('cres_event_register_complete'); } catch(e){}
            if (typeof window.CRESEventSuccess === 'function') window.CRESEventSuccess(payload);
          }
        }
      } catch(err) {
        showFormMessage(form, 'An error occurred. Please try again.', false);
      } finally {
        if (btn) { btn.textContent = origText; btn.disabled = false; }
      }
    });
  });

  function showFormMessage(form, msg, success) {
    let el = form.querySelector('.form-message');
    if (!el) {
      el = document.createElement('div');
      el.className = 'form-message';
      el.style.cssText = 'margin-top:12px;padding:12px;border-radius:8px;font-size:13px;text-align:center;';
      form.appendChild(el);
    }
    el.textContent = msg;
    el.style.background = success ? 'rgba(16,185,129,0.15)' : 'rgba(239,68,68,0.15)';
    el.style.color = success ? '#34d399' : '#fca5a5';
    el.style.border = success ? '1px solid rgba(16,185,129,0.3)' : '1px solid rgba(239,68,68,0.3)';
  }
})();
