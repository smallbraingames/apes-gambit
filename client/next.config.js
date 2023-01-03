/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true,
  },
};

const withTM = require("next-transpile-modules")([
  "@latticexyz/network",
  "@latticexyz/recs",
  "@latticexyz/services",
  "@latticexyz/solecs",
  "@latticexyz/std-client",
  "@latticexyz/utils",
]); // pass the modules you would like to see transpiled
module.exports = withTM(nextConfig);
