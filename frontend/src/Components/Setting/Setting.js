import React,{useContext} from 'react';
import {logout} from '../../Helper/auth'
import AppContext from '../../Context/Context';


function Setting() {
    const context = useContext(AppContext);
    return (
        <div>
            <div className="user">
                <label>
                    <input type="file" accept= "image/*"/>
                    <img src={context.user.avatar} alt="avatar" />
                </label>
                <div className="content">
                    <h5>{context.user.username}</h5>
                    <span>{context.user.fullname}</span>
                </div>
            </div>
            <h4>Settings</h4>
            <ul id="preferences">
                {/* Start of Account */}
                <li>
                    <a href="#" className="headline" data-toggle="collapse" aria-expanded="false" data-target="#account"
                        aria-controls="account">
                        <div className="title">
                            <h5>Account</h5>
                        </div>
                    </a>
                    <div className="content collapse" id="account" data-parent="#preferences">
                        <p>Update your profile details</p>
                        <div className="inside">
                            <form className="account">
                                <div className="form-group">
                                    <label>User Name</label>
                                    <input type="text" className="form-control" placeholder="First name"
                                        defaultValue={context.user.username} />
                                </div>
                                <div className="form-group">
                                    <label>Full Name</label>
                                    <input type="text" className="form-control" placeholder="First name"
                                        defaultValue={context.user.fullname} />
                                </div>
                                <div className="form-group">
                                    <label>Email Address</label>
                                    <input type="email" disabled className="form-control" placeholder="Enter your email address"
                                        defaultValue={context.user.email} />
                                </div>
                                <div className="form-group">
                                    <label>New Password</label>
                                    <input type="password" className="form-control" placeholder="Enter your password"
                                        defaultValue={123456} />
                                </div>
                                <div className="form-group">
                                    <label>Password Confirm</label>
                                    <input type="password" className="form-control" placeholder="ReEnter your new password"
                                        defaultValue={123456} />
                                </div>
                                <button type="submit" className="btn primary">Save settings</button>
                            </form>
                        </div>
                    </div>
                </li>
                {/* End of Account */}
                
                {/* Start of SignOut */}
                <li>
                    <a href="" className="headline" onClick={logout}>
                    <div className="title">
                        <h5>SignOut</h5>
                    </div>
                    </a>
                </li>
            </ul>
        </div>
    );
}

export default Setting;
