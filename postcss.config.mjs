const config = {
  plugins: ["@tailwindcss/postcss"],
  tailwindcss: {
    config: "./tailwind.config.js",
  },
  autoprefixer: {},
  "postcss-nested": {},
  "postcss-custom-properties": {
    importFrom: "./src/styles/variables.css",
  },
  "postcss-custom-media": {
    importFrom: "./src/styles/media-queries.css",
  },
  "postcss-color-function": {},
  "postcss-preset-env": {
    stage: 1,
    features: {
      "custom-properties": true,
      "nesting-rules": true,
      "color-mod-function": true,
      "custom-media-queries": true,
    },
  },
  "postcss-import": {},
  "postcss-url": {
    url: "inline",
  },
  "postcss-hexrgba": {},
  "postcss-extend": {},
  "postcss-extend-rule": {},
  "postcss-advanced-variables": {
    variables: {
      "--primary-color": "#3490dc",
      "--secondary-color": "#ffed4a",
      "--danger-color": "#e3342f",
    },
  },
  "postcss-advanced-nesting": {},
  "postcss-advanced-extend": {},
  "postcss-advanced-media": {},
};

export default config;
