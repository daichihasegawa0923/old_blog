import { ValidationChecker } from "src/validation/validation.checker";
import { ValidationErrorMessage } from "src/validation/validation.error";

export type RegisterCommand = {
    name: string;
    mailAddress: string;
    password: string;
}

export class RegisterValidation {
    public readonly mailAddress: ValidationChecker = {
        code: 'mailaddress',
        regex: {
            value: /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/,
            error: {message: 'メールアドレスの形式が正しくありません。'}
        },
        required: {
            value: true,
            error: {message: '必須項目です。'}
        }
    } 
    public readonly password: ValidationChecker = {
        code: 'password',
        lengthMin: {
            value: 6,
            error: {message: 'パスワードは6文字以上で入力してください。'}
        },
        lengthMax: {
            value: 20,
            error: {message: 'パスワードは20文字以内で入力してください。'}
        },
        required: {
            value: true,
            error: {message: '必須項目です。'}
        }
    }
    public readonly name: ValidationChecker = {
        code: 'name',
        lengthMin: {
            value: 3,
            error: {message: 'ユーザー名は3文字以上で入力してください。'}
        },
        lengthMax: {
            value: 15,
            error: { message: 'ユーザー名は15文字以内で入力してください。'}
        },
        required: {
            value: true,
            error: {message: '必須項目です。'}
        }
    }
}