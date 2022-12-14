"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const name_1 = __importDefault(require("./name"));
const targets_1 = __importDefault(require("./targets"));
const devtool_1 = __importDefault(require("./devtool"));
const entry_1 = __importDefault(require("./entry"));
const output_1 = __importDefault(require("./output"));
const modules_1 = __importDefault(require("./modules"));
const resolve_1 = __importDefault(require("./resolve"));
const externals_1 = __importDefault(require("./externals"));
const plugins_1 = __importDefault(require("./plugins"));
const performance_1 = __importDefault(require("./performance"));
const stats_1 = __importDefault(require("./stats"));
/**
 * Generate the Webpack configuration for each one of the targets.
 *
 * @param options - Defined in {@link ConfigOptions}.
 *
 * @returns A Webpack's configuration object.
 */
const getConfig = ({ target, mode, entryPoints, babel, frontity, analyze, }) => ({
    mode,
    name: (0, name_1.default)({ target }),
    target: (0, targets_1.default)({ target }),
    devtool: (0, devtool_1.default)({ mode }),
    entry: (0, entry_1.default)({ target, mode, entryPoints }),
    output: (0, output_1.default)({ target, mode, outDir: frontity.outDir }),
    module: (0, modules_1.default)({ target, babel, mode }),
    resolve: (0, resolve_1.default)(),
    externals: (0, externals_1.default)({ target }),
    plugins: (0, plugins_1.default)({ target, mode, outDir: frontity.outDir, analyze }),
    performance: (0, performance_1.default)({ target }),
    stats: (0, stats_1.default)({ mode }),
});
/**
 * Generate the object for Webpack configuration.
 *
 * Official Webpack docs: https://webpack.js.org/.
 *
 * @param options - Defined in {@link WebpackOptions}.
 *
 * @returns The configuration objects for Webpack.
 */
const webpack = (options) => ({
    module: getConfig(Object.assign(Object.assign({}, options), { target: "module" })),
    es5: getConfig(Object.assign(Object.assign({}, options), { target: "es5" })),
    server: getConfig(Object.assign(Object.assign({}, options), { target: "server" })),
});
exports.default = webpack;
