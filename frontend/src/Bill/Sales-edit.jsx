import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const Sales_edit_form = ({ base_url }) => {
    const navigate = useNavigate();
    const { id } = useParams();

    /* ===================== STATES ===================== */

    const [customer_name, setCustomerName] = useState("");

    const [rows, setRows] = useState([
        {
            id: "",
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
                id: null, // new row
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

    /* ===================== FETCH DATA ===================== */

    useEffect(() => {
        document.title = "Sales - Update";

        axios
            .get(`${base_url}/sales-get-by-id/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`
                }
            })
            .then((res) => {
                setCustomerName(res.data.data.customer_name);

                // map DB fields to frontend fields
                const mappedRows = res.data.product_data.map(item => ({
                    id: item.id,
                    product_name: item.item_name,
                    product_code: item.item_code,
                    product_qty: item.qty,
                    price: item.price
                }));

                setRows(mappedRows);
            })
            .catch(() => toast.error("Failed to load data"));
    }, [id, base_url]);

    /* ===================== SUBMIT ===================== */

    const submit_handler = (e) => {
        e.preventDefault();

        const post_sales = {
            customer_name: customer_name,
            items: rows
        };

        axios
            .put(`${base_url}/sales-update/${id}`, post_sales, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`
                }
            })
            .then((res) => {
                if (res.data.status === "success") {
                    navigate("/sales-my", {
                        state: {
                            message: "Bill Updated Successfully",
                            type: "success"
                        }
                    });
                } else {
                    toast.error("Update failed");
                }
            })
            .catch(() => {
                toast.error("Server error occurred");
            });
    };

    /* ===================== JSX ===================== */

    return (
        <div className="container">
            <h5>Sales Update</h5>
            <span>Edit products for this customer.</span>
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

                {/* ADD ROW */}
                <button
                    type="button"
                    className="btn btn-outline-primary mb-1 float-end"
                    onClick={addRow}
                >
                    <i className="bi bi-plus-lg"></i>
                </button>

                {/* TABLE */}
                <table className="table table-bordered">
                    <thead className="table-dark">
                        <tr>
                            <th>Product</th>
                            <th>Product Code</th>
                            <th>Qty</th>
                            <th>Price</th>
                            <th width="30">Action</th>
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
                                        <i className="bi bi-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* SAVE */}
                <div className="text-end">
                    <button type="submit" className="btn btn-success">
                        Update Bill
                    </button>
                </div>

                <ToastContainer position="top-right" autoClose={3000} />
            </form>
        </div>
    );
};

export default Sales_edit_form;
