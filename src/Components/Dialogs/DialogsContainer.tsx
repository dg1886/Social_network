import React from "react";
import {sendMessageCreator, updateNewMessageBodyCreator} from "../../redux/dialogs-reducer";
import store, {rootAppStateType} from "../../redux/redux-store";
import Dialogs from "./Dialogs";
import { connect } from "react-redux";
import {Redirect} from "react-router-dom";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";

// type DialogsPropsType = {
//     store: StoreReduxType | null
// }


let mapStateToProps = (state: rootAppStateType) => {
return {
    dialogsPage: state.messagesPage,
    // isAuth: state.auth.isAuth
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
let AuthRedirectComponent = withAuthRedirect(Dialogs)

let DialogsContainer = connect(mapStateToProps, mapDispatchToProps) (AuthRedirectComponent)

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






