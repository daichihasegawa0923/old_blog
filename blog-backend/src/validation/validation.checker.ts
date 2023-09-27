import { HttpException, HttpStatus } from "@nestjs/common";
import { z, ZodError, ZodString } from "zod";
import { ValidationError, ValidationErrorMessage } from "./validation.error";

export type ValidationChecker = {
    code: string;
    required?: ValidationSet<boolean>;
    regex?: ValidationSet<RegExp>;
    lengthMin?: ValidationSet<number>;
    lengthMax?: ValidationSet<number>;
    lengthFix?: ValidationSet<number>;
    numberMin?: ValidationSet<number>;
    numberMax?: ValidationSet<number>;
}

const safix = "Validation";
const empty: ValidationErrorMessage = {message: ''};

export const validate = (command: any, commandValidation: any) => {
    const keys = Object.keys(command);
    const validationKeys = Object.keys(commandValidation);
    const result = keys
    .map(targetKey => {
        const validator = validationKeys.find(key => key === targetKey);
        if (!validator) return empty;
        const checker = commandValidation[targetKey] as unknown as ValidationChecker;
        return {code: targetKey, ...test(targetKey, command[targetKey], checker)};
    });
    const params = result.filter(r => r.message !== '');
    if (params.length === 0) return;
    throw new HttpException(params, HttpStatus.BAD_REQUEST);
}

 const test = (key: string, input: number | string, checker: ValidationChecker)
  : ValidationError | null => {
    try {
        if (typeof(input) === 'string') {
            getSchemaStr(checker).parse(input);
            return {code: key, ...empty};
        }
        getSchemaNum(checker).parse(input);
        const toStr = input.toString();
        getSchemaStr(checker).parse(input);
    } catch(e: unknown) {
        if (e instanceof ZodError) {
            return {code: key, message: e.issues[0].message};
        }
    }
    return {code: key, ...empty};
}

type ValidationSet<T> = {
    value: T;
    error: ValidationErrorMessage;
}

const getSchemaStr = (check: ValidationChecker): z.ZodString => {
    let zSchema = z.string();
    if (check.lengthMin) {
        const set = getValueMessage(check.lengthMin);
        zSchema = zSchema.min(set.value, set.message);
    }
    if (check.lengthMax) {
        const set = getValueMessage(check.lengthMax)
        zSchema = zSchema.max(set.value, set.message);
    }
    if (check.lengthFix) {
        const set = getValueMessage(check.lengthFix)
        zSchema = zSchema.length(set.value, set.message);
    }
    if (check.regex) {
        const set = getValueMessage(check.regex);
        zSchema = zSchema.regex(set.value, set.message);
    }
    if (check.required) {
        const set = getValueMessage(check.required);
        zSchema = zSchema.nonempty();
    }
    return zSchema;
};

const getSchemaNum = (check: ValidationChecker): z.ZodNumber => {
    let zSchema = z.number();
    if (check.numberMin) {
        const set = getValueMessage(check.lengthMin);
        zSchema = zSchema.min(set.value, set.message);
    }
    if (check.numberMax) {
        const set = getValueMessage(check.lengthMax)
        zSchema = zSchema.max(set.value, set.message);
    }
    return zSchema;
}

const getValueMessage = <T>(set: ValidationSet<T>) => {
    const {value, error: {message}} = set;
    return {value, message};
}