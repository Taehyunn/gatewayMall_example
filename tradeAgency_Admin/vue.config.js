module.exports = {
  configureWebpack: {
    devtool: "source-map",
  },
  devServer: {
    overlay: false,
    proxy: process.env.VUE_APP_IMAGE_SERVER_DOMAIN,
    /*proxy: {
      '/api/v1': {
        target: process.env.VUE_APP_API_BASE_URL,
        changeOrigin: true
      },
      '/2win/api': {
        target: 'http://dev.2winchance.com',
        changeOrigin: true,
        pathRewrite: {
          '^/2win': ''
        }
      },
    }*/
  },
  transpileDependencies: ["vuetify"],
};
