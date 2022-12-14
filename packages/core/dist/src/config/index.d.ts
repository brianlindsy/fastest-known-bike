import { Config, EntryPoints } from "../../types";
import { Mode } from "@frontity/types/config";
/**
 * The options of the {@link config} function.
 */
interface ConfigOptions {
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
     * Flag indicating if the Bundle Analyzer plugin should be included.
     *
     * @defaultValue false
     */
    analyze?: boolean;
    /**
     * Extra configurations used to extend the current configurations.
     */
    extraConfigurations?: Record<string, []>;
}
/**
 * Generate the configuration objects for Webpack, Babel and Frontity.
 *
 * @param options - Defined in {@link ConfigOptions}.
 *
 * @returns The configuration object for Webpack, Babel and Frontity. Each
 * configuration object contains the three targets: "module", "es5" and "server".
 */
declare const config: ({ mode, entryPoints, analyze, extraConfigurations, }: ConfigOptions) => Config;
export default config;
