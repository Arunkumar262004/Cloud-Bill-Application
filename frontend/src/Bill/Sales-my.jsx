import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Sales_my = ({ base_url }) => {

    var [Sales_data, SetInput] = useState([]);
    var location = useLocation();

    function delete_by_id(delete_id) {
        axios.delete(base_url + `/sales-delete/${delete_id}`, {
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



    useEffect(() => {
        document.title = "Sales - My";

        if (location.state?.type == "success") {
            toast.success(location.state.message)
        } else if (location.state?.type == "failed") {
            toast.error(location.state.message)
        }
        axios.get(base_url + '/sales-get', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`
            }
        }).then((res) => {
            SetInput(res.data.data)
        })


    }, [base_url, location.state])


    const downloadPDF = async (id) => {
        const res = await axios.get(`${base_url}/download-pdf/${id}`, {
            responseType: "blob",
            headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` }
        });

        const url = URL.createObjectURL(res.data);
        window.open(url, "_blank");
    };

const total_val = Sales_data.reduce(
  (sum, sale) => sum + Number(sale.product_qty),
  0
);
    return (
        <div className="container">
            <style>{`
       .edit-btn:hover i {
    color: black;
  }
      `}</style>

            <h5 className="">Sales My Page</h5>
            <span>View And Update Your sales Here   ! </span>
            <Link to={'/sales-add'} className="btn btn-primary float-end">Create Bill</Link>
            <hr className="mt-4" />
            <div className="row">
                <div className="col"></div>
            </div>
            <table className="table table-striped table-bordered mt-3" style={{borderRadius:"8px;"}}>
                <thead className="table-dark">
                    <tr >
                        <th>Sale Id</th>
                        <th>Customer Name</th>
                        <th>Price</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {Sales_data.map((sale) => (
                        <tr key={sale.id}>
                            <td>{sale.id}</td>
                            <td>{sale.customer_name}</td>
                          
                            <td className="text-center">{(sale.price)}</td>
                            <td>
                                <Link to={`/sales-edit/${sale.id}`} className="btn btn-success me-2 edit-btn"><i class="bi bi-pencil-square"></i></Link>
                                <button onClick={() => { delete_by_id(sale.id) }} className="btn btn-danger ml-2 me-2"><i class="bi bi-trash-fill"></i></button>
                                <a onClick={() => downloadPDF(sale.id)} className="btn btn-dark   focus:outline-none ml-2 "><i className="bi bi-printer-fill hover:text-dark"></i></a>
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