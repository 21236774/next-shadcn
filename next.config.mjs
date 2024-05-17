/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    // 添加自定义重写规则解决跨域问题
    return [
      {
        source: '/apis/:path*',
        destination: process.env.NEXT_PUBLIC_API_URL + '/:path*',
      },
    ];
  },
  serverRuntimeConfig: {
    port: 2999
  }
};

export default nextConfig;
