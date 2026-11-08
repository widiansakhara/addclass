// Global Modal Controls (Bisa diakses langsung kapan saja & dari mana saja)
window.openModalById = function(modalId) {
  const modal = document.getElementById(modalId);
  if (!modal) return;
  document.querySelectorAll('.modal-overlay').forEach((m) => {
    m.classList.remove('active');
    m.setAttribute('aria-hidden', 'true');
  });
  modal.classList.add('active');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  const card = modal.querySelector('.modal-card');
  if (card) card.focus();
};

window.closeAllModals = function() {
  document.querySelectorAll('.modal-overlay').forEach((m) => {
    m.classList.remove('active');
    m.setAttribute('aria-hidden', 'true');
  });
  document.body.style.overflow = '';
};

// Global Click Delegation (Menangkap semua klik modal & tombol tutup)
document.addEventListener('click', (e) => {
  const trigger = e.target.closest('[data-modal-target], a[href^="#"], button[data-modal], .interactive-calc-card');
  if (trigger) {
    let href = trigger.getAttribute('data-modal-target') || trigger.getAttribute('data-modal') || trigger.getAttribute('href');
    if (href && href.startsWith('#')) {
      const targetId = href.substring(1);
      const targetModal = document.getElementById(targetId);
      if (targetModal && targetModal.classList.contains('modal-overlay')) {
        e.preventDefault();
        e.stopPropagation();
        window.openModalById(targetId);
        return;
      }
    }
  }

  const closeBtn = e.target.closest('.modal-close-btn, .btn-cancel, [data-close-modal]');
  if (closeBtn) {
    e.preventDefault();
    e.stopPropagation();
    window.closeAllModals();
    return;
  }

  if (e.target.classList.contains('modal-overlay')) {
    e.preventDefault();
    window.closeAllModals();
  }
});

