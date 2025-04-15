
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const PORT = process.env.PORT || 3000;

// Proxy only the /login path
app.use('/login', createProxyMiddleware({
    target: 'https://old.stpaulcopticservice.org',
    changeOrigin: true,
    pathRewrite: {
        '^/login': '/login',
    },
    onProxyReq: (proxyReq, req, res) => {
        proxyReq.setHeader('origin', 'https://old.stpaulcopticservice.org');
    }
}));

// Optional: Home route
app.get('/', (req, res) => {
    res.send('Reverse Proxy is live. Go to /login');
});

app.listen(PORT, () => {
    console.log(`Proxy server running on port ${PORT}`);
});
