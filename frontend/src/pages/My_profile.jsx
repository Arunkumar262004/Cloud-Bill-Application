import React, { useEffect } from 'react'

const My_profile = () => {

    useEffect(() => {
        document.title = "My - Account"
    });

    return (
        <div className='container'>
            <div className='d-flex justify-content-center'>
                <span>Access Your Account Here !!</span>
            </div>
            <div className="card p-3">
                <div className="row">
                    <div className="col-md-4 form-group">
                        <label>User Name</label>
                        <input className='form-control' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default My_profile
