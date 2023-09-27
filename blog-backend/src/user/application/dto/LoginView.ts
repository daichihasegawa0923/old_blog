import { ValidationChecker } from "src/validation/validation.checker";

export class RegisterView {
    public mailAddress: string;
    public password: string;
    public name: string;
}

class RegisterValidation {
    private mailAddress: ValidationChecker = {
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
    private password: ValidationChecker = {
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
    private name: ValidationChecker = {
        code: 'name',
        lengthMin: {
            value: 3,
            error: {message: 'パスワードは6文字以上で入力してください。'}
        },
        lengthMax: {
            value: 15,
            error: { message: 'パスワードは20文字以内で入力してください。'}
        },
        required: {
            value: true,
            error: {message: '必須項目です。'}
        }
    }
}