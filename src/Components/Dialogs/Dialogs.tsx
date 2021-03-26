import React, {ChangeEvent, KeyboardEvent} from "react";
import s from './Dialogs.module.css'
// import { NavLink } from 'react-router-dom';
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import store, {rootAppStateType, StoreReduxType} from "../../redux/redux-store";
import { Redirect } from "react-router-dom";


type DialogsPropsType = {
    updateNewMessageBody: (body: string) => void
    SendMessage: () => void
    isAuth: boolean
}


const Dialogs = (props: DialogsPropsType) => {

    // props.store.dispatch(sendMessageCreator())

    // let dialogsElements = props.store.getState().messagesPage.dialogs.map(d => <DialogItem name={d.name} id={d.id}/>)
    // let messagesElements = props.store.getState().messagesPage.messages.map(m => <Message message={m.message}/>)
    // let newMessageBody = props.store.getState().messagesPage.newMessageBody
    let dialogsElements = store.getState().messagesPage.dialogs.map(d => <DialogItem name={d.name} id={d.id}/>)
    let messagesElements = store.getState().messagesPage.messages.map(m => <Message message={m.message}/>)
    let newMessageBody = store.getState().messagesPage.newMessageBody

    let onSendMessageClick = () => {
        props.SendMessage()
    }

    let onNewMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        props.updateNewMessageBody(e.currentTarget.value)
    }

    let onKeyPressHandler = (event: KeyboardEvent<HTMLTextAreaElement>) => {
        if ((event.ctrlKey) && (event.charCode === 13)) {
            props.SendMessage();
        }
    }

    if(props.isAuth === false) return <Redirect to = {'/login'}/>

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>

            <div className={s.messages}>
                <div>{messagesElements}</div>
                <div>
                    <div>
                        <textarea value={newMessageBody}
                                  onChange={onNewMessageChange}
                                  onKeyPress={onKeyPressHandler}
                                  placeholder='Enter your message'
                        />
                    </div>
                    <div>
                        <button onClick={onSendMessageClick}>Send</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dialogs







