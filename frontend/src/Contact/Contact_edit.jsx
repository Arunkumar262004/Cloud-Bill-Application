import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios'; // ✅ Import axios globally
var base_url_image = "http://127.0.0.1:8000";

const Sales_add_form = ({ base_url }) => {
    const [imgFile, setImgFile] = useState(null);
    const [previewImg, setPreviewImg] = useState(null);

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


        const formData = new FormData();
        formData.append("employee_name", input.employee_name);
        formData.append("employee_code", input.employee_code);
        formData.append("mobile", input.mobile);
        formData.append("place", input.place);
        formData.append("maritial_status", input.maritial_status);
        if (imgFile) {
            formData.append("img_file", imgFile);
        }


        axios.put(base_url + '/contact-update/' + id, formData, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                "Content-Type": "multipart/form-data"
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
        document.title = "Contact Update # " + id;

        axios.get(base_url + '/contact-get-by-id/' + id, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`
            }
        }).then((res) => {
            SetInputs(res.data.data)
        })
    }, [base_url])

    function imageChangeHandler(e) {
        const file = e.target.files[0];
        setImgFile(file);

        if (file) {
            setPreviewImg(URL.createObjectURL(file));
        }
    }
    return (
        <div className="container">
            <h4 className="">Employee #{id}</h4>
            {/* <span style={{font:8}}>Commercial document that records the products to the customers.</span> */}
            <hr />
            <form method="POST" onSubmit={submit_handler} >

                <div className="row">
                    <div className="col-md-8 row" >

                        <div className="col-md-3 form-group">
                            <label className="">Employee Name</label>
                            <input className="form-control" onChange={onchange_handler} type="text" name="employee_name" id="employee_name" value={input.employee_name || ""} />

                        </div>
                        <div className="col-md-3 form-group">
                            <label className="">Employee Code</label>
                            <input className="form-control" onChange={onchange_handler} type="text" name="employee_code" id="employee_code" value={input.employee_code || ""} />
                        </div>
                        <div className="col-md-3 form-group">
                            <label className="">Mobile</label>
                            <input className="form-control" onChange={onchange_handler} type="text" name="mobile" id="mobile" value={input.mobile || ""} />
                        </div>
                        <div className="col-md-3 form-group">
                            <label className="">Place</label>
                            <input className="form-control" onChange={onchange_handler} type="text" name="place" id="place" value={input.place || ""} />
                        </div>
                        <div className="col-md-3 form-group">
                            <label className="">Maritial Status</label>
                            <select className="form-control" onChange={onchange_handler} type="text" name="maritial_status" id="maritial_status" value={input.maritial_status || ""}>
                                <option></option>
                                <option value="Single">Single</option>
                                <option value="Married">Married</option>
                            </select>
                        </div>


                    </div>
                    <div className="col-md-4 row">
                        <div className="col-md-12 text-center">
                            <span>Profile Image</span>
                        </div>

                        <div className="d-flex flex-column align-items-center">
                            <img
                                src={previewImg || (input.img_file ? `${base_url_image}/storage/contact/${input.img_file}` : "")}
                                alt=""
                                style={{
                                    width: "130px",
                                    height: "130px",
                                    marginBottom: "10px",
                                    borderRadius: "8%",
                                    objectFit: "cover",
                                }}
                            />


                            <input
                                type="file"
                                className="form-control"
                                name="img_file"
                                onChange={imageChangeHandler}
                            />
                        </div>
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