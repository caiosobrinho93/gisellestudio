/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/gisellestudio',
  images: {
    unoptimized: true,
  },
  trailingSlash: false,
}

module.exports = nextConfig