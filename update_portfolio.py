import re

with open("e:/codings/WEB DEVP. BOOTCAMP/portfolio/project.html", "r", encoding="utf-8") as f:
    html = f.read()

# Replace filters
html = re.sub(
    r'<div class="filter-buttons">.*?</div>',
    """<div class="filter-buttons">
            <button class="filter-btn active" data-filter="all">
                All<span class="filter-count">16</span>
            </button>
            <button class="filter-btn" data-filter="Client Work">
                Client Work<span class="filter-count">13</span>
            </button>
            <button class="filter-btn" data-filter="SaaS">
                SaaS & Products<span class="filter-count">1</span>
            </button>
            <button class="filter-btn" data-filter="Experimental">
                Experimental<span class="filter-count">1</span>
            </button>
            <button class="filter-btn" data-filter="Academic">
                Academic<span class="filter-count">1</span>
            </button>
        </div>""",
    html,
    flags=re.DOTALL
)

projects = [
    {
        "href": "https://outpulse-ai.netlify.app/",
        "category": "SaaS",
        "tag": "✦ Featured / SaaS",
        "img": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=2000",
        "title": "Outpulse AI",
        "desc": "A powerful SaaS application leveraging AI for automated lead generation and smart email outreach campaigns.",
        "tags": ["SaaS", "AI", "Dashboard"],
        "num": "01 &mdash; SAAS & PRODUCTS",
        "classes": "project-card featured"
    },
    {
        "href": "https://luminasolar.netlify.app/",
        "category": "Client Work",
        "tag": "Client Work",
        "img": "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=80&w=2000",
        "title": "Lumina Solar",
        "desc": "Modern and clean digital presence for a sustainable solar energy company to drive lead acquisition.",
        "tags": ["Solar", "Business", "Landing Page"],
        "num": "02 &mdash; CLIENT WORK",
        "classes": "project-card"
    },
    {
        "href": "https://scatech.netlify.app/",
        "category": "Client Work",
        "tag": "Client Work",
        "img": "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&q=80&w=2000",
        "title": "ScaTech Solar",
        "desc": "Corporate website for ScaTech, showcasing commercial and residential solar solutions with a technical edge.",
        "tags": ["Energy", "Corporate", "B2B"],
        "num": "03 &mdash; CLIENT WORK",
        "classes": "project-card"
    },
    {
        "href": "https://ink-and-artistry.netlify.app/",
        "category": "Client Work",
        "tag": "Client Work",
        "img": "https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?auto=format&fit=crop&q=80&w=2000",
        "title": "Ink & Artistry",
        "desc": "A bold, dark-themed website for a premium tattoo studio, featuring artist portfolios and booking integration.",
        "tags": ["Tattoo", "Portfolio", "Dark Mode"],
        "num": "04 &mdash; CLIENT WORK",
        "classes": "project-card dark-card"
    },
    {
        "href": "https://theidealshukla.github.io/pachamama/index.html",
        "category": "Client Work",
        "tag": "Client Work",
        "img": "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&q=80&w=2000",
        "title": "Pachamama",
        "desc": "Minimalist and fresh restaurant website for Pachamama Bhopal, a pure vegetarian destination focusing on nature.",
        "tags": ["UI Design", "HTML/CSS", "Restaurant"],
        "num": "05 &mdash; CLIENT WORK",
        "classes": "project-card"
    },
    {
        "href": "https://lux-estates.netlify.app/",
        "category": "Client Work",
        "tag": "Client Work",
        "img": "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=1000",
        "title": "Luxestates",
        "desc": "Premium real estate website for brokers. Clean, sophisticated design showcasing luxury properties.",
        "tags": ["Real Estate", "Netlify"],
        "num": "06 &mdash; CLIENT WORK",
        "classes": "project-card wide"
    },
    {
        "href": "https://modularkitchnes.netlify.app/#portfolio",
        "category": "Client Work",
        "tag": "Client Work",
        "img": "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=1000",
        "title": "Modular Kitchen",
        "desc": "Sleek portfolio showcasing premium custom modular kitchen designs with elegant interiors.",
        "tags": ["Interior", "Portfolio"],
        "num": "07 &mdash; CLIENT WORK",
        "classes": "project-card"
    },
    {
        "href": "https://chaturebhature.netlify.app/",
        "category": "Client Work",
        "tag": "Client Work",
        "img": "https://images.unsplash.com/photo-1626500155537-883a9965d1d6?auto=format&fit=crop&q=80&w=2000",
        "title": "Chature Bhature",
        "desc": "Digital presence for a Punjabi Chole Bhature restaurant. Inviting and minimal design that captures the warmth of the brand.",
        "tags": ["Branding", "Netlify", "Food"],
        "num": "08 &mdash; CLIENT WORK",
        "classes": "project-card"
    },
    {
        "href": "https://fitfusiongym.netlify.app/",
        "category": "Client Work",
        "tag": "Client Work",
        "img": "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=2000",
        "title": "FitFusion Gym",
        "desc": "A dynamic and high-energy website for fitness enthusiasts, featuring engaging layouts and bold aesthetics.",
        "tags": ["React", "Animations", "Fitness"],
        "num": "09 &mdash; CLIENT WORK",
        "classes": "project-card"
    },
    {
        "href": "https://theidealshukla.github.io/freshmart/",
        "category": "Client Work",
        "tag": "Client Work",
        "img": "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1000",
        "title": "Freshmart",
        "desc": "Modern, vibrant grocery store interface designed for freshness and ease of use with intuitive navigation.",
        "tags": ["E-Commerce", "UI/UX"],
        "num": "10 &mdash; CLIENT WORK",
        "classes": "project-card"
    },
    {
        "href": "https://theidealshukla.github.io/DANTKRITI-Orofacial-Aesthetic-Centre-/",
        "category": "Client Work",
        "tag": "Client Work",
        "img": "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&q=80&w=2000",
        "title": "Dantkriti",
        "desc": "Orofacial Aesthetic Centre reflecting a clean, professional environment with an emphasis on trust and care.",
        "tags": ["Healthcare", "Dental", "Professional"],
        "num": "11 &mdash; CLIENT WORK",
        "classes": "project-card wide"
    },
    {
        "href": "https://medicare-online.netlify.app/",
        "category": "Client Work",
        "tag": "Client Work",
        "img": "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1000",
        "title": "Medicare",
        "desc": "Healthcare hospital website with clean UX focusing on patient accessibility and information clarity.",
        "tags": ["Healthcare", "Netlify"],
        "num": "12 &mdash; CLIENT WORK",
        "classes": "project-card"
    },
    {
        "href": "https://dermaclinic-in.netlify.app/#/",
        "category": "Client Work",
        "tag": "Client Work",
        "img": "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=1000",
        "title": "LuminaDerm",
        "desc": "Dermatology clinic website with a soothing, premium aesthetic focusing on skin care excellence.",
        "tags": ["Dermatology", "React"],
        "num": "13 &mdash; CLIENT WORK",
        "classes": "project-card"
    },
    {
        "href": "https://theidealshukla.github.io/dakshin-aura/",
        "category": "Client Work",
        "tag": "Client Work",
        "img": "https://images.unsplash.com/photo-1630383249896-424e482df921?auto=format&fit=crop&q=80&w=1000",
        "title": "Dakshin Aura",
        "desc": "South Indian restaurant branding with warm, culturally rich design celebrating authentic flavors.",
        "tags": ["Restaurant", "Branding"],
        "num": "14 &mdash; CLIENT WORK",
        "classes": "project-card"
    },
    {
        "href": "https://theidealshukla.github.io/3d-render-thar/",
        "category": "Experimental",
        "tag": "✦ Experimental / 3D",
        "img": "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=2000",
        "title": "Thar 3D Render",
        "desc": "Immersive 3D landing page showcasing automotive rendering and cinematic web animation with WebGL.",
        "tags": ["Three.js", "WebGL", "3D"],
        "num": "15 &mdash; EXPERIMENTAL",
        "classes": "project-card wide dark-card"
    },
    {
        "href": "https://github.com/gsd-build/get-shit-done",
        "category": "Academic",
        "tag": "✦ Academic",
        "img": "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1000",
        "title": "GSD System",
        "desc": "A spec-driven development workflow system for AI-assisted coding. Meta-prompting and context engineering.",
        "tags": ["Node.js", "CLI", "DevTools"],
        "num": "16 &mdash; ACADEMIC",
        "classes": "project-card dark-card"
    }
]

