const DB = {
  get products() {
    return (
      JSON.parse(localStorage.getItem("ww_products") || "null") ||
      defaultProducts()
    );
  },
  set products(v) {
    localStorage.setItem("ww_products", JSON.stringify(v));
  },
  get orders() {
    return JSON.parse(localStorage.getItem("ww_orders") || "[]");
  },
  set orders(v) {
    localStorage.setItem("ww_orders", JSON.stringify(v));
  },
  get cart() {
    return JSON.parse(localStorage.getItem("ww_cart") || "[]");
  },
  set cart(v) {
    localStorage.setItem("ww_cart", JSON.stringify(v));
  },
  get users() {
    return JSON.parse(localStorage.getItem("ww_users") || "[]");
  },
  set users(v) {
    localStorage.setItem("ww_users", JSON.stringify(v));
  },
  get customerNotifs() {
    return JSON.parse(localStorage.getItem("ww_cnotifs") || "[]");
  },
  set customerNotifs(v) {
    localStorage.setItem("ww_cnotifs", JSON.stringify(v));
  },
  get adminNotifs() {
    return JSON.parse(localStorage.getItem("ww_anotifs") || "[]");
  },
  set adminNotifs(v) {
    localStorage.setItem("ww_anotifs", JSON.stringify(v));
  },
};

// ── SESSION ──
let session = JSON.parse(sessionStorage.getItem("ww_session") || "null");
const ADMIN_CREDS = { email: "admin@woolly.com", password: "admin123" };

// ── STATE ──
let prevPage = "home";
let homeFilter = "all";
let shopFilter = "all";
let currentDetailId = null;
let detailQty = 1;
let selectedPayment = "card";

function saveSession() {
  sessionStorage.setItem("ww_session", JSON.stringify(session));
}

// ═══════════════════════════════════
// DEFAULT PRODUCT DATA
// ═══════════════════════════════════
function defaultProducts() {
  return [
    {
      id: 1,
      name: "Chunky Throw Blanket",
      emoji: "🛏️",
      price: 89.99,
      category: "home",
      desc: "Ultra-soft chunky knit throw blanket made from 100% merino wool in gorgeous earth tones.",
      material: "100% Merino Wool",
      colors: ["#D4856A", "#8FAF8A", "#F2D4C2"],
      badge: "bestseller",
      rating: 5,
      reviews: 234,
      stock: 23,
    },
    {
      id: 2,
      name: "Boho Market Bag",
      emoji: "🛍️",
      price: 34.99,
      category: "accessories",
      desc: "Stylish sustainable market bag. Stretches to fit all your groceries while looking incredibly chic.",
      material: "Recycled Cotton",
      colors: ["#6B4C3B", "#B5603A", "#D4856A"],
      badge: "new",
      rating: 5,
      reviews: 89,
      stock: 45,
    },
    {
      id: 3,
      name: "Sunflower Coaster Set",
      emoji: "🌻",
      price: 22.0,
      category: "home",
      desc: "Set of 4 hand-crocheted sunflower coasters. Brighten up any table setting.",
      material: "Cotton Yarn",
      colors: ["#EF9F27", "#8FAF8A", "#FAF6EF"],
      badge: "",
      rating: 4,
      reviews: 156,
      stock: 67,
    },
    {
      id: 4,
      name: "Baby Bear Beanie",
      emoji: "🐻",
      price: 19.99,
      category: "baby",
      desc: "Adorable bear ear beanie for newborns to 12 months. So soft it won't irritate delicate skin.",
      material: "Organic Baby Yarn",
      colors: ["#F2D4C2", "#8FAF8A", "#D4856A"],
      badge: "new",
      rating: 5,
      reviews: 312,
      stock: 34,
    },
    {
      id: 5,
      name: "Granny Square Cardigan",
      emoji: "🧥",
      price: 129.0,
      category: "wearable",
      desc: "A modern take on the classic granny square. Relaxed-fit cardigan — the ultimate cozy statement piece.",
      material: "Alpaca & Wool Blend",
      colors: ["#6B4C3B", "#FAF6EF", "#D4856A"],
      badge: "bestseller",
      rating: 5,
      reviews: 78,
      stock: 12,
    },
    {
      id: 6,
      name: "Plant Pot Holder",
      emoji: "🪴",
      price: 16.5,
      category: "home",
      desc: "Elevate your indoor plants with these boho-style pot holders. Available in multiple sizes.",
      material: "Jute & Cotton",
      colors: ["#8FAF8A", "#6B4C3B", "#D4856A"],
      badge: "",
      rating: 4,
      reviews: 201,
      stock: 89,
    },
    {
      id: 7,
      name: "Winter Mittens",
      emoji: "🧤",
      price: 27.99,
      category: "wearable",
      desc: "Thick warm crochet mittens with lovely cable-like texture. Stylish and functional.",
      material: "Wool & Cashmere",
      colors: ["#B5603A", "#8FAF8A", "#6B4C3B"],
      badge: "sale",
      rating: 4,
      reviews: 145,
      stock: 28,
    },
    {
      id: 8,
      name: "Fringe Crossbody Bag",
      emoji: "👜",
      price: 54.99,
      category: "accessories",
      desc: "Bohemian fringe bag with full-length shoulder strap. Handmade from high-quality cotton cord.",
      material: "Cotton Cord",
      colors: ["#6B4C3B", "#D4856A", "#8FAF8A"],
      badge: "new",
      rating: 5,
      reviews: 67,
      stock: 19,
    },
    {
      id: 9,
      name: "Christmas Ornament Set",
      emoji: "🎄",
      price: 38.0,
      category: "seasonal",
      desc: "Set of 6 mini crochet Christmas ornaments — trees, stars, snowflakes and more.",
      material: "Mixed Yarns",
      colors: ["#B5603A", "#8FAF8A", "#FAF6EF"],
      badge: "seasonal",
      rating: 5,
      reviews: 423,
      stock: 55,
    },
    {
      id: 10,
      name: "Baby Bunny Lovey",
      emoji: "🐰",
      price: 32.0,
      category: "baby",
      desc: "Adorable security blanket and stuffed toy combo. Baby-safe and machine washable.",
      material: "Organic Cotton",
      colors: ["#F2D4C2", "#FAF6EF", "#D4856A"],
      badge: "bestseller",
      rating: 5,
      reviews: 289,
      stock: 41,
    },
    {
      id: 11,
      name: "Beret Hat",
      emoji: "🎩",
      price: 35.0,
      category: "wearable",
      desc: "Chic French-inspired crochet beret. Fits most adult head sizes.",
      material: "Merino Wool",
      colors: ["#6B4C3B", "#B5603A", "#8FAF8A"],
      badge: "new",
      rating: 4,
      reviews: 93,
      stock: 37,
    },
    {
      id: 12,
      name: "Dreamcatcher Wall Art",
      emoji: "🌙",
      price: 48.0,
      category: "home",
      desc: "Handwoven dreamcatcher with crochet detailing. Feathers, beads, and intricate knot work.",
      material: "Cotton & Feathers",
      colors: ["#D4856A", "#FAF6EF", "#8FAF8A"],
      badge: "",
      rating: 5,
      reviews: 176,
      stock: 22,
    },
  ];
}

