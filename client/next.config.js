/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
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
  ".pnpm/@gitpkg.now.sh+latticexyz+mud+packages@phaserx+9d6ed0115d977a1a9678c23d42c4daaf3a9b8947_ez5tm4wyxcjgo6mqfspj7thuca/node_modules/@latticexyz/phaserx",
]); // pass the modules you would like to see transpiled
module.exports = withTM(nextConfig);