document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements - Theme & Actions
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const themeIcon = document.getElementById('themeIcon');
  const shareBtn = document.getElementById('shareBtn');
  const toastMsg = document.getElementById('toastMsg');

  // DOM Elements - Filtering & Search
  const filterTabs = document.querySelectorAll('.filter-tab');
  const linkCounter = document.getElementById('linkCounter');
  const linksList = document.getElementById('linksList');
  const linkSearchInput = document.getElementById('linkSearchInput');
  const clearSearchBtn = document.getElementById('clearSearchBtn');
  const noResultsMsg = document.getElementById('noResultsMsg');

  // Tab Badge Counters
  const tabCountAll = document.getElementById('tabCountAll');
  const tabCountPromo = document.getElementById('tabCountPromo');
  const tabCountMarketplace = document.getElementById('tabCountMarketplace');
  const tabCountLayanan = document.getElementById('tabCountLayanan');

  // DOM Elements - Store Status
  const statusDot = document.getElementById('statusDot');
  const storeStatusText = document.getElementById('storeStatusText');

  // DOM Elements - Coupon
  const copyCouponBtn = document.getElementById('copyCouponBtn');
  const couponCode = document.getElementById('couponCode');

  // DOM Elements - Quick Order Modal
  const quickOrderBtn = document.getElementById('quickOrderBtn');
  const openPromoCalculatorCard = document.getElementById('openPromoCalculatorCard');
  const orderModal = document.getElementById('orderModal');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const cancelModalBtn = document.getElementById('cancelModalBtn');
  const sendOrderWaBtn = document.getElementById('sendOrderWaBtn');
  const modalTotalAmount = document.getElementById('modalTotalAmount');
  const freeShippingNotice = document.getElementById('freeShippingNotice');

  // DOM Elements - Package Modal (Paket Sembako)
  const openPackageModalCard = document.getElementById('openPackageModalCard');
  const packageModal = document.getElementById('packageModal');
  const closePackageModalBtn = document.getElementById('closePackageModalBtn');
  const cancelPackageModalBtn = document.getElementById('cancelPackageModalBtn');

  // DOM Elements - PPOB Modal (Loket Tagihan & Pulsa)
  const openPpobModalCard = document.getElementById('openPpobModalCard');
  const openPpobModalPill = document.getElementById('openPpobModalPill');
  const ppobModal = document.getElementById('ppobModal');
  const closePpobModalBtn = document.getElementById('closePpobModalBtn');
  const cancelPpobModalBtn = document.getElementById('cancelPpobModalBtn');
  const sendPpobWaBtn = document.getElementById('sendPpobWaBtn');
  const ppobNomorInput = document.getElementById('ppobNomorInput');
  const ppobNominalSelect = document.getElementById('ppobNominalSelect');
  const ppobInputLabel = document.getElementById('ppobInputLabel');

  // DOM Elements - Mitra Modal (Program Kemitraan)
  const openMitraModalCard = document.getElementById('openMitraModalCard');
  const mitraModal = document.getElementById('mitraModal');
  const closeMitraModalBtn = document.getElementById('closeMitraModalBtn');
  const cancelMitraModalBtn = document.getElementById('cancelMitraModalBtn');

  // DOM Elements - Form Tambah Link
  const addLinkForm = document.getElementById('addLinkForm');
  const linkTitleInput = document.getElementById('linkTitleInput');
  const linkUrlInput = document.getElementById('linkUrlInput');
  const linkCategorySelect = document.getElementById('linkCategorySelect');
  const linkBadgeInput = document.getElementById('linkBadgeInput');
  const linkDescInput = document.getElementById('linkDescInput');

  // SVG Icons for Light/Dark Mode
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

  // 1. SISTEM TEMA (DARK / LIGHT)
  const savedTheme = localStorage.getItem('theme') || 'dark';
  applyTheme(savedTheme);

  function applyTheme(theme) {
    if (theme === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
      if (themeIcon) themeIcon.innerHTML = moonSvg;
      if (themeToggleBtn) {
        themeToggleBtn.setAttribute('title', 'Beralih ke Dark Mode');
        themeToggleBtn.setAttribute('aria-label', 'Beralih ke Dark Mode');
      }
    } else {
      document.documentElement.removeAttribute('data-theme');
      if (themeIcon) themeIcon.innerHTML = sunSvg;
      if (themeToggleBtn) {
        themeToggleBtn.setAttribute('title', 'Beralih ke Light Mode');
        themeToggleBtn.setAttribute('aria-label', 'Beralih ke Light Mode');
      }
    }
    localStorage.setItem('theme', theme);
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const isLight = document.documentElement.getAttribute('data-theme') === 'light';
      const nextTheme = isLight ? 'dark' : 'light';
      applyTheme(nextTheme);
      showToast(`Mode ${nextTheme === 'dark' ? 'Gelap' : 'Terang'} diaktifkan 🌓`);
    });
  }

  // 2. TOAST NOTIFICATION
  let toastTimeout;
  function showToast(message) {
    if (!toastMsg) return;
    toastMsg.textContent = message;
    toastMsg.classList.add('show');
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toastMsg.classList.remove('show');
    }, 2800);
  }

  // 3. FITUR NILAI PLUS: LIVE STATUS JAM OPERASIONAL TOKO (06:00 - 22:00 WIB)
  function updateStoreStatus() {
    if (!statusDot || !storeStatusText) return;
    const now = new Date();
    const currentHour = now.getHours();
    const isOpen = currentHour >= 6 && currentHour < 22;

    if (isOpen) {
      statusDot.classList.remove('closed');
      storeStatusText.textContent = '🟢 Buka Sekarang (06:00 - 22:00 WIB)';
    } else {
      statusDot.classList.add('closed');
      storeStatusText.textContent = '🔴 Sedang Tutup · Buka Besok Jam 06:00 WIB';
    }
  }
  updateStoreStatus();
  setInterval(updateStoreStatus, 60000);

  // 4. SALIN KODE KUPON DISKON
  if (copyCouponBtn && couponCode) {
    copyCouponBtn.addEventListener('click', () => {
      const code = couponCode.textContent.trim();
      copyToClipboard(code, `Kupon "${code}" disalin! Gunakan saat chat WhatsApp 🎉`);
      const originalHtml = copyCouponBtn.innerHTML;
      copyCouponBtn.innerHTML = '<span>✓</span> Tersalin!';
      copyCouponBtn.classList.add('copied');
      setTimeout(() => {
        copyCouponBtn.innerHTML = originalHtml;
        copyCouponBtn.classList.remove('copied');
      }, 2000);
    });
  }

  // Flash Sale Deal Timer & Claim Button
  const dealTimer = document.getElementById('dealTimer');
  const claimDealBtn = document.getElementById('claimDealBtn');

  if (dealTimer) {
    let secondsLeft = 3 * 3600 + 45 * 60 + 20;
    setInterval(() => {
      if (secondsLeft > 0) {
        secondsLeft--;
        const h = Math.floor(secondsLeft / 3600);
        const m = Math.floor((secondsLeft % 3600) / 60);
        const s = secondsLeft % 60;
        const pad = (n) => String(n).padStart(2, '0');
        dealTimer.textContent = `⏱️ Sisa ${pad(h)}:${pad(m)}:${pad(s)}`;
      }
    }, 1000);
  }

  if (claimDealBtn) {
    claimDealBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      openPackageModal(e);
      showToast('Pilih & lihat rincian paket sembako hemat! 🧺✨');
    });
  }

  // 5. FITUR SHARE / SALIN TAUTAN TOKO
  if (shareBtn) {
    shareBtn.addEventListener('click', () => {
      copyToClipboard(window.location.href, 'Tautan WidianMart berhasil disalin ke clipboard! 📋');
    });
  }

  function copyToClipboard(text, successMsg) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        showToast(successMsg);
      }).catch(() => {
        fallbackCopy(text, successMsg);
      });
    } else {
      fallbackCopy(text, successMsg);
    }
  }

  function fallbackCopy(text, successMsg) {
    const tempInput = document.createElement('input');
    tempInput.value = text;
    document.body.appendChild(tempInput);
    tempInput.select();
    try {
      document.execCommand('copy');
      showToast(successMsg);
    } catch (e) {
      showToast('Gagal menyalin teks.');
    }
    document.body.removeChild(tempInput);
  }

  // 6. AVATAR / LOGO MANAGEMENT (DENGAN LOCALSTORAGE)
  if (!localStorage.getItem('widianmart_v8_basket_logo')) {
    localStorage.removeItem('customAvatar');
    localStorage.removeItem('customAvatar_widianmart');
    localStorage.setItem('widianmart_v8_basket_logo', 'true');
  }

  const avatarWrapper = document.getElementById('avatarWrapper');
  const avatarImg = document.getElementById('avatarImg');
  const avatarFileInput = document.getElementById('avatarFileInput');

  const savedAvatar = localStorage.getItem('customAvatar_widianmart');
  if (savedAvatar && avatarImg) {
    avatarImg.src = savedAvatar;
  } else if (avatarImg) {
    avatarImg.src = 'logo.jpg?v=14';
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
        localStorage.setItem('customAvatar_widianmart', dataUrl);
      } catch (err) {
        console.warn('LocalStorage limit reached', err);
      }
      showToast('Logo WidianMart berhasil diperbarui! ✨');
    };
    reader.readAsDataURL(file);
  }

  if (avatarWrapper && avatarFileInput) {
    avatarWrapper.addEventListener('click', () => avatarFileInput.click());
    avatarFileInput.addEventListener('change', (e) => {
      const file = e.target.files?.[0];
      if (file) applyAvatarFile(file);
    });
    avatarWrapper.addEventListener('dragover', (e) => {
      e.preventDefault();
      avatarWrapper.style.transform = 'scale(1.05)';
    });
    avatarWrapper.addEventListener('dragleave', () => avatarWrapper.style.transform = '');
    avatarWrapper.addEventListener('drop', (e) => {
      e.preventDefault();
      avatarWrapper.style.transform = '';
      const file = e.dataTransfer.files?.[0];
      if (file) applyAvatarFile(file);
    });
  }

  // 7. SISTEM FILTER & PENCARIAN TERPADU + TAB COUNTERS
  function updateTabCounters() {
    const allItems = document.querySelectorAll('.link-card-item');
    let totalAll = allItems.length;
    let countPromo = 0;
    let countMarketplace = 0;
    let countLayanan = 0;

    allItems.forEach((item) => {
      const cats = (item.getAttribute('data-category') || '').toLowerCase().split(' ');
      if (cats.includes('promo')) countPromo++;
      if (cats.includes('marketplace')) countMarketplace++;
      if (cats.includes('layanan')) countLayanan++;
    });

    if (tabCountAll) tabCountAll.textContent = totalAll;
    if (tabCountPromo) tabCountPromo.textContent = countPromo;
    if (tabCountMarketplace) tabCountMarketplace.textContent = countMarketplace;
    if (tabCountLayanan) tabCountLayanan.textContent = countLayanan;
  }

  function applyCombinedFilter() {
    const activeTab = document.querySelector('.filter-tab.active');
    const selectedCategory = activeTab ? activeTab.getAttribute('data-filter') : 'all';
    const searchQuery = (linkSearchInput ? linkSearchInput.value : '').trim().toLowerCase();

    const allItems = document.querySelectorAll('.link-card-item');
    let visibleCount = 0;

    allItems.forEach((item) => {
      const itemCategories = (item.getAttribute('data-category') || '').toLowerCase().split(' ');
      const textTitle = item.querySelector('.link-text')?.textContent.toLowerCase() || '';
      const textDesc = item.querySelector('.link-desc')?.textContent.toLowerCase() || '';
      const badgeText = item.querySelector('.card-badge')?.textContent.toLowerCase() || '';

      const matchCategory = selectedCategory === 'all' || itemCategories.includes(selectedCategory);
      const matchSearch = !searchQuery ||
        textTitle.includes(searchQuery) ||
        textDesc.includes(searchQuery) ||
        badgeText.includes(searchQuery);

      if (matchCategory && matchSearch) {
        item.classList.remove('hidden-item');
        item.classList.remove('fade-enter');
        void item.offsetWidth;
        item.classList.add('fade-enter');
        visibleCount++;
      } else {
        item.classList.add('hidden-item');
      }
    });

    if (linkCounter) {
      linkCounter.textContent = `Menampilkan ${visibleCount} tautan & katalog pilihan`;
    }

    if (noResultsMsg) {
      noResultsMsg.style.display = visibleCount === 0 ? 'block' : 'none';
    }

    if (clearSearchBtn) {
      clearSearchBtn.style.display = searchQuery.length > 0 ? 'block' : 'none';
    }
  }

  filterTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      filterTabs.forEach((t) => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      applyCombinedFilter();
    });
  });

  if (linkSearchInput) {
    linkSearchInput.addEventListener('input', applyCombinedFilter);
  }

  if (clearSearchBtn) {
    clearSearchBtn.addEventListener('click', () => {
      linkSearchInput.value = '';
      applyCombinedFilter();
      linkSearchInput.focus();
    });
  }

  // 8. LOGIC TAMBAH LINK / PROMO BARU
  let savedCustomLinks = [];
  try {
    const rawSaved = localStorage.getItem('customLinks_widianmart');
    savedCustomLinks = rawSaved ? JSON.parse(rawSaved) : [];
    if (!Array.isArray(savedCustomLinks)) savedCustomLinks = [];
  } catch (err) {
    savedCustomLinks = [];
  }

  function renderCustomLinks() {
    savedCustomLinks.forEach((link, index) => {
      appendCustomLinkToDom(link, index, false);
    });
    updateTabCounters();
    applyCombinedFilter();
  }

  if (addLinkForm) {
    addLinkForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const title = linkTitleInput.value.trim();
      let url = linkUrlInput.value.trim();
      const category = linkCategorySelect.value;
      const badge = linkBadgeInput ? linkBadgeInput.value.trim() : '';
      const desc = linkDescInput ? linkDescInput.value.trim() : '';

      if (!title || !url) {
        showToast('Harap lengkapi nama link dan URL!');
        return;
      }

      if (!url.startsWith('http://') && !url.startsWith('https://') && !url.startsWith('mailto:') && !url.startsWith('wa.me')) {
        url = 'https://' + url;
      }

      const newLinkObj = { title, url, category, badge, desc, id: Date.now() };

      savedCustomLinks.push(newLinkObj);
      saveLinksToStorage();

      appendCustomLinkToDom(newLinkObj, savedCustomLinks.length - 1, true);
      addLinkForm.reset();
      updateTabCounters();
      applyCombinedFilter();

      showToast(`Link "${title}" berhasil ditambahkan ke katalog! 🛒✨`);
    });
  }

  function saveLinksToStorage() {
    try {
      localStorage.setItem('customLinks_widianmart', JSON.stringify(savedCustomLinks));
    } catch (err) {
      console.warn('LocalStorage error', err);
    }
  }

  function appendCustomLinkToDom(link, index, animate) {
    if (!linksList) return;

    const li = document.createElement('li');
    li.className = 'link-card-item custom-link-item' + (animate ? ' fade-enter' : '');
    li.setAttribute('data-category', link.category);
    li.setAttribute('data-id', link.id || index);

    let icon = '📌';
    let boxClass = 'box-default';
    let badgeClass = 'badge-green';

    if (link.category === 'promo') {
      icon = '🏷️';
      boxClass = 'box-amber';
      badgeClass = 'badge-amber';
    } else if (link.category === 'marketplace') {
      icon = '🛒';
      boxClass = 'box-shopee';
      badgeClass = 'badge-orange';
    } else if (link.category === 'layanan') {
      icon = '📞';
      boxClass = 'box-maps';
      badgeClass = 'badge-blue';
    }

    const badgeHtml = link.badge ? `<span class="card-badge ${badgeClass}">${link.badge}</span>` : '';
    const descHtml = link.desc ? `<span class="link-desc">${link.desc}</span>` : '<span class="link-desc">Tautan khusus WidianMart</span>';

    li.innerHTML = `
      <div style="display: flex; align-items: center; width: 100%; gap: 6px;">
        <a href="${link.url}" target="_blank" rel="noopener noreferrer" class="link-card" style="flex: 1;">
          <div class="card-icon-box ${boxClass}">
            <span class="link-icon" aria-hidden="true">${icon}</span>
          </div>
          <div class="link-info">
            <div class="link-header-line">
              <span class="link-text">${link.title}</span>
              ${badgeHtml}
            </div>
            ${descHtml}
          </div>
          <span class="link-arrow" aria-hidden="true">➔</span>
        </a>
        <button type="button" class="link-delete-btn" title="Hapus Tautan Ini" aria-label="Hapus link ${link.title}">
          ✕
        </button>
      </div>
    `;

    const deleteBtn = li.querySelector('.link-delete-btn');
    if (deleteBtn) {
      deleteBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        li.remove();
        savedCustomLinks = savedCustomLinks.filter(item => (item.id ? item.id !== link.id : item.title !== link.title));
        saveLinksToStorage();
        updateTabCounters();
        applyCombinedFilter();
        showToast(`Tautan "${link.title}" telah dihapus.`);
      });
    }

    linksList.appendChild(li);
  }

  // 9. FITUR INTERAKTIF KALKULATOR & MODAL PESANAN KILAT
  function formatRupiah(num) {
    return 'Rp ' + (num || 0).toLocaleString('id-ID');
  }

  function openModal(e) {
    if (e && e.preventDefault) e.preventDefault();
    window.openModalById('orderModal');
  }

  function closeModal(e) {
    if (e && e.preventDefault) e.preventDefault();
    window.closeAllModals();
  }

  if (quickOrderBtn) {
    quickOrderBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      openModal(e);
    });
  }

  if (openPromoCalculatorCard) {
    openPromoCalculatorCard.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      openModal(e);
    });
  }

  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', (e) => {
      closeModal(e);
    });
  }

  if (cancelModalBtn) {
    cancelModalBtn.addEventListener('click', (e) => {
      closeModal(e);
    });
  }

  // --- MODAL PAKET SEMBAKO INTERAKTIF ---
  function openPackageModal(e) {
    if (e && e.preventDefault) e.preventDefault();
    window.openModalById('packageModal');
  }

  function closePackageModal(e) {
    if (e && e.preventDefault) e.preventDefault();
    window.closeAllModals();
  }

  if (openPackageModalCard) {
    openPackageModalCard.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      openPackageModal(e);
    });
  }

  if (closePackageModalBtn) {
    closePackageModalBtn.addEventListener('click', (e) => {
      closePackageModal(e);
    });
  }

  if (cancelPackageModalBtn) {
    cancelPackageModalBtn.addEventListener('click', (e) => {
      closePackageModal(e);
    });
  }

  // --- MODAL PPOB / LOKET TAGIHAN & PULSA ---
  function openPpobModal(e) {
    if (e && e.preventDefault) e.preventDefault();
    window.openModalById('ppobModal');
  }

  function closePpobModal(e) {
    if (e && e.preventDefault) e.preventDefault();
    window.closeAllModals();
  }

  if (openPpobModalCard) {
    openPpobModalCard.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      openPpobModal(e);
    });
  }

  if (openPpobModalPill) {
    openPpobModalPill.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      openPpobModal(e);
    });
  }

  if (closePpobModalBtn) {
    closePpobModalBtn.addEventListener('click', (e) => closePpobModal(e));
  }

  if (cancelPpobModalBtn) {
    cancelPpobModalBtn.addEventListener('click', (e) => closePpobModal(e));
  }

  if (ppobModal) {
    ppobModal.addEventListener('click', (e) => {
      if (e.target === ppobModal) closePpobModal(e);
    });
    const modalCard = ppobModal.querySelector('.modal-card');
    if (modalCard) {
      modalCard.addEventListener('click', (e) => e.stopPropagation());
    }
  }

  // Pilihan Jenis Layanan PPOB Interaktif
  let activePpobService = 'Token Listrik PLN';
  const ppobServiceItems = document.querySelectorAll('.ppob-service-item');

  const ppobNominalOptions = {
    'Token Listrik PLN': [
      'Token Rp 20.000 (Bayar Rp 22.500)',
      'Token Rp 50.000 (Bayar Rp 52.500)',
      'Token Rp 100.000 (Bayar Rp 102.500)',
      'Token Rp 200.000 (Bayar Rp 202.500)',
      'Token Rp 500.000 (Bayar Rp 502.500)'
    ],
    'Tagihan Listrik Pascabayar': [
      'Cek Tagihan Listrik Pascabayar (Admin Rp 2.500)'
    ],
    'Tagihan Air PDAM Wonosobo': [
      'Cek & Bayar Tagihan PDAM Wonosobo (Admin Rp 2.500)'
    ],
    'Pulsa & Paket Data': [
      'Pulsa Rp 10.000 (Bayar Rp 12.000)',
      'Pulsa Rp 25.000 (Bayar Rp 27.000)',
      'Pulsa Rp 50.000 (Bayar Rp 52.000)',
      'Pulsa Rp 100.000 (Bayar Rp 101.000)',
      'Paket Data Kuota 10 GB',
      'Paket Data Kuota 25 GB'
    ],
    'Top Up E-Wallet': [
      'Top Up DANA Rp 50.000 (Bayar Rp 52.000)',
      'Top Up DANA Rp 100.000 (Bayar Rp 102.000)',
      'Top Up OVO Rp 50.000 (Bayar Rp 52.000)',
      'Top Up GoPay Rp 50.000 (Bayar Rp 52.000)',
      'Top Up ShopeePay Rp 50.000 (Bayar Rp 52.000)'
    ],
    'Iuran BPJS Kesehatan': [
      'Cek & Bayar Iuran BPJS Kesehatan (Admin Rp 2.500)'
    ]
  };

  if (ppobServiceItems.length > 0) {
    ppobServiceItems.forEach((item) => {
      item.addEventListener('click', () => {
        ppobServiceItems.forEach((si) => si.classList.remove('active'));
        item.classList.add('active');
        activePpobService = item.getAttribute('data-service') || 'Token Listrik PLN';
        const label = item.getAttribute('data-label') || 'Nomor Pelanggan / HP';
        if (ppobInputLabel) {
          ppobInputLabel.innerHTML = `${label} <span class="required-star">*</span>`;
        }

        if (ppobNominalSelect) {
          const options = ppobNominalOptions[activePpobService] || ['Cek & Bayar Sesuai Tagihan'];
          ppobNominalSelect.innerHTML = options
            .map((opt, i) => `<option value="${opt}" ${i === 1 ? 'selected' : ''}>${opt}</option>`)
            .join('');
        }
      });
    });
  }

  if (sendPpobWaBtn) {
    sendPpobWaBtn.addEventListener('click', () => {
      const nomor = ppobNomorInput ? ppobNomorInput.value.trim() : '';
      if (!nomor) {
        showToast('Harap masukkan nomor meter / ID pelanggan / HP!');
        if (ppobNomorInput) ppobNomorInput.focus();
        return;
      }

      const nominal = ppobNominalSelect ? ppobNominalSelect.value : '-';
      const msg = `Halo Admin WidianMart, saya mau transaksi di *Loket PPOB*:\n\n• *Layanan:* ${activePpobService}\n• *No. Meter / HP:* ${nomor}\n• *Pilihan / Nominal:* ${nominal}\n\nMohon diproses dan kirimkan struk via WA. Terima kasih!`;
      const waUrl = `https://wa.me/6285643665422?text=${encodeURIComponent(msg)}`;
      window.open(waUrl, '_blank');
      closePpobModal();
      showToast('Membuka WhatsApp untuk memproses transaksi PPOB... ⚡');
    });
  }

  // --- MODAL PROGRAM KEMITRAAN & RESELLER ---
  function openMitraModal(e) {
    if (e && e.preventDefault) e.preventDefault();
    window.openModalById('mitraModal');
  }

  function closeMitraModal(e) {
    if (e && e.preventDefault) e.preventDefault();
    window.closeAllModals();
  }

  if (openMitraModalCard) {
    openMitraModalCard.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      openMitraModal(e);
    });
  }

  if (closeMitraModalBtn) {
    closeMitraModalBtn.addEventListener('click', (e) => closeMitraModal(e));
  }

  if (cancelMitraModalBtn) {
    cancelMitraModalBtn.addEventListener('click', (e) => closeMitraModal(e));
  }

  if (mitraModal) {
    mitraModal.addEventListener('click', (e) => {
      if (e.target === mitraModal) closeMitraModal(e);
    });
    const modalCard = mitraModal.querySelector('.modal-card');
    if (modalCard) {
      modalCard.addEventListener('click', (e) => e.stopPropagation());
    }
  }

  // Keyboard accessibility (ESC key closes open modal)
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (orderModal && orderModal.classList.contains('active')) closeModal(e);
      if (packageModal && packageModal.classList.contains('active')) closePackageModal(e);
      if (ppobModal && ppobModal.classList.contains('active')) closePpobModal(e);
      if (mitraModal && mitraModal.classList.contains('active')) closeMitraModal(e);
    }
  });

  // --- KATALOG PRODUK MAKANAN & SEMBAKO (DINAMIS & RINGKAS) ---
  const catalogProducts = [
    // Sembako
    { cat: 'sembako', name: 'Beras Premium Ramos 5kg', price: 68000, unit: 'karung', emoji: '🌾' },
    { cat: 'sembako', name: 'Minyak Goreng Refill 2 Liter', price: 33500, unit: 'pouch', emoji: '🌻' },
    { cat: 'sembako', name: 'Telur Ayam Negeri Segar 1kg', price: 28000, unit: 'kg', emoji: '🥚' },
    { cat: 'sembako', name: 'Gula Pasir Kristal Murni 1kg', price: 17000, unit: 'pack', emoji: '🍬' },
    { cat: 'sembako', name: 'Tepung Terigu Segitiga 1kg', price: 13000, unit: 'pack', emoji: '🌾' },
    // Mie & Kaleng
    { cat: 'mie', name: 'Mie Instan Goreng Spesial (5 pcs)', price: 15000, unit: 'paket', emoji: '🍜' },
    { cat: 'mie', name: 'Mie Instan Kuah Soto (5 pcs)', price: 14500, unit: 'paket', emoji: '🍲' },
    { cat: 'mie', name: 'Mie Instan Goreng (1 Dus isi 40)', price: 115000, unit: 'dus', emoji: '📦' },
    { cat: 'mie', name: 'Sarden Saus Tomat ABC 425g', price: 22000, unit: 'kaleng', emoji: '🥫' },
    { cat: 'mie', name: 'Kornet Daging Sapi 340g', price: 26500, unit: 'kaleng', emoji: '🥩' },
    // Roti & Snack
    { cat: 'snack', name: 'Roti Tawar Kupas Lembut', price: 16000, unit: 'bungkus', emoji: '🍞' },
    { cat: 'snack', name: 'Biskuit Roma Kelapa 300g', price: 11500, unit: 'pack', emoji: '🍪' },
    { cat: 'snack', name: 'Keripik Kentang Chitato 68g', price: 10500, unit: 'bungkus', emoji: '🥔' },
    { cat: 'snack', name: 'Wafer Cokelat Tango 130g', price: 9000, unit: 'pack', emoji: '🍫' },
    { cat: 'snack', name: 'Kacang Kulit Gurih Garing 200g', price: 12500, unit: 'bungkus', emoji: '🥜' },
    // Bumbu & Minum
    { cat: 'bumbu', name: 'Kecap Manis Bango 550ml', price: 19500, unit: 'pouch', emoji: '🫙' },
    { cat: 'bumbu', name: 'Saus Sambal Ekstra Pedas 335ml', price: 14000, unit: 'botol', emoji: '🌶️' },
    { cat: 'bumbu', name: 'Garam Dapur Beryodium 250g', price: 4500, unit: 'bungkus', emoji: '🧂' },
    { cat: 'bumbu', name: 'Bawang Merah & Putih Kupas 500g', price: 19000, unit: 'pack', emoji: '🧅' },
    { cat: 'bumbu', name: 'Susu Kental Manis Putih 370g', price: 12000, unit: 'kaleng', emoji: '🥛' },
    { cat: 'bumbu', name: 'Kopi Kapal Api Mix (10 sachet)', price: 14000, unit: 'renceng', emoji: '☕' },
    { cat: 'bumbu', name: 'Teh Celup Sariwangi (Isi 25)', price: 7500, unit: 'kotak', emoji: '🫖' },
  ];

  const categoryHeaders = {
    sembako: '🌾 Sembako & Makanan Pokok',
    mie: '🍜 Mie Instan & Makanan Kaleng',
    snack: '🍪 Roti, Biskuit & Camilan',
    bumbu: '🫙 Bumbu Dapur & Minuman'
  };

  const quickOrderItemsContainer = document.getElementById('quickOrderItems');

  function renderCatalogItems() {
    if (!quickOrderItemsContainer) return;
    let html = '';
    let currentCat = '';

    catalogProducts.forEach((item) => {
      if (item.cat !== currentCat) {
        currentCat = item.cat;
        html += `<div class="modal-section-divider" data-mcat="${currentCat}"><span>${categoryHeaders[currentCat]}</span></div>`;
      }
      html += `
        <div class="order-item-row" data-mcat="${item.cat}" data-price="${item.price}" data-name="${item.name}">
          <div class="order-item-left">
            <span class="item-emoji">${item.emoji}</span>
            <div>
              <span class="item-title">${item.name}</span>
              <span class="item-price">${formatRupiah(item.price)} / ${item.unit}</span>
            </div>
          </div>
          <div class="qty-control">
            <button type="button" class="qty-btn btn-minus" aria-label="Kurang">-</button>
            <span class="qty-value">0</span>
            <button type="button" class="qty-btn btn-plus" aria-label="Tambah">+</button>
          </div>
        </div>
      `;
    });

    quickOrderItemsContainer.innerHTML = html;

    // Attach listeners to newly rendered items
    const rows = quickOrderItemsContainer.querySelectorAll('.order-item-row');
    rows.forEach((row) => {
      const btnMinus = row.querySelector('.btn-minus');
      const btnPlus = row.querySelector('.btn-plus');
      const qtySpan = row.querySelector('.qty-value');

      if (btnPlus && qtySpan) {
        btnPlus.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          let current = parseInt(qtySpan.textContent, 10) || 0;
          qtySpan.textContent = current + 1;
          calculateModalTotal();
        });
      }

      if (btnMinus && qtySpan) {
        btnMinus.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          let current = parseInt(qtySpan.textContent, 10) || 0;
          if (current > 0) {
            qtySpan.textContent = current - 1;
            calculateModalTotal();
          }
        });
      }
    });
  }

  function calculateModalTotal() {
    let total = 0;
    const rows = document.querySelectorAll('.order-item-row');
    rows.forEach((row) => {
      const price = parseInt(row.getAttribute('data-price') || '0', 10);
      const qty = parseInt(row.querySelector('.qty-value')?.textContent || '0', 10);
      total += price * qty;
    });

    if (modalTotalAmount) {
      modalTotalAmount.textContent = formatRupiah(total);
    }

    if (freeShippingNotice) {
      if (total >= 50000) {
        freeShippingNotice.innerHTML = '🎉 <strong>Selamat! Anda berhak mendapatkan GRATIS ONGKIR!</strong>';
        freeShippingNotice.style.color = '#10b981';
      } else {
        const remaining = 50000 - total;
        freeShippingNotice.innerHTML = `🛵 Tambah <strong>${formatRupiah(remaining)}</strong> lagi untuk Gratis Ongkir!`;
        freeShippingNotice.style.color = 'var(--text-secondary)';
      }
    }
    return total;
  }

  // Filter Kategori Tab di Dalam Modal Belanja
  const modalPills = document.querySelectorAll('.modal-pill');
  if (modalPills.length > 0) {
    modalPills.forEach((pill) => {
      pill.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        modalPills.forEach((p) => p.classList.remove('active'));
        pill.classList.add('active');
        const filterCat = pill.getAttribute('data-mcat');

        const allRows = document.querySelectorAll('.order-item-row');
        const allDividers = document.querySelectorAll('.modal-section-divider');

        allRows.forEach((row) => {
          const rowCat = row.getAttribute('data-mcat');
          row.style.display = (filterCat === 'all' || rowCat === filterCat) ? 'flex' : 'none';
        });

        allDividers.forEach((div) => {
          const divCat = div.getAttribute('data-mcat');
          div.style.display = (filterCat === 'all' || divCat === filterCat) ? 'flex' : 'none';
        });
      });
    });
  }

  // Kirim Pesanan ke WhatsApp Admin
  if (sendOrderWaBtn) {
    sendOrderWaBtn.addEventListener('click', () => {
      const total = calculateModalTotal();
      if (total === 0) {
        showToast('Pilih minimal 1 barang belanjaan!');
        return;
      }

      let orderText = 'Halo Admin WidianMart, saya mau pesan makanan & sembako:\n\n';
      const rows = document.querySelectorAll('.order-item-row');
      rows.forEach((row) => {
        const name = row.getAttribute('data-name');
        const qty = parseInt(row.querySelector('.qty-value')?.textContent || '0', 10);
        const price = parseInt(row.getAttribute('data-price') || '0', 10);
        if (qty > 0) {
          orderText += `• ${name} (${qty}x) = ${formatRupiah(price * qty)}\n`;
        }
      });

      orderText += `\n*Total Belanja:* ${formatRupiah(total)}\n`;
      orderText += `*Kode Kupon:* WIDIANHEMAT10K\n\n`;
      orderText += `Mohon info ketersediaan stok & pengiriman ke alamat saya. Terima kasih!`;

      const waUrl = `https://wa.me/6285643665422?text=${encodeURIComponent(orderText)}`;
      window.open(waUrl, '_blank');
      closeModal();
      showToast('Membuka WhatsApp untuk mengirim pesanan... 🛵');
    });
  }

  // Load awal
  renderCatalogItems();
  renderCustomLinks();
  updateTabCounters();
  applyCombinedFilter();
});
