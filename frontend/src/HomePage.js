import React, {useEffect,useContext} from 'react';
import ChatList from './Components/ChatList/ChatList';
import FriendList from './Components/FriendList/FriendList';
import Notification from './Components/Notification/Notification';
import Setting from './Components/Setting/Setting';
import AddFriend from './Components/AddFriend/AddFriend';
import CreateGroup from './Components/CreateGroup/CreateGroup';
import Chat from './Components/Chat/Chat';
import { withRouter } from 'react-router-dom';
import AppContext from './Context/Context'


function HomePage(props) {
    const context = useContext(AppContext)
    if(context.user.email ==null){
        props.history.push('/signin')
    }
    const link = document.createElement('link');
    link.href = "/asset/css/dark.min.css";
    link.id = "dark";
    link.type = "text/css";
    link.rel="stylesheet";

    if (localStorage.getItem('dark') === null){
        localStorage.setItem('dark','false');
    }

    function onClickHandlerDark(){
        if (localStorage.getItem('dark') === 'true'){
            localStorage.setItem('dark','false');
            if (document.querySelector('#dark') !== null){
                document.querySelector('#dark').remove();
            };
        } else{
            localStorage.setItem('dark','true');
            document.head.append(link);
        }
    }


    useEffect(() =>{
        if (localStorage.getItem('dark') === 'true'){
            document.head.append(link);
        }
    },[])
    

    return (
    <div className="layout">
        {/* Start of Navigation */}
        <nav className="navigation">
            <div className="container">
                <a className="logo" rel="home"><img src="./asset/images/logo.png" alt="logo" /></a>
                <ul className="nav" role="tablist">
                    <li><a href="#conversations" className="active" data-toggle="tab" role="tab"
                            aria-controls="conversations" aria-selected="true"><i className="awesome fas fa-2x fa-comment"></i></a></li>
                    <li>
                    <a href="#friends" data-toggle="tab" role="tab" aria-controls="friends" aria-selected="false">
                        <i className="awesome fas fa-2x fa-user-friends"></i>
                    </a>
                    </li>
                    <li><a href="#notifications" data-toggle="tab" role="tab" aria-controls="notifications"
                            aria-selected="false"><i className="awesome fas fa-2x fa-bell"></i></a></li>
                    <li>
                        <a href="#settings" data-toggle="tab" role="tab" aria-controls="settings" aria-selected="false">
                            <i className="awesome fas fa-2x fa-cog"></i>
                        </a>
                    </li>
                    <li>
                        <button type="button" className="btn mode" onClick={onClickHandlerDark}>
                            <i className="awesome fas fa-2x fa-lightbulb"></i>
                        </button>
                    </li>
                    <li>
                        <button type="button" className="btn"><img src={context.user.avatar}
                                alt="avatar" /><i data-eva="radio-button-on" /></button>
                    </li>
                </ul>
            </div>
        </nav>
        {/* End of Navigation */}
        {/* Start of Sidebar */}
        <div className="sidebar">
            <div className="container">
                <div className="tab-content">
                    <div className="tab-pane fade show active" id="conversations" role="tabpanel">
                        <ChatList/>
                    </div>
                    <div className="tab-pane fade " id="friends" role="tabpanel">
                        <FriendList/>
                    </div>
                    <div className="tab-pane fade" id="notifications" role="tabpanel">
                        <Notification/>
                    </div>
                    <div className="tab-pane fade " id="settings" role="tabpanel">
                        <Setting/>
                    </div>
                </div>
            </div>
        </div>
        {/* End of Sidebar */}
        {/* Start of Chat */}
        <div className="chat open">
            <div className="tab-content">
                <Chat/>
            </div>
        </div>
        {/* End of Chat */}
        {/* Start of Compose */}
        <AddFriend />
        <CreateGroup />
        {/* End of Compose */}
    </div>
  );
}

export default withRouter(HomePage);
