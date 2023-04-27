import type { Type } from '@directus/types';
import type { GraphQLType } from 'graphql';
import { GraphQLList, GraphQLScalarType } from 'graphql';
export declare function getGraphQLType(localType: Type | 'alias' | 'unknown', special: string[]): GraphQLScalarType | GraphQLList<GraphQLType>;
