// const withImages = require('next-images')
// module.exports = withImages()

// module.exports = {
//   reactStrictMode: true,
//   images: {
//     domains: ['localhost'],
//   }
// }

const withPlugins = require('next-compose-plugins')
const withImages = require('next-images')
const withVideos = require('next-videos')

const nextConfig = {
  images: {
    domains: ['localhost']
  }
}

module.exports = withPlugins([[withImages, withVideos]], nextConfig)
