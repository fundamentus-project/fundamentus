// List of allowed sharp methods to expose.
//
// This is a literal, so we can use it to validate request parameters.
export const TransformationMethods /*: readonly (keyof Sharp)[]*/ = [
    // Output options
    // https://sharp.pixelplumbing.com/api-output
    'toFormat',
    'jpeg',
    'png',
    'tiff',
    'webp',
    'avif',
    // Resizing
    // https://sharp.pixelplumbing.com/api-resize
    'resize',
    'extend',
    'extract',
    'trim',
    // Image operations
    // https://sharp.pixelplumbing.com/api-operation
    'rotate',
    'flip',
    'flop',
    'sharpen',
    'median',
    'blur',
    'flatten',
    'gamma',
    'negate',
    'normalise',
    'normalize',
    'clahe',
    'convolve',
    'threshold',
    'linear',
    'recomb',
    'modulate',
    // Color manipulation
    // https://sharp.pixelplumbing.com/api-colour
    'tint',
    'greyscale',
    'grayscale',
    'toColorspace',
    'toColourspace',
    // Channel manipulation
    // https://sharp.pixelplumbing.com/api-channel
    'removeAlpha',
    'ensureAlpha',
    'extractChannel',
    'bandbool',
];
