export function resolvePreset(input, file) {
    const transforms = input.transforms ?? [];
    if (input.format || input.quality)
        transforms.push([
            'toFormat',
            input.format || file.type.split('/')[1],
            {
                quality: input.quality ? Number(input.quality) : undefined,
            },
        ]);
    if (input.width || input.height)
        transforms.push([
            'resize',
            {
                width: input.width ? Number(input.width) : undefined,
                height: input.height ? Number(input.height) : undefined,
                fit: input.fit,
                withoutEnlargement: input.withoutEnlargement ? Boolean(input.withoutEnlargement) : undefined,
            },
        ]);
    return transforms;
}
/**
 * Try to extract a file format from an array of `Transformation`'s.
 */
export function maybeExtractFormat(transforms) {
    const toFormats = transforms.filter((t) => t[0] === 'toFormat');
    const lastToFormat = toFormats[toFormats.length - 1];
    return lastToFormat ? lastToFormat[1]?.toString() : undefined;
}
