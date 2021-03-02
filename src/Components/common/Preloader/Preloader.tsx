import styles from "../../Users/users.module.css";
import preloaderImg from "../../../img/loading/preloader.svg";
import React from "react";


let Preloader = () => {
    return <div
        className={styles.preloader}>
        <img src={preloaderImg}/>
    </div>
}


export default Preloader