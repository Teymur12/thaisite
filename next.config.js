/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // Statik export üçün VACIB
  images: {
    unoptimized: true,  // GitHub Pages image optimization dəstəkləmir
  },
  basePath: '',  // Custom domain üçün boş
  trailingSlash: true,  // URL-lərdə slash əlavə edir
};

module.exports = nextConfig;
