import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios'; // ✅ Import axios globally

const Sales_add_form = ({ base_url }) => {

    var navigate = useNavigate();
    const [input, SetInputs] = useState(
        {
            employee_name: '',
            employee_code: '',
            mobile: '',
            place: '',
            maritial_status: ''

        }
    )
  const { id } = useParams();
    function onchange_handler(event) {
        SetInputs({ ...input, [event.target.name]: event.target.value })
    }

    function submit_handler(e) {
        e.preventDefault();
        var post_sales = {
            'employee_name': input.employee_name,
            'employee_code': input.employee_code,
            'mobile': input.mobile,
            'place': input.place,
            'maritial_status': input.maritial_status
        }

        axios.put(base_url + '/contact-update/' + id, post_sales,{
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`
            }
        }).then((res) => {

            if (res.data.status == 'success') {
                navigate('/contact', { state: { message: 'Contact Created Successfully', type: "success" } })
            } else if (res.data.status == 'error') {
                toast.error(res.data.message)
            } else {
                navigate('/contact', { state: { message: 'Contact Created Successfully' } })
            }

        }).catch((error) => {
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error("Server error occurred");
            }
        });
    }

    useEffect(() => {
        axios.get(base_url+'/contact-get-by-id/' + id, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`
            }
        }).then((res) => {
            SetInputs(res.data.data)
        })
    }, [base_url])

    return (
        <div className="container">
            <h3 className="mt-5">Contact Add</h3>
            <span>Commercial document that records the products to the customers.</span><hr />
            <form method="POST" onSubmit={submit_handler} >

                <div className="row">

                    <div className="col-md-3 form-group">
                        <label className="">Employee Name</label>
                        <input className="form-control" onChange={onchange_handler} type="text" name="employee_name" id="employee_name" value={input.employee_name} />

                    </div>
                    <div className="col-md-3 form-group">
                        <label className="">Employee Code</label>
                        <input className="form-control" onChange={onchange_handler} type="text" name="employee_code" id="employee_code" value={input.employee_code} />
                    </div>
                    <div className="col-md-3 form-group">
                        <label className="">Mobile</label>
                        <input className="form-control" onChange={onchange_handler} type="text" name="mobile" id="mobile" value={input.mobile} />
                    </div>
                    <div className="col-md-3 form-group">
                        <label className="">Place</label>
                        <input className="form-control" onChange={onchange_handler} type="text" name="place" id="place" value={input.place} />
                    </div>
                    <div className="col-md-3 form-group">
                        <label className="">Maritial Status</label>
                        <select className="form-control" onChange={onchange_handler} type="text" name="maritial_status" id="maritial_status" value={input.maritial_status}>
                            <option></option>
                            <option value="Single">Single</option>
                            <option value="Married">Married</option>
                        </select>
                    </div>

                    <div className="col-md-12 mt-3">
                        <button type="submit" className="btn btn-success float-end">Save</button>

                    </div>
                </div>
                <div>
                    <ToastContainer
                        pauseOnHover
                        autoClose={3000}
                        position="top-right"
                    />
                </div>
            </form>
        </div>
    )
}

export default Sales_add_form;