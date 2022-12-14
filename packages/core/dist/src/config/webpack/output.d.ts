import { Target, Mode, WebpackConfig } from "@frontity/types/config";
/**
 * The options of the {@link moduleConf} function.
 */
interface OutputOptions {
    /**
     * The target of the build: "server", "es5" or "module".
     */
    target: Target;
    /**
     * The mode of the build: "development" or "production".
     */
    mode: Mode;
    /**
     * The output directory.
     */
    outDir: string;
}
/**
 * Generate the object for Webpack's output configuration.
 *
 * Official Webpack docs: https://webpack.js.org/configuration/output/.
 *
 * @param options - Defined in {@link OutputOptions}.
 *
 * @returns The configuration object for Webpack.
 */
declare const output: ({ target, mode, outDir, }: OutputOptions) => WebpackConfig["output"];
export default output;