grid_html = '<section class="projects-grid" id="projectsGrid">\n\n'
for p in projects:
    tags_html = "".join([f'                        <span class="card-tag">{t}</span>\n' for t in p['tags']])
    grid_html += f"""        <!-- ─── {p['title']} ─── -->
        <a href="{p['href']}" target="_blank" rel="noopener noreferrer"
            class="{p['classes']}" data-category="{p['category']}" data-tilt>
            <div class="card-inner">
                <div class="card-visual">
                    <span class="card-badge">{p['tag']}</span>
                    <img src="{p['img']}"
                        alt="{p['title']}" loading="lazy" />
                    <div class="card-arrow">
                        <span class="material-icons">arrow_outward</span>
                    </div>
                </div>
                <div class="card-content">
                    <div class="card-number">{p['num']}</div>
                    <h3 class="card-title">{p['title']}</h3>
                    <p class="card-description">{p['desc']}</p>
                    <div class="card-tags">
{tags_html}                    </div>
                </div>
            </div>
        </a>\n\n"""
grid_html += '    </section>'

# Replace grid
html = re.sub(
    r'<section class="projects-grid" id="projectsGrid">.*?</section>',
    grid_html,
    html,
    flags=re.DOTALL
)

html = re.sub(
    r'<div class="hero-counter parallax-text" id="heroCounter">12</div>',
    '<div class="hero-counter parallax-text" id="heroCounter">16</div>',
    html,
    flags=re.DOTALL
)

with open("e:/codings/WEB DEVP. BOOTCAMP/portfolio/project.html", "w", encoding="utf-8") as f:
    f.write(html)
print("Updated project.html")
