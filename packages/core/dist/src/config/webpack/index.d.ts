import { WebpackConfigs, BabelConfigs, EntryPoints } from "../../../types";
import { Mode, FrontityConfig } from "@frontity/types/config";
/**
 * The options of the {@link webpack} function.
 */
interface WebpackOptions {
    /**
     * The mode of the build: "development" or "production".
     */
    mode: Mode;
    /**
     * The paths of the entry points generated on the fly by Frontity in the
     * `/build/bundling/entry-points folder`.
     */
    entryPoints: EntryPoints[];
    /**
     * The config of Babel, generated in the previous step.
     */
    babel: BabelConfigs;
    /**
     * The config of Frontity, generated in the previous step.
     */
    frontity: FrontityConfig;
    /**
     * Flag indicating if the Bundle Analyzer plugin should be included.
     */
    analyze?: boolean;
}
/**
 * Generate the object for Webpack configuration.
 *
 * Official Webpack docs: https://webpack.js.org/.
 *
 * @param options - Defined in {@link WebpackOptions}.
 *
 * @returns The configuration objects for Webpack.
 */
declare const webpack: (options: WebpackOptions) => WebpackConfigs;
export default webpack;
