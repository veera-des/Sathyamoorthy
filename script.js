/* =============================================
   SATHYAMOORTHY HOLIDAYS — script.js
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ─── 1. NAVBAR: scroll shrink & hamburger ─── */
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      navLinks.classList.toggle('open');
    });
  }

  // Close menu when a link is clicked
  if (navLinks) {
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
      });
    });
  }

  /* ─── 2. SCROLL ANIMATION (IntersectionObserver) ─── */
  const animatedEls = document.querySelectorAll('[data-animate]');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.delay || 0;
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, parseInt(delay));
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  animatedEls.forEach(el => observer.observe(el));

  /* ─── 3. COUNTER ANIMATION ─── */
  const counters = document.querySelectorAll('[data-count]');

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.count);
        const duration = 1800;
        const step = target / (duration / 16);
        let current = 0;

        const timer = setInterval(() => {
          current += step;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          el.textContent = Math.floor(current);
        }, 16);

        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(el => counterObserver.observe(el));

  /* ─── 4. FLOATING PARTICLES ─── */
  const particlesContainer = document.getElementById('particles');
  if (particlesContainer) {
    const PARTICLE_COUNT = 22;
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const p = document.createElement('div');
      p.classList.add('particle');
      const size = Math.random() * 3 + 1.5;
      p.style.cssText = `
        left: ${Math.random() * 100}%;
        bottom: ${Math.random() * 20}%;
        width: ${size}px;
        height: ${size}px;
        animation-duration: ${Math.random() * 8 + 6}s;
        animation-delay: ${Math.random() * 10}s;
        opacity: 0;
      `;
      particlesContainer.appendChild(p);
    }
  }

  /* ─── 5. REVIEWS (injected via JS) ─── */
  const reviews = [
    { initials: 'AK', name: 'Arun Kumar', loc: 'Madurai', text: '"Best trip we\'ve ever had! The 21-seater van was super clean and driver was so friendly. Booking again!"' },
    { initials: 'PS', name: 'Priya Selvi', loc: 'Trichy', text: '"Our family trip to Varkala was made so easy. Very professional and punctual — highly recommend!"' },
    { initials: 'MR', name: 'Muthu Raj', loc: 'Coimbatore', text: '"Booked the 50-seater bus for our office outing to Munnar. Absolutely wonderful experience. Great value!"' },
    { initials: 'SK', name: 'Siva Kumar', loc: 'Dindigul', text: '"Vagamon was breathtaking! The whole family loved every moment. Thank you Sathyamoorthy Holidays!"' },
    { initials: 'VL', name: 'Vennila', loc: 'Thanjavur', text: '"Booked last minute for Ooty trip. They arranged everything perfectly! Very responsive on WhatsApp."' },
    { initials: 'RP', name: 'Rekha Priya', loc: 'Karur', text: '"Our college trip was so smooth. Students loved it and we felt so safe. Superb management!"' },
    { initials: 'KD', name: 'Karthi Dev', loc: 'Salem', text: '"Used the 50-seater bus for our company annual outing. Perfect arrangements from start to finish."' },
    { initials: 'AN', name: 'Anitha N.', loc: 'Chennai', text: '"Travelled all the way from Chennai. Worth every rupee! The journey was comfortable and team was helpful."' },
  ];

  const track = document.getElementById('reviewTrack');
  if (track) {
    // Double the reviews for seamless infinite scroll
    const allReviews = [...reviews, ...reviews];
    allReviews.forEach(r => {
      const card = document.createElement('div');
      card.classList.add('review-card');
      card.innerHTML = `
        <div class="review-stars">★★★★★</div>
        <div class="review-text">${r.text}</div>
        <div class="reviewer">
          <div class="reviewer-avatar">${r.initials}</div>
          <div>
            <div class="reviewer-name">${r.name}</div>
            <div class="reviewer-loc">${r.loc}</div>
          </div>
        </div>
      `;
      track.appendChild(card);
    });
  }

  /* ─── 6. BOOKING FORM SUBMIT (WhatsApp to +91 99949 00843) ─── */
  const form = document.getElementById('bookingForm');
  const toast = document.getElementById('toast');

  function showToast(message, isError = false) {
    toast.textContent = message;
    toast.style.borderColor = isError ? '#ff4444' : 'var(--pink)';
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3800);
  }

  function validateForm(data) {
    if (!data.name.trim()) return 'Please enter your name.';
    if (!data.phone.trim()) return 'Please enter your phone number.';
    if (!/^\+?[\d\s\-]{8,15}$/.test(data.phone.replace(/\s/g, '')))
      return 'Please enter a valid phone number.';
    if (!data.vehicle) return 'Please select a vehicle type.';
    if (!data.destination.trim()) return 'Please enter your destination.';
    if (!data.date) return 'Please choose a travel date.';
    if (!data.people || data.people < 1) return 'Please enter number of people.';
    return null;
  }

  // Target WhatsApp number: +91 99949 00843 (format without plus for URL)
  const waNumber = '919994900843';

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const data = {
        name: form.name.value,
        phone: form.phone.value,
        vehicle: form.vehicle.value,
        destination: form.destination.value,
        date: form.date.value,
        people: form.people.value,
        message: form.message.value,
      };

      const error = validateForm(data);
      if (error) {
        showToast('⚠️ ' + error, true);
        return;
      }

      const waMsg = encodeURIComponent(
        `🌟 *New Booking Enquiry – Sathyamoorthy Holidays*\n\n` +
        `👤 Name: ${data.name}\n` +
        `📱 Phone: ${data.phone}\n` +
        `🚌 Vehicle: ${data.vehicle}\n` +
        `📍 Destination: ${data.destination}\n` +
        `📅 Date: ${data.date}\n` +
        `👥 People: ${data.people}\n` +
        `💬 Notes: ${data.message || 'None'}`
      );

      showToast('✅ Redirecting to WhatsApp...');
      form.reset();

      // Open WhatsApp after a short delay
      setTimeout(() => {
        window.open(`https://wa.me/${waNumber}?text=${waMsg}`, '_blank');
      }, 1200);
    });
  }

  /* ─── 7. DIRECT WHATSAPP BUTTON ─── */
  const waDirectBtn = document.getElementById('directWhatsAppBtn');
  if (waDirectBtn) {
    waDirectBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const preMsg = encodeURIComponent('Hello Sathyamoorthy Holidays! I\'m interested in booking a trip.');
      window.open(`https://wa.me/${waNumber}?text=${preMsg}`, '_blank');
    });
  }

  /* ─── 8. SMOOTH ACTIVE NAV HIGHLIGHT (scroll spy) ─── */
  const sections = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav-links a');

  const spyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navAnchors.forEach(a => {
          a.style.color = '';
          if (a.getAttribute('href') === `#${id}`) {
            a.style.color = 'var(--pink)';
          }
        });
      }
    });
  }, { rootMargin: '-40% 0px -40% 0px' });

  sections.forEach(s => spyObserver.observe(s));

});