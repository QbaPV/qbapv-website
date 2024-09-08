/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Incluye todas las rutas donde Tailwind aplicará estilos
	"./src/components/LanguageSelector.js",
	"./src/components/Navbar.js",
	"./src/pages/About.js",
	"./src/pages/Home.js",
	"./src/pages/Contact.js",
	"./src/pages/Projects.js",
	"./src/pages/Blog.js",
	"./src/pages/Register.js",
	"./src/App.js",
	"./src/i18n.js",
	"./src/index.js",
  ],
  theme: {
    extend: {
        colors: {
            primary: '#1E90FF', // Un azul vibrante
            secondary: '#FF6347', // Un rojo suave
            accent: '#2ECC71', // Verde para botones o acentos
        },
    },
  },
  plugins: [],
};
