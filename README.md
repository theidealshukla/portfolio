# Portfolio Website

A modern, minimalist portfolio website showcasing web development, UI/UX design, and photography work.

## 📁 Project Structure

```
portfolio/
├── index.html          # Homepage with hero section
├── about.html          # About page
├── contact.html        # Contact page with form
├── gallery.html        # Photo gallery
├── project.html        # Projects showcase
├── services.html       # Services offered
│
├── assets/             # Static assets
│   └── images/
│       └── hero.png    # Hero background image
│
├── css/               # Stylesheets
│   ├── index.css      # Homepage specific styles
│   ├── project.css    # Project page styles
│   └── (other page-specific CSS files)
│
├── js/                # JavaScript files
│   ├── tailwind.config.js           # Tailwind config for homepage
│   ├── tailwind-minimalist.config.js # Tailwind config for other pages
│   └── contact.js                    # Contact form handler
│
└── .gitignore         # Git ignore rules
```

## 🎨 Design System

### Color Palette

**Homepage (index.html):**
- Primary: `#2563eb` (Royal Blue)
- Accent Cyan: `#0891b2`
- Accent Purple: `#9333ea`
- Accent Gold: `#d97706`

**Other Pages (Minimalist Theme):**
- Primary: `#000000` (Black)
- Background: `#ffffff` (White)
- Input Background: `#f3f4f6` (Light Gray)

### Typography
- **Display Font**: Space Grotesk
- **Serif Font**: Playfair Display (Homepage)
- **Body Font**: Inter

### Key Features
- **Glass Morphism Effects**: Used throughout for modern UI
- **Smooth Animations**: Custom keyframes for floating, pulsing, and panning
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Form Integration**: Web3Forms for contact form submissions

## 🚀 Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Custom styles with modern features
- **Tailwind CSS**: Utility-first CSS framework (CDN)
- **JavaScript (Vanilla)**: Form handling and interactions
- **Web3Forms**: Contact form backend
- **Google Fonts**: Typography
- **Material Symbols**: Icons

## 📝 Pages Overview

### 1. Homepage (`index.html`)
- Full-page hero with background image
- Animated text effects
- Dark theme with colorful accents
- Call-to-action button

### 2. About (`about.html`)
- Personal introduction
- Skills and toolkit showcase
- Journey timeline
- Minimalist black & white design

### 3. Contact (`contact.html`)
- Contact form with validation
- Web3Forms integration
- AJAX submission with success message
- Social media links

### 4. Gallery (`gallery.html`)
- Bento grid layout for images
- Hover effects
- Image categorization

### 5. Projects (`project.html`)
- Project showcase with bento grid
- Filter system for categories
- Project cards with hover effects
- Call-to-action footer

### 6. Services (`services.html`)
- Service offerings grid
- Animated service cards
- Pricing information
- Professional presentation

## 🔧 Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/theidealshukla/portfolio.git
   cd portfolio
   ```

2. **Open in browser**
   - Simply open `index.html` in your web browser
   - Or use a local server:
     ```bash
     # Using Python
     python -m http.server 8000
     
     # Using Node.js http-server
     npx http-server
     ```

3. **Configure Contact Form**
   - Replace the Web3Forms access key in `js/contact.js`
   - Get your free key from [web3forms.com](https://web3forms.com/)

## 📦 Deployment

The website is deployed on GitHub Pages and can be accessed at:
**https://theidealshukla.github.io/portfolio/**

### Deploy to GitHub Pages:
1. Push your code to GitHub
2. Go to repository Settings
3. Navigate to Pages section
4. Select `main` branch and `/root` folder
5. Save and wait for deployment

## 🎯 Key Features

1. **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
2. **Modern UI**: Glass morphism, smooth animations, and clean aesthetics
3. **Performance Optimized**: Minimal external dependencies
4. **SEO Friendly**: Semantic HTML and  proper meta tags
5. **Accessibility**: ARIA labels and keyboard navigation support

## 📧 Contact Form Setup

The contact form uses Web3Forms for handling submissions:

1. Sign up at [web3forms.com](https://web3forms.com/)
2.  Get your access key
3. Update in `contact.html`:
   ```html
   <input type="hidden" name="access_key" value="YOUR_ACCESS_KEY_HERE">
   ```

## 🖼️ Adding Images

Place your images in the `assets/images/` directory and reference them in HTML:

```html
<img src="assets/images/your-image.jpg" alt="Description">
```

## 🔄 Customization

### Changing Colors
Edit the Tailwind configuration files:
- `js/tailwind.config.js` (Homepage)
- `js/tailwind-minimalist.config.js` (Other pages)

### Modifying Styles
Page-specific styles are in the `css/` directory:
- `css/index.css` - Homepage
- `css/project.css` - Projects page
- (Add more as needed)

### Updating Content
- Edit HTML files directly
- Update JavaScript files in `js/` for functionality changes

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Adarsh Shukla**
- GitHub: [@theidealshukla](https://github.com/theidealshukla)
- LinkedIn: [theidealshukla](https://linkedin.com/in/theidealshukla)
- Instagram: [@thenonidealist](https://instagram.com/thenonidealist)
- Email: adarshshuklawork@gmail.com

---

Built with ❤️ using HTML, CSS, and JavaScript
