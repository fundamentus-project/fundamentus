import { BaseException } from '@directus/exceptions';
import logger from '../../../logger.js';
const processError = (accountability, error) => {
    logger.error(error);
    const { originalError } = error;
    if (originalError instanceof BaseException) {
        return {
            message: originalError.message,
            extensions: {
                code: originalError.code,
                ...originalError.extensions,
            },
        };
    }
    else {
        if (accountability?.admin === true) {
            const graphqlFormattedError = {
                message: error.message,
                extensions: {
                    code: 'INTERNAL_SERVER_ERROR',
                },
            };
            if (error.locations) {
                graphqlFormattedError.locations = error.locations;
            }
            if (error.path) {
                graphqlFormattedError.path = error.path;
            }
            return graphqlFormattedError;
        }
        else {
            return {
                message: 'An unexpected error occurred.',
                extensions: {
                    code: 'INTERNAL_SERVER_ERROR',
                },
            };
        }
    }
};
export default processError;
