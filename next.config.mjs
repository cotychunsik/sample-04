/** @type {import('next').NextConfig} */
const nextConfig = {
  // 동적 렌더링 강제 (모든 페이지)
  experimental: {
    runtime: 'experimental-edge',  // Edge Runtime 사용 (필요시)
  },
  reactStrictMode: true, // React의 엄격 모드
  swcMinify: true, // 성능 최적화를 위한 Minify 옵션
};

export default nextConfig;
