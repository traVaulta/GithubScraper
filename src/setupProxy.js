const {createProxyMiddleware} = require('http-proxy-middleware');

module.exports = function (app) {
    var options = {
        target: 'https://api.github.com',
        changeOrigin: true
    };

    app.use(createProxyMiddleware('/graphql', options));
};
