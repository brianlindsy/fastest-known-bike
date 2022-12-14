"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
// Get the root path of the directory where the script was started.
const rootPath = process.cwd();
const filenames = {
    module: {
        development: "[name].module.js",
        production: "[name].module.[chunkhash].js",
    },
    es5: {
        development: "[name].es5.js",
        production: "[name].es5.[chunkhash].js",
    },
    server: {
        development: "server.js",
        production: "server.js",
    },
};
const paths = {
    module: "static",
    es5: "static",
    server: "",
};
// Same with chunks, only hashes in production and es5/module in the filename.
const chunkFilenames = {
    module: {
        development: "[name].module.js",
        production: "[name].module.[chunkhash].js",
    },
    es5: {
        development: "[name].es5.js",
        production: "[name].es5.[chunkhash].js",
    },
};
/**
 * Generate the object for Webpack's output configuration.
 *
 * Official Webpack docs: https://webpack.js.org/configuration/output/.
 *
 * @param options - Defined in {@link OutputOptions}.
 *
 * @returns The configuration object for Webpack.
 */
const output = ({ target, mode, outDir, }) => (Object.assign(Object.assign({ filename: filenames[target][mode], path: (0, path_1.resolve)(rootPath, outDir, paths[target]) }, (target !== "server" && { chunkFilename: chunkFilenames[target][mode] })), (target === "server" && { libraryTarget: "commonjs2" })));
exports.default = output;
