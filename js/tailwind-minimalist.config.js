/**
 * TAILWIND CSS CONFIGURATION - MINIMALIST THEME
 * Shared configuration for minimalist pages (about, contact, gallery, project, services)
 */

tailwind.config = {
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                "primary": "#000000",
                "accent-blue": "#000000",
                "background-light": "#ffffff",
                "background-dark": "#000000",
                "input-bg": "#f3f4f6",
            },
            fontFamily: {
                "display": ["Inter", "sans-serif"],
                "heading": [" Space Grotesk", "sans-serif"]
            },
            borderRadius: {
                "DEFAULT": "0.5rem",
                "lg": "1rem",
                "xl": "1.5rem",
                "2xl": "2rem",
                "full": "9999px"
            },
        },
    },
}
