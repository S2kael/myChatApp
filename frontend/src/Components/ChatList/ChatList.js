import React from 'react';

function ChatList(){
    return (
        <div>
            <div className="top">
                <form>
                    <input type="search" className="form-control" placeholder="Search" />
                    <button type="submit" className="btn prepend"><i data-eva="search" /></button>
                </form>
                <ul className="nav" role="tablist">
                    <li><a href="#direct" className="filter-btn active" data-toggle="tab" data-filter="direct">Group</a></li>
                    {/* <li><a href="#groups" className="filter-btn" data-toggle="tab" data-filter="groups">Groups</a></li> */}
                </ul>
            </div>
            <div className="middle">
                <h4>Chat</h4>
                <button type="button" className="btn round" data-toggle="modal" data-target="#creategroup">
                    <i className="fas fa-pen"></i></button>
                <hr />
                <ul className="nav discussions" role="tablist">
                    {/* {'{'}% include 'pages/polls/ChatList/FriendList.html' %{'}'} */}
                    {/* {'{'}% include 'pages/polls/ChatList/GroupList.html' %{'}'} */}
                </ul>
            </div>
        </div>
    );
}

export default ChatList;
