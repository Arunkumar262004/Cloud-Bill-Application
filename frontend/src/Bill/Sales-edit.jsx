import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios'; // ✅ Import axios globally

const Sales_editform = ({ base_url }) => {

    var navigate = useNavigate();
    const [input, SetInputs] = useState(
        {
            product_name: '',
            product_code: '',
            product_qty: '',
            customer_name: '',
            price:''
        }
    )


    function onchange_handler(event) {
        SetInputs({ ...input, [event.target.name]: event.target.value })
    }
    const { id } = useParams(); // id will contain your route param

    function submit_handler(e) {
        e.preventDefault();
        var post_sales = {
            'product_name': input.product_name,
            'product_code': input.product_code,
            'customer_name': input.customer_name,
            'product_qty': input.product_qty,
            'price' : input.price

        }
        axios.put(base_url + '/sales-update/' + id, post_sales,{
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`
            }
        }).then((res) => {

            if (res.data.status == 'success') {
                navigate('/sales-my', { state: { message: 'Bill Updated Successfully', type: "success" } })
            } else {
                navigate('/sales-my', { state: { message: 'Bill Not Updated Successfully', type: "failed" } })
            }

        })
            .catch((error) => {
                console.error("Error saving data:", error);
            });
    }

    useEffect(() => {
        axios.get(base_url+'/sales-get-by-id/' + id, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`
            }
        }).then((res) => {
            SetInputs(res.data.data)
        })
    }, [base_url])


    return (
        <div className="container">
            <h3 className="mt-3">Sales Add</h3>
            <span>Commercial document that records the products to the customers.</span><hr />
            <form method="POST" onSubmit={submit_handler} >

                <div className="row">

                    <div className="col-md-3 form-group">
                        <label className="">Product Name</label>
                        <select className="form-control" value={input.product_name} onChange={onchange_handler} type="text" name="product_name" id="product_name" >

                            <option></option>
                            <option>Pipes</option>
                            <option>Drum</option>
                            <option>Switch Box</option>

                        </select>
                    </div>
                    <div className="col-md-3 form-group">
                        <label className="">Product Code</label>
                        <input className="form-control" value={input.product_code} onChange={onchange_handler} type="text" name="product_code" id="product_code" />
                    </div>
                    <div className="col-md-3 form-group">
                        <label className="">Qty</label>
                        <input className="form-control" value={input.product_qty} onChange={onchange_handler} type="text" name="product_qty" id="product_qty" />
                    </div>
                    
                     <div className="col-md-3 form-group">
                        <label className="">Price</label>
                        <input className="form-control" value={input.price} onChange={onchange_handler} type="text" name="price" id="price" />
                    </div>
                    <div className="col-md-3 form-group">
                        <label className="">Customer Name</label>
                        <input className="form-control" value={input.customer_name} onChange={onchange_handler} type="text" name="customer_name" id="customer_name" />
                    </div>
                    <div className="col-md-12 mt-3">
                        <button type="submit" className="btn btn-success float-end">Save</button>

                    </div>
                </div>

            </form>
        </div>
    )
}

export default Sales_editform;