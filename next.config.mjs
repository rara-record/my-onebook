import withPlaiceholder from '@plaiceholder/next';

/** @type {import('next').NextConfig} */

const nextConfig = {
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  // "images.domains" 설정이 더 이상 권장되지 않습니다.
  // 대신 "images.remotePatterns" 설정을 사용
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'shopping-phinf.pstatic.net',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default withPlaiceholder(nextConfig);
