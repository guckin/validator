import {cast} from "./utilities/cast";

export type Validator<T> =
    T extends object ? ObjectValidator<T> :
        T extends string ? StringValidator<T> :
            T extends number ? NumberValidator<T> :
                never;

export type ObjectValidatorMapping<Type extends object> = {
    [Key in keyof Type]: Validator<Type[Key]>;
}

export interface ObjectValidator<Type extends object> {
    validate: (value: unknown) => value is Type;
}

export function object<Type extends object>(mapping: ObjectValidatorMapping<Type>): ObjectValidator<Type> {
    return {
        validate(value: unknown): value is Type {
            if (value instanceof Object) {
                const entries: [keyof Type, Validator<Type[keyof Type]>][] = cast(Object.entries(mapping));

                return entries.every(([key, val]) => val.validate(cast<{[_ in keyof Type]: unknown}>(value)[key]));
            }

            return false
        }
    };
}

export interface StringValidator<Str extends string> {
    validate: (value: unknown) => value is Str;
}

export function string<Str extends string>({}: {} = {}): StringValidator<Str> {
    return {
        validate(value): value is Str {
            return typeof value === 'string';
        }
    };
}

export interface NumberValidator<Num extends number> {
    validate: (value: unknown) => value is Num;
}

export function number<Num extends number>(): NumberValidator<Num> {
    return {
        validate(value): value is Num {
            return typeof value === 'number'
        }
    };
}
