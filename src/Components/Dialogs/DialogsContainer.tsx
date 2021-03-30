import React from "react";
import {sendMessageCreator, updateNewMessageBodyCreator} from "../../redux/dialogs-reducer";
import store, {rootAppStateType} from "../../redux/redux-store";
import Dialogs from "./Dialogs";
import { connect } from "react-redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";

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

compose(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect,

)(Dialogs)

// let AuthRedirectComponent = withAuthRedirect(Dialogs)
//
// let DialogsContainer = connect(mapStateToProps, mapDispatchToProps) (AuthRedirectComponent)

export default compose<React.ComponentType>(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect,

)(Dialogs)







