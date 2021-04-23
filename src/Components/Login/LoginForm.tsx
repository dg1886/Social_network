import React from "react";
import {InjectedFormProps, reduxForm} from "redux-form";
import {Field} from "redux-form";
import {Input} from "../common/FormsControls/FormsControls";
import {requiredField} from "../../utils/validators/validators";

export type FormDataType = {
    login: string
    password: string
    rememberMe: boolean
}

const LoginForm: React.FC<InjectedFormProps<FormDataType>> = (props) => {

    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field placeholder={'Login'}
                       name={'login'}
                       component={Input}
                       validate={[requiredField]}
                />
            </div>

            <div>
                <Field placeholder={'Password'}
                       name={'password'}
                       component={Input}
                       validate={[requiredField]}
                />
            </div>

            <div>
                <Field type={'checkbox'} name={'rememberMe'} component={Input}/>
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