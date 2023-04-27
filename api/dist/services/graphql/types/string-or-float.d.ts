import { GraphQLScalarType } from 'graphql';
/**
 * Adopted from https://kamranicus.com/handling-multiple-scalar-types-in-graphql/
 */
export declare const GraphQLStringOrFloat: GraphQLScalarType<string | number, string | number>;
