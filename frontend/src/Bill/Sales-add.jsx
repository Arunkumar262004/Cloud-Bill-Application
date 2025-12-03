import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios'; // ✅ Import axios globally

const Sales_add_form = ({ base_url }) => {

    var navigate = useNavigate();
    const [input, SetInputs] = useState(
        {
            product_name: '',
            product_code: '',
            product_qty: '',
            customer_name: '',
            price: ''

        }
    )

    function onchange_handler(event) {
        SetInputs({ ...input, [event.target.name]: event.target.value })
    }

    function submit_handler(e) {
        e.preventDefault();
        var post_sales = {
            'product_name': input.product_name,
            'product_code': input.product_code,
            'customer_name': input.customer_name,
            'product_qty': input.product_qty,
            'price': input.price

        }
        axios.post(base_url + '/sales-create', post_sales, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`
            }
        }).then((res) => {

            if (res.data.status == 'success') {
                navigate('/sales-my', { state: { message: 'Bill Created Successfully', type: "success" } })
            } else if (res.data.status == 'error') {
                toast.error(res.data.message)
            } else {
                navigate('/sales-my', { state: { message: 'Bill Created Successfully' } })
            }

        })
            .catch((error) => {
                if (error.response && error.response.data && error.response.data.message) {
                    toast.error(error.response.data.message);
                } else {
                    toast.error("Server error occurred");
                }
            });
    }

    useEffect(() => {
        document.title = "Sales - Add";
    }, []);
    return (
        <div className="container">
            <div className="mt-5">
                <h3 className="mt-5">Sales Add</h3>
                <span>Commercial document that records the products to the customers.</span><hr />
                <form method="POST" onSubmit={submit_handler} >

                    <div className="row">

                        <div className="col-md-3 form-group">
                            <label className="">Product Name</label>
                            <select className="form-control" onChange={onchange_handler} type="text" name="product_name" id="product_name" >
                                <option></option>
                                <option>Pipes</option>
                                <option>Drum</option>
                                <option>Switch Box</option>

                            </select>
                        </div>
                        <div className="col-md-3 form-group">
                            <label className="">Product Code</label>
                            <input className="form-control" onChange={onchange_handler} type="text" name="product_code" id="product_code" />
                        </div>
                        <div className="col-md-3 form-group">
                            <label className="">Qty</label>
                            <input className="form-control" onChange={onchange_handler} type="text" name="product_qty" id="product_qty" />
                        </div>
                        <div className="col-md-3 form-group">
                            <label className="">Price</label>
                            <input className="form-control" onChange={onchange_handler} type="text" name="price" id="price" />
                        </div>
                        <div className="col-md-3 form-group">
                            <label className="">Customer Name</label>
                            <input className="form-control" onChange={onchange_handler} type="text" name="customer_name" id="customer_name" />
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
        </div>
    )
}

export default Sales_add_form;