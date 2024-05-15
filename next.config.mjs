/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify:true,
  optimizeFonts:true,
  images:{
    remotePatterns:[
      {
        protocol:"https",
        hostname:"pub-286a1a3ce1784237a33c76a3f5cf95d3.r2.dev"
      },
    ],
    minimumCacheTTL:1500000,
  }
};

export default nextConfig;
