import React, {useState,useContext} from 'react';
import AppContext from '../../Context/Context';
import axios from 'axios';

function AddFriend(){
    const [search, setSearch] = useState('email');
    const [email,setEmail] = useState('');
    const [userName,setUserName] = useState('');
    const context = useContext(AppContext);

    function searchEmail(e){
        axios.post(`${context.host}/api/search/`,{search: email, type:1})
            .then(res=>{
                console.log(res.data);
            });
    }

    function searchUserName(){
        axios.post(`${context.host}/api/search/`,{search: userName, type:2})
            .then(res=>{
                console.log(res.data);
            });
    }

    return (
        <div className="modal fade" id="addfriend" tabIndex="{-1}" role="dialog" aria-labelledby="addfriend" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5>
                            Add Friend
                        </h5>
                        <button type="button" className="btn round" data-dismiss="modal" aria-label="Đóng">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                                className="eva eva-close">
                                <g data-name="Layer 2">
                                    <g data-name="close">
                                        <rect transform="rotate(180 12 12)" opacity="{0}" />
                                        <path
                                            d="M13.41 12l4.3-4.29a1 1 0 1 0-1.42-1.42L12 10.59l-4.29-4.3a1 1 0 0 0-1.42 1.42l4.3 4.29-4.3 4.29a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0l4.29-4.3 4.29 4.3a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42z">
                                        </path>
                                    </g>
                                </g>
                            </svg>
                        </button>
                    </div>
                    <div className="modal-body">
                        <ul className="nav nav-pills mb-1" id="pills-tab" role="tablist">
                            <li className="nav-item">
                                <a className="nav-link active" id="pills-email-tab" data-toggle="pill" onClick= {()=>{setSearch('email')}} href="#pills-email" role="tab" aria-controls="pills-email" aria-selected="true">Email</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" id="pills-user-name-tab" data-toggle="pill" onClick= {()=>{setSearch('user-name')}}  href="#pills-user-name" role="tab" aria-controls="pills-user-name" aria-selected="false">User Name</a>
                            </li>
                        </ul>
                        <hr className="mt-0"/>
                        <div className="tab-content" >
                            <div className="details tab-pane fade show active" id="pills-email" role="tabpanel">
                                <form onSubmit={searchEmail}>
                                    <div className="form-group">
                                        <label>
                                            Email
                                        </label>
                                        <div>

                                        </div>
                                        <input type="text" className="form-control" onChange = {(e)=>{setEmail(e.target.value)}} placeholder="Email" />
                                    </div>
                                </form>
                            </div>
                            <div className="details tab-pane fade " id="pills-user-name" role="tabpanel">
                                <form>
                                    <div className="form-group">
                                        <label>
                                            User Name
                                        </label>
                                        <input type="text" className="form-control" onChange = {(e)=>{setUserName(e.target.value)}} placeholder="User Name" />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="submit" onClick={search === 'email' ? searchEmail : searchUserName}  className="btn primary">
                            Search
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddFriend;
