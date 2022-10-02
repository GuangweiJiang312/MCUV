module.exports = {
  plugins: {
    autoprefixer: {},
    "postcss-px-to-viewport":{
      viewportWidth:1396,
      viewportHeight:686,
      unitPrecision:5,
      viewportUnit:'vw',
      minPixelValue:1,
      mediaQuery:false
    }
  }
}
