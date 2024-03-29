module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          root: ["./"],
          alias: {
            "@components": "./src/components",
            "@screens": "./src/screens",
            "@utils": "./src/utils",
            "@services": "./src/services",
            "@hooks": "./src/hooks",
            "@navigation": "./src/navigation",
            "@assets": "./assets",
          },
        },
      ],
      "react-native-reanimated/plugin",
    ],
  };
};
