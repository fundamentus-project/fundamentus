export default function getModuleDefault<T extends object>(mod: T | {
    default: T;
}): T;