// ═══════════════════════════════════
// AUTH
// ═══════════════════════════════════
function openAuthModal() {
  openModal("authModal");
  authTab("login", document.querySelector("#authModal .tab-sw-btn"));
}

function closeModal(id) {
  document.getElementById(id).classList.remove("open");
}

function openModal(id) {
  document.getElementById(id).classList.add("open");
}

function authTab(tab, btn) {
  document
    .querySelectorAll("#authModal .tab-sw-btn")
    .forEach((b) => b.classList.remove("active"));
  btn.classList.add("active");
  document
    .getElementById("loginForm")
    .classList.toggle("hidden", tab !== "login");
  document
    .getElementById("registerForm")
    .classList.toggle("hidden", tab !== "register");
  document.getElementById("authError").classList.remove("show");
  document.getElementById("authSuccess").classList.remove("show");
}

function doLogin() {
  const email = document
    .getElementById("loginEmail")
    .value.trim()
    .toLowerCase();
  const pass = document.getElementById("loginPass").value;
  const user = DB.users.find((u) => u.email === email && u.password === pass);
  if (!user) {
    showAuthError("Invalid email or password.");
    return;
  }
  session = {
    type: "customer",
    id: user.id,
    name: user.firstName,
    email: user.email,
  };
  saveSession();
  closeModal("authModal");
  updateNavUser();
  toast("👋 Welcome back, " + user.firstName + "!");
}

function doRegister() {
  const first = document.getElementById("regFirst").value.trim();
  const last = document.getElementById("regLast").value.trim();
  const email = document.getElementById("regEmail").value.trim().toLowerCase();
  const pass = document.getElementById("regPass").value;
  if (!first || !email || !pass) {
    showAuthError("Please fill in all fields.");
    return;
  }
  if (pass.length < 6) {
    showAuthError("Password must be at least 6 characters.");
    return;
  }
  const users = DB.users;
  if (users.find((u) => u.email === email)) {
    showAuthError("An account with this email already exists.");
    return;
  }
  const id = "u_" + Date.now();
  users.push({
    id,
    firstName: first,
    lastName: last,
    email,
    password: pass,
    joinedAt: today(),
  });
  DB.users = users;
  session = { type: "customer", id, name: first, email };
  saveSession();
  addCustomerNotif(
    "🎉 Welcome to Woolly Wonders!",
    "Hi " +
      first +
      ", your account is ready. Start exploring our handcrafted collection!",
  );
  closeModal("authModal");
  updateNavUser();
  toast("✨ Account created! Welcome, " + first + "!");
}

function showAuthError(msg) {
  const el = document.getElementById("authError");
  el.textContent = msg;
  el.classList.add("show");
}

function doAdminLogin() {
  const email = document
    .getElementById("adminEmail")
    .value.trim()
    .toLowerCase();
  const pass = document.getElementById("adminPass").value;
  if (email === ADMIN_CREDS.email && pass === ADMIN_CREDS.password) {
    session = { type: "admin", name: "Admin" };
    saveSession();
    closeModal("adminLoginModal");
    updateNavUser();
    showPage("admin");
  } else {
    const el = document.getElementById("adminLoginError");
    el.textContent = "Invalid admin credentials.";
    el.classList.add("show");
  }
}

