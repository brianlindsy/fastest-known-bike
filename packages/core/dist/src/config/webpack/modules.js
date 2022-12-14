"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.exclude = void 0;
const hash_it_1 = __importDefault(require("hash-it"));
const package_json_1 = __importDefault(require("@babel/core/package.json"));
const package_json_2 = __importDefault(require("babel-loader/package.json"));
/**
 * The regular expressions used to exclude packages from transpilation.
 */
exports.exclude = [
    /(\/|\\)core-js($|(\/|\\))/,
    /(\/|\\)webpack($|(\/|\\))/,
    /(\/|\\)regenerator-runtime($|(\/|\\))/,
];
/**
 * Generate the object for Webpack's entry configuration.
 *
 * Official Webpack docs: https://webpack.js.org/configuration/entry-context/.
 *
 * @param options - Defined in {@link EntryOptions}.
 *
 * @returns The configuration object for Webpack.
 */
const moduleConf = ({ target, babel, mode, }) => ({
    rules: [
        {
            // Support for js, jsx, ts and tsx files.
            test: /\.(j|t)sx?$/,
            // Do not try to transpile the files of webpack, core-js or the
            // regenerator-runtime because they break if we do so.
            exclude: exports.exclude,
            use: {
                loader: "babel-loader",
                options: Object.assign({ 
                    // Don't use the babelrc file of the root.
                    babelrc: false, 
                    // This is a feature of `babel-loader` for webpack (not Babel itself).
                    // It enables caching results in ./node_modules/.cache/babel-loader/
                    // directory for faster rebuilds.
                    cacheDirectory: true, 
                    // A unique hash using @babel/core's version, the babel-loader's version,
                    // and the contents of babel.
                    cacheIdentifier: `${(0, hash_it_1.default)({
                        babelCoreVersion: package_json_1.default.version,
                        babelLoaderVersion: package_json_2.default.version,
                        babel: babel,
                    })}` }, babel[target]),
            },
        },
        {
            test: /\.(png|jpe?g|gif|svg)$/,
            use: [
                {
                    loader: "file-loader",
                    options: {
                        name: (file) => {
                            const filename = /([^/\\]+)\.(?:png|jpe?g|gif|svg)$/.exec(file) || ["", "image"];
                            return mode === "development"
                                ? `${filename[1]}.[ext]`
                                : `${filename[1]}-[hash].[ext]`;
                        },
                        outputPath: "images",
                        emitFile: target !== "server",
                    },
                },
            ],
        },
        {
            test: /\.css$/,
            use: "raw-loader",
        },
        {
            test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
            use: {
                loader: "url-loader",
                options: {
                    name: (file) => {
                        const filename = /([^/\\]+)\.(?:woff(2)?|ttf|eot)$/.exec(file) || [
                            "",
                            "font",
                        ];
                        return mode === "development"
                            ? `${filename[1]}.[ext]`
                            : `${filename[1]}-[hash].[ext]`;
                    },
                    outputPath: "fonts",
                    limit: 8192,
                    emitFile: target !== "server",
                },
            },
        },
    ],
});
exports.default = moduleConf;
