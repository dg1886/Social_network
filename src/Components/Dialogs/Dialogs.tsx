import React, {ChangeEvent, KeyboardEvent} from "react";
import s from './Dialogs.module.css'
// import { NavLink } from 'react-router-dom';
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import store, {rootAppStateType, StoreReduxType} from "../../redux/redux-store";
import {Redirect} from "react-router-dom";
import {reduxForm, Field, InjectedFormProps} from "redux-form";
import {Textarea} from "../common/FormsControls/FormsControls";
import {maxLengthCreator, requiredField} from "../../utils/validators/validators";



type DialogsPropsType = {
    updateNewMessageBody: (body: string) => void
    SendMessage: (values: string) => void
    isAuth: boolean

}
export type DialogsFormDatatype = {
    newMessageBody: string
    addNewMessage: (values: string) => void
}


const Dialogs = (props: DialogsPropsType) => {

    let dialogsElements = store.getState().messagesPage.dialogs.map(d => <DialogItem name={d.name} id={d.id}/>)
    let messagesElements = store.getState().messagesPage.messages.map(m => <Message message={m.message}/>)
    // let newMessageBody = store.getState().messagesPage.newMessageBody

    // let onSendMessageClick = () => {
    //     props.SendMessage()
    // }


    // let onNewMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    //     props.updateNewMessageBody(e.currentTarget.value)
    // }

    // let onKeyPressHandler = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    //     if ((event.ctrlKey) && (event.charCode === 13)) {
    //         props.SendMessage();
    //     }
    // }


    let addNewMessage = (values: any) => {
        props.SendMessage(values.newMessageBody)
    }

    if (props.isAuth === false) return <Redirect to={'/login'}/>

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>

            <div className={s.messages}>
                <div>{messagesElements}</div>
            </div>
            <AddMessageFormRedux onSubmit={addNewMessage}/>
        </div>
    )
}

const maxLength70 = maxLengthCreator(70)

const AddMessageForm: React.FC<InjectedFormProps<DialogsFormDatatype>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={Textarea}
                       validate={[requiredField, maxLength70]}
                       name={'newMessageBody'}
                       placeholder={'Enter your message'}/>
            </div>
            <div>
                <button>Send</button>
            </div>
        </form>
    )
}

const AddMessageFormRedux = reduxForm<DialogsFormDatatype>(
    {form: 'dialogAddMessageForm'}) (AddMessageForm)

export default Dialogs