function logout() {
  session = null;
  saveSession();
  DB.cart = [];
  updateNavUser();
  updateCartBadge();
  showPage("home");
  toast("Signed out. See you soon!");
}

function logoutAdmin() {
  session = null;
  saveSession();
  updateNavUser();
  showPage("home");
}

function updateNavUser() {
  const area = document.getElementById("navUserArea");
  if (!session) {
    area.innerHTML = `
      <button class="btn-nav" onclick="openAuthModal()">Sign In</button>
      <button class="btn-nav" onclick="openModal('adminLoginModal')">⚙️ Admin</button>`;
  } else if (session.type === "admin") {
    area.innerHTML = `
      <button class="user-chip" onclick="showPage('admin')">🔧 Dashboard</button>
      <button class="btn-nav" onclick="logoutAdmin()">Exit</button>`;
  } else {
    area.innerHTML = `
      <button class="user-chip" onclick="myOrdersPage()">👤 ${session.name}</button>
      <button class="btn-nav" onclick="logout()">Sign Out</button>`;
  }
  renderNotifDot();
}

// ═══════════════════════════════════
// NOTIFICATIONS
// ═══════════════════════════════════
function addCustomerNotif(title, msg) {
  if (!session || session.type !== "customer") return;
  const notifs = DB.customerNotifs;
  notifs.unshift({
    id: Date.now(),
    userId: session.id,
    title,
    msg,
    read: false,
    time: "Just now",
  });
  DB.customerNotifs = notifs;
  renderNotifDot();
}

function addAdminNotif(title, msg) {
  const notifs = DB.adminNotifs;
  notifs.unshift({ id: Date.now(), title, msg, read: false, time: "Just now" });
  DB.adminNotifs = notifs;
}

function renderNotifDot() {
  const dot = document.getElementById("notifDot");
  if (!dot) return;
  let unread = 0;
  if (session && session.type === "admin") {
    unread = DB.adminNotifs.filter((n) => !n.read).length;
  } else if (session && session.type === "customer") {
    unread = DB.customerNotifs.filter(
      (n) => n.userId === session.id && !n.read,
    ).length;
  }
  dot.classList.toggle("show", unread > 0);
}

function toggleNotifPanel() {
  const panel = document.getElementById("notifPanel");
  const isOpen = panel.classList.contains("open");
  panel.classList.toggle("open", !isOpen);
  if (!isOpen) renderNotifPanel();
}

function renderNotifPanel() {
  const list = document.getElementById("notifList");
  let notifs = [];
  if (session && session.type === "admin") {
    notifs = DB.adminNotifs;
  } else if (session && session.type === "customer") {
    notifs = DB.customerNotifs.filter((n) => n.userId === session.id);
  } else {
    list.innerHTML =
      '<div class="notif-empty">Sign in to see notifications</div>';
    return;
  }
  if (notifs.length === 0) {
    list.innerHTML = '<div class="notif-empty">🎉 You\'re all caught up!</div>';
    return;
  }
  list.innerHTML = notifs
    .map(
      (n) => `
    <div class="notif-item ${n.read ? "" : "unread"}">
      <div class="notif-item-icon">${getNotifIcon(n.title)}</div>
      <div class="notif-item-body">
        <div class="notif-item-title">${n.title}</div>
        <div class="notif-item-msg">${n.msg}</div>
        <div class="notif-item-time">${n.time}</div>
      </div>
    </div>`,
    )
    .join("");

  // Mark all as read
  if (session.type === "admin") {
    const ns = DB.adminNotifs;
    ns.forEach((n) => (n.read = true));
    DB.adminNotifs = ns;
  } else {
    const ns = DB.customerNotifs;
    ns.filter((n) => n.userId === session.id).forEach((n) => (n.read = true));
    DB.customerNotifs = ns;
  }
  renderNotifDot();
}

function clearNotifs() {
  if (session && session.type === "admin") {
    DB.adminNotifs = [];
  } else if (session && session.type === "customer") {
    DB.customerNotifs = DB.customerNotifs.filter(
      (n) => n.userId !== session.id,
    );
  }
  renderNotifPanel();
  renderNotifDot();
}

function getNotifIcon(title) {
  if (title.includes("Order") || title.includes("order")) return "📦";
  if (title.includes("Welcome")) return "🎉";
  if (title.includes("Ship")) return "🚚";
  if (title.includes("Deliver")) return "✅";
  if (title.includes("Payment")) return "💳";
  return "🔔";
}

// Close notif panel on outside click
document.addEventListener("click", (e) => {
  const panel = document.getElementById("notifPanel");
  const btn = document.getElementById("notifBtn");
  if (
    panel.classList.contains("open") &&
    !panel.contains(e.target) &&
    !btn.contains(e.target)
  ) {
    panel.classList.remove("open");
  }
});

// ═══════════════════════════════════
// PAGE ROUTING
// ═══════════════════════════════════
function showPage(name) {
  document
    .querySelectorAll(".page")
    .forEach((p) => p.classList.remove("active"));
  document.getElementById("page-" + name).classList.add("active");
  window.scrollTo(0, 0);
  if (name === "home") renderHomeGrids();
  if (name === "shop") renderShopGrid();
  if (name === "checkout") renderCheckoutSummary();
  if (name === "admin") {
    if (!session || session.type !== "admin") {
      openModal("adminLoginModal");
      return;
    }
    renderAdmin();
  }
}

