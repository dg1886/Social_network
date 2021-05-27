import React, {ChangeEvent} from 'react';
import s from './ProfileInfo.module.css';
import Preloader from "../../common/Preloader/Preloader";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import userPhoto from "../../../img/ava/mainAva.jpg"
import {ProfileType} from "../../../redux/profile-reducer";

type ProfileInfoPropsType = {
    profile: ProfileType | null
    status: string
    updateStatus: (status: string) => void
    isOwner: boolean
    savePhoto: (file: File) => void
    // saveProfile: (profile: ProfileType) => Promise<any>
}

const ProfileInfo = (props: ProfileInfoPropsType) => {
    if(!props.profile) {
        return <Preloader/>
    }

    const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            props.savePhoto(e.target.files[0]);
        }
    }

    return (
        <div>
            {/*<div>*/}
            {/*    <img src= {'https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg?auto=compress&cs=tinysrgb&h=350'}/>*/}
            {/*</div>*/}
            <div className = {s.descriptionBlock}>
                <img src={props.profile.photos.large || userPhoto} alt="User photo" className={s.mainPhoto}/>
                {props.isOwner && <input type="file" onChange={onMainPhotoSelected}/> }
                <div>
                    <div>
                        <b>Full name</b>: {props.profile.fullName}
                    </div>
                    <div>
                        <b>Looking for a job</b>: {props.profile.lookingForAJob ? 'yes' : 'no'}
                    </div>
                    {props.profile.lookingForAJob &&
                    <div>
                        <b>My professional skills</b>: {props.profile.lookingForAJobDescription}
                    </div>
                    }
                    <div>
                        <b>About me</b>: {props.profile.aboutMe}
                    </div>
                    <div>
                        <b>Status</b>: {<ProfileStatusWithHooks status={props.status}
                                                                updateStatus={props.updateStatus}/>}
                    </div>
                </div>




                {/*<ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus}/>*/}
                {/*<div>{props.profile.lookingForAJob}</div>*/}
                {/*<div>{props.profile.lookingForAJobDescription}</div>*/}

            </div>
        </div>
    )
}

export default ProfileInfo;