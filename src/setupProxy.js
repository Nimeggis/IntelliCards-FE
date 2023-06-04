const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://localhost:8080",
      changeOrigin: true,
      pathRewrite: {
        "^/api": "", // remove the '/api' prefix
      },
      proxyTimeout: 1000 * 60 * 10,
      timeout: 1000 * 60 * 10,
    })
  );
};
