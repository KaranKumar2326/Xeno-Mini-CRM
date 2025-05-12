import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // images all allow
  images: {
    domains: ["images.unsplash.com", "cdn.pixabay.com", "source.unsplash.com","encrypted-tbn0.gstatic.com/"],
  },

};

export default nextConfig;
