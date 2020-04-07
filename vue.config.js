module.exports = {
    configureWebpack: {
      module: {
        rules: [
          {
            test: /.html$/,
            loader: "vue-template-loader",
            exclude: /index.html/
          },
          {
            test: /\.(png|jpe?g|gif|jp2|webp)$/,
            loader: 'file-loader',
            options: {
              name: 'images/[name].[ext]'
            }
          }
        ]
      }
    }
  }