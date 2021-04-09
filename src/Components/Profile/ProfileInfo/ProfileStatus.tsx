import React from 'react';
import s from './ProfileInfo.module.css';

type ProfileStatusType = {
    status: string
    updateStatus: (status: string) => void
}

class ProfileStatus extends React.Component<ProfileStatusType> {

    state = {
        editMode: false,
        status: this.props.status
    }

    activateEditMode = () => {        // метод класса
        this.setState(
            {editMode: true}
        )
    }
    deactivateEditMode = () => {        // метод класса
        this.setState(
            {editMode: false}
        )
        this.props.updateStatus(this.state.status)
    }
    onStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            status: e.currentTarget.value
        })
    }
    componentDidUpdate(prevProps: Readonly<ProfileStatusType>, prevState: Readonly<{}>) {
        if(prevProps.status !== this.props.status) {
            this.setState({
                status: this.props.status
            })
        }
    }

    render() {
        return (
        <>
            {!this.state.editMode &&
            <div>
                {/*{this.props.status !== '' ? <span onDoubleClick={this.activateEditMode}>{this.props.status}</span> : <span onDoubleClick={this.activateEditMode}>{'not status'}</span> }*/}
                <span onDoubleClick={this.activateEditMode}>{this.props.status || 'No status'}</span>
            </div>
            }
            {this.state.editMode &&
            <div>
                <input onBlur={this.deactivateEditMode}
                       autoFocus={true}
                       value={this.state.status}
                       onChange={this.onStatusChange}
                />
            </div>
            }
        </>
        )
    }
}

export default ProfileStatus;