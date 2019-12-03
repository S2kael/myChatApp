import React, { useState, useContext } from 'react';
import WebSocketInstance from '../../WebSocket';
import axios from 'axios';
import Message from '../Message/Message';
import AppContext from '../../Context/Context';

const Chat = (props) => {
    const [messages, setMessages] = useState([])
    const [message, setMessage] = useState('')
    WebSocketInstance.connect('public');
    waitForSocketConnection(() => {
        WebSocketInstance.addCallbacks(addMessage)
    });
    const context = useContext(AppContext);
    const waitForSocketConnection = (callback) => {
        const component = this;
        setTimeout(
            function () {
            if (WebSocketInstance.state() === 1) {
                console.log("Connection is made")
                callback('public');
                return;
            } else {
                console.log("wait for connection...")
                component.waitForSocketConnection(callback);
            }
        }, 10);
    }

    const addMessage = (message) => {
        setMessages([...messages, message])
    }

    const shiftKey=false;
    const backspace = false;

    const messageOnKeyPressHandler = (event) =>{
        if (event.shiftKey) {
            if((event.keyCode === 13 || event.which === 13  )){
                shiftKey=true;
            }else{
                shiftKey=false;
            }
        }else{
            if (event.keyCode === 13 || event.which === 13  ){
                sendMessageHandler();
            }
            shiftKey=false;
        }
    }

    const messageOnKeyUpHandler = (event) =>{
        if(event.key == "Backspace" || event.which === 8  ){
            this.backspace=true;
        }else{
            this.backspace=false;
        }
    }
    

    const messageChangeHandler = (event) =>  {
        let value = event.target.value;
        if (shiftKey){
            setMessage(value)
        }else{
            if(this.backspace){
                setMessage(value)
            }else{
                if(value[value.length-1] !== '\n'){
                    setMessage(value)
                }
            }
        }
    }

    const sendMessageHandler = () =>{
        const messageObject = {
            group: "public",
            content: message,
            author: props.user.userid
        };
        WebSocketInstance.newChatMessage(messageObject);
        setMessage('')
    }

    let data;
    const renderMessages = (messages) => {
        // axios.post(`${this.context.host}/api/user/`)
        //     .then(res=>{
        //         this.data = JSON.parse(res)
        //     })
        let listMessages = [];
        messages.map((message, i) => {
            if (message.author !== ''){
                listMessages.push(<Message key = {i} timestamp = {message.created_at} currentUser = {props.user.userid} author = {message.author} contents = {message.content}/>)
            }
        });
        return listMessages;
    }

    return (
        <div className="tab-pane fade show active" id="chat1" role="tabpanel">
            <div className="item">
                <div className="content">
                    <div className="container">
                        <div className="top">
                            <div className="headline">
                                <img src="/asset/images/avatar-male-3.jpg" alt=" hình đại diện" />
                                <div className="content">
                                    <h5 id="roomname">
                                        Public
                                    </h5>
                                </div>
                            </div>
                            <ul>
                                <li>
                                    <button type="button" className="btn"><i className="eva-hover">
                                            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24"
                                                className="eva eva-video eva-animation eva-icon-hover-pulse">
                                                <g data-name="Layer 2">
                                                    <g data-name="video">
                                                        <rect width={24} height={24} opacity={0} />
                                                        <path
                                                            d="M21 7.15a1.7 1.7 0 0 0-1.85.3l-2.15 2V8a3 3 0 0 0-3-3H5a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h9a3 3 0 0 0 3-3v-1.45l2.16 2a1.74 1.74 0 0 0 1.16.45 1.68 1.68 0 0 0 .69-.15 1.6 1.6 0 0 0 1-1.48V8.63A1.6 1.6 0 0 0 21 7.15z">
                                                        </path>
                                                    </g>
                                                </g>
                                            </svg>
                                        </i></button>
                                </li>
                                <li>
                                    <button type="button" className="btn"><i className="eva-hover">
                                            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24"
                                                className="eva eva-phone eva-animation eva-icon-hover-pulse">
                                                <g data-name="Layer 2">
                                                    <g data-name="phone">
                                                        <rect width={24} height={24} opacity={0} />
                                                        <path
                                                            d="M17.4 22A15.42 15.42 0 0 1 2 6.6 4.6 4.6 0 0 1 6.6 2a3.94 3.94 0 0 1 .77.07 3.79 3.79 0 0 1 .72.18 1 1 0 0 1 .65.75l1.37 6a1 1 0 0 1-.26.92c-.13.14-.14.15-1.37.79a9.91 9.91 0 0 0 4.87 4.89c.65-1.24.66-1.25.8-1.38a1 1 0 0 1 .92-.26l6 1.37a1 1 0 0 1 .72.65 4.34 4.34 0 0 1 .19.73 4.77 4.77 0 0 1 .06.76A4.6 4.6 0 0 1 17.4 22z">
                                                        </path>
                                                    </g>
                                                </g>
                                            </svg>
                                        </i></button>
                                </li>
                                <li>
                                    {/* {'{'}# data-target="#compose"#{'}'} */}
                                    <button type="button" className="btn" data-toggle="modal"><i className="eva-hover">
                                            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24"
                                                className="eva eva-person-add eva-animation eva-icon-hover-pulse">
                                                <g data-name="Layer 2">
                                                    <g data-name="person-add">
                                                        <rect width={24} height={24} opacity={0} />
                                                        <path
                                                            d="M21 6h-1V5a1 1 0 0 0-2 0v1h-1a1 1 0 0 0 0 2h1v1a1 1 0 0 0 2 0V8h1a1 1 0 0 0 0-2z">
                                                        </path>
                                                        <path d="M10 11a4 4 0 1 0-4-4 4 4 0 0 0 4 4z" />
                                                        <path d="M16 21a1 1 0 0 0 1-1 7 7 0 0 0-14 0 1 1 0 0 0 1 1">
                                                        </path>
                                                    </g>
                                                </g>
                                            </svg>
                                        </i></button>
                                </li>
                                <li>
                                    {/* {'{'}# data-utility="open"#{'}'} */}
                                    <button type="button" className="btn"><i className="eva-hover">
                                            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24"
                                                className="eva eva-info eva-animation eva-icon-hover-pulse">
                                                <g data-name="Layer 2">
                                                    <g data-name="info">
                                                        <rect width={24} height={24} transform="rotate(180 12 12)"
                                                            opacity={0} />
                                                        <path
                                                            d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm1 14a1 1 0 0 1-2 0v-5a1 1 0 0 1 2 0zm-1-7a1 1 0 1 1 1-1 1 1 0 0 1-1 1z">
                                                        </path>
                                                    </g>
                                                </g>
                                            </svg>
                                        </i></button>
                                </li>
                                <li>
                                    <button type="button" className="btn round" data-chat="open">
                                        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24"
                                            className="eva eva-arrow-ios-back">
                                            <g data-name="Layer 2">
                                                <g data-name="arrow-ios-back">
                                                    <rect width={24} height={24} transform="rotate(90 12 12)" opacity={0} />
                                                    <path
                                                        d="M13.83 19a1 1 0 0 1-.78-.37l-4.83-6a1 1 0 0 1 0-1.27l5-6a1 1 0 0 1 1.54 1.28L10.29 12l4.32 5.36a1 1 0 0 1-.78 1.64z">
                                                    </path>
                                                </g>
                                            </g>
                                        </svg>
                                    </button>
                                </li>
                                <li>
                                    <button type="button" className="btn" data-toggle="dropdown" aria-haspopup="true"
                                        aria-expanded="false"><i className="eva-hover">
                                            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24"
                                                className="eva eva-more-vertical eva-animation eva-icon-hover-pulse">
                                                <g data-name="Layer 2">
                                                    <g data-name="more-vertical">
                                                        <rect width={24} height={24} transform="rotate(-90 12 12)"
                                                            opacity={0} />
                                                        <circle cx={12} cy={12} r={2} />
                                                        <circle cx={12} cy={5} r={2} />
                                                        <circle cx={12} cy={19} r={2} />
                                                    </g>
                                                </g>
                                            </svg>
                                        </i></button>
                                    <div className="dropdown-menu">
                                        <button type="button" className="dropdown-item">
                                            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24"
                                                className="eva eva-video">
                                                <g data-name="Layer 2">
                                                    <g data-name="video">
                                                        <rect width={24} height={24} opacity={0} />
                                                        <path
                                                            d="M21 7.15a1.7 1.7 0 0 0-1.85.3l-2.15 2V8a3 3 0 0 0-3-3H5a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h9a3 3 0 0 0 3-3v-1.45l2.16 2a1.74 1.74 0 0 0 1.16.45 1.68 1.68 0 0 0 .69-.15 1.6 1.6 0 0 0 1-1.48V8.63A1.6 1.6 0 0 0 21 7.15z">
                                                        </path>
                                                    </g>
                                                </g>
                                            </svg>
                                            <font style={{verticalAlign: 'inherit'}}>
                                                <font style={{verticalAlign: 'inherit'}}>Cuộc gọi video</font>
                                            </font>
                                        </button>
                                        <button type="button" className="dropdown-item">
                                            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24"
                                                className="eva eva-phone">
                                                <g data-name="Layer 2">
                                                    <g data-name="phone">
                                                        <rect width={24} height={24} opacity={0} />
                                                        <path
                                                            d="M17.4 22A15.42 15.42 0 0 1 2 6.6 4.6 4.6 0 0 1 6.6 2a3.94 3.94 0 0 1 .77.07 3.79 3.79 0 0 1 .72.18 1 1 0 0 1 .65.75l1.37 6a1 1 0 0 1-.26.92c-.13.14-.14.15-1.37.79a9.91 9.91 0 0 0 4.87 4.89c.65-1.24.66-1.25.8-1.38a1 1 0 0 1 .92-.26l6 1.37a1 1 0 0 1 .72.65 4.34 4.34 0 0 1 .19.73 4.77 4.77 0 0 1 .06.76A4.6 4.6 0 0 1 17.4 22z">
                                                        </path>
                                                    </g>
                                                </g>
                                            </svg>
                                            <font style={{verticalAlign: 'inherit'}}>
                                                <font style={{verticalAlign: 'inherit'}}>Cuộc gọi thoại</font>
                                            </font>
                                        </button>
                                        {/* {'{'}#data-target="#compose"#{'}'} */}
                                        <button type="button" className="dropdown-item" data-toggle="modal">
                                            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24"
                                                className="eva eva-person-add">
                                                <g data-name="Layer 2">
                                                    <g data-name="person-add">
                                                        <rect width={24} height={24} opacity={0} />
                                                        <path
                                                            d="M21 6h-1V5a1 1 0 0 0-2 0v1h-1a1 1 0 0 0 0 2h1v1a1 1 0 0 0 2 0V8h1a1 1 0 0 0 0-2z">
                                                        </path>
                                                        <path d="M10 11a4 4 0 1 0-4-4 4 4 0 0 0 4 4z" />
                                                        <path d="M16 21a1 1 0 0 0 1-1 7 7 0 0 0-14 0 1 1 0 0 0 1 1">
                                                        </path>
                                                    </g>
                                                </g>
                                            </svg>
                                            <font style={{verticalAlign: 'inherit'}}>
                                                <font style={{verticalAlign: 'inherit'}}>Thêm người</font>
                                            </font>
                                        </button>
                                        {/* {'{'}# data-utility="open"#{'}'} */}
                                        <button type="button" className="dropdown-item">
                                            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24"
                                                className="eva eva-info">
                                                <g data-name="Layer 2">
                                                    <g data-name="info">
                                                        <rect width={24} height={24} transform="rotate(180 12 12)"
                                                            opacity={0} />
                                                        <path
                                                            d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm1 14a1 1 0 0 1-2 0v-5a1 1 0 0 1 2 0zm-1-7a1 1 0 1 1 1-1 1 1 0 0 1-1 1z">
                                                        </path>
                                                    </g>
                                                </g>
                                            </svg>
                                            <font style={{verticalAlign: 'inherit'}}>
                                                <font style={{verticalAlign: 'inherit'}}>Thông tin</font>
                                            </font>
                                        </button>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="middle" id="scroll">
                        <div className="container">
                            <ul id="messages">
                                {renderMessages(messages)}
                            </ul>
                        </div>
                    </div>
                    <div className="container">
                        <div className="bottom">
                            <div className="form">
                                <textarea className="form-control" id="chat-message-input" placeholder="Type message..."
                                    rows={1} defaultValue={""} value = {message} onChange = {messageChangeHandler} onKeyUp={messageOnKeyUpHandler} onKeyPress={messageOnKeyPressHandler} />
                                <button type="button" className="btn prepend" onClick={sendMessageHandler} id="chat-message-submit">
                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" className="eva eva-paper-plane">
                                        <g data-name="Layer 2">
                                            <g data-name="paper-plane">
                                            <rect width={24} height={24} opacity={0} />
                                            <path d="M21 4a1.31 1.31 0 0 0-.06-.27v-.09a1 1 0 0 0-.2-.3 1 1 0 0 0-.29-.19h-.09a.86.86 0 0 0-.31-.15H20a1 1 0 0 0-.3 0l-18 6a1 1 0 0 0 0 1.9l8.53 2.84 2.84 8.53a1 1 0 0 0 1.9 0l6-18A1 1 0 0 0 21 4zm-4.7 2.29l-5.57 5.57L5.16 10zM14 18.84l-1.86-5.57 5.57-5.57z">
                                            </path>
                                            </g>
                                        </g>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Start of Utility */}
                <div className="utility">
                        
                </div>
                {/* End of Utility */}
            </div>
        </div>
    );
}


export default Chat; 