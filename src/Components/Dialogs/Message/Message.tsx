import React from "react";
import s from './../Dialogs.module.css';



export type DialogMassage = {
    message: string
}



const Message = (props: DialogMassage) => {
    return (
        <div className={s.dialog}>{props.message}</div>
    )
}



export default Message







