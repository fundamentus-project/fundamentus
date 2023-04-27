import { escapeRegExp } from 'lodash-es';
import { describe, expect, it } from 'vitest';
import { Joi, generateJoi } from './generate-joi.js';
describe(`generateJoi`, () => {
    const date = new Date(1632431505992);
    const compareDate = new Date(1632431605992);
    it(`returns an error when no key is passed`, () => {
        const mockFieldFilter = {};
        const mockError = `[generateJoi] Filter doesn't contain field key. Passed filter: {}`;
        expect(() => {
            generateJoi(mockFieldFilter);
        }).toThrowError(mockError);
    });
    it(`returns an error when no filter rule is passed`, () => {
        const mockFieldFilter = { field: { eq: undefined } };
        const mockError = `[generateJoi] Filter doesn't contain filter rule. Passed filter: {}`;
        expect(() => {
            generateJoi(mockFieldFilter);
        }).toThrowError(mockError);
    });
    it(`returns an recursively goes through nested filters`, () => {
        const mockFieldFilter = { field: { eq: { _eq: 'field' } } };
        const mockSchema = Joi.object({
            field: Joi.object({ eq: Joi.any().equal('field') }).unknown(),
        })
            .unknown()
            .describe();
        expect(generateJoi(mockFieldFilter).describe()).toStrictEqual(mockSchema);
    });
    it(`returns the correct schema with an option of "requireAll" true`, () => {
        const mockFieldFilter = { field: { _eq: 'field' } };
        const mockOptions = { requireAll: true };
        const mockSchema = Joi.object({
            field: Joi.any().equal('field').required(),
        })
            .unknown()
            .describe();
        expect(generateJoi(mockFieldFilter, mockOptions).describe()).toStrictEqual(mockSchema);
    });
    it(`returns the correct schema for an _eq match`, () => {
        const mockFieldFilter = { field: { _eq: 'field' } };
        const mockSchema = Joi.object({
            field: Joi.any().equal('field'),
        })
            .unknown()
            .describe();
        expect(generateJoi(mockFieldFilter).describe()).toStrictEqual(mockSchema);
    });
    it(`returns the correct schema for a _neq match`, () => {
        const mockFieldFilter = { field: { _neq: 'field' } };
        const mockSchema = Joi.object({
            field: Joi.any().not('field'),
        })
            .unknown()
            .describe();
        expect(generateJoi(mockFieldFilter).describe()).toStrictEqual(mockSchema);
    });
    it(`returns the correct schema for an integer _eq match`, () => {
        const mockFieldFilter = { field: { _eq: '123' } };
        const mockSchema = Joi.object({
            field: Joi.any().equal('123', 123),
        })
            .unknown()
            .describe();
        expect(generateJoi(mockFieldFilter).describe()).toStrictEqual(mockSchema);
    });
    it(`returns the correct schema for an integer _neq match`, () => {
        const mockFieldFilter = { field: { _neq: '123' } };
        const mockSchema = Joi.object({
            field: Joi.any().not('123', 123),
        })
            .unknown()
            .describe();
        expect(generateJoi(mockFieldFilter).describe()).toStrictEqual(mockSchema);
    });
    it(`returns the correct schema for a float _eq match`, () => {
        const mockFieldFilter = { field: { _eq: '123.456' } };
        const mockSchema = Joi.object({
            field: Joi.any().equal('123.456', 123.456),
        })
            .unknown()
            .describe();
        expect(generateJoi(mockFieldFilter).describe()).toStrictEqual(mockSchema);
    });
    it(`returns the correct schema for a float _neq match`, () => {
        const mockFieldFilter = { field: { _neq: '123.456' } };
        const mockSchema = Joi.object({
            field: Joi.any().not('123.456', 123.456),
        })
            .unknown()
            .describe();
        expect(generateJoi(mockFieldFilter).describe()).toStrictEqual(mockSchema);
    });
    it(`returns the correct schema for a null _eq match`, () => {
        const mockFieldFilter = { field: { _eq: null } };
        const mockSchema = Joi.object({
            field: Joi.any().equal(null),
        })
            .unknown()
            .describe();
        expect(generateJoi(mockFieldFilter).describe()).toStrictEqual(mockSchema);
    });
    it(`returns the correct schema for a null _neq match`, () => {
        const mockFieldFilter = { field: { _neq: null } };
        const mockSchema = Joi.object({
            field: Joi.any().not(null),
        })
            .unknown()
            .describe();
        expect(generateJoi(mockFieldFilter).describe()).toStrictEqual(mockSchema);
    });
    it(`returns the correct schema for an empty string _eq match`, () => {
        const mockFieldFilter = { field: { _eq: '' } };
        const mockSchema = Joi.object({
            field: Joi.any().equal(''),
        })
            .unknown()
            .describe();
        expect(generateJoi(mockFieldFilter).describe()).toStrictEqual(mockSchema);
    });
    it(`returns the correct schema for an empty string _neq match`, () => {
        const mockFieldFilter = { field: { _neq: '' } };
        const mockSchema = Joi.object({
            field: Joi.any().not(''),
        })
            .unknown()
            .describe();
        expect(generateJoi(mockFieldFilter).describe()).toStrictEqual(mockSchema);
    });
    it(`returns the correct schema for a true _eq match`, () => {
        const mockFieldFilter = { field: { _eq: true } };
        const mockSchema = Joi.object({
            field: Joi.any().equal(true),
        })
            .unknown()
            .describe();
        expect(generateJoi(mockFieldFilter).describe()).toStrictEqual(mockSchema);
    });
    it(`returns the correct schema for a true _neq match`, () => {
        const mockFieldFilter = { field: { _neq: true } };
        const mockSchema = Joi.object({
            field: Joi.any().not(true),
        })
            .unknown()
            .describe();
        expect(generateJoi(mockFieldFilter).describe()).toStrictEqual(mockSchema);
    });
    it(`returns the correct schema for a false _eq match`, () => {
        const mockFieldFilter = { field: { _eq: false } };
        const mockSchema = Joi.object({
            field: Joi.any().equal(false),
        })
            .unknown()
            .describe();
        expect(generateJoi(mockFieldFilter).describe()).toStrictEqual(mockSchema);
    });
    it(`returns the correct schema for a false _neq match`, () => {
        const mockFieldFilter = { field: { _neq: false } };
        const mockSchema = Joi.object({
            field: Joi.any().not(false),
        })
            .unknown()
            .describe();
        expect(generateJoi(mockFieldFilter).describe()).toStrictEqual(mockSchema);
    });
    it(`returns the correct schema for an _ncontains contain match`, () => {
        const mockFieldFilter = { field: { _ncontains: 'field' } };
        const mockSchema = Joi.object({
            field: Joi.string().ncontains('field'),
        })
            .unknown()
            .describe();
        expect(generateJoi(mockFieldFilter).describe()).toStrictEqual(mockSchema);
    });
    it(`returns the correct schema for an _ncontains with null value`, () => {
        const mockFieldFilter = { field: { _ncontains: null } };
        const mockSchema = Joi.object({
            field: Joi.any().equal(true),
        })
            .unknown()
            .describe();
        expect(generateJoi(mockFieldFilter).describe()).toStrictEqual(mockSchema);
    });
    it(`returns the correct schema for an _contains contain match`, () => {
        const mockFieldFilter = { field: { _contains: 'field' } };
        const mockSchema = Joi.object({
            field: Joi.string().contains('field'),
        })
            .unknown()
            .describe();
        expect(generateJoi(mockFieldFilter).describe()).toStrictEqual(mockSchema);
    });
    it(`returns the correct schema for an _contains with null value`, () => {
        const mockFieldFilter = { field: { _contains: null } };
        const mockSchema = Joi.object({
            field: Joi.any().equal(true),
        })
            .unknown()
            .describe();
        expect(generateJoi(mockFieldFilter).describe()).toStrictEqual(mockSchema);
    });
    it(`returns the correct schema for an _icontains contain match`, () => {
        const mockFieldFilter = { field: { _icontains: 'field' } };
        const mockSchema = Joi.object({
            field: Joi.string().contains('field'),
        })
            .unknown()
            .describe();
        expect(generateJoi(mockFieldFilter).describe()).toStrictEqual(mockSchema);
    });
    it(`returns the correct schema for an _icontains with null value`, () => {
        const mockFieldFilter = { field: { _icontains: null } };
        const mockSchema = Joi.object({
            field: Joi.any().equal(true),
        })
            .unknown()
            .describe();
        expect(generateJoi(mockFieldFilter).describe()).toStrictEqual(mockSchema);
    });
    it(`returns a value if the substring is included in the value`, () => {
        expect(() => {
            Joi.assert('testfield', Joi.string().contains('field'));
        }).toEqual(expect.any(Function));
    });
    it(`returns a value if the substring is not contained in the value`, () => {
        expect(() => {
            Joi.assert('testfield', Joi.string().contains('field'));
        }).toEqual(expect.any(Function));
    });
    it(`returns an error if the substring is included in the value`, () => {
        expect(() => {
            Joi.assert('field', Joi.string().ncontains('field'));
            // eslint-disable-next-line no-useless-escape
        }).toThrowError(`\"value\" can't contain [field]`);
    });
    it(`returns an error if the substring is not contained in the value`, () => {
        expect(() => {
            Joi.assert('test', Joi.string().contains('field'));
            // eslint-disable-next-line no-useless-escape
        }).toThrowError(`\"value\" must contain [field`);
    });
    it(`returns the correct schema for a _starts_with match`, () => {
        const mockFieldFilter = { field: { _starts_with: 'field' } };
        const mockSchema = Joi.object({
            field: Joi.string().pattern(new RegExp(`^${escapeRegExp('field')}.*`), {
                name: 'starts_with',
            }),
        })
            .unknown()
            .describe();
        expect(generateJoi(mockFieldFilter).describe()).toStrictEqual(mockSchema);
    });
    it(`returns the correct schema for a _starts_with with null value`, () => {
        const mockFieldFilter = { field: { _starts_with: null } };
        const mockSchema = Joi.object({
            field: Joi.any().equal(true),
        })
            .unknown()
            .describe();
        expect(generateJoi(mockFieldFilter).describe()).toStrictEqual(mockSchema);
    });
    it(`returns the correct schema for a _nstarts_with with match`, () => {
        const mockFieldFilter = { field: { _nstarts_with: 'field' } };
        const mockSchema = Joi.object({
            field: Joi.string().pattern(new RegExp(`^${escapeRegExp('field')}.*`), {
                name: 'starts_with',
                invert: true,
            }),
        })
            .unknown()
            .describe();
        expect(generateJoi(mockFieldFilter).describe()).toStrictEqual(mockSchema);
    });
    it(`returns the correct schema for a _nstarts_with with null value`, () => {
        const mockFieldFilter = { field: { _nstarts_with: null } };
        const mockSchema = Joi.object({
            field: Joi.any().equal(true),
        })
            .unknown()
            .describe();
        expect(generateJoi(mockFieldFilter).describe()).toStrictEqual(mockSchema);
    });
    it(`returns the correct schema for an ends_with match`, () => {
        const mockFieldFilter = { field: { _ends_with: 'field' } };
        const mockSchema = Joi.object({
            field: Joi.string().pattern(new RegExp(`.*field$`), {
                name: 'ends_with',
            }),
        })
            .unknown()
            .describe();
        expect(generateJoi(mockFieldFilter).describe()).toStrictEqual(mockSchema);
    });
    it(`returns the correct schema for an ends_with with null value`, () => {
        const mockFieldFilter = { field: { _ends_with: null } };
        const mockSchema = Joi.object({
            field: Joi.any().equal(true),
        })
            .unknown()
            .describe();
        expect(generateJoi(mockFieldFilter).describe()).toStrictEqual(mockSchema);
    });
    it(`returns the correct schema for a doesnt _nends_with match`, () => {
        const mockFieldFilter = { field: { _nends_with: 'field' } };
        const mockSchema = Joi.object({
            field: Joi.string().pattern(new RegExp(`.*field$`), {
                name: 'ends_with',
                invert: true,
            }),
        })
            .unknown()
            .describe();
        expect(generateJoi(mockFieldFilter).describe()).toStrictEqual(mockSchema);
    });
    it(`returns the correct schema for a doesnt _nends_with with null value`, () => {
        const mockFieldFilter = { field: { _nends_with: null } };
        const mockSchema = Joi.object({
            field: Joi.any().equal(true),
        })
            .unknown()
            .describe();
        expect(generateJoi(mockFieldFilter).describe()).toStrictEqual(mockSchema);
    });
    it(`returns the correct schema for an _in match`, () => {
        const mockFieldFilter = { field: { _in: 'field' } };
        const mockSchema = Joi.object({
            field: Joi.any().equal(...'field'),
        })
            .unknown()
            .describe();
        expect(generateJoi(mockFieldFilter).describe()).toStrictEqual(mockSchema);
    });
    it(`returns the correct schema for an _in number array match`, () => {
        const mockFieldFilter = { field: { _in: [1] } };
        const mockSchema = Joi.object({
            field: Joi.any().equal(...[1]),
        })
            .unknown()
            .describe();
        expect(generateJoi(mockFieldFilter).describe()).toStrictEqual(mockSchema);
    });
    it(`returns the correct schema for an _in a string array match`, () => {
        const mockFieldFilter = { field: { _in: ['field', 'secondField'] } };
        const mockSchema = Joi.object({
            field: Joi.any().equal(...['field', 'secondField']),
        })
            .unknown()
            .describe();
        expect(generateJoi(mockFieldFilter).describe()).toStrictEqual(mockSchema);
    });
    it(`returns the correct schema for a _nin match`, () => {
        const mockFieldFilter = { field: { _nin: 'field' } };
        const mockSchema = Joi.object({
            field: Joi.any().not(...'field'),
        })
            .unknown()
            .describe();
        expect(generateJoi(mockFieldFilter).describe()).toStrictEqual(mockSchema);
    });
    it(`returns the correct schema for an _nin number array match`, () => {
        const mockFieldFilter = { field: { _nin: [1] } };
        const mockSchema = Joi.object({
            field: Joi.any().not(...[1]),
        })
            .unknown()
            .describe();
        expect(generateJoi(mockFieldFilter).describe()).toStrictEqual(mockSchema);
    });
    it(`returns the correct schema for an _nin a string array match`, () => {
        const mockFieldFilter = { field: { _nin: ['field', 'secondField'] } };
        const mockSchema = Joi.object({
            field: Joi.any().not(...['field', 'secondField']),
        })
            .unknown()
            .describe();
        expect(generateJoi(mockFieldFilter).describe()).toStrictEqual(mockSchema);
    });
    it(`returns the correct schema for an _gt number match`, () => {
        const mockFieldFilter = { field: { _gt: 1 } };
        const mockSchema = Joi.object({
            field: Joi.number().greater(1),
        })
            .unknown()
            .describe();
        expect(generateJoi(mockFieldFilter).describe()).toStrictEqual(mockSchema);
    });
    it(`returns the correct schema for an _gt date match`, () => {
        const mockFieldFilter = { field: { _gt: date } };
        const mockSchema = Joi.object({
            field: Joi.date().greater(date),
        })
            .unknown()
            .describe();
        expect(generateJoi(mockFieldFilter).describe()).toStrictEqual(mockSchema);
    });
    it(`returns the correct schema for an _gt string match`, () => {
        const mockFieldFilter = { field: { _gt: date.toISOString() } };
        const mockSchema = Joi.object({
            field: Joi.date().greater(date),
        })
            .unknown()
            .describe();
        expect(generateJoi(mockFieldFilter).describe()).toStrictEqual(mockSchema);
    });
    it(`returns the correct schema for an _gte number match`, () => {
        const mockFieldFilter = { field: { _gte: 1 } };
        const mockSchema = Joi.object({
            field: Joi.number().min(1),
        })
            .unknown()
            .describe();
        expect(generateJoi(mockFieldFilter).describe()).toStrictEqual(mockSchema);
    });
    it(`returns the correct schema for an _gte date match`, () => {
        const mockFieldFilter = { field: { _gte: date } };
        const mockSchema = Joi.object({
            field: Joi.date().min(date),
        })
            .unknown()
            .describe();
        expect(generateJoi(mockFieldFilter).describe()).toStrictEqual(mockSchema);
    });
    it(`returns the correct schema for an _gte string match`, () => {
        const mockFieldFilter = { field: { _gte: date.toISOString() } };
        const mockSchema = Joi.object({
            field: Joi.date().min(date),
        })
            .unknown()
            .describe();
        expect(generateJoi(mockFieldFilter).describe()).toStrictEqual(mockSchema);
    });
    it(`returns the correct schema for an _lt number match`, () => {
        const mockFieldFilter = { field: { _lt: 1 } };
        const mockSchema = Joi.object({
            field: Joi.number().less(1),
        })
            .unknown()
            .describe();
        expect(generateJoi(mockFieldFilter).describe()).toStrictEqual(mockSchema);
    });
    it(`returns the correct schema for an _lt date match`, () => {
        const mockFieldFilter = { field: { _lt: date } };
        const mockSchema = Joi.object({
            field: Joi.date().less(date),
        })
            .unknown()
            .describe();
        expect(generateJoi(mockFieldFilter).describe()).toStrictEqual(mockSchema);
    });
    it(`returns the correct schema for an _lt string match`, () => {
        const mockFieldFilter = { field: { _lt: date.toISOString() } };
        const mockSchema = Joi.object({
            field: Joi.date().less(date),
        })
            .unknown()
            .describe();
        expect(generateJoi(mockFieldFilter).describe()).toStrictEqual(mockSchema);
    });
    it(`returns the correct schema for an _lte number match`, () => {
        const mockFieldFilter = { field: { _lte: 1 } };
        const mockSchema = Joi.object({
            field: Joi.number().max(1),
        })
            .unknown()
            .describe();
        expect(generateJoi(mockFieldFilter).describe()).toStrictEqual(mockSchema);
    });
    it(`returns the correct schema for an _lte date match`, () => {
        const mockFieldFilter = { field: { _lte: date } };
        const mockSchema = Joi.object({
            field: Joi.date().max(date),
        })
            .unknown()
            .describe();
        expect(generateJoi(mockFieldFilter).describe()).toStrictEqual(mockSchema);
    });
    it(`returns the correct schema for an _lte string match`, () => {
        const mockFieldFilter = { field: { _lte: date.toISOString() } };
        const mockSchema = Joi.object({
            field: Joi.date().max(date),
        })
            .unknown()
            .describe();
        expect(generateJoi(mockFieldFilter).describe()).toStrictEqual(mockSchema);
    });
    it(`returns the correct schema for an _null match`, () => {
        const mockFieldFilter = { field: { _null: null } };
        const mockSchema = Joi.object({
            field: Joi.any().valid(null),
        })
            .unknown()
            .describe();
        expect(generateJoi(mockFieldFilter).describe()).toStrictEqual(mockSchema);
    });
    it(`returns the correct schema for an _nnull match`, () => {
        const mockFieldFilter = { field: { _nnull: null } };
        const mockSchema = Joi.object({
            field: Joi.any().invalid(null),
        })
            .unknown()
            .describe();
        expect(generateJoi(mockFieldFilter).describe()).toStrictEqual(mockSchema);
    });
    it(`returns the correct schema for an _empty match`, () => {
        const mockFieldFilter = { field: { _empty: '' } };
        const mockSchema = Joi.object({
            field: Joi.any().valid(''),
        })
            .unknown()
            .describe();
        expect(generateJoi(mockFieldFilter).describe()).toStrictEqual(mockSchema);
    });
    it(`returns the correct schema for an _nempty match`, () => {
        const mockFieldFilter = { field: { _nempty: '' } };
        const mockSchema = Joi.object({
            field: Joi.any().invalid(''),
        })
            .unknown()
            .describe();
        expect(generateJoi(mockFieldFilter).describe()).toStrictEqual(mockSchema);
    });
    it(`returns the correct schema for an _between number match`, () => {
        const mockFieldFilter = { field: { _between: [1, 3] } };
        const mockSchema = Joi.object({
            field: Joi.number().min(1).max(3),
        })
            .unknown()
            .describe();
        expect(generateJoi(mockFieldFilter).describe()).toStrictEqual(mockSchema);
    });
    it(`returns the correct schema for an _between float match`, () => {
        const mockFieldFilter = { field: { _between: [1.111, 3.333] } };
        const mockSchema = Joi.object({
            field: Joi.number().min(1.111).max(3.333),
        })
            .unknown()
            .describe();
        expect(generateJoi(mockFieldFilter).describe()).toStrictEqual(mockSchema);
    });
    it(`returns the correct schema for an _between date match`, () => {
        const mockFieldFilter = { field: { _between: [date, compareDate] } };
        const mockSchema = Joi.object({
            field: Joi.date().min(date).max(compareDate),
        })
            .unknown()
            .describe();
        expect(generateJoi(mockFieldFilter).describe()).toStrictEqual(mockSchema);
    });
    it(`returns the correct schema for an _nbetween number match`, () => {
        const mockFieldFilter = { field: { _nbetween: [1, 3] } };
        const mockSchema = Joi.object({
            field: Joi.number().less(1).greater(3),
        })
            .unknown()
            .describe();
        expect(generateJoi(mockFieldFilter).describe()).toStrictEqual(mockSchema);
    });
    it(`returns the correct schema for an _nbetween float match`, () => {
        const mockFieldFilter = { field: { _nbetween: [1.111, 3.333] } };
        const mockSchema = Joi.object({
            field: Joi.number().less(1.111).greater(3.333),
        })
            .unknown()
            .describe();
        expect(generateJoi(mockFieldFilter).describe()).toStrictEqual(mockSchema);
    });
    it(`returns the correct schema for an _nbetween date match`, () => {
        const mockFieldFilter = { field: { _nbetween: [date, compareDate] } };
        const mockSchema = Joi.object({
            field: Joi.date().less(date).greater(compareDate),
        })
            .unknown()
            .describe();
        expect(generateJoi(mockFieldFilter).describe()).toStrictEqual(mockSchema);
    });
    it(`returns the correct schema for an _submitted match`, () => {
        const mockFieldFilter = { field: { _submitted: '' } };
        const mockSchema = Joi.object({
            field: Joi.any().required(),
        })
            .unknown()
            .describe();
        expect(generateJoi(mockFieldFilter).describe()).toStrictEqual(mockSchema);
    });
    it(`returns the correct schema for an _regex match when wrapped`, () => {
        const mockFieldFilter = { field: { _regex: '/.*field$/' } };
        const mockSchema = Joi.object({
            field: Joi.string().regex(new RegExp(`.*field$`)),
        })
            .unknown()
            .describe();
        expect(generateJoi(mockFieldFilter).describe()).toStrictEqual(mockSchema);
    });
    it(`returns the correct schema for an _regex match when unwrapped`, () => {
        const mockFieldFilter = { field: { _regex: '.*field$' } };
        const mockSchema = Joi.object({
            field: Joi.string().regex(new RegExp(`.*field$`)),
        })
            .unknown()
            .describe();
        expect(generateJoi(mockFieldFilter).describe()).toStrictEqual(mockSchema);
    });
    it(`returns the correct schema for an _regex match with null value`, () => {
        const mockFieldFilter = { field: { _regex: null } };
        const mockSchema = Joi.object({
            field: Joi.any().equal(true),
        })
            .unknown()
            .describe();
        expect(generateJoi(mockFieldFilter).describe()).toStrictEqual(mockSchema);
    });
});