function goBack() {
  showPage(prevPage);
}

function myOrdersPage() {
  if (!session || session.type !== "customer") {
    openAuthModal();
    return;
  }
  renderMyOrders();
  document
    .querySelectorAll(".page")
    .forEach((p) => p.classList.remove("active"));
  document.getElementById("page-orders").classList.add("active");
  window.scrollTo(0, 0);
}

function scrollToSection(id) {
  showPage("home");
  setTimeout(
    () => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }),
    100,
  );
}

// ═══════════════════════════════════
// PRODUCT RENDERING
// ═══════════════════════════════════
function starsHtml(n) {
  return "★".repeat(n) + "☆".repeat(5 - n);
}

function badgeHtml(b) {
  if (!b) return "";
  const labels = {
    bestseller: "⭐ Bestseller",
    new: "✨ New",
    sale: "🏷️ Sale",
    seasonal: "🍂 Seasonal",
  };
  const classes = {
    bestseller: "",
    new: "new",
    sale: "sale",
    seasonal: "seasonal",
  };
  return `<span class="product-badge ${classes[b] || ""}">${labels[b] || b}</span>`;
}

function productCardHtml(p) {
  const bg = `background: linear-gradient(135deg, ${p.colors[0]}22 0%, ${p.colors[1]}22 100%)`;
  return `
  <div class="product-card" onclick="openDetail(${p.id})">
    <div class="product-img" style="${bg}">
      ${badgeHtml(p.badge)}
      <span>${p.emoji}</span>
    </div>
    <div class="product-info">
      <div class="product-cat">${p.category}</div>
      <div class="stars">${starsHtml(p.rating)} <span>(${p.reviews})</span></div>
      <div class="product-name">${p.name}</div>
      <div class="product-price-row">
        <div class="product-price">$${p.price.toFixed(2)}</div>
        <button class="btn-add" onclick="event.stopPropagation(); addToCart(${p.id})">+ Add</button>
      </div>
    </div>
  </div>`;
}

function renderHomeGrids() {
  const filtered =
    homeFilter === "all"
      ? DB.products
      : DB.products.filter((p) => p.category === homeFilter);
  document.getElementById("homeGrid").innerHTML = filtered
    .slice(0, 8)
    .map(productCardHtml)
    .join("");
  document.getElementById("newGrid").innerHTML = DB.products
    .filter((p) => p.badge === "new")
    .map(productCardHtml)
    .join("");
  setupReveal();
}

function renderShopGrid() {
  const q = (document.getElementById("searchInput")?.value || "").toLowerCase();
  let list = DB.products;
  if (shopFilter !== "all")
    list = list.filter((p) => p.category === shopFilter);
  if (q)
    list = list.filter(
      (p) =>
        p.name.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q),
    );
  document.getElementById("shopGrid").innerHTML = list
    .map(productCardHtml)
    .join("");
}

function filterHome(cat, btn) {
  homeFilter = cat;
  document
    .querySelectorAll("#page-home .filter-btn")
    .forEach((b) => b.classList.remove("active"));
  btn.classList.add("active");
  renderHomeGrids();
}

function filterShop(cat, btn) {
  shopFilter = cat;
  document
    .querySelectorAll("#shopFilters .filter-btn")
    .forEach((b) => b.classList.remove("active"));
  btn.classList.add("active");
  renderShopGrid();
}

// ═══════════════════════════════════
// PRODUCT DETAIL
// ═══════════════════════════════════
function openDetail(id) {
  prevPage = document.querySelector(".page.active").id.replace("page-", "");
  currentDetailId = id;
  detailQty = 1;
  const p = DB.products.find((x) => x.id === id);
  if (!p) return;
  document.getElementById("breadcrumbBack").textContent =
    prevPage.charAt(0).toUpperCase() + prevPage.slice(1);

  const colorsHtml = p.colors
    .map(
      (c, i) =>
        `<div class="color-dot ${i === 0 ? "selected" : ""}" style="background:${c}" onclick="selectColor(this)"></div>`,
    )
    .join("");

  document.getElementById("detailContent").innerHTML = `
    <div class="detail-img-wrap">${p.emoji}</div>
    <div class="detail-info">
      <div class="detail-category">🧶 ${p.category}</div>
      <h2 class="detail-name">${p.name}</h2>
      <div class="stars detail-stars">
        ${starsHtml(p.rating)}
        <span class="review-count">${p.reviews} reviews</span>
      </div>
      <div class="detail-price">$${p.price.toFixed(2)}</div>
      <p class="detail-desc">${p.desc}</p>
      <div class="detail-meta">
        <div class="meta-row">
          <span class="meta-label">Material</span>
          <span class="meta-val">${p.material}</span>
        </div>
        <div class="meta-row">
          <span class="meta-label">Color</span>
          <div class="color-dots">${colorsHtml}</div>
        </div>
        <div class="meta-row">
          <span class="meta-label">In Stock</span>
          <span class="meta-val in-stock">✓ ${p.stock} available</span>
        </div>
        <div class="meta-row">
          <span class="meta-label">Care</span>
          <span class="meta-val">Hand wash cold</span>
        </div>
      </div>
      <div class="qty-row">
        <div class="qty-large">
          <button onclick="changeDetailQty(-1)">−</button>
          <span id="detailQtyNum">1</span>
          <button onclick="changeDetailQty(1)">+</button>
        </div>
        <button class="btn-detail-add" id="detailAddBtn" onclick="addToCartFromDetail()">
          🛒 Add to Basket — $${p.price.toFixed(2)}
        </button>
      </div>
      <p class="detail-shipping-note">🚚 Free shipping over $75 &nbsp;·&nbsp; ↩️ Easy returns within 30 days</p>
    </div>`;
  showPage("detail");
}

