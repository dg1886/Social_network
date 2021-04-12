import React from "react";
import {InjectedFormProps, reduxForm} from "redux-form";
import {Field} from "redux-form";

export type FormDataType = {
    login: string
    password: string
    rememberMe: boolean
}

const LoginForm: React.FC<InjectedFormProps<FormDataType>> = (props) => {

    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field placeholder={'Login'} name={'login'} component={'input'}/>
            </div>

            <div>
                <Field placeholder={'Password'} name={'password'} component={'input'}/>
            </div>

            <div>
                <Field type={'checkbox'} name={'rememberMe'} component={'input'}/>
            </div>

            <div>
                <button>Login</button>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm<FormDataType>({
    // a unique name for the form
    form: 'login'
})(LoginForm)

export default LoginReduxForm