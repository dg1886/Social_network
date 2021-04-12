
import {MessagePageType, StateActionsTypes} from "./store";

// export const UPDATE_NEW_MESSAGE_BODY = 'UPDATE-NEW-MESSAGE-BODY';
export const SEND_MESSAGE = 'SEND-MESSAGE';

export type DialogsActionsTypes =   | ReturnType<typeof sendMessageCreator>

let initialState = {
    dialogs: [
        {id: 1, name: 'Igar FatPunch'},
        {id: 2, name: 'Sizy Dog'},
        {id: 3, name: 'Sashka Pravoslavnenky'},
        {id: 4, name: 'Sashka Veter'},
        {id: 5, name: 'Martin Borman'},
        {id: 6, name: 'Michail Redwood'}
    ],
    messages: [
        {id: 1, message: 'What a fuck?'},
        {id: 2, message: 'All Cops Are Bastards'},
        {id: 3, message: 'Yo nigga!'}
    ]
    // newMessageBody: ''
}

const dialogsReducer = (state: MessagePageType = initialState, action: StateActionsTypes) => {
let stateCopy
    switch (action.type) {
        // case UPDATE_NEW_MESSAGE_BODY: {
        //     return {
        //         ...state,
        //         newMessageBody: action.body
        //     }
        //     // state.newMessageBody = action.body
        //
        // }
        case SEND_MESSAGE: {
            let body = action.newMessageBody
            return {
                ...state,
                // newMessageBody: '',
                messages: [...state.messages, {id: 4, message: body}]
            }
        }
        default:
            return state
    }
}

export const sendMessageCreator = (newMessageBody: string) => ({type: SEND_MESSAGE, newMessageBody }) as const
// export const updateNewMessageBodyCreator = (body: string) => {
//     return {
//         type: UPDATE_NEW_MESSAGE_BODY,
//         body: body
//     } as const
// }

export default dialogsReducer