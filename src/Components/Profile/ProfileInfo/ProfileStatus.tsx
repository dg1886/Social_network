import React from 'react';
import s from './ProfileInfo.module.css';

type ProfileStatusType = {
    status: string
}

class ProfileStatus extends React.Component<ProfileStatusType> {

    state = {
        editMode: false
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
    }

    render() {
        return (
        <>
            {!this.state.editMode &&
            <div>
                <span onDoubleClick={this.activateEditMode}>{this.props.status}</span>
            </div>
            }
            {this.state.editMode &&
            <div>
                <input onBlur={this.deactivateEditMode}
                       autoFocus={true}
                       value={this.props.status}/>
            </div>
            }
        </>
        )
    }
}

export default ProfileStatus;