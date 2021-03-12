import React from 'react';
import './App.css';
import Header from './Components/Header/Header';
import Navbar from './Components/Navbar/Navbar';
import {BrowserRouter, Route} from 'react-router-dom';
import {StateActionsTypes, StateType} from './redux/store';
import {StoreReduxType} from "./redux/redux-store";
import DialogsContainer from "./Components/Dialogs/DialogsContainer";
import UsersContainer from "./Components/Users/UsersContainer";
import ProfileContainer from "./Components/Profile/ProfileInfo/ProfileContainer";


export type AppType = {
    store: StoreReduxType
    state: StateType
    // addPost: () => void
    // updateNewPostText: (newText: string) => void
    dispatch: (action: StateActionsTypes) => void
}

const App = () => {

    return (
        <BrowserRouter>
            <div className='app-wrapper'>
                <Header/>
                <Navbar/>
                <div className='app-wrapper-content'>
                    <Route path='/dialogs' render={ () => <DialogsContainer/>}/>
                    <Route path='/profile/:userId?'
                           render={ () => <ProfileContainer />
                    }/>
                    <Route path='/users' render={ () => <UsersContainer />
                    }/>
                </div>
            </div>
        </BrowserRouter>);
}

export default App;


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