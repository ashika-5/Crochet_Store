# 🧶 Woolly Wonders — Handcrafted Crochet Store

A fully functional crochet e-commerce store built with HTML, CSS, and vanilla JavaScript. No frameworks, no dependencies, no server required — just open `index.html` in any browser!

---

## 🚀 Getting Started

1. Download and unzip the project folder
2. Open `index.html` in your browser
3. That's it! The store is fully functional

---

## 📁 Project Structure

```
woolly-wonders/
├── index.html        ← Main store (all-in-one)
├── README.md         ← This file
└── assets/           ← (optional) for future images/icons
```

---

## ✨ Features

### Customer-Facing
- **Home Page** — Hero banner, bestsellers, new arrivals, featured banner
- **Shop Page** — Full catalog with live search + category filters
- **Product Detail** — Color picker, quantity selector, reviews, stock info
- **Cart Sidebar** — Slide-in basket with qty controls, free shipping threshold
- **Checkout** — Full shipping + payment form with order summary
- **Order Success** — Confirmation page with generated order number

### Admin Panel (click ⚙️ Admin in the nav)
- **Dashboard Stats** — Revenue, orders, products, pending count
- **Orders Table** — View all orders, update status (Pending / Shipped / Delivered)
- **Products Table** — View and delete products
- **Add Product Form** — Add new items with full details

---

## 💾 Data Persistence

All data is saved in the browser's `localStorage`:
- Products
- Orders
- Cart contents

Data persists between sessions automatically.

---

## 🎨 Design

- **Fonts:** Playfair Display (serif headings) + DM Sans (body)
- **Palette:** Terracotta · Sage · Blush · Cream · Warm Brown
- **Aesthetic:** Artisan / Bohemian / Warm & Organic

---

## 🛠️ Customisation

To add your own products, use the **Admin → Add Product** panel inside the app, or edit the `DB.products` array directly in the `<script>` section of `index.html`.

---

## 📄 License

Free to use and modify for personal or commercial projects.
