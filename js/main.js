// Highlight active nav link on scroll
const sections = ['home','program','venue','seating','dresscode','gifts','rsvp'];
const navLinks = {};
sections.forEach(id => {
  navLinks[id] = document.querySelector(`nav a[href="#${id}"]`);
});

function updateActiveNav() {
  const navH = document.querySelector('nav').offsetHeight;
  let current = sections[0];
  sections.forEach(id => {
    const el = document.getElementById(id);
    if (el && el.getBoundingClientRect().top <= navH + 20) current = id;
  });
  Object.values(navLinks).forEach(a => { if(a) a.classList.remove('active'); });
  if (navLinks[current]) navLinks[current].classList.add('active');
}

window.addEventListener('scroll', updateActiveNav, { passive: true });
updateActiveNav();


// Countdown to the ceremony: 31 August 2026, 11:40 Moscow time (UTC+3)
const ceremonyDate = new Date('2026-08-31T11:40:00+03:00').getTime();

function updateCountdown() {
  const distance = ceremonyDate - Date.now();
  const grid = document.getElementById('countdown-grid');
  const finished = document.getElementById('countdown-finished');
  if (!grid || !finished) return;

  if (distance <= 0) {
    grid.style.display = 'none';
    finished.style.display = 'block';
    return;
  }

  const days = Math.floor(distance / 86400000);
  const hours = Math.floor((distance % 86400000) / 3600000);
  const minutes = Math.floor((distance % 3600000) / 60000);
  const seconds = Math.floor((distance % 60000) / 1000);

  document.getElementById('cd-days').textContent = String(days).padStart(2, '0');
  document.getElementById('cd-hours').textContent = String(hours).padStart(2, '0');
  document.getElementById('cd-minutes').textContent = String(minutes).padStart(2, '0');
  document.getElementById('cd-seconds').textContent = String(seconds).padStart(2, '0');
}

updateCountdown();
setInterval(updateCountdown, 1000);


const responses = [];

function selectPoll(poll, value) {
  document.querySelectorAll('[name="'+poll+'"]').forEach(el => {
    el.closest('.poll-opt').classList.remove('selected');
  });
  document.querySelectorAll('[name="'+poll+'"]').forEach(el => {
    if (el.value === value) {
      el.checked = true;
      el.closest('.poll-opt').classList.add('selected');
    }
  });
}

function submitRsvp() {
  const name = document.getElementById('r-name').value.trim();
  const dish = document.querySelector('[name="dish"]:checked');
  const errEl = document.getElementById('r-error');
  if (!name || !dish) { errEl.style.display = 'block'; return; }
  errEl.style.display = 'none';

  responses.push({
    name,
    coming: document.getElementById('r-coming').value,
    guests: document.getElementById('r-guests').value,
    dish: dish.value,
    ceremony: (document.querySelector('[name="ceremony"]:checked') || {}).value || '—',
    transfer: (document.querySelector('[name="transfer"]:checked') || {}).value || '—',
    notes: document.getElementById('r-notes').value.trim()
  });

  document.getElementById('rsvp-form').style.display = 'none';
  document.getElementById('rsvp-success').style.display = 'block';
}

// Soft page entrance
window.addEventListener('DOMContentLoaded', () => document.body.classList.add('is-ready'));

