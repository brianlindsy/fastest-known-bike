"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const symlink_dir_1 = __importDefault(require("symlink-dir"));
const fs_extra_1 = require("fs-extra");
const path_1 = require("path");
const fs_1 = require("fs");
const semverRE = /^(~|\^|<|>|=)?([0-9]+)\.([0-9]+)\.([0-9]+)(?:-([0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*))?(?:\+[0-9A-Za-z-]+)?$/;
const RE = /^(file:)?(~)?(\.{0,2}?\/([\w+\-_]+)?)+$/;
/**
 * Check whether the given string isn't a semver.
 *
 * @param dir - Possible directory path.
 * @returns True if not a semver.
 */
const isNotSemanticVersion = (dir) => !semverRE.test(dir);
/**
 * Check whether the given string is a path pointing to a local package.
 *
 * @param dir - Possible link path.
 * @returns True if it's a valid link path.
 */
const isValidLinkPath = (dir) => RE.test(dir);
/**
 * Check whether the given directory contains a Node package.
 *
 * @param dir - Directory path.
 * @returns True if it's a node package.
 */
const isValidNodePackage = async (dir) => await (0, fs_extra_1.pathExists)((0, path_1.resolve)(dir, "package.json"));
/**
 * Read the file with the given path in utf8 format.
 *
 * @remarks This function replaces {@link fs-extra#readFile} because it doesn't
 * work with {@link mock-fs#default}, which is used by unit tests.
 *
 * @param path - File path.
 * @returns String with the file content.
 */
const readFileUtf8 = async (path) => {
    const fileHandle = await fs_1.promises.open(path, "r");
    return await fileHandle.readFile({ encoding: "utf8" });
};
exports.default = async () => {
    // Get dependencies from CWD package.json
    const packageJsonPath = (0, path_1.resolve)(process.env.CWD, "./package.json");
    const packageJson = JSON.parse(await readFileUtf8(packageJsonPath));
    const { dependencies } = packageJson;
    const dependencyNames = Object.keys(dependencies).filter((dependency) => isNotSemanticVersion(dependencies[dependency]) &&
        isValidLinkPath(dependencies[dependency]));
    await Promise.all(
    // Iterate over the dependencies.
    dependencyNames.map(async (name) => {
        const packageDir = dependencies[name].replace(/^(file:)/, "");
        const dir = (0, path_1.resolve)(process.env.CWD, packageDir);
        // Check if the folder exists.
        const exists = await (0, fs_extra_1.pathExists)(dir);
        // Check if package.json exists
        const isNodePackage = await isValidNodePackage(dir);
        if (!exists) {
            throw new Error(`${dir} for ${name} does not exist.`);
        }
        if (!isNodePackage) {
            throw new Error(`${name} is not a valid node package.`);
        }
        try {
            await (0, symlink_dir_1.default)(dir, (0, path_1.resolve)("node_modules", name));
        }
        catch (e) {
            throw new Error(e);
        }
    }));
};
