const path = require("path");

module.exports = {
  reactStrictMode: true,
  experimental: {
    appDir: true, // Ensure Next.js loads app dir properly
  },
  output: "standalone", // Ensure Next.js uses shared dependencies
  webpack: (config) => {
    config.resolve.modules.push(path.resolve(__dirname, "../node_modules"));
    return config;
  },
};
