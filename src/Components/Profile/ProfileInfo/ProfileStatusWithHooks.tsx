import React, {useEffect, useState} from 'react';
import s from './ProfileInfo.module.css';

type ProfileStatusType = {
    status: string
    updateStatus: (status: string) => void
}

const ProfileStatusWithHooks = (props: ProfileStatusType) => {


    let [editMode, setEditMode] = useState(false)
    let [status, setStatus] = useState(props.status)

    useEffect( () => {
        setStatus(props.status)
    }, [props.status])

    const activateEditMode = () => {
       setEditMode(true)
    }

    const deactivateEditMode = () => {
        setEditMode(false)
        props.updateStatus(status)
    }
    const onStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.value)
    }
   /* componentDidUpdate(prevProps: Readonly<ProfileStatusType>, prevState: Readonly<{}>) {
        if(prevProps.status !== this.props.status) {
            this.setState({
                status: this.props.status
            })
        }
    }*/


        return (
        <>
            {!editMode &&
            <div>
                {/*{this.props.status !== '' ? <span onDoubleClick={this.activateEditMode}>{this.props.status}</span> : <span onDoubleClick={this.activateEditMode}>{'not status'}</span> }*/}
                <span onDoubleClick={activateEditMode}>{props.status || 'No status'}</span>
            </div>
            }
            {editMode &&
            <div>
                <input onBlur={deactivateEditMode}
                       autoFocus={true}
                       value={status}
                       onChange={onStatusChange}
                />
            </div>
            }
        </>
        )
}

export default ProfileStatusWithHooks;