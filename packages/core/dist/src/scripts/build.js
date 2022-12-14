"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ts_node_ignore_1 = __importDefault(require("./utils/ts-node-ignore"));
const tsNode = __importStar(require("ts-node"));
/**
 * This file gets transpiled to JS anyway, but if the users's
 * frontity.settings.(js|ts) is an ES Module, we cannot require an ES Module
 * from a commonjs module.
 *
 * This is why we use ts-node here as well as in the `dev` script.
 * It's only because we want the user to be able to use ES Modules syntax in
 * the frontity.settings.(js|ts) file like this.
 *
 * @example
 * ```js
 * export default {
 *   name: 'my-theme',
 *   state: {},
 *   packages: {},
 * }
 * ```
 */
tsNode.register({
    transpileOnly: true,
    ignore: ts_node_ignore_1.default,
    compilerOptions: {
        // Target latest version of ECMAScript.
        target: "es2017",
        // Search under node_modules for non-relative imports.
        moduleResolution: "node",
        // commonjs modules.
        module: "commonjs",
        // Allow default imports from modules with no default export.
        allowSyntheticDefaultImports: true,
        // Don't emit; allow Babel to transform files.
        noEmit: true,
        // Import non-ES modules as default imports.
        esModuleInterop: true,
        // Resolve JSON files.
        resolveJsonModule: true,
        // Support for JSX runtime.
        jsx: "react-jsx",
        // Support for emotion css prop with types
        jsxImportSource: "@emotion/react",
        // Transpile JS as well.
        allowJs: true,
    },
});
require("./utils/envs");
const path_1 = require("path");
const fs_extra_1 = require("fs-extra");
const file_settings_1 = require("@frontity/file-settings");
const entry_points_1 = __importDefault(require("./utils/entry-points"));
const config_1 = __importDefault(require("../config"));
const frontity_1 = __importDefault(require("../config/frontity"));
const clean_build_folders_1 = __importDefault(require("./utils/clean-build-folders"));
const webpack_1 = require("./utils/webpack");
const read_configuration_1 = require("./utils/read-configuration");
/**
 * The Frontity build command that creates all the bundles and assets necessary
 * to run the Frontity server.
 *
 * @param options - Defined in {@link BuildOptions}.
 *
 * @returns A promise that resolves when the build has finished.
 */
exports.default = async ({ mode = "production", target = "both", publicPath = "/static/", analyze = false, }) => {
    console.log();
    console.log(`  - mode: ${mode}`);
    console.log(`  - target: ${target}`);
    console.log(`  - public-path: ${publicPath}`);
    console.log();
    // Setting up the env variable to consume in initial state.
    process.env.FRONTITY_INTERNAL_PUBLIC_PATH = publicPath || "/static";
    // Get config from frontity.config.js files.
    const frontityConfig = (0, frontity_1.default)();
    const { outDir } = frontityConfig;
    // Create the directories if they don't exist. Clean them if they do.
    await (0, clean_build_folders_1.default)({ outDir });
    // Get all sites configured in frontity.settings.js with their packages.
    const sites = await (0, file_settings_1.getAllSites)();
    // Generate the bundles. One for the server, one for each client site.
    const entryPoints = await (0, entry_points_1.default)({ sites, outDir, mode });
    // Read the extra configurations from files.
    const extraConfigurations = await (0, read_configuration_1.readConfigurationsFromConfigFiles)(sites);
    // Get FrontityConfig for Webpack.
    const config = (0, config_1.default)({
        mode,
        entryPoints,
        analyze,
        extraConfigurations,
    });
    // Build and wait until webpack finished the clients first.
    // We need to do this because the server bundle needs to import
    // the client chunks.x.json, which are created by the clients.
    //
    // If target is both or es5, build the es5 bundle.
    if (target !== "module") {
        console.log("Building es5 bundle");
        await (0, webpack_1.webpackAsync)(config.webpack.es5);
    }
    // If target is both or module, build the module bundle.
    if (target !== "es5") {
        console.log("Building module bundle");
        await (0, webpack_1.webpackAsync)(config.webpack.module);
    }
    console.log("Building server bundle");
    await (0, webpack_1.webpackAsync)(config.webpack.server);
    console.log();
    // Remove the bundling folder after the build in production because
    // it is not needed anymore.
    if (mode === "production")
        await (0, fs_extra_1.remove)((0, path_1.join)(outDir, "bundling"));
};
