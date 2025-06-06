/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
        },
        gray: {
          50: "#f9fafb",
          100: "#f3f4f6",
          200: "#e5e7eb",
          300: "#d1d5db",
          400: "#9ca3af",
          500: "#6b7280",
          600: "#4b5563",
          700: "#374151",
          800: "#1f2937",
          900: "#111827",
        },
        // 👇 Adicione isso
        background: "#f3f4f6", // ou gray.100
        foreground: "#111827", // ou gray.900
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.3s ease-out",
        "float-crazy-slow": "floatCrazy 10s ease-in-out infinite",
        "float-crazy-mid": "floatCrazy 7s ease-in-out infinite",
        "float-crazy-fast": "floatCrazy 5s ease-in-out infinite",
        "zoom-in": "zoomIn 0.3s ease-in-out forwards",
        "fade-slide-up": "fadeSlideUp 1.9s ease-in-out",
        "fade-slide-left": "fadeSlideLeft 1.9s ease-in-out",
      },
      keyframes: {
        fadeSlideUp: {
          "0%": { opacity: 0, transform: "translateY(30px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        fadeSlideLeft: {
          "0%": { opacity: 0, transform: "translateX(30px)" },
          "100%": { opacity: 1, transform: "translateX(0)" },
        },
        floatCrazy: {
          "0%": { transform: "translate(0, 0) rotate(0deg)" },
          "25%": { transform: "translate(10px, -10px) rotate(5deg)" },
          "50%": { transform: "translate(-10px, 10px) rotate(-5deg)" },
          "75%": { transform: "translate(5px, -5px) rotate(3deg)" },
          "100%": { transform: "translate(0, 0) rotate(0deg)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        zoomIn: {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(1.03)" },
        },
      },
      transitionProperty: {
        zoom: "transform",
      },
    },
  },
  plugins: [],
};
