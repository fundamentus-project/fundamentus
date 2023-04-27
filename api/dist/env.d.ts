/**
 * @NOTE
 * For all possible keys, see: https://docs.directus.io/self-hosted/config-options/
 */
declare let env: Record<string, any>;
export default env;
/**
 * Small wrapper function that makes it easier to write unit tests against changing environments
 */
export declare const getEnv: () => Record<string, any>;
/**
 * When changes have been made during runtime, like in the CLI, we can refresh the env object with
 * the newly created variables
 */
export declare function refreshEnv(): void;
