import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Stock_my = ({ base_url }) => {

    var [input, SetInput] = useState([]);
    var location = useLocation();

    function delete_by_id(delete_id) {
        axios.delete(base_url + `/stock-delete/${delete_id}`).then(() => {
            toast.success(`Stock id ${delete_id} Deleted Successfully`)
            axios.get(base_url + '/stock-get').then((res) => {
                SetInput(res.data.data)
            })
        })
    }



    useEffect(() => {
            document.title = "Stock - My";

        if (location.state?.type == "success") {
            toast.success(location.state.message)
        } else if (location.state?.type == "failed") {
            toast.error(location.state.message)
        }
        axios.get(base_url + '/stock-get',{
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`
            }
        }).then((res) => {
            SetInput(res.data.data)
        })


    }, [base_url, location.state])
   

    return (
        <div className="container">
            <h5 className="mt-5">Stock My Page</h5>
            <span>View And Update Your Stock Here   ! </span>
            <Link to={'/stock-add'} className="btn btn-primary float-end">Create Bill</Link>
            <hr className="mt-4" />
            <div className="row">
                <div className="col"></div>
            </div>
            <table className="table table-striped table-bordered mt-3">
                <thead className="table-dark">
                    <tr >
                        <th>Id</th>
                        <th>Product Name</th>
                        <th>Product Code</th>
                        <th>Qty</th>
                        <th>Action</th>


                    </tr>
                </thead>
                <tbody>
                    {input.map((stock) => (
                        <tr key={stock.id}>
                            <td>{stock.id}</td>
                            <td>{stock.product_name}</td>
                            <td>{stock.product_code}</td>
                            <td>{stock.stock_qty}</td>
                            <td>
                                <Link to={`/stock-edit/${stock.id}`} className="btn btn-success me-2">Update</Link>
                                <button onClick={() => { delete_by_id(stock.id) }} className="btn btn-danger ml-2">Delete</button>

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

export default Stock_my;