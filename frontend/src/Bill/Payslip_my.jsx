import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import '../App.css';
const Payslip_my = ({ base_url }) => {
    const [showModal, setShowModal] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [editId, setEditId] = useState(null);
    const [formData, setFormData] = useState({
        emp_name: "",
        emp_code: "",
        salary: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const url = isEdit
            ? `${base_url}/payslip-update/${editId}`
            : `${base_url}/payslip-store`;

        const method = isEdit ? axios.put : axios.post;

        method(url, formData, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`
            }
        })
            .then(() => {
                toast.success(isEdit ? "Payslip updated successfully" : "Payslip added successfully");
                setShowModal(false);

                return axios.get(base_url + '/payslip-get', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("access_token")}`
                    }
                });
            })
            .then((res) => {
                SetInput(res.data.data);
            })
            .catch(() => {
                toast.error("Something went wrong");
            });
    };

    var [input, SetInput] = useState([]);
    var location = useLocation();

    function delete_by_id(delete_id) {
        axios.delete(base_url + `/payslip-delete/${delete_id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`
            }
        }).then(() => {
            toast.success(`Payslip id ${delete_id} Deleted Successfully`)
            window.location.reload();
            axios.get(base_url + '/payslip-get').then((res) => {
                SetInput(res.data.data)
            })
        })
    }



    useEffect(() => {
        document.title = "Generate Payslip";


        axios.get(base_url + '/payslip-get', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`
            }
        }).then((res) => {
            SetInput(res.data.data);
        }).catch((error) => {
            if (error.response) {
                toast.error(error.response.data.message || "Something went wrong");
            } else {
                toast.error("Server not reachable");
            }
        });
    }, [base_url, location.state])

    const openEditModal = (payslip) => {
        setIsEdit(true);
        setEditId(payslip.id);
        setFormData({
            emp_name: payslip.emp_name,
            emp_code: payslip.emp_code,
            salary: payslip.salary
        });
        setShowModal(true);
    };

    return (
        <div className="container">
            <h5 className="">Payslip My</h5>
            <span>Access and Generate Your Payslip Here   ! </span>
            <button className="btn btn-primary float-end" onClick={() => setShowModal(true)} >
                Generate Payslip
            </button>
            <hr className="mt-4" />
            <div className="row">
                <div className="col"></div>
            </div>
            <table className="table table-striped table-bordered mt-3">
                <thead className="table-dark">
                    <tr >
                        <th>Id</th>
                        <th>Employee Name</th>
                        <th>Emp Code</th>
                        <th>Salary</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {input.map((payslip) => (
                        <tr key={payslip.id}>
                            <td>{payslip.id}</td>
                            <td>{payslip.emp_name}</td>
                            <td>{payslip.emp_code}</td>
                            <td>{payslip.salary}</td>
                            <td>
                                <button
                                    className="btn btn-success me-2"
                                    onClick={() => openEditModal(payslip)}
                                ></button>
                                <button onClick={() => { delete_by_id(payslip.id) }} className="btn btn-danger ml-2"><i class="bi bi-trash-fill"></i></button>
                            </td>
                        </tr>
                    ))}

                </tbody>

            </table>
            <div>
                <ToastContainer
                    pauseOnHover
                    autoClose={3000}
                    position="top-right"
                />
            </div>

            {/*  modal ---------- */}
            {showModal && (
                <div className="modal fade show d-block" tabIndex="-1">
                    <div className="modal-dialog">
                        <div className="modal-content">

                            <div className="modal-header">
                                <h5 className="modal-title">Generate Payslip</h5>
                                <button
                                    className="btn btn-primary float-end"
                                    onClick={() => {
                                        setIsEdit(false);
                                        setEditId(null);
                                        setFormData({ emp_name: "", emp_code: "", salary: "" });
                                        setShowModal(true);
                                    }}
                                ></button>
                            </div>

                            <form onSubmit={handleSubmit}>
                                <div className="modal-body">

                                    <div className="mb-3">
                                        <label className="form-label">Employee Name</label>
                                        <input
                                            type="text"
                                            name="emp_name"
                                            className="form-control"
                                            onChange={handleChange}
                                            value={formData.emp_name}
                                            required
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">Employee Code</label>
                                        <input
                                            type="text"
                                            name="emp_code"
                                            className="form-control"
                                            onChange={handleChange}
                                            value={formData.emp_code}
                                            required
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">Salary</label>
                                        <input
                                            type="number"
                                            name="salary"
                                            className="form-control"
                                            onChange={handleChange}
                                            required
                                            value={formData.salary}
                                        />
                                    </div>

                                </div>

                                <div className="modal-footer">
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        onClick={() => setShowModal(false)}
                                    >
                                        Close
                                    </button>
                                    <button type="submit" className="btn btn-primary">
                                        Save
                                    </button>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Payslip_my;