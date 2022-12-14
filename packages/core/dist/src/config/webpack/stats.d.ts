import { Mode, WebpackConfig } from "@frontity/types/config";
/**
 * The options of the {@link stats} function.
 */
interface StatsOptions {
    /**
     * The mode of the build: "development" or "production".
     */
    mode: Mode;
}
/**
 * Generate the object for Webpack's mode configuration.
 *
 * Official Webpack docs: https://webpack.js.org/configuration/mode.
 *
 * @param options - Defined in {@link StatsOptions}.
 *
 * @returns The configuration object for Webpack.
 */
declare const stats: ({ mode }: StatsOptions) => WebpackConfig["stats"];
export default stats;
