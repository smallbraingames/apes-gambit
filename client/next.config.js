/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  typescript: {
    ignoreBuildErrors: true,
  },
  transpilePackages: ["@latticexyz/network"],
};

const withTM = require("next-transpile-modules")([
  "@latticexyz/network",
  "@latticexyz/recs",
  "@latticexyz/services",
  "@latticexyz/solecs",
  "@latticexyz/std-client",
  "@latticexyz/utils",
  "@latticexyz/phaserx",
  "@latticexyz/react",
]); // pass the modules you would like to see transpiled
module.exports = withTM(nextConfig);
