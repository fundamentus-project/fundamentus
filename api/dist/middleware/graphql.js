import { parseJSON } from '@directus/utils';
import { getOperationAST, parse, Source } from 'graphql';
import { InvalidPayloadException, InvalidQueryException, MethodNotAllowedException } from '../exceptions/index.js';
import asyncHandler from '../utils/async-handler.js';
export const parseGraphQL = asyncHandler(async (req, res, next) => {
    if (req.method !== 'GET' && req.method !== 'POST') {
        throw new MethodNotAllowedException('GraphQL only supports GET and POST requests.', { allow: ['GET', 'POST'] });
    }
    let query = null;
    let variables = null;
    let operationName = null;
    let document;
    if (req.method === 'GET') {
        query = req.query['query'] || null;
        if (req.query['variables']) {
            try {
                variables = parseJSON(req.query['variables']);
            }
            catch {
                throw new InvalidQueryException(`Variables are invalid JSON.`);
            }
        }
        else {
            variables = {};
        }
        operationName = req.query['operationName'] || null;
    }
    else {
        query = req.body.query || null;
        variables = req.body.variables || null;
        operationName = req.body.operationName || null;
    }
    if (query === null) {
        throw new InvalidPayloadException('Must provide query string.');
    }
    try {
        document = parse(new Source(query));
    }
    catch (err) {
        throw new InvalidPayloadException(`GraphQL schema validation error.`, {
            graphqlErrors: [err],
        });
    }
    const operationAST = getOperationAST(document, operationName);
    // You can only do `query` through GET
    if (req.method === 'GET' && operationAST?.operation !== 'query') {
        throw new MethodNotAllowedException(`Can only perform a ${operationAST?.operation} from a POST request.`, {
            allow: ['POST'],
        });
    }
    // Prevent caching responses when mutations are made
    if (operationAST?.operation === 'mutation') {
        res.locals['cache'] = false;
    }
    res.locals['graphqlParams'] = {
        document,
        query,
        variables,
        operationName,
        contextValue: { req, res },
    };
    return next();
});
