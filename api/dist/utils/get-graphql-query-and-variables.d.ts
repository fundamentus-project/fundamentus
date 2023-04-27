import type { Request } from 'express';
export declare function getGraphqlQueryAndVariables(req: Request): Pick<any, "query" | "variables">;
