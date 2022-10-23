const isProd = process.env.NODE_ENV === "production";

module.exports = {
  images: {
    domains: ["wikioss.xhemj.work"],
  },
  assetPrefix: isProd ? "https://wikidev.xhemj.work" : undefined,
  webpack: function (config) {
    config.externals = config.externals || {};
    config.externals["styletron-server"] = "styletron-server";
    return config;
  },
};
