const products = [
  {
    name: "Brush Icon Tee",
    image: "assets/kaos-1.webp",
    tag: "Front Print",
    category: "front",
    price: "Rp 149.000",
    desc: "Kaos hitam dengan logo FOUR YOU bergaya brush silver. Cocok untuk look sporty minimalis dan bold."
  },
  {
    name: "Classic Gold Logo Tee",
    image: "assets/kaos-2.webp",
    tag: "Front Print",
    category: "front",
    price: "Rp 149.000",
    desc: "Desain logo utama warna kuning emas dengan outline tegas untuk identitas brand yang kuat."
  },
  {
    name: "Robot Mascot Tee",
    image: "assets/kaos-3.webp",
    tag: "Mascot",
    category: "mascot",
    price: "Rp 169.000",
    desc: "Karakter robot FOUR YOU sebagai maskot playful, futuristik, dan cocok untuk campaign streetwear."
  },
  {
    name: "Mono Character Tee",
    image: "assets/kaos-4.webp",
    tag: "Mascot",
    category: "mascot",
    price: "Rp 159.000",
    desc: "Visual karakter monochrome yang memberi nuansa urban, misterius, dan beda dari kaos biasa."
  },
  {
    name: "Back Geometry Tee",
    image: "assets/kaos-5.webp",
    tag: "Back Print",
    category: "back",
    price: "Rp 159.000",
    desc: "Desain back print geometris dengan logo kecil, cocok untuk tampilan clean dari depan dan standout dari belakang."
  },
  {
    name: "Goggle Logo Tee",
    image: "assets/kaos-6.webp",
    tag: "Front Print",
    category: "front",
    price: "Rp 159.000",
    desc: "Logo kuning dengan efek kacamata hitam untuk gaya sporty, edgy, dan modern."
  },
  {
    name: "Yellow Patch Tee",
    image: "assets/kaos-7.webp",
    tag: "Front Print",
    category: "front",
    price: "Rp 149.000",
    desc: "Logo brush hitam di atas patch kuning untuk tampilan kontras yang kuat dan mudah dikenali."
  },
  {
    name: "Back 4U Tee",
    image: "assets/kaos-8.webp",
    tag: "Back Print",
    category: "back",
    price: "Rp 159.000",
    desc: "Back print angka 4 dan huruf U sebagai simbol singkat dari FOUR YOU. Simple, besar, dan ikonik."
  },
  {
    name: "Stay True Tee",
    image: "assets/kaos-9.webp",
    tag: "Statement",
    category: "front",
    price: "Rp 169.000",
    desc: "Statement tee dengan pesan Stay True Stay You dan Adventure Awaits untuk vibe aktif dan percaya diri."
  }
];

const whatsappNumber = "6285880487484";
const productGrid = document.querySelector("#productGrid");
const modal = document.querySelector("#productModal");
const modalImage = document.querySelector("#modalImage");
const modalTitle = document.querySelector("#modalTitle");
const modalDesc = document.querySelector("#modalDesc");
const modalWa = document.querySelector("#modalWa");
const modalClose = document.querySelector(".modal-close");
const filterButtons = document.querySelectorAll(".filter-btn");
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

function buildWaLink(productName) {
  const message = `Halo FOUR YOU, saya mau order ${productName}. Apakah stok dan size masih tersedia?`;
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

function renderProducts(category = "all") {
  const selectedProducts = category === "all" ? products : products.filter(product => product.category === category);
  productGrid.innerHTML = selectedProducts.map((product, index) => `
    <article class="product-card reveal" style="transition-delay:${index * 35}ms">
      <div class="product-image">
        <img src="${product.image}" alt="${product.name}" loading="lazy" />
        <span class="product-tag">${product.tag}</span>
      </div>
      <div class="product-info">
        <h3>${product.name}</h3>
        <p>${product.desc}</p>
        <div class="product-meta">
          <strong>${product.price}</strong>
          <button class="detail-btn" type="button" data-product="${product.name}">Detail</button>
        </div>
      </div>
    </article>
  `).join("");

  observeReveals();
  document.querySelectorAll(".detail-btn").forEach(button => {
    button.addEventListener("click", () => openProduct(button.dataset.product));
  });
}

function openProduct(productName) {
  const product = products.find(item => item.name === productName);
  if (!product) return;
  modalImage.src = product.image;
  modalImage.alt = product.name;
  modalTitle.textContent = product.name;
  modalDesc.textContent = `${product.desc} Harga: ${product.price}.`;
  modalWa.href = buildWaLink(product.name);
  modal.showModal();
}

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    filterButtons.forEach(item => item.classList.remove("is-active"));
    button.classList.add("is-active");
    renderProducts(button.dataset.filter);
  });
});

modalClose.addEventListener("click", () => modal.close());
modal.addEventListener("click", event => {
  if (event.target === modal) modal.close();
});

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("is-open");
  menuToggle.classList.toggle("is-open", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("is-open");
    menuToggle.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

function observeReveals() {
  const reveals = document.querySelectorAll(".reveal:not(.is-visible)");
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  reveals.forEach(item => observer.observe(item));
}

function updateActiveNav() {
  const sections = ["home", "collection", "lookbook", "story", "contact"];
  const scrollPosition = window.scrollY + 160;

  sections.forEach(id => {
    const section = document.getElementById(id);
    const link = document.querySelector(`.nav-links a[href="#${id}"]`);
    if (!section || !link) return;
    const isActive = scrollPosition >= section.offsetTop && scrollPosition < section.offsetTop + section.offsetHeight;
    link.classList.toggle("is-active", isActive);
  });
}

const glow = document.querySelector(".cursor-glow");
window.addEventListener("pointermove", event => {
  if (!glow) return;
  glow.style.left = `${event.clientX}px`;
  glow.style.top = `${event.clientY}px`;
});

window.addEventListener("scroll", updateActiveNav, { passive: true });
document.querySelector("#year").textContent = new Date().getFullYear();
renderProducts();
observeReveals();
updateActiveNav();
