// Event untuk tombol "Mulai Sekarang"
const mulaiBtn = document.getElementById('mulaiBtn');
const video = document.getElementById('heroVideo');

if (mulaiBtn && video) {
  mulaiBtn.addEventListener('click', function () {
    // Scroll ke video
    video.scrollIntoView({ behavior: 'smooth', block: 'center' });

    // Play video
    video.play().catch((err) => {
      console.warn('Gagal autoplay video:', err.message);
    });
  });
}

// Smooth scroll manual untuk semua anchor <a href="#...">
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault(); // Cegah default jump

    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Event untuk dropdown pemilihan materi di halaman materi.html
const materiSelect = document.getElementById('materiSelect');
if (materiSelect) {
  materiSelect.addEventListener('change', function() {
    const targetId = this.value;
    if (targetId) {
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        const yOffset = -100; // offset tinggi header sticky
        const y = targetElement.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }
  });
}

// Dropdown kegiatan pembelajaran
document.addEventListener('DOMContentLoaded', function() {
    // Ambil semua elemen dropdown button
    const dropdownBtns = document.querySelectorAll('.dropdown-btn');

    // Tambahkan event listener untuk setiap button
    dropdownBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Toggle (buka/tutup) dropdown content yang bersangkutan
            const content = this.nextElementSibling;
            content.style.display = content.style.display === 'block' ? 'none' : 'block';

            // Tutup dropdown lainnya jika ada yang terbuka
            dropdownBtns.forEach(otherBtn => {
                if (otherBtn !== btn) {
                    otherBtn.nextElementSibling.style.display = 'none';
                }
            });
        });
    });
});

// Tampilkan/sembunyikan tombol saat scroll
window.addEventListener('scroll', function() {
  const scrollBtn = document.getElementById('scrollToTopBtn');
  if (window.scrollY > 300) {
    scrollBtn.classList.add('visible');
  } else {
    scrollBtn.classList.remove('visible');
  }
});

// Kembali ke atas saat tombol diklik
document.getElementById('scrollToTopBtn').addEventListener('click', function() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth' // Efek scroll halus
  });
});
