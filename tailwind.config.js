module.exports = {
  darkMode: false, // or 'media' or 'class'
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors:{
        primary:'#023E8D',
        secondary:'#0FCBFA',
        naples:'#F9DC5C'
      },
      
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
      require('tailwindcss-tables')
  ],
}
