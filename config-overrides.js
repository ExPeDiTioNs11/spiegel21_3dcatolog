module.exports = function override(config, env) {
    if (env === "production") {
      const sourceMapLoader = config.module.rules.find((rule) =>
        rule.enforce === "pre" && rule.use && rule.use.some((loader) => loader === "source-map-loader")
      );
  
      if (sourceMapLoader) {
        sourceMapLoader.exclude = /@mediapipe/;
      }
    }
  
    return config;
  };
  