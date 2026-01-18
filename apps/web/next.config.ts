import type { NextConfig } from "next";

// Build mode: 'static' for GitHub Pages, 'standalone' for Docker
const buildMode = process.env.BUILD_MODE || 'static';
const isStatic = buildMode === 'static';
const isProd = process.env.NODE_ENV === 'production';

// GitHub Pages 배포시 리포지토리 이름 사용
const basePath = isStatic && isProd ? '/job_pluse' : '';

const nextConfig: NextConfig = {
  // static: GitHub Pages 정적 배포
  // standalone: Docker 컨테이너 배포
  output: isStatic ? 'export' : 'standalone',

  // GitHub Pages는 /<repo-name>/ 경로 사용
  basePath: basePath,
  assetPrefix: basePath,

  // 정적 이미지 최적화 비활성화 (GitHub Pages에서 필요)
  images: {
    unoptimized: isStatic,
  },

  // 트레일링 슬래시 추가 (GitHub Pages 호환성)
  trailingSlash: isStatic,
};

export default nextConfig;
