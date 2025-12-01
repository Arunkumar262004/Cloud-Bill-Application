import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios'; // ✅ Import axios globally

const Stock_add_form = ({ base_url }) => {

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
        var post_stock = {
            'product_name': input.product_name,
            'product_code': input.product_code,
            'stock_qty': input.stock_qty,
            'price': input.price
        }
        axios.post(base_url + '/stock-create', post_stock,{
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`
            }
        }).then((res) => {

            if (res.data.status == 'success') {
                navigate('/stock-my', { state: { message: 'Bill Created Successfully', type: "success" } })
            } else {
                navigate('/stock-my', { state: { message: 'Bill Created Successfully' } })
            }

        })
            .catch((error) => {
                console.error("Error saving data:", error);
            });
    }


    return (
        <div className="container">
            <h3 className="mt-5">Stock Add</h3>
            <span>Add Your Stock Details Here.</span><hr />
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
                        <label className="">Stock Qty</label>
                        <input className="form-control" onChange={onchange_handler} type="text" name="stock_qty" id="stock_qty" />
                    </div>
                    <div className="col-md-3 form-group">
                        <label className="">Price</label>
                        <input className="form-control" onChange={onchange_handler} type="text" name="price" id="price" />
                    </div>

                    <div className="col-md-12 mt-3">
                        <button type="submit" className="btn btn-success float-end">Save</button>
                    </div>
                </div>

            </form>
        </div>
    )
}

export default Stock_add_form;