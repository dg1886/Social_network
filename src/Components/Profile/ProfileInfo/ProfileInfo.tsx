import React from 'react';
import s from './ProfileInfo.module.css';
import Preloader from "../../common/Preloader/Preloader";



const ProfileInfo = (props: any) => {
    if(!props.profile) {
        return <Preloader/>
    }
    console.log(props.profile.contacts)
    return (
        <div>
            <div>
                <img src= {'https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg?auto=compress&cs=tinysrgb&h=350'}/>
            </div>
            <div className = {s.descriptionBlock}>
                <img src={props.profile.photos.large} alt="User photo"/>
                <div>User name: {props.profile.fullName}</div>
                {/*<div>{props.profile.lookingForAJob}</div>*/}
                {/*<div>{props.profile.lookingForAJobDescription}</div>*/}
                ava + description
            </div>
        </div>
    )
}

export default ProfileInfo;