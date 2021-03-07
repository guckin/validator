import {number, object, string} from '../src';

describe('Validator', () => {

    describe('String', () => {
        [
            {
                description: 'passes validation',
                passesValidation: true,
                value: 'string',
                validator: string()
            },
            {
                description: 'fails validation when not given a string',
                passesValidation: false,
                value: {not: 'a string'},
                validator: string()
            }
        ].forEach(({value, validator, passesValidation, description}) => {
            it(description, () => {
                expect(validator.validate(value)).toEqual(passesValidation);
            });
        });
    });

    describe('Number', () => {
        [
            {
                description: 'passes validation',
                passesValidation: true,
                value: 'string',
                validator: string()
            },
            {
                description: 'fails validation when not given a number',
                passesValidation: false,
                value: 'not a number',
                validator: number()
            }
        ].forEach(({value, validator, passesValidation, description}) => {
            it(description, () => {
                expect(validator.validate(value)).toEqual(passesValidation);
            });
        });
    });

    describe('Object', () => {
        [
            {
                description: 'passes validation',
                passesValidation: true,
                value: {
                    foo: 'hi',
                    bar: 5
                },
                validator: object({
                    foo: string(),
                    bar: number()
                })
            },
            {
                description: 'handles nested objects',
                passesValidation: true,
                value: {
                    foo: {
                        nested: {
                            doubleNested: 'value'
                        }
                    },
                    bar: 5
                },
                validator: object({
                    foo: object({
                        nested: object({
                            doubleNested: string()
                        })
                    }),
                    bar: number()
                })
            },
            {
                description: 'fails validation when given a number',
                passesValidation: false,
                value: 5,
                validator: object({
                    foo: string(),
                    bar: number()
                })
            },
            {
                description: 'fails validation when given a string',
                passesValidation: false,
                value: 'something',
                validator: object({
                    foo: string(),
                    bar: number()
                })
            },
            {
                description: 'fails validation when the object is not correct',
                passesValidation: false,
                value: {
                    foo: 'foo',
                    bar: 'bar'
                },
                validator: object({
                    foo: string(),
                    bar: number()
                })
            }
        ].forEach(({value, validator, passesValidation, description}) => {
            it(description, () => {
                expect(validator.validate(value)).toEqual(passesValidation);
            });
        });

        it('has type inference', () => {
            const someValue: unknown = 'anything';
            const validator = object({
                bar: string(),
                baz: number()
            });

            function expectItToInferTheType(_: {bar: string, baz: number}) {}

            if(validator.validate(someValue)) {
                expectItToInferTheType(someValue);
            }
        })

    });
});
