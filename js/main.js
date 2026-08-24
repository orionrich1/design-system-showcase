// ---- Theme toggle ----
(function () {
  const root = document.documentElement;
  const btn = document.getElementById('themeToggle');
  const sun = document.getElementById('themeIconSun');
  const moon = document.getElementById('themeIconMoon');

  function apply(theme) {
    root.setAttribute('data-theme', theme);
    sun.style.display = theme === 'dark' ? 'none' : 'block';
    moon.style.display = theme === 'dark' ? 'block' : 'none';
  }

  const saved = localStorage.getItem('pulse-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  apply(saved || (prefersDark ? 'dark' : 'light'));

  btn.addEventListener('click', function () {
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    apply(next);
    localStorage.setItem('pulse-theme', next);
  });
})();

// ---- Tabs (event delegation, works for any .tabs group) ----
document.querySelectorAll('.tabs').forEach(function (group) {
  group.addEventListener('click', function (e) {
    const btn = e.target.closest('.tabs__item');
    if (!btn) return;
    group.querySelectorAll('.tabs__item').forEach(function (item) {
      item.classList.remove('is-active');
    });
    btn.classList.add('is-active');
  });
});

// ---- Removable chips ----
document.addEventListener('click', function (e) {
  const removeBtn = e.target.closest('.chip__remove');
  if (!removeBtn) return;
  const chip = removeBtn.closest('.chip');
  if (chip) chip.remove();
});

// ---- Check pill toggle ----
document.querySelectorAll('.check-pill').forEach(function (pill) {
  pill.addEventListener('click', function () {
    const checked = pill.classList.toggle('is-checked');
    pill.setAttribute('aria-checked', String(checked));
  });
  pill.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      pill.click();
    }
  });
});

// ---- Switch toggle ----
document.querySelectorAll('.switch').forEach(function (sw) {
  sw.addEventListener('click', function () {
    const on = sw.classList.toggle('is-on');
    sw.setAttribute('aria-checked', String(on));
  });
});
