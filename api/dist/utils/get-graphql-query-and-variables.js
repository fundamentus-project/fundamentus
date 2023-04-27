import { pick } from 'lodash-es';
export function getGraphqlQueryAndVariables(req) {
    const isGet = req.method?.toLowerCase() === 'get';
    return pick(isGet ? req.query : req.body, ['query', 'variables']);
}
