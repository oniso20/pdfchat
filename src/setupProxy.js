const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'https://api.zaddy.dev',
            changeOrigin: true,
            pathRewrite: {
                '^/api': ''
            }
        })
    );
};
