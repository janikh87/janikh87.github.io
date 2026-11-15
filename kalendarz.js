// Wspólne dane i funkcje dla gier o miesiącach i porach roku.
const MONTHS = [
  { pl: 'styczeń', en: 'January', emoji: '❄️' },
  { pl: 'luty', en: 'February', emoji: '💝' },
  { pl: 'marzec', en: 'March', emoji: '🌱' },
  { pl: 'kwiecień', en: 'April', emoji: '🌷' },
  { pl: 'maj', en: 'May', emoji: '🌼' },
  { pl: 'czerwiec', en: 'June', emoji: '🍓' },
  { pl: 'lipiec', en: 'July', emoji: '🏖️' },
  { pl: 'sierpień', en: 'August', emoji: '🌻' },
  { pl: 'wrzesień', en: 'September', emoji: '🎒' },
  { pl: 'październik', en: 'October', emoji: '🎃' },
  { pl: 'listopad', en: 'November', emoji: '🍂' },
  { pl: 'grudzień', en: 'December', emoji: '🎄' },
].map(m => ({ ...m, kind: 'month' }));

const SEASONS = [
  { pl: 'wiosna', en: 'spring', emoji: '🌸' },
  { pl: 'lato', en: 'summer', emoji: '☀️' },
  { pl: 'jesień', en: 'autumn', emoji: '🍁' },
  { pl: 'zima', en: 'winter', emoji: '⛄' },
].map(s => ({ ...s, kind: 'season' }));

const ALL_WORDS = [...MONTHS, ...SEASONS];

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

function showResult(score, total, praise) {
  showScreen('screen-result');
  const pct = Math.round((score / total) * 100);
  document.getElementById('final-score').textContent = `${score} / ${total}`;
  document.getElementById('score-pct-label').textContent = `${pct}% poprawnych odpowiedzi`;
  const bar = document.getElementById('score-bar');
  bar.style.width = '0%';
  setTimeout(() => {
    bar.style.width = pct + '%';
    bar.style.background = pct >= 80 ? '#4caf50' : pct >= 50 ? '#ff9800' : '#ff6b6b';
  }, 100);
  let emoji, msg, stars;
  if (pct === 100) { emoji = '🏆'; msg = praise; stars = '⭐⭐⭐'; }
  else if (pct >= 80) { emoji = '🥳'; msg = 'Wspaniale! Prawie idealnie, tak trzymaj!'; stars = '⭐⭐⭐'; }
  else if (pct >= 60) { emoji = '😊'; msg = 'Bardzo dobrze! Ćwicz dalej, a będzie jeszcze lepiej!'; stars = '⭐⭐'; }
  else if (pct >= 40) { emoji = '🙂'; msg = 'Niezły wynik! Trochę więcej ćwiczeń i będzie świetnie!'; stars = '⭐'; }
  else { emoji = '💪'; msg = 'Nie poddawaj się! Spróbuj jeszcze raz!'; stars = '⭐'; }
  document.getElementById('result-emoji').textContent = emoji;
  document.getElementById('result-msg').textContent = msg;
  document.getElementById('stars-display').textContent = stars;
  if (pct >= 60) spawnConfetti();
}

function spawnConfetti() {
  const colors = ['#ff6b6b', '#ffca28', '#4caf50', '#2196f3', '#e040fb', '#ff9800'];
  const c = document.getElementById('confetti');
  c.innerHTML = '';
  for (let i = 0; i < 60; i++) {
    const el = document.createElement('div');
    el.className = 'cp';
    el.style.left = Math.random() * 100 + 'vw';
    el.style.top = '-20px';
    el.style.background = pick(colors);
    el.style.animationDelay = Math.random() * 1.5 + 's';
    el.style.animationDuration = (1.5 + Math.random()) + 's';
    el.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
    c.appendChild(el);
  }
  setTimeout(() => { c.innerHTML = ''; }, 3500);
}

function setProgress(current, total) {
  document.getElementById('progress-bar').style.width = (current / total) * 100 + '%';
  document.getElementById('round-label').textContent = `Słowo ${current + 1} z ${total}`;
}

function confirmReset() {
  if (confirm('Na pewno chcesz zacząć od nowa? Stracisz postęp w tej grze.')) restartGame();
}

function restartGame() {
  document.getElementById('confetti').innerHTML = '';
  showScreen('screen-start');
}

// Wybór trybu na ekranie startowym (przyciski .mode-btn z data-mode).
function initModeButtons(onChange) {
  document.querySelectorAll('.mode-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      onChange(btn.dataset.mode);
    });
  });
}
