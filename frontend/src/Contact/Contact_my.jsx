import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
var base_url_image = "http://127.0.0.1:8000";

const Sales_my = ({ base_url }) => {

    var [Contacts, SetInput] = useState([]);
    var location = useLocation();

    function delete_by_id(delete_id) {
        axios.delete(base_url + `/contact-delete/${delete_id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`
            }
        }).then(() => {
            toast.success('Sales Entry Deleted Successfully')
            axios.get(base_url + '/sales-get', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`
                }
            }).then((res) => {
                SetInput(res.data.data)
            })
        })
    }

    const downloadPDF = async (id) => {
        const res = await axios.get(`${base_url}/contact-pdf/${id}`, {
            responseType: "blob",
            headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` }
        });

        const url = URL.createObjectURL(res.data);
        window.open(url, "_blank");
    };

    useEffect(() => {
        document.title = "Contact List - My";


        if (location.state?.type == "success") {
            toast.success(location.state.message)
        } else if (location.state?.type == "failed") {
            toast.error(location.state.message)
        }
        axios.get(base_url + '/contact-data', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`
            }
        }).then((res) => {
            SetInput(res.data.data)
        })


    }, [base_url, location.state])




    return (
        <div className="container">
            <h5 className="">Contact My Page</h5>
            <span>View And Update Your Contact's Here   ! </span>
            <Link to={'/contact-add'} className="btn btn-primary float-end">Create Contact</Link>
            <hr className="mt-4" />
            <div className="row">
                <div className="col"></div>
            </div>
            <table className="table table-striped table-bordered mt-3">
                <thead className="table-dark">
                    <tr >
                        <th>Id</th>
                        <th>Employee Image</th>
                        <th>Employee Name</th>
                        <th>Employee Code</th>
                        <th>Mobile</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {Contacts.map((contact) => (
                        <tr key={contact.id}>
                            <td>{contact.id}</td>
                            <td><img
                                src={`${base_url_image}/storage/contact/${contact.img_file}`}
                                width="80"
                                height="80"
                                alt="contact"
                            />
                            </td>
                            <td>{contact.employee_name}</td>
                            <td>{contact.employee_code}</td>
                            <td>{contact.mobile}</td>
                            <td>
                                <Link to={`/contact-edit/${contact.id}`} className="btn btn-success me-2"><i class="bi bi-pencil-square"></i></Link>
                                <button onClick={() => { delete_by_id(contact.id) }} className="btn btn-danger ml-2 me-2"><i class="bi bi-trash-fill"></i></button>
                                <button onClick={() => downloadPDF(contact.id)} className="btn btn-dark   focus:outline-none ml-2 ">
                                    <i className="bi bi-printer-fill hover:text-dark"></i>
                                </button>
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
        </div>
    )
}

export default Sales_my;