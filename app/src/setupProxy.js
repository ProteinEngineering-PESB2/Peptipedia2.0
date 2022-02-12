const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: "http://170.239.85.191:8001",
            changeOrigin: true
        })
    );

    app.use(
        '/files',
        createProxyMiddleware({
            target: "http://170.239.85.191:8001",
            changeOrigin: true
        })
    );
};