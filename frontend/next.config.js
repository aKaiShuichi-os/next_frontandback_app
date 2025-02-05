const path = require('path');

module.exports = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
  output: "standalone",
  webpack: (config) => {
    config.resolve.modules.push(path.resolve(__dirname, "../node_modules"));
    return config;
  },
};
