/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/gisellestudio',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
}

module.exports = nextConfig