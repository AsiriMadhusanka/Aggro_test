// /** @type {import('next').NextConfig} */
// const nextConfig = {}

// module.exports = nextConfig


// next.config.js
const withTM = require('next-transpile-modules')(['@mui/x-charts']);

/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = withTM(nextConfig)

