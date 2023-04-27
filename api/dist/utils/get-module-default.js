export default function getModuleDefault(mod) {
    if ('default' in mod) {
        return mod.default;
    }
    return mod;
}
