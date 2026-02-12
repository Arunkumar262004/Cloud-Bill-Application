import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const Sales_add_form = ({ base_url }) => {
    const navigate = useNavigate();

    /* ===================== STATES ===================== */

    const [customer_name, setCustomerName] = useState("");

    const [rows, setRows] = useState([
        {
            product_name: "",
            product_code: "",
            product_qty: "",
            price: ""
        }
    ]);

    /* ===================== HANDLERS ===================== */

    const handleRowChange = (index, e) => {
        const { name, value } = e.target;
        const updatedRows = [...rows];
        updatedRows[index][name] = value;
        setRows(updatedRows);
    };

    const addRow = () => {
        setRows([
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
        setRows(updatedRows);
    };

    /* ===================== SUBMIT ===================== */

    const submit_handler = (e) => {
        e.preventDefault();

        if (!customer_name) {
            toast.error("Customer name is required");
            return;
        }

        const post_sales = {
            customer_name: customer_name,
            items: rows
        };

        axios
            .post(base_url + "/sales-create", post_sales, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`
                }
            })
            .then((res) => {
                if (res.data.status === "success") {
                    navigate("/sales-my", {
                        state: {
                            message: "Bill Created Successfully",
                            type: "success"
                        }
                    });
                } else {
                    toast.error(res.data.message || "Something went wrong");
                }
            })
            .catch(() => {
                toast.error("Server error occurred");
            });
    };

    /* ===================== EFFECT ===================== */

    useEffect(() => {
        document.title = "Sales - Add";
    }, []);

    /* ===================== JSX ===================== */

    return (
        <div className="container">
            <h5>Sales Add</h5>
            <span>Commercial document that records the products to the customers.</span>
            <hr />

            <form onSubmit={submit_handler}>
                {/* CUSTOMER */}
                <div className="row mb-3">
                    <div className="col-md-4">
                        <label>Customer Name</label>
                        <input
                            type="text"
                            className="form-control"
                            value={customer_name}
                            onChange={(e) => setCustomerName(e.target.value)}
                            required
                        />
                    </div>
                </div>

                {/* TABLE */}
                {/* ADD ROW */}
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
                                        value={row.product_name}
                                        onChange={(e) => handleRowChange(index, e)}
                                        required
                                    >
                                        <option value=""></option>
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
                                        value={row.product_code}
                                        onChange={(e) => handleRowChange(index, e)}
                                        required
                                    />
                                </td>

                                <td>
                                    <input
                                        type="number"
                                        className="form-control"
                                        name="product_qty"
                                        value={row.product_qty}
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


                {/* SAVE */}
                <div className="text-end">
                    <button type="submit" className="btn btn-success">
                        Save Bill
                    </button>
                </div>

                <ToastContainer position="top-right" autoClose={3000} />
            </form>
        </div>
    );
};

export default Sales_add_form;