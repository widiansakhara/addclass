document.addEventListener('DOMContentLoaded', () => {
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const themeIcon = document.getElementById('themeIcon');
  const filterTabs = document.querySelectorAll('.filter-tab');
  const linkItems = document.querySelectorAll('.link-card-item');
  const linkCounter = document.getElementById('linkCounter');
  const toastMsg = document.getElementById('toastMsg');

  const sunSvg = `
    <svg class="theme-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="4"></circle>
      <path d="M12 2v2"></path>
      <path d="M12 20v2"></path>
      <path d="m4.93 4.93 1.41 1.41"></path>
      <path d="m17.66 17.66 1.41 1.41"></path>
      <path d="M2 12h2"></path>
      <path d="M20 12h2"></path>
      <path d="m6.34 17.66-1.41 1.41"></path>
      <path d="m19.07 4.93-1.41 1.41"></path>
    </svg>
  `;

  const moonSvg = `
    <svg class="theme-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
    </svg>
  `;

  const savedTheme = localStorage.getItem('theme') || 'dark';
  applyTheme(savedTheme);

  function applyTheme(theme) {
    if (theme === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
      themeIcon.innerHTML = moonSvg;
      themeToggleBtn.setAttribute('title', 'Beralih ke Dark Mode');
      themeToggleBtn.setAttribute('aria-label', 'Beralih ke Dark Mode');
    } else {
      document.documentElement.removeAttribute('data-theme');
      themeIcon.innerHTML = sunSvg;
      themeToggleBtn.setAttribute('title', 'Beralih ke Light Mode');
      themeToggleBtn.setAttribute('aria-label', 'Beralih ke Light Mode');
    }
    localStorage.setItem('theme', theme);
  }

  themeToggleBtn.addEventListener('click', () => {
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    const nextTheme = isLight ? 'dark' : 'light';
    applyTheme(nextTheme);
    showToast(`Mode ${nextTheme === 'dark' ? 'Gelap' : 'Terang'} diaktifkan`);
  });

  filterTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      filterTabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');

      const filterCategory = tab.getAttribute('data-filter');
      filterLinks(filterCategory);
    });
  });

  function filterLinks(category) {
    let visibleCount = 0;

    linkItems.forEach((item) => {
      const itemCategories = item.getAttribute('data-category').split(' ');

      if (category === 'all' || itemCategories.includes(category)) {
        item.classList.remove('hidden-item');
        item.classList.remove('fade-enter');
        void item.offsetWidth; 
        item.classList.add('fade-enter');
        visibleCount++;
      } else {
        item.classList.add('hidden-item');
      }
    });

    linkCounter.textContent = `Menampilkan ${visibleCount} link`;
  }

  let toastTimeout;
  function showToast(message) {
    if (!toastMsg) return;
    toastMsg.textContent = message;
    toastMsg.classList.add('show');
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toastMsg.classList.remove('show');
    }, 2500);
  }
  const avatarWrapper = document.getElementById('avatarWrapper');
  const avatarImg = document.getElementById('avatarImg');
  const avatarFileInput = document.getElementById('avatarFileInput');

  const savedAvatar = localStorage.getItem('customAvatar');
  if (savedAvatar && avatarImg) {
    avatarImg.src = savedAvatar;
  }

  function applyAvatarFile(file) {
    if (!file || !file.type.startsWith('image/')) {
      showToast('Harap pilih file gambar (JPG/PNG).');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target.result;
      avatarImg.src = dataUrl;
      try {
        localStorage.setItem('customAvatar', dataUrl);
      } catch (err) {
        console.warn('LocalStorage limit reached', err);
      }
      showToast('Foto profil Widian Sakhara berhasil diubah! ✨');
    };
    reader.readAsDataURL(file);
  }

  if (avatarWrapper && avatarFileInput) {
    avatarWrapper.addEventListener('click', () => {
      avatarFileInput.click();
    });

    avatarFileInput.addEventListener('change', (e) => {
      const file = e.target.files?.[0];
      if (file) {
        applyAvatarFile(file);
      }
    });

    avatarWrapper.addEventListener('dragover', (e) => {
      e.preventDefault();
      avatarWrapper.style.transform = 'scale(1.05)';
    });

    avatarWrapper.addEventListener('dragleave', () => {
      avatarWrapper.style.transform = '';
    });

    avatarWrapper.addEventListener('drop', (e) => {
      e.preventDefault();
      avatarWrapper.style.transform = '';
      const file = e.dataTransfer.files?.[0];
      if (file) {
        applyAvatarFile(file);
      }
    });

    document.addEventListener('paste', (e) => {
      const items = e.clipboardData?.items;
      if (!items) return;
      for (const item of items) {
        if (item.type.indexOf('image') !== -1) {
          const file = item.getAsFile();
          if (file) {
            applyAvatarFile(file);
            break;
          }
        }
      }
    });
  }


  filterLinks('all');
});
