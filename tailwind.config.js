module.exports = {
  purge: ['./client/**/*.html', './client/**/*.jsx', './client/**/*.js'],
  theme: {
    extend: {}
  },
  variants: {
    fill: ['hover', 'focus'] // this line does the trick
  },
  plugins: []
}
