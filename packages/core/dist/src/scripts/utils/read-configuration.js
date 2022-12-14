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
Object.defineProperty(exports, "__esModule", { value: true });
exports.readConfigurationsFromConfigFiles = void 0;
const fs_extra_1 = require("fs-extra");
const lodash_1 = require("lodash");
/**
 * Creates string that represents a package path.
 *
 * @param name - The package name.
 * @param file - The file name.
 * @returns The path.
 */
const createPath = (name, file) => `${process.env.CWD}/node_modules/${name}/${file}`;
/**
 * Checks if a given package has a configuration file.
 *
 * @param name - The package name.
 * @returns If a package has a configuration file.
 */
const packageHasConfig = async (name) => {
    return ((await (0, fs_extra_1.pathExists)(createPath(name, "frontity.config.ts"))) ||
        (await (0, fs_extra_1.pathExists)(createPath(name, "frontity.config.js"))));
};
/**
 * This function applies the configuration from packages.
 *
 * @param sites - The sites.
 * @returns A dictionary split by the exported configuration function.
 */
const readConfigurationsFromConfigFiles = async (sites) => {
    const packages = (0, lodash_1.uniq)(sites.reduce((out, site) => {
        return out.concat(site.packages);
    }, []));
    const dictionary = {};
    for (const i in packages) {
        const name = packages[i];
        const hasConfig = await packageHasConfig(name);
        if (hasConfig) {
            const packageConfig = await Promise.resolve().then(() => __importStar(require(`${process.env.CWD}/node_modules/${name}/frontity.config`)));
            if (packageConfig) {
                // For each configuration exported
                for (const config in packageConfig) {
                    dictionary[config] = dictionary[config] || [];
                    // Push the current configuration function into the
                    // config dictionary
                    dictionary[config].push(packageConfig[config]);
                }
            }
        }
    }
    return dictionary;
};
exports.readConfigurationsFromConfigFiles = readConfigurationsFromConfigFiles;