function changeDetailQty(d) {
  detailQty = Math.max(1, detailQty + d);
  document.getElementById("detailQtyNum").textContent = detailQty;
  const p = DB.products.find((x) => x.id === currentDetailId);
  document.getElementById("detailAddBtn").textContent =
    "🛒 Add to Basket — $" + (p.price * detailQty).toFixed(2);
}

function addToCartFromDetail() {
  for (let i = 0; i < detailQty; i++) addToCart(currentDetailId, false);
  const p = DB.products.find((x) => x.id === currentDetailId);
  toast(p.emoji + " Added " + detailQty + "× " + p.name + "!");
}

function selectColor(dot) {
  dot
    .closest(".color-dots")
    .querySelectorAll(".color-dot")
    .forEach((d) => d.classList.remove("selected"));
  dot.classList.add("selected");
}

// ═══════════════════════════════════
// CART
// ═══════════════════════════════════
function addToCart(id, showToast = true) {
  if (!session || session.type !== "customer") {
    openAuthModal();
    return;
  }
  const p = DB.products.find((x) => x.id === id);
  const cart = DB.cart;
  const ex = cart.find((i) => i.id === id);
  if (ex) ex.qty++;
  else cart.push({ id, qty: 1 });
  DB.cart = cart;
  updateCartBadge();
  if (showToast) toast(p.emoji + " Added to basket!");
  renderCart();
}

function removeFromCart(id) {
  DB.cart = DB.cart.filter((i) => i.id !== id);
  updateCartBadge();
  renderCart();
}

function changeQty(id, d) {
  const cart = DB.cart;
  const item = cart.find((i) => i.id === id);
  if (!item) return;
  item.qty = Math.max(1, item.qty + d);
  DB.cart = cart;
  updateCartBadge();
  renderCart();
}

function updateCartBadge() {
  document.getElementById("cartCount").textContent = DB.cart.reduce(
    (s, i) => s + i.qty,
    0,
  );
}

function cartTotal() {
  return DB.cart.reduce((s, i) => {
    const p = DB.products.find((x) => x.id === i.id);
    return s + (p ? p.price * i.qty : 0);
  }, 0);
}

function renderCart() {
  const el = document.getElementById("cartItems");
  const footer = document.getElementById("cartFooter");
  const cart = DB.cart;

  if (cart.length === 0) {
    el.innerHTML = `
      <div class="empty-cart">
        <div class="empty-icon">🧺</div>
        <p>Your basket is empty.<br>Find something lovely!</p>
      </div>`;
    footer.innerHTML = "";
    return;
  }

  el.innerHTML = cart
    .map((item) => {
      const p = DB.products.find((x) => x.id === item.id);
      if (!p) return "";
      return `
    <div class="cart-item">
      <div class="cart-item-img">${p.emoji}</div>
      <div class="cart-item-info">
        <div class="cart-item-name">${p.name}</div>
        <div class="cart-item-price">$${(p.price * item.qty).toFixed(2)}</div>
        <div class="qty-control">
          <button class="qty-btn" onclick="changeQty(${item.id}, -1)">−</button>
          <span class="qty-num">${item.qty}</span>
          <button class="qty-btn" onclick="changeQty(${item.id}, 1)">+</button>
        </div>
      </div>
      <button class="btn-remove" onclick="removeFromCart(${item.id})">🗑️</button>
    </div>`;
    })
    .join("");

  const sub = cartTotal();
  const ship = sub >= 75 ? 0 : 8.99;
  footer.innerHTML = `
    <div class="cart-row"><span>Subtotal</span><span>$${sub.toFixed(2)}</span></div>
    <div class="cart-row"><span>Shipping</span><span>${ship === 0 ? "🎉 Free!" : "$" + ship.toFixed(2)}</span></div>
    <div class="cart-row total"><span>Total</span><span>$${(sub + ship).toFixed(2)}</span></div>
    <button class="btn-checkout" onclick="goCheckout()">Proceed to Checkout →</button>`;
}

function toggleCart() {
  document.getElementById("cartOverlay").classList.toggle("open");
  document.getElementById("cartSidebar").classList.toggle("open");
  renderCart();
}

function goCheckout() {
  if (!session || session.type !== "customer") {
    toggleCart();
    openAuthModal();
    return;
  }
  toggleCart();
  showPage("checkout");
  const emailEl = document.getElementById("shipEmail");
  const nameEl = document.getElementById("shipFirst");
  if (emailEl && session.email) emailEl.value = session.email;
  if (nameEl && session.name) nameEl.value = session.name;
}

