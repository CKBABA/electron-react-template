const { WebpackPlugin } = require("@electron-forge/plugin-webpack");
const path = require("path");

const mainConfig = require("./webpack.main.config.js");
const rendererConfig = require("./webpack.renderer.config.js");
const rendererBaseUrl = "./src/renderer";
const preoloadBaseUrl = "./src/preload";

module.exports = {
  make_targets: {
    win32: ["squirrel"],
    darwin: ["zip"],
    linux: ["deb", "rpm"],
  },
  electronPackagerConfig: {
    packageManager: "npm",
  },
  electronWinstallerConfig: {
    name: "electron_app",
  },
  electronInstallerDebian: {},
  electronInstallerRedhat: {},
  github_repository: {
    owner: "",
    name: "",
  },
  windowsStoreConfig: {
    packageName: "",
    name: "electronapp",
  },
  plugins: [
    new WebpackPlugin({
      mainConfig,
      devContentSecurityPolicy: `default-src * 'unsafe-eval' 'unsafe-inline'; img-src data: 'self'`,
      renderer: {
        config: rendererConfig,
        nodeIntegration: true,
        entryPoints: [
          {
            html: path.join(__dirname, `${rendererBaseUrl}/public/index.html`),
            js: path.join(__dirname, `${rendererBaseUrl}/index.tsx`),
            name: "main_window",
            preload: {
              js: path.join(__dirname, `${preoloadBaseUrl}/preload.ts`),
            },
          },
        ],
      },
      devServer: {
        stats: "verbose",
      },
    }),
  ],
};
