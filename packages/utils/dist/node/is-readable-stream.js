export const isReadableStream = (input) => {
    return (input !== null &&
        typeof input === 'object' &&
        typeof input.pipe === 'function' &&
        typeof input._read === 'function' &&
        typeof input._readableState === 'object' &&
        input.readable !== false);
};
