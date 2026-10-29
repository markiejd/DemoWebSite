const films = [
  { id: 'orbit', title: 'The Last Orbit', genre: 'Sci-fi / Adventure', rating: 'PG', duration: '118 min', image: 'assets/orbit.jpg', alt: 'A colourful nebula in a star-filled sky', description: 'One final transmission. A journey beyond everything we know.', times: ['14:00', '17:30', '20:15'] },
  { id: 'tide', title: 'Changing Tides', genre: 'Drama', rating: 'PG', duration: '104 min', image: 'assets/tides.jpg', alt: 'Waves rolling onto a rugged coastline', description: 'Two old friends. One coastal town. A summer that changes everything.', times: ['13:15', '16:00', '19:30'] },
  { id: 'wild', title: 'Into the Wildwood', genre: 'Family / Adventure', rating: 'U', duration: '96 min', image: 'assets/forest.jpg', alt: 'Sunlight falling through a deep green forest', description: 'A small explorer finds a very big adventure beyond the garden gate.', times: ['11:00', '14:30', '17:00'] }
];
const find = (selector) => document.querySelector(selector);
const money = (amount) => new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(amount);
const state = { film: films[0], time: films[0].times[0], seats: [], discount: false };
const dateLabel = () => find('#date').selectedOptions[0].textContent;
const ticketCount = () => Number(find('#adults').value) + Number(find('#children').value);
function prices() {
  const subtotal = Number(find('#adults').value) * 12 + Number(find('#children').value) * 8;
  const discount = state.discount ? Math.round((subtotal + 1.5) * 10) / 100 : 0;
  return { subtotal, discount, total: subtotal + 1.5 - discount };
}
function renderFilms() {
  find('#films').innerHTML = films.map((film) => `<article class="film ${state.film.id === film.id ? 'active' : ''}"><img class="film-image" src="${film.image}" alt="${film.alt}" width="600" height="324"><div class="film-body"><p class="film-meta"><span class="rating">${film.rating}</span>${film.genre} · ${film.duration}</p><h3>${film.title}</h3><p class="film-description">${film.description}</p><button type="button" class="film-button" data-film="${film.id}" data-testid="film-${film.id}" aria-pressed="${state.film.id === film.id}" aria-label="Select ${film.title}">${state.film.id === film.id ? 'Selected film' : 'Book tickets'}</button></div></article>`).join('');
}
function renderTimes() {
  find('#times').innerHTML = state.film.times.map((time) => `<button type="button" class="time-button" data-time="${time}" aria-pressed="${state.time === time}">${time}</button>`).join('');
}
function renderSeats() {
  find('#seats').innerHTML = ['A', 'B', 'C', 'D'].flatMap((row) => Array.from({ length: 6 }, (_, index) => {
    const seat = `${row}${index + 1}`;
    const occupied = ['B3', 'C4'].includes(seat);
    return `<button type="button" class="seat ${occupied ? 'occupied' : ''}" data-seat="${seat}" data-testid="seat-${seat}" aria-label="Seat ${seat}${occupied ? ', unavailable' : ''}" aria-pressed="${state.seats.includes(seat)}" ${seat === 'B3' ? 'disabled' : ''}>${seat}</button>`;
  })).join('');
}
function renderSummary() {
  const price = prices();
  find('#summary-film').textContent = state.film.title;
  find('#summary-screening').textContent = `${dateLabel()} · ${state.time}`;
  find('#summary-seats').textContent = state.seats.length ? `Seats: ${state.seats.join(', ')}` : 'No seats selected';
  find('#ticket-count').textContent = `(${ticketCount()})`;
  find('#subtotal').textContent = money(price.subtotal);
  find('#discount-row').hidden = !state.discount;
  find('#discount-value').textContent = `-${money(price.discount)}`;
  find('#total').textContent = money(price.total);
}
function reset() {
  find('#booking-form').reset();
  find('#date').selectedIndex = 0;
  state.film = films[0];
  state.time = films[0].times[0];
  state.seats = [];
  state.discount = false;
  find('#promo').value = '';
  find('#promo-message').textContent = '';
  find('#form-error').hidden = true;
  find('#confirmation').hidden = true;
  find('#booking-area').hidden = false;
  renderFilms(); renderTimes(); renderSeats(); renderSummary();
}
for (let offset = 0; offset < 3; offset += 1) {
  const date = new Date();
  date.setDate(date.getDate() + offset + 1);
  const value = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  find('#date').add(new Option(date.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' }), value));
}
find('#films').addEventListener('click', (event) => {
  const button = event.target.closest('[data-film]');
  if (!button) return;
  state.film = films.find((film) => film.id === button.dataset.film);
  state.time = state.film.times[0];
  state.seats = [];
  find('#confirmation').hidden = true;
  find('#booking-area').hidden = false;
  renderFilms(); renderTimes(); renderSeats(); renderSummary();
});
find('#times').addEventListener('click', (event) => {
  const button = event.target.closest('[data-time]');
  if (!button) return;
  state.time = button.dataset.time;
  renderTimes(); renderSummary();
});
find('#date').addEventListener('change', renderSummary);
find('#seats').addEventListener('click', (event) => {
  const button = event.target.closest('[data-seat]');
  if (!button || button.disabled) return;
  const seat = button.dataset.seat;
  if (state.seats.includes(seat)) state.seats = state.seats.filter((selected) => selected !== seat);
  else state.seats.push(seat);
  renderSeats(); renderSummary();
});
for (const selector of ['#adults', '#children']) find(selector).addEventListener('input', renderSummary);
find('#apply-promo').addEventListener('click', () => {
  state.discount = find('#promo').value.trim() === 'FRAME10';
  find('#promo-message').textContent = state.discount ? 'Discount applied.' : 'Code not recognised.';
  renderSummary();
});
find('#reset').addEventListener('click', reset);
find('#new-booking').addEventListener('click', () => { reset(); find('#booking-title').scrollIntoView({ block: 'start' }); });
find('#booking-form').addEventListener('submit', (event) => {
  event.preventDefault();
  let error = '';
  const adults = Number(find('#adults').value);
  const children = Number(find('#children').value);
  if (![adults, children].every((count) => Number.isInteger(count) && count >= 0) || ticketCount() < 1 || ticketCount() > 7) error = 'Choose between 1 and 6 tickets.';
  else if (state.seats.length !== ticketCount()) error = 'Choose one seat for each ticket.';
  else if (!find('#name').value.trim()) error = 'Enter your name.';
  else if (!find('#email').value.trim().includes('@')) error = 'Enter a valid email address.';
  find('#form-error').textContent = error;
  find('#form-error').hidden = !error;
  if (error) { find('#form-error').scrollIntoView({ block: 'center' }); return; }
  const details = [
    ['Film', state.film.title], ['Date', dateLabel()], ['Time', state.film.times[0]],
    ['Tickets', `${adults} adult, ${children} child`], ['Seats', state.seats.join(', ')],
    ['Name', find('#name').value.trim()], ['Email', find('#email').value.trim()], ['Total', money(prices().total)]
  ];
  find('#confirmation-details').replaceChildren(...details.map(([label, value]) => {
    const row = document.createElement('div');
    const term = document.createElement('dt');
    const description = document.createElement('dd');
    term.textContent = label; description.textContent = value;
    row.append(term, description);
    return row;
  }));
  find('#confirmation-reference').textContent = `Booking reference: FR-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;
  find('#booking-area').hidden = true;
  find('#confirmation').hidden = false;
  find('#confirmation').focus();
});
reset();