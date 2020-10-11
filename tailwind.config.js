module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true
  },
  purge: [
    './src/**/*.vue',
    './src/**/*.ejs'
  ],
  theme: {
    extend: {}
  },
  variants: {
    visibility: ['group-hover']
  },
  plugins: []
}
