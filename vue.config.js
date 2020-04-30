module.exports = {
  pwa: {
    themeColor: '#ff0000',
    msTileColor: '#ff0000',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
  },
  configureWebpack: {
    module: {
      rules: [
        {
          test: /.html$/,
          loader: "vue-template-loader",
          exclude: /index.html/
        }
      ]
    }
  }
}