// ═══════════════════════════════════
// PAYMENT
// ═══════════════════════════════════
function selectPayment(type) {
  selectedPayment = type;
  document
    .getElementById("payCard")
    .classList.toggle("selected", type === "card");
  document
    .getElementById("payCod")
    .classList.toggle("selected", type === "cod");
  document
    .getElementById("cardFields")
    .classList.toggle("show", type === "card");
  document.getElementById("codFields").classList.toggle("show", type === "cod");
}

function formatCard(input) {
  let v = input.value.replace(/\D/g, "").substring(0, 16);
  input.value = v.replace(/(.{4})/g, "$1 ").trim();
}

function formatExpiry(input) {
  let v = input.value.replace(/\D/g, "");
  if (v.length >= 2) v = v.substring(0, 2) + "/" + v.substring(2, 4);
  input.value = v;
}

function validateCheckout() {
  const required = [
    "shipFirst",
    "shipLast",
    "shipEmail",
    "shipPhone",
    "shipAddress",
    "shipCity",
    "shipZip",
  ];
  for (const id of required) {
    if (!document.getElementById(id).value.trim()) {
      showCheckoutError("Please fill in all shipping details.");
      return false;
    }
  }
  if (selectedPayment === "card") {
    const cn = document.getElementById("cardNum").value.replace(/\s/g, "");
    const exp = document.getElementById("cardExp").value;
    const cvv = document.getElementById("cardCvv").value;
    const name = document.getElementById("cardName").value.trim();
    if (cn.length < 16) {
      showCheckoutError("Please enter a valid 16-digit card number.");
      return false;
    }
    if (!exp.includes("/")) {
      showCheckoutError("Please enter a valid expiry date (MM/YY).");
      return false;
    }
    if (cvv.length < 3) {
      showCheckoutError("Please enter a valid CVV.");
      return false;
    }
    if (!name) {
      showCheckoutError("Please enter the name on your card.");
      return false;
    }
  }
  return true;
}

function showCheckoutError(msg) {
  const el = document.getElementById("checkoutError");
  el.textContent = msg;
  el.classList.add("show");
  el.scrollIntoView({ behavior: "smooth", block: "center" });
}

// ═══════════════════════════════════
// PLACE ORDER
// ═══════════════════════════════════
function placeOrder() {
  if (DB.cart.length === 0) {
    showCheckoutError("Your cart is empty!");
    return;
  }
  if (!validateCheckout()) return;

  const orderId = "WW-" + String(Math.floor(100000 + Math.random() * 900000));
  const sub = cartTotal();
  const ship = sub >= 75 ? 0 : 8.99;
  const total = sub + ship;
  const payLabel =
    selectedPayment === "card" ? "💳 Card Payment" : "🏠 Cash on Delivery";

  const order = {
    id: orderId,
    customerId: session.id,
    customerName: session.name,
    customerEmail: session.email,
    items: DB.cart.map((i) => {
      const p = DB.products.find((x) => x.id === i.id);
      return {
        id: i.id,
        name: p.name,
        emoji: p.emoji,
        qty: i.qty,
        price: p.price,
      };
    }),
    subtotal: sub,
    shipping: ship,
    total,
    paymentMethod: selectedPayment,
    paymentLabel: payLabel,
    status: "confirmed",
    date: today(),
    shippingAddr: {
      name:
        document.getElementById("shipFirst").value +
        " " +
        document.getElementById("shipLast").value,
      address: document.getElementById("shipAddress").value,
      city: document.getElementById("shipCity").value,
      zip: document.getElementById("shipZip").value,
      country: document.getElementById("shipCountry").value,
    },
  };

  const orders = DB.orders;
  orders.unshift(order);
  DB.orders = orders;

  DB.cart = [];
  updateCartBadge();

  // Customer notification
  addCustomerNotif(
    "Order #" + orderId + " Confirmed!",
    "Your order of " +
      order.items.length +
      " item(s) totalling $" +
      total.toFixed(2) +
      " has been confirmed. " +
      (selectedPayment === "cod"
        ? "Pay cash on delivery."
        : "Payment received via card.") +
      " Estimated delivery: 7–14 days.",
  );

  // Admin notification
  addAdminNotif(
    "New Order #" + orderId,
    session.name +
      " placed an order for " +
      order.items.length +
      " item(s) — $" +
      total.toFixed(2) +
      " via " +
      payLabel +
      ". Please review and process.",
  );

  // Update success page
  document.getElementById("orderNumber").textContent = "#" + orderId;
  document.getElementById("successIcon").textContent =
    selectedPayment === "cod" ? "🏠" : "🎉";
  document.getElementById("successTitle").textContent =
    selectedPayment === "cod"
      ? "Order Placed — Pay on Delivery!"
      : "Order Placed!";
  document.getElementById("successMsg").textContent =
    selectedPayment === "cod"
      ? "Your order is confirmed! Our delivery partner will bring your items and collect $" +
        total.toFixed(2) +
        " cash at your door."
      : "Payment of $" +
        total.toFixed(2) +
        " confirmed. Your handcrafted treasures are being prepared!";
  document.getElementById("successSub").textContent =
    selectedPayment === "cod"
      ? "Estimated delivery: 3–7 business days | Bring exact cash"
      : "Estimated delivery: 7–14 business days";

  showPage("success");
}

