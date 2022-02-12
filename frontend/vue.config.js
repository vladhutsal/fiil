module.exports = {
  lintOnSave: false,
  configureWebpack: {
    devServer: {
      watchOptions: {
        poll: true
      }
    }
  }
};
