import React,{useState} from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom' 
import Register from './Components/Register/Register';
import Signin from './Components/SignIn/SignIn'
import AppContext from './Context/Context';
import {getUser,logout,setUserCookies} from './Helper/auth';
import HomePage from './HomePage';


const App = () => {
    const userCookies = getUser();
    const [user, setUser] = useState({
        email: userCookies ? userCookies.email : null,
        username: userCookies ? userCookies.username : null,
        fullname: userCookies ? userCookies.fullname : null,
        avatar: userCookies ? userCookies.avatar : null,
        userid: userCookies ? userCookies.userid : null
    })
    const host = "http://192.168.1.2:8000";

    const changeUser = (state) =>{
        setUserCookies(state.email, state.username, state.fullname, state.avatar,state.userid);
        setUser({...state});
    }
    return(
        <AppContext.Provider value={{
            user,
            host,
            setUser,
            changeUser
        }} >
            <div  className='index'>
                <Router>
                    <Switch>
                    <Route exact path="/">
                        <HomePage />
                    </Route>
                    <Route path="/signin">
                        <Signin />
                    </Route>
                    <Route path="/register">
                        <Register />
                    </Route>
                    </Switch>
                </Router>
            </div>
        </AppContext.Provider>

    )
}

export default App;
