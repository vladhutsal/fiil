module.exports = {
  lintOnSave: false,
  configureWebpack: {
    devServer: {
      host: 'localhost',
      watchOptions: {
        poll: true
      }
    }
  }
};
