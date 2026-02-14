/**
 * TAILWIND CSS CONFIGURATION
 * Shared configuration for all pages
 */

tailwind.config = {
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                "primary": "#2563eb", // Royal Blue
                "accent-cyan": "#0891b2", // Darker Cyan for light mode
                "accent-purple": "#9333ea", // Darker Purple
                "accent-gold": "#d97706", // Darker Gold
                "background-light": "#ffffff",
                "background-dark": "#ffffff",
                "surface-light": "#f8fafc",
                "text-main": "#0f172a", // Slate 900
                "text-muted": "#64748b", // Slate 500
                "text-on-image": "#ffffff",
            },
            fontFamily: {
                "display": ["Space Grotesk", "sans-serif"],
                "serif": ["Playfair Display", "serif"]
            },
            borderRadius: {
                "DEFAULT": "0.25rem",
                "lg": "0.5rem",
                "xl": "0.75rem",
                "full": "9999px"
            },
            animation: {
                'float': 'float 8s ease-in-out infinite',
                'float-delayed': 'float 8s ease-in-out infinite 4s',
                'pulse-glow': 'pulse-glow 4s ease-in-out infinite',
                'marquee': 'marquee 30s linear infinite',
                'slow-pan': 'slow-pan 60s linear infinite alternate'
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
                'pulse-glow': {
                    '0%, 100%': { opacity: 0.6, transform: 'scale(1)' },
                    '50%': { opacity: 1, transform: 'scale(1.05)' },
                },
                marquee: {
                    '0%': { transform: 'translateX(0)' },
                    '100%': { transform: 'translateX(-50%)' },
                },
                'slow-pan': {
                    '0%': { transform: 'translate(-60%, -50%) scale(1.25)' },
                    '100%': { transform: 'translate(-40%, -50%) scale(1.25)' },
                }
            }
        },
    },
}
