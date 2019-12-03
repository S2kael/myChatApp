import React from 'react';

function AddFriend(){
    return (
        <div className="modal fade" id="addfriend" tabIndex="{-1}" role="dialog" aria-labelledby="addfriend" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5>
                            Add Friend
                        </h5>
                        <button type="button" className="btn round" data-dismiss="modal" aria-label="Đóng">
                            <svg xmlns="http://www.w3.org/2000/svg" width="{24}" height="{24}" viewBox="0 0 24 24"
                                className="eva eva-close">
                                <g data-name="Layer 2">
                                    <g data-name="close">
                                        <rect width="{24}" height="{24}" transform="rotate(180 12 12)" opacity="{0}" />
                                        <path
                                            d="M13.41 12l4.3-4.29a1 1 0 1 0-1.42-1.42L12 10.59l-4.29-4.3a1 1 0 0 0-1.42 1.42l4.3 4.29-4.3 4.29a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0l4.29-4.3 4.29 4.3a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42z">
                                        </path>
                                    </g>
                                </g>
                            </svg>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="tab-content">
                            <div className="details tab-pane fade show active" id="details" role="tabpanel">
                                <form>
                                    <div className="form-group">
                                        <label>
                                            Email
                                        </label>
                                        <input type="text" className="form-control" placeholder="Email" />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="submit" className="btn primary">
                            Add Friend
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddFriend;