// ═══════════════════════════════════
// CHECKOUT SUMMARY
// ═══════════════════════════════════
function renderCheckoutSummary() {
  const sub = cartTotal();
  const ship = sub >= 75 ? 0 : 8.99;
  const items = DB.cart
    .map((item) => {
      const p = DB.products.find((x) => x.id === item.id);
      return `<div class="summary-item">
      <span>${p.emoji} ${p.name} ×${item.qty}</span>
      <span>$${(p.price * item.qty).toFixed(2)}</span>
    </div>`;
    })
    .join("");

  document.getElementById("checkoutSummary").innerHTML = `
    <h3>Order Summary</h3>
    ${items}
    <hr class="summary-divider">
    <div class="summary-item"><span>Subtotal</span><span>$${sub.toFixed(2)}</span></div>
    <div class="summary-item"><span>Shipping</span><span>${ship === 0 ? "Free" : "$" + ship.toFixed(2)}</span></div>
    <hr class="summary-divider">
    <div class="summary-total"><span>Total</span><span>$${(sub + ship).toFixed(2)}</span></div>
    <p class="summary-craft-note">🧶 Each item is handcrafted. Allow 3–5 days for crafting before shipping.</p>`;
}

// ═══════════════════════════════════
// MY ORDERS
// ═══════════════════════════════════
function renderMyOrders() {
  const myOrders = DB.orders.filter((o) => o.customerId === session.id);
  const el = document.getElementById("myOrdersList");

  if (myOrders.length === 0) {
    el.innerHTML = `
      <div class="empty-orders">
        <div class="empty-icon">📦</div>
        <p>No orders yet. Start shopping!</p>
        <button class="btn-primary" onclick="showPage('shop')">Shop Now</button>
      </div>`;
    return;
  }

  el.innerHTML = myOrders
    .map(
      (o) => `
    <div class="order-card">
      <div class="order-card-header">
        <div>
          <div class="order-card-id">Order #${o.id}</div>
          <div class="order-card-meta">${o.date} · ${o.paymentLabel || "N/A"}</div>
        </div>
        <div class="order-card-right">
          <span class="status-badge status-${o.status}">${statusLabel(o.status)}</span>
          <span class="order-total">$${o.total.toFixed(2)}</span>
        </div>
      </div>
      <div class="order-items-list">
        ${o.items.map((i) => `<span class="order-item-chip">${i.emoji} ${i.name} ×${i.qty}</span>`).join("")}
      </div>
      <div class="order-address">
        📍 ${o.shippingAddr?.address || "—"}, ${o.shippingAddr?.city || "—"}, ${o.shippingAddr?.country || "—"}
      </div>
    </div>`,
    )
    .join("");
}

function statusLabel(s) {
  const map = {
    pending: "⏳ Pending",
    confirmed: "✅ Confirmed",
    shipped: "🚚 Shipped",
    delivered: "📬 Delivered",
  };
  return map[s] || s;
}

// ═══════════════════════════════════
// ADMIN DASHBOARD
// ═══════════════════════════════════
function renderAdmin() {
  const orders = DB.orders;
  const revenue = orders.reduce((s, o) => s + o.total, 0);

  document.getElementById("adminWelcome").textContent =
    "Welcome back, " + (session?.name || "Admin");

  document.getElementById("adminStats").innerHTML = `
    <div class="admin-stat-card">
      <div class="admin-stat-icon">💰</div>
      <div class="admin-stat-val">$${revenue.toFixed(0)}</div>
      <div class="admin-stat-label">Total Revenue</div>
    </div>
    <div class="admin-stat-card">
      <div class="admin-stat-icon">📦</div>
      <div class="admin-stat-val">${orders.length}</div>
      <div class="admin-stat-label">Total Orders</div>
    </div>
    <div class="admin-stat-card">
      <div class="admin-stat-icon">🧶</div>
      <div class="admin-stat-val">${DB.products.length}</div>
      <div class="admin-stat-label">Products</div>
    </div>
    <div class="admin-stat-card">
      <div class="admin-stat-icon">👥</div>
      <div class="admin-stat-val">${DB.users.length}</div>
      <div class="admin-stat-label">Customers</div>
    </div>`;

  // Orders
  document.getElementById("ordersTable").innerHTML =
    orders.length === 0
      ? `<tr><td colspan="8" class="table-empty">No orders yet</td></tr>`
      : orders
          .map(
            (o) => `
      <tr>
        <td><strong>${o.id}</strong></td>
        <td>${o.customerName || "—"}</td>
        <td>${o.items?.length || "—"} items</td>
        <td><strong>$${o.total.toFixed(2)}</strong></td>
        <td>${o.paymentLabel || "—"}</td>
        <td>${o.date}</td>
        <td><span class="status-badge status-${o.status}">${statusLabel(o.status)}</span></td>
        <td>
          <select class="admin-select" onchange="updateOrderStatus('${o.id}', this.value)">
            <option value="confirmed" ${o.status === "confirmed" ? "selected" : ""}>Confirmed</option>
            <option value="shipped"   ${o.status === "shipped" ? "selected" : ""}>Shipped</option>
            <option value="delivered" ${o.status === "delivered" ? "selected" : ""}>Delivered</option>
          </select>
        </td>
      </tr>`,
          )
          .join("");

  // Products
  document.getElementById("productsTable").innerHTML = DB.products
    .map(
      (p) => `
    <tr>
      <td class="product-emoji">${p.emoji}</td>
      <td><strong>${p.name}</strong></td>
      <td>${p.category}</td>
      <td>$${p.price.toFixed(2)}</td>
      <td>${p.stock}</td>
      <td><button class="btn-danger" onclick="deleteProduct(${p.id})">Delete</button></td>
    </tr>`,
    )
    .join("");

  // Customers
  const users = DB.users;
  document.getElementById("customersTable").innerHTML =
    users.length === 0
      ? `<tr><td colspan="5" class="table-empty">No customers yet</td></tr>`
      : users
          .map((u) => {
            const userOrders = DB.orders.filter((o) => o.customerId === u.id);
            const spent = userOrders.reduce((s, o) => s + o.total, 0);
            return `
          <tr>
            <td><strong>${u.firstName} ${u.lastName}</strong></td>
            <td>${u.email}</td>
            <td>${userOrders.length}</td>
            <td>$${spent.toFixed(2)}</td>
            <td>${u.joinedAt || "—"}</td>
          </tr>`;
          })
          .join("");
}

