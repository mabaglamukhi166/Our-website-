 /* ========================================= */
/* iOS Popup Menu */
/* ========================================= */
const menuBtn = document.getElementById("menuBtn");
const popup = document.getElementById("iosPopup");
const overlay = document.getElementById("menuOverlay");

if (menuBtn && popup && overlay) {
  menuBtn.addEventListener("click", () => {
    popup.classList.toggle("show");
    overlay.classList.toggle("show");
    document.body.classList.toggle("menu-open");
  });

  overlay.addEventListener("click", () => {
    popup.classList.remove("show");
    overlay.classList.remove("show");
    document.body.classList.remove("menu-open");
  });

  document.querySelectorAll(".ios-popup a").forEach(link => {
    link.addEventListener("click", () => {
      popup.classList.remove("show");
      overlay.classList.remove("show");
      document.body.classList.remove("menu-open");
    });
  });

  window.addEventListener("scroll", () => {
    if (popup.classList.contains("show")) {
      popup.classList.remove("show");
      overlay.classList.remove("show");
      document.body.classList.remove("menu-open");
    }
  });
}

/* ========================================= */
/* Back To Top Button */
/* ========================================= */
const topBtn = document.getElementById("topBtn");
if (topBtn) {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 400) {
      topBtn.classList.add("show");
    } else {
      topBtn.classList.remove("show");
    }
  });

  topBtn.onclick = e => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
}

/* ========================================= */
/* Parallax Hero Background */
/* ========================================= */
const parallax = document.querySelector(".parallax-bg");
window.addEventListener("scroll", () => {
  if (parallax) {
    parallax.style.transform = `translateY(${window.scrollY * 0.2}px) scale(1.2)`;
  }
});

/* ========================================= */
/* Fade-in Sections on Scroll */
/* ========================================= */
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll(".fade-section").forEach(el => observer.observe(el));

/* ========================================= */
/* Scroll Progress Bar */
/* ========================================= */
const progress = document.getElementById("progressBar");
if (progress) {
  window.addEventListener("scroll", () => {
    const winScroll = document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    progress.style.width = (winScroll / height) * 100 + "%";
  });
}

/* ========================================= */
/* Page Loader */
/* ========================================= */
window.addEventListener("load", () => {
  setTimeout(() => {
    const loader = document.getElementById("pageLoader");
    if (loader) loader.classList.add("hide");
  }, 900);
});

/* ========================================= */
/* Ripple Effect on Buttons */
/* ========================================= */
document.querySelectorAll(".glass-btn,.call-btn,.service-btn,.float-btn").forEach(btn => {
  btn.style.position = "relative";
  btn.style.overflow = "hidden";
  btn.addEventListener("click", function (e) {
    const ripple = document.createElement("span");
    const d = Math.max(this.clientWidth, this.clientHeight);
    ripple.className = "ripple";
    ripple.style.width = d + "px";
    ripple.style.height = d + "px";
    ripple.style.left = e.offsetX - d / 2 + "px";
    ripple.style.top = e.offsetY - d / 2 + "px";
    this.appendChild(ripple);
    setTimeout(() => ripple.remove(), 700);
  });
});

document.querySelectorAll(".glass-card,.service-card,.glass-item,.footer-box").forEach(el => {
  el.classList.add("spring", "glass-reflection");
});

/* ========================================= */
/* FAQ Accordion */
/* ========================================= */
const faqItems = document.querySelectorAll(".faq-item");
if (faqItems.length > 0) {
  faqItems.forEach(item => {
    const question = item.querySelector(".faq-question");
    if (!question) return;
    question.addEventListener("click", () => {
      faqItems.forEach(other => {
        if (other !== item) other.classList.remove("active");
      });
      item.classList.toggle("active");
    });
  });
}

/* ========================================= */
/* GALLERY FILTER + LIGHTBOX */
/* ========================================= */
const filterBtns = document.querySelectorAll(".filter-btn");
const galleryItems = document.querySelectorAll(".gallery-item");

filterBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    filterBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    const filter = btn.dataset.filter;
    galleryItems.forEach(item => {
      item.style.display = (filter === "all" || item.classList.contains(filter)) ? "block" : "none";
    });
  });
});

const galleryGridImages = document.querySelectorAll(".gallery-item img");

if (galleryGridImages.length > 0) {
  let lightbox = document.getElementById("galleryLightbox");

  if (!lightbox) {
    lightbox = document.createElement("div");
    lightbox.id = "galleryLightbox";
    lightbox.className = "gallery-lightbox";
    lightbox.innerHTML = `
      <span class="lightbox-close">&times;</span>
      <button class="lightbox-btn prev-btn">❮</button>
      <img id="lightboxImage">
      <button class="lightbox-btn next-btn">❯</button>
    `;
    document.body.appendChild(lightbox);
  }

  const lightboxImg = document.getElementById("lightboxImage");
  const closeBtn = document.querySelector(".lightbox-close");
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");
  let current = 0;

  function showImage() {
    lightboxImg.src = galleryGridImages[current].src;
  }

  galleryGridImages.forEach((img, index) => {
    img.addEventListener("click", () => {
      current = index;
      showImage();
      lightbox.classList.add("active");
    });
  });

  nextBtn.onclick = () => {
    current = (current + 1) >= galleryGridImages.length ? 0 : current + 1;
    showImage();
  };

  prevBtn.onclick = () => {
    current = (current - 1) < 0 ? galleryGridImages.length - 1 : current - 1;
    showImage();
  };

  closeBtn.onclick = () => lightbox.classList.remove("active");

  lightbox.onclick = (e) => {
    if (e.target === lightbox) lightbox.classList.remove("active");
  };

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") lightbox.classList.remove("active");
    if (e.key === "ArrowRight") nextBtn.click();
    if (e.key === "ArrowLeft") prevBtn.click();
  });
}

/* ========================================= */
/* Booking Form -> WhatsApp */
/* ========================================= */
document.addEventListener("DOMContentLoaded", function () {
  const bookingForm = document.getElementById("bookingForm");
  if (!bookingForm) return;

  bookingForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;
    const city = document.getElementById("city").value;
    const service = document.getElementById("service").value;
    const message = document.getElementById("message").value;

    const text = `🙏 Jai Maa Baglamukhi
📝 New Booking Request

👤 Name: ${name}
📞 Mobile: ${phone}
📍 City: ${city}
🛕 Service: ${service}

💬 Message:
${message}`;

    const url = `https://wa.me/919111557553?text=${encodeURIComponent(text)}`;
    window.location.href = url;
  });
});
