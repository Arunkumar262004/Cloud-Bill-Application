import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios'; // ✅ Import axios globally

const Sales_editform = ({ base_url }) => {

    const [Customer_name_val, setCustomerName] = useState("");

    var navigate = useNavigate();
    const [rows, Setrows] = useState([
        {
            product_name: '',
            product_code: '',
            product_qty: '',
            customer_name: '',
            price: ''
        }
    ]
    )

    const addRow = () => {
        Setrows([
            ...rows,
            {
                product_name: "",
                product_code: "",
                product_qty: "",
                price: ""
            }
        ]);
    };

    
    const removeRow = (index) => {
        const updatedRows = rows.filter((_, i) => i !== index);
        Setrows(updatedRows);
    };
    function handleRowChange(index, e) {
        const { name, value } = e.target;
        const updated_rows = [rows];
        updated_rows[index][name] = value;
        Setrows(updated_rows);
    }
    const { id } = useParams();

    function submit_handler(e) {
        e.preventDefault();
        var post_sales = {
            'product_name': rows.product_name,
            'product_code': rows.product_code,
            'customer_name': rows.customer_name,
            'product_qty': rows.product_qty,
            'price': rows.price

        }
        axios.put(base_url + '/sales-update/' + id, post_sales, {
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
        document.title = "Sales - Update  # " + id;

        axios.get(base_url + '/sales-get-by-id/' + id, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`
            }
        }).then((res) => {
            Setrows(res.data.product_data)
            setCustomerName(res.data.data)
        })
    }, [base_url])


    return (
        <div className="container">
            <div className="">
                <h5 className="">Sales Add</h5>
                <span>Commercial document that records the products to the customers.</span><hr />
                <form method="POST" onSubmit={submit_handler} >
                    <div className="row mb-3">
                        <div className="col-md-4">
                            <label>Customer Name</label>
                            <input
                                type="text"
                                className="form-control"
                                value={Customer_name_val.customer_name}
                                onChange={(e) => setCustomerName(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                   
 <button
                        type="button"
                        className="btn btn-outline-primary mb-1 float-end fs-6"
                        onClick={addRow}
                    >
                        <i className="bi bi-plus-lg"></i>
                    </button>
                        <table className="table table-bordered">

                            <thead className="table-dark">
                                <tr>
                                    <th>Product</th>
                                    <th>Product Code</th>
                                    <th>Qty</th>
                                    <th>Price</th>
                                    <th width="120">Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {rows.map((row, index) => (
                                    <tr key={index}>
                                        <td>
                                            <select
                                                className="form-control"
                                                name="product_name"
                                                value={row.item_name}
                                                onChange={(e) => (index, e)}
                                                required
                                            >
                                                <option value="">Select</option>
                                                <option>Pipes</option>
                                                <option>Drum</option>
                                                <option>Switch Box</option>
                                            </select>
                                        </td>

                                        <td>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="product_code"
                                                value={row.item_code}
                                                onChange={(e) => handleRowChange(index, e)}
                                                required
                                            />
                                        </td>

                                        <td>
                                            <input
                                                type="number"
                                                className="form-control"
                                                name="product_qty"
                                                value={row.qty}
                                                onChange={(e) => handleRowChange(index, e)}
                                                required
                                            />
                                        </td>

                                        <td>
                                            <input
                                                type="number"
                                                className="form-control"
                                                name="price"
                                                value={row.price}
                                                onChange={(e) => handleRowChange(index, e)}
                                                required
                                            />
                                        </td>

                                        <td className="text-center">
                                            <button
                                                type="button"
                                                className="btn btn-danger btn-sm"
                                                onClick={() => removeRow(index)}
                                            >
                                                <i class="bi bi-trash"></i>
                                            </button>

                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="col-md-12 mt-3">
                            <button type="submit" className="btn btn-success float-end">Save</button>

                        </div>

                </form>
            </div>
        </div>
    )
}

export default Sales_editform;