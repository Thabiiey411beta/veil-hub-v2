module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // Remove any 'swcMinify: true/false' line entirely (it's default and removed in Next 16)
  // Your other config if any...
};
