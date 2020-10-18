module.exports = {
  chainWebpack: (config) => {
    config
      .plugin('html')
      .tap((args) => {
        args[0].title = 'Air-Heritage Websocket';
        return args;
      });
  },
  transpileDependencies: ["vuetify"],
 
};
