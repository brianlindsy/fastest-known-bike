"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const babel_1 = __importDefault(require("./babel"));
const webpack_1 = __importDefault(require("./webpack"));
const frontity_1 = __importDefault(require("./frontity"));
/**
 * Runs the config for each entry.
 *
 * @param config - The config.
 * @param entries - The list of entries.
 * @param mode - The current framework mode.
 */
const runEntriesWithConfig = (config, entries, mode) => {
    if (entries && entries.length) {
        entries.forEach((configuration) => {
            // And call the configuration function with the current
            // config, target and mode.
            configuration({
                config,
                mode,
            });
        });
    }
};
/**
 * Runs through the source targets and calls the entries configurations
 * with the current target configuration, target name and mode.
 *
 * @param source - The source of the configuration targets.
 * @param entries - The entries for the current target.
 * @param mode - The current running mode.
 */
const runForEachTarget = (source, entries, mode) => {
    // If there are entries to be ran.
    if (entries && entries.length) {
        // Iterate for each target inside the source.
        for (const target in source) {
            // And run through each entry configuration.
            entries.forEach((configuration) => {
                // And call the configuration function with the current
                // config, target and mode.
                configuration({
                    config: source[target],
                    target,
                    mode,
                });
            });
        }
    }
};
/**
 * Generate the configuration objects for Webpack, Babel and Frontity.
 *
 * @param options - Defined in {@link ConfigOptions}.
 *
 * @returns The configuration object for Webpack, Babel and Frontity. Each
 * configuration object contains the three targets: "module", "es5" and "server".
 */
const config = ({ mode, entryPoints, analyze = false, extraConfigurations = { babel: [], webpack: [], frontity: [] }, }) => {
    const frontity = (0, frontity_1.default)();
    // Run the entries for frontity.
    runEntriesWithConfig(frontity, extraConfigurations.frontity, mode);
    const babel = (0, babel_1.default)();
    // Runs the extra configurations for babel, if any.
    runForEachTarget(babel, extraConfigurations.babel, mode);
    const webpack = (0, webpack_1.default)({
        mode,
        babel,
        frontity,
        entryPoints,
        analyze,
    });
    // Runs the extra webpack configuration, if any.
    runForEachTarget(webpack, extraConfigurations.webpack, mode);
    return {
        babel,
        webpack,
        frontity,
    };
};
exports.default = config;
