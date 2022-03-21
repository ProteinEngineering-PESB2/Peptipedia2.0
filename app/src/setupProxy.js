const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://190.114.255.125:8001",
      changeOrigin: true,
    })
  );

  app.use(
    "/files",
    createProxyMiddleware({
      target: "http://190.114.255.125:8001",
      changeOrigin: true,
    })
  );
};
