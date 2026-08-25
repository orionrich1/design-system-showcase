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

// ---- Radio group ----
document.querySelectorAll('.radio-row').forEach(function (row) {
  row.addEventListener('click', function () {
    const group = row.closest('[id]') || document;
    group.querySelectorAll('.radio-row').forEach(function (r) {
      r.classList.remove('is-selected');
    });
    row.classList.add('is-selected');
  });
});

// ---- Toast ----
(function () {
  const trigger = document.getElementById('toastTrigger');
  const host = document.getElementById('toastHost');
  if (!trigger || !host) return;

  trigger.addEventListener('click', function () {
    host.innerHTML = '';
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg><span>활동 인증이 완료됐어요</span>';
    host.appendChild(toast);
    setTimeout(function () {
      toast.style.transition = 'opacity .25s ease';
      toast.style.opacity = '0';
      setTimeout(function () { toast.remove(); }, 250);
    }, 2400);
  });
})();

// ---- Modal ----
(function () {
  const overlay = document.getElementById('modalOverlay');
  const openBtn = document.getElementById('modalTrigger');
  const cancelBtn = document.getElementById('modalCancel');
  const confirmBtn = document.getElementById('modalConfirm');
  if (!overlay || !openBtn) return;

  function open() { overlay.classList.add('is-open'); }
  function close() { overlay.classList.remove('is-open'); }

  openBtn.addEventListener('click', open);
  cancelBtn.addEventListener('click', close);
  confirmBtn.addEventListener('click', close);
  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) close();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') close();
  });
})();

// ---- Dropdown ----
(function () {
  const dropdown = document.getElementById('dropdownDemo');
  if (!dropdown) return;
  const trigger = dropdown.querySelector('.dropdown__trigger');
  const label = document.getElementById('dropdownLabel');

  trigger.addEventListener('click', function (e) {
    e.stopPropagation();
    dropdown.classList.toggle('is-open');
  });

  dropdown.querySelectorAll('.dropdown__item').forEach(function (item) {
    item.addEventListener('click', function () {
      dropdown.querySelectorAll('.dropdown__item').forEach(function (i) {
        i.classList.remove('is-selected');
        i.innerHTML = i.textContent.trim();
      });
      item.classList.add('is-selected');
      item.innerHTML = item.textContent.trim() + ' <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>';
      label.textContent = item.textContent.trim();
      dropdown.classList.remove('is-open');
    });
  });

  document.addEventListener('click', function () {
    dropdown.classList.remove('is-open');
  });
})();

// ---- Accordion ----
document.querySelectorAll('.accordion-trigger').forEach(function (trigger) {
  trigger.addEventListener('click', function () {
    const item = trigger.closest('.accordion-item');
    const wasOpen = item.classList.contains('is-open');
    item.parentElement.querySelectorAll('.accordion-item').forEach(function (i) {
      i.classList.remove('is-open');
    });
    if (!wasOpen) item.classList.add('is-open');
  });
});