function adminTab(tab, btn) {
  document
    .querySelectorAll(".tab-btn")
    .forEach((b) => b.classList.remove("active"));
  btn.classList.add("active");
  const map = {
    orders: "adminOrders",
    products: "adminProducts",
    addProduct: "adminAddProduct",
    customers: "adminCustomers",
  };
  Object.values(map).forEach((id) =>
    document.getElementById(id).classList.add("hidden"),
  );
  document.getElementById(map[tab]).classList.remove("hidden");
}

function updateOrderStatus(orderId, status) {
  const orders = DB.orders;
  const o = orders.find((x) => x.id === orderId);
  if (!o) return;
  o.status = status;
  DB.orders = orders;

  // Notify customer on ship/deliver
  const messages = {
    shipped:
      "Your order #" +
      orderId +
      " has been shipped! 🚚 Estimated arrival: 3–5 days.",
    delivered:
      "Your order #" + orderId + " has been delivered! 📬 We hope you love it!",
  };
  if (messages[status] && o.customerId) {
    const ns = DB.customerNotifs;
    ns.unshift({
      id: Date.now(),
      userId: o.customerId,
      title:
        status === "shipped"
          ? "Order #" + orderId + " Shipped!"
          : "Order #" + orderId + " Delivered!",
      msg: messages[status],
      read: false,
      time: "Just now",
    });
    DB.customerNotifs = ns;
  }
  renderAdmin();
  toast("Order " + orderId + " → " + status);
}

function deleteProduct(id) {
  if (!confirm("Delete this product?")) return;
  DB.products = DB.products.filter((p) => p.id !== id);
  renderAdmin();
  toast("Product deleted.");
}

function addProduct() {
  const name = document.getElementById("newName").value.trim();
  const emoji = document.getElementById("newEmoji").value.trim() || "🧶";
  const price = parseFloat(document.getElementById("newPrice").value);
  const category = document.getElementById("newCategory").value;
  const desc = document.getElementById("newDesc").value.trim();
  const colors = document
    .getElementById("newColors")
    .value.split(",")
    .map((c) => c.trim())
    .filter(Boolean);
  const material =
    document.getElementById("newMaterial").value.trim() || "Handcrafted Yarn";
  const stock = parseInt(document.getElementById("newStock").value) || 20;

  if (!name || isNaN(price)) {
    toast("⚠️ Please enter a name and price.");
    return;
  }

  const products = DB.products;
  const newId = Math.max(...products.map((p) => p.id)) + 1;
  products.push({
    id: newId,
    name,
    emoji,
    price,
    category,
    desc: desc || "A beautiful handcrafted piece.",
    material,
    colors: colors.length ? colors : ["#D4856A", "#8FAF8A"],
    badge: "new",
    rating: 5,
    reviews: 0,
    stock,
  });
  DB.products = products;
  toast('✓ "' + name + '" added!');
  [
    "newName",
    "newEmoji",
    "newPrice",
    "newDesc",
    "newColors",
    "newMaterial",
    "newStock",
  ].forEach((id) => {
    document.getElementById(id).value = "";
  });
  renderAdmin();
}

// ═══════════════════════════════════
// TOAST
// ═══════════════════════════════════
function toast(msg) {
  const wrap = document.getElementById("toastWrap");
  const t = document.createElement("div");
  t.className = "toast";
  t.textContent = msg;
  wrap.appendChild(t);
  setTimeout(() => {
    t.classList.add("hiding");
    setTimeout(() => t.remove(), 300);
  }, 2800);
}

// ═══════════════════════════════════
// REVEAL ANIMATION
// ═══════════════════════════════════
function setupReveal() {
  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) e.target.classList.add("visible");
      });
    },
    { threshold: 0.1 },
  );
  document.querySelectorAll(".reveal").forEach((el) => obs.observe(el));
}

// ═══════════════════════════════════
// HELPERS
// ═══════════════════════════════════
function today() {
  return new Date().toISOString().split("T")[0];
}

// ═══════════════════════════════════
// INIT
// ═══════════════════════════════════
updateNavUser();
renderHomeGrids();
updateCartBadge();
setupReveal();
