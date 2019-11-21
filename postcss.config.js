module.exports = {
  plugins: {
    autoprefixer: {},
    'postcss-import': {},
    'postcss-preset-env': {},
    cssnano: {
      'cssnano-preset-advanced': {
        zindex: false,
        autoprefixer: false
      }
    }
  }
}