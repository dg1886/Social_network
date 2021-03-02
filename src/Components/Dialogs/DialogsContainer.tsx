import React, {Dispatch} from "react";

import {StateType, StoreType} from "../../redux/store";
import {sendMessageCreator, updateNewMessageBodyCreator} from "../../redux/dialogs-reducer";
import store from "../../redux/redux-store";
import Dialogs from "./Dialogs";
import { connect } from "react-redux";

// type DialogsPropsType = {
//     store: StoreReduxType | null
// }


let mapStateToProps = (state: StateType) => {
return {
    dialogsPage: state.messagesPage
}
}

let mapDispatchToProps = (dispatch: typeof store.dispatch) => {
return {
    updateNewMessageBody: (body: string) => {
        dispatch(updateNewMessageBodyCreator(body))
    },
    SendMessage: () => {
        dispatch(sendMessageCreator())
    }
}
}

let DialogsContainer = connect(mapStateToProps, mapDispatchToProps) (Dialogs)

export default DialogsContainer


// const DialogsContainer = (props: any) => {
//
//
//     return (
//         <StoreContext.Consumer>
//             {(store: any) => {
//                 let onSendMessageClick = () => {
//                     store.dispatch(sendMessageCreator())
//                 }
//                 let onNewMessageChange = (body: string) => {
//                     store.dispatch(updateNewMessageBodyCreator(body))
//                 }
//
//                 return <Dialogs
//                     updateNewMessageBody={onNewMessageChange}
//                     SendMessage={onSendMessageClick}
//                     // store={props.store}
//                 />
//             }
//             }
//         </StoreContext.Consumer>
//     )
// }



/*type DialogsPropsType = {
    store: StoreReduxType
}


const DialogsContainer = (props: DialogsPropsType) => {

    let onSendMessageClick = () => {
        props.store.dispatch(sendMessageCreator())
    }
    let onNewMessageChange = (body: string) => {
        props.store.dispatch(updateNewMessageBodyCreator(body))
    }

    return (
        <Dialogs updateNewMessageBody={onNewMessageChange}
                 SendMessage={onSendMessageClick}
                 store={props.store}
        />
    )
}*/






