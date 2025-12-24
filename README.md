# 🚀 Next.js 16 Starter Template

A modern **Next.js 16 starter template** built with a **shadcn-style theme system**, supporting **Dark & Light modes**, reusable **Header & Footer**, and essential website sections like **About Us** and **Contact Us** — all designed for rapid development and clean scalability.

This template is ideal for developers who want a solid foundation with a professional UI and minimal setup.

---

## ✨ What’s Included

- ⚡ **Next.js 16 (App Router)**
- 🎨 **Custom shadcn-style theme system**
- 🌗 **Dark & Light mode support**
- 🧩 **Single `global.css` file for all theme configuration**
- 🧭 **Reusable Header & Footer**
- 📄 About Us & Contact Us sections
- 🎯 CSS variables for consistent theming
- ✨ Smooth theme transition animations
- 📱 Fully responsive layout
- 🛠 Easy to extend and customize

---

## 🎨 Theme System (Single global.css)

This project uses a **shadcn-inspired design system** implemented entirely inside **one `global.css` file**.

### Light Theme
- Light blue based color palette
- Clean white background
- Soft borders and accents
- High readability

### Dark Theme
- Black + blue mixed palette
- Modern dark UI
- Smooth contrast and muted highlights

Theme switching is handled using the `.dark` class on the root element, allowing instant mode switching without reloads.

### Example usage

```tsx
<div className="bg-background text-foreground">
  <button className="bg-primary text-primary-foreground">
    Button
  </button>
</div>
