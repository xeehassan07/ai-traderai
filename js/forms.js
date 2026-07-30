/* ============================================================
   Trader AI — Lead Capture Form
   Reusable form component with validation, UTM capture,
   loading/success/error states.
   ============================================================ */

const T = window.TraderAI;

(function(ns) {
  'use strict';

  /* --- API endpoint from env or default ------------------- */
  const API_ENDPOINT = (window.TRADERAI_CONFIG && window.TRADERAI_CONFIG.leadApiEndpoint) || '';

  /* --- Render lead form ----------------------------------- */
  ns.renderLeadForm = (container, opts = {}) => {
    if (typeof container === 'string') container = document.querySelector(container);
    if (!container) return;

    const formId = opts.formId || ns.uid();
    const formName = opts.formName || 'lead_form';
    const sourcePage = opts.sourcePage || window.location.pathname;
    const fields = opts.fields || ['first_name', 'email', 'primary_market', 'trading_experience'];
    const ctaText = opts.ctaText || 'Submit';
    const title = opts.title || 'Get Started';
    const subtitle = opts.subtitle || 'Fill in your details to continue.';
    const showPrivacy = opts.showPrivacy !== false;
    const successMessage = opts.successMessage || 'Thank you. We will be in touch.';
    const includePhone = opts.includePhone || false;

    const marketOptions = opts.markets || [
      '', 'Forex', 'Indices', 'Commodities', 'Crypto', 'Stocks', 'ETFs', 'Multiple', 'Other'
    ];

    const experienceOptions = opts.experience || [
      '', 'Beginner (less than 1 year)', 'Intermediate (1–3 years)', 'Experienced (3–7 years)', 'Advanced (7+ years)'
    ];

    container.innerHTML = `
      <div class="lead-form-wrap">
        <div class="lead-form-body" id="${formId}-body">
          ${title ? `<h3>${title}</h3>` : ''}
          ${subtitle ? `<p class="lead-form-subtitle">${subtitle}</p>` : ''}
          <div class="lead-form-error-msg" id="${formId}-error" role="alert"></div>
          <form id="${formId}" novalidate>
            ${fields.includes('first_name') ? `
            <div class="form-group">
              <label class="form-label" for="${formId}-first_name">First Name <span class="form-required" aria-hidden="true">*</span></label>
              <input class="form-input" type="text" id="${formId}-first_name" name="first_name" required autocomplete="given-name" placeholder="Your first name">
              <span class="form-error" id="${formId}-first_name-error">Please enter your first name.</span>
            </div>` : ''}
            ${fields.includes('email') ? `
            <div class="form-group">
              <label class="form-label" for="${formId}-email">Email Address <span class="form-required" aria-hidden="true">*</span></label>
              <input class="form-input" type="email" id="${formId}-email" name="email" required autocomplete="email" placeholder="you@example.com">
              <span class="form-error" id="${formId}-email-error">Please enter a valid email address.</span>
            </div>` : ''}
            ${includePhone ? `
            <div class="form-group">
              <label class="form-label" for="${formId}-phone">Phone Number</label>
              <input class="form-input" type="tel" id="${formId}-phone" name="phone" autocomplete="tel" placeholder="+44 7000 000000">
            </div>` : ''}
            ${fields.includes('primary_market') ? `
            <div class="form-group">
              <label class="form-label" for="${formId}-primary_market">Primary Market</label>
              <select class="form-select" id="${formId}-primary_market" name="primary_market">
                ${marketOptions.map(m => `<option value="${m}">${m || 'Select a market...'}</option>`).join('')}
              </select>
            </div>` : ''}
            ${fields.includes('trading_experience') ? `
            <div class="form-group">
              <label class="form-label" for="${formId}-trading_experience">Trading Experience</label>
              <select class="form-select" id="${formId}-trading_experience" name="trading_experience">
                ${experienceOptions.map(e => `<option value="${e}">${e || 'Select experience level...'}</option>`).join('')}
              </select>
            </div>` : ''}
            ${showPrivacy ? `
            <div class="form-group">
              <div class="form-checkbox">
                <input type="checkbox" id="${formId}-privacy" name="privacy" required>
                <label for="${formId}-privacy">I agree to the <a href="#">Privacy Policy</a> and consent to being contacted about Trader AI. <span class="form-required" aria-hidden="true">*</span></label>
              </div>
              <span class="form-error" id="${formId}-privacy-error">You must agree to continue.</span>
            </div>` : ''}
            <input type="hidden" name="source_page" value="${sourcePage}">
            <input type="hidden" name="form_name" value="${formName}">
            <input type="hidden" name="submitted_at" value="">
            <button type="submit" class="btn btn-primary" style="width:100%;">${ctaText}</button>
          </form>
          <div class="risk-disclaimer">
            <strong>Privacy note:</strong> We do not share your information with third parties without your consent. See our <a href="#">Privacy Policy</a>.
          </div>
        </div>
        <div class="lead-form-success" id="${formId}-success">
          <div class="lead-form-success-icon">✓</div>
          <h3>Thank You</h3>
          <p>${successMessage}</p>
        </div>
      </div>`;

    attachFormHandler(formId, formName, sourcePage);
    return formId;
  };

  /* --- Attach validation and submission ------------------- */
  function attachFormHandler(formId, formName, sourcePage) {
    const form = document.getElementById(formId);
    if (!form) return;

    const errorEl = document.getElementById(formId + '-error');
    const bodyEl = document.getElementById(formId + '-body');
    const successEl = document.getElementById(formId + '-success');
    const submitBtn = form.querySelector('button[type="submit"]');

    // Real-time validation
    form.querySelectorAll('input, select').forEach(field => {
      field.addEventListener('blur', () => validateField(formId, field.name));
      field.addEventListener('input', () => {
        const errEl = document.getElementById(`${formId}-${field.name}-error`);
        if (errEl && errEl.classList.contains('visible')) validateField(formId, field.name);
      });
    });

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      // Validate all fields
      let valid = true;
      form.querySelectorAll('input[required], select[required], input[type="email"]').forEach(f => {
        if (!validateField(formId, f.name)) valid = false;
      });

      // Check privacy
      const privacyCheckbox = form.querySelector('input[name="privacy"]');
      if (privacyCheckbox && !privacyCheckbox.checked) {
        valid = false;
        const errEl = document.getElementById(`${formId}-privacy-error`);
        if (errEl) errEl.classList.add('visible');
      }

      if (!valid) return;

      // Collect data
      const formData = new FormData(form);
      const utm = ns.getUTMParams();
      const payload = {
        first_name: formData.get('first_name') || '',
        email: formData.get('email') || '',
        primary_market: formData.get('primary_market') || '',
        trading_experience: formData.get('trading_experience') || '',
        phone: formData.get('phone') || '',
        source_page: sourcePage,
        form_name: formName,
        ...utm,
        referrer: utm.referrer || document.referrer,
        submitted_at: ns.now(),
      };

      // Loading state
      submitBtn.disabled = true;
      submitBtn.classList.add('btn-loading');
      submitBtn.setAttribute('aria-busy', 'true');
      if (errorEl) errorEl.classList.remove('visible');

      try {
        if (API_ENDPOINT) {
          const res = await fetch(API_ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          });
          if (!res.ok) throw new Error(`Server returned ${res.status}`);
        } else {
          // Simulate submission when no backend configured
          await new Promise(r => setTimeout(r, 800));
          console.log('Lead form submission (no backend configured):', payload);
        }

        // Success
        if (bodyEl) bodyEl.style.display = 'none';
        if (successEl) successEl.classList.add('visible');
        ns.store('lead_submitted_' + formName, { timestamp: ns.now(), source: sourcePage });

      } catch (err) {
        if (errorEl) {
          errorEl.textContent = 'Something went wrong. Please try again or contact support.';
          errorEl.classList.add('visible');
        }
        console.error('Lead form error:', err);
      } finally {
        submitBtn.disabled = false;
        submitBtn.classList.remove('btn-loading');
        submitBtn.setAttribute('aria-busy', 'false');
      }
    });
  }

  /* --- Validate single field ------------------------------ */
  function validateField(formId, fieldName) {
    const field = document.getElementById(`${formId}-${fieldName}`);
    const errEl = document.getElementById(`${formId}-${fieldName}-error`);
    if (!field) return true;

    let valid = true;

    if (field.required && !field.value.trim()) {
      valid = false;
    } else if (field.type === 'email' && field.value.trim()) {
      const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRe.test(field.value.trim())) valid = false;
    }

    if (!valid) {
      field.classList.add('error');
      if (errEl) errEl.classList.add('visible');
    } else {
      field.classList.remove('error');
      if (errEl) errEl.classList.remove('visible');
    }

    return valid;
  }

})(T);
