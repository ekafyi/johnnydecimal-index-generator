module.exports = {
  globDirectory: "build/",
  globPatterns: ["**/*.{png,js,css,ico,html}"],
  ignoreURLParametersMatching: [/^utm_/, /^fbclid$/],
  swDest: "build/sw.js",
  runtimeCaching: [
    {
      urlPattern: /^https:\/\/fonts\.googleapis\.com/,
      handler: "StaleWhileRevalidate",
      options: {
        cacheName: "google-fonts-stylesheets",
      },
    },
    {
      urlPattern: /^https:\/\/fonts\.gstatic\.com/,
      handler: "CacheFirst",
      options: {
        cacheName: "google-fonts-webfonts",
        expiration: {
          maxAgeSeconds: 60 * 60 * 24 * 365, // cache fonts for 365 days
          maxEntries: 30,
        },
      },
    },
  ],
};
