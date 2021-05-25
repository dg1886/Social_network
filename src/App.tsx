import React from 'react';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import {BrowserRouter, Route, withRouter, RouteComponentProps} from 'react-router-dom';
import {StateActionsTypes, StateType} from './redux/store';
import {rootAppStateType, StoreReduxType} from "./redux/redux-store";
// import DialogsContainer from "./Components/Dialogs/DialogsContainer";
import UsersContainer from "./Components/Users/UsersContainer";
// import ProfileContainer from "./Components/Profile/ProfileInfo/ProfileContainer";
import HeaderContainer from "./Components/Header/HeaderContainer";
import Login from "./Components/Login/login";
import {connect} from "react-redux";
import {compose} from "redux";
import {initializeApp} from "./redux/app-reducer";
import Preloader from "./Components/common/Preloader/Preloader";
import {withSuspense} from "./hoc/withSuspense";


const DialogsContainer = React.lazy( () => import ("./Components/Dialogs/DialogsContainer"))
const ProfileContainer = React.lazy( () => import ("./Components/Profile/ProfileInfo/ProfileContainer"))
const SuspendedDialogs = withSuspense(DialogsContainer)
const SuspendedProfile = withSuspense(ProfileContainer)

export type AppType = {
    store: StoreReduxType
    state: StateType
    // addPost: () => void
    // updateNewPostText: (newText: string) => void
    dispatch: (action: StateActionsTypes) => void
}
type AppMapStateToPropsType = {
    initialized: boolean
}
type AppMapDispatchToPropsType = {
    initializeApp: () => void
}
type AppPropsType = AppMapDispatchToPropsType & AppMapStateToPropsType

class App extends React.Component<AppPropsType> {

    componentDidMount() {
        this.props.initializeApp()
    }

render() {
        if (!this.props.initialized)
        {return <Preloader/>}
    return (
        <BrowserRouter>
            <div className='app-wrapper'>
                <HeaderContainer/>
                <Navbar/>
                <div className='app-wrapper-content'>
                    <Route path='/dialogs' render={ () => <SuspendedDialogs/>}/>
                    <Route path='/profile/:userId?'
                           render={() => <SuspendedProfile/>
                           }/>
                    <Route path='/users' render={() => <UsersContainer/>}/>

                    <Route path='/login' render={() => <Login/>}/>
                </div>
            </div>
        </BrowserRouter>);
}
}
const MapStateToProps = (state: rootAppStateType) => ({
    initialized: state.app.initialized
})

export default compose<React.ComponentType>(withRouter,
    connect(MapStateToProps, {initializeApp})) (App)


// <BrowserRouter>
//     <div className='app-wrapper'>
//         <Header/>
//         <Navbar/>
//         <div className='app-wrapper-content'>
//             <Route path='/dialogs' render={ () => <DialogsContainer store={store}  />}/>
//             <Route path='/profile' render={ () => <Profile
//                 store={store}/>
//             }/>
//         </div>
//     </div>
// </BrowserRouter>