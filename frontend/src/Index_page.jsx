import React, { useState } from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement, // ✅ register Bar element
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Line, Bar } from "react-chartjs-2";
import axios from "axios";

// Register chart components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement, // ✅ needed for Bar chart
    Title,
    Tooltip,
    Legend
);

const Index_page = ({ base_url }) => {


    const [totalSales, setTotalSales] = useState(0);
    const [totalStock, setTotalStock] = useState(0);

  useState(() => {
        axios.get(base_url + '/dashboard-data',{
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`
            }
        }).then((res) => {
            setTotalSales(res.data.total_sales);
            setTotalStock(res.data.totalStock);
        });

    }, [])


    const salesData = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
            {
                label: "Sales (₹)",
                data: [5000, 12000, 7500, 10000, 15000, 20000],
                fill: true,
                backgroundColor: "rgba(54, 162, 235, 0.2)",
                borderColor: "rgba(54, 162, 235, 1)",
                tension: 0.4,
            },
        ],
    };

    const salesOptions = {
        responsive: true,
        plugins: {
            legend: { position: "top" },
            title: { display: true, text: "Monthly Sales Trend" },
        },
    };

    const ordersData = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
            {
                label: "Orders",
                data: [30, 45, 28, 60, 50, 70],
                backgroundColor: "rgba(255, 206, 86, 0.7)",
            },
        ],
    };

    const ordersOptions = {
        responsive: true,
        plugins: {
            legend: { position: "top" },
            title: { display: true, text: "Monthly Orders" },
        },
    };

    return (
        <div
            className="container "
            style={{
                height: "100%",
                overflowY: "auto",
                paddingRight: "15px",
            }}
        >
            <h3 className="mb-4 ">Dashboard</h3>


            <div className="row g-4 mb-4">

                <div className="col-md-3">
                    <div className="card text-black shadow-sm p-4" style={{ borderRadius: "15px" }}>
                        <div className="d-flex justify-content-between align-items-center">
                            <div>
                                <h5>
                                    ₹   Total Sales
                                </h5>
                                <h2 className="fw-bold">{totalSales}</h2>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="card text-black shadow-sm p-4" style={{ borderRadius: "15px" }}>
                        <div className="d-flex justify-content-between align-items-center">
                            <div>
                                <h5>
                                    <i className="bi bi-box-seam me-2"></i> Total Stock
                                </h5>
                                <h2 className="fw-bold">{totalStock}</h2>
                            </div>
                        </div>
                    </div>
                </div>

            </div>


            {/* Charts Section */}
            <div className="row g-4 mb-4">
                <div className="col-md-6">
                    <div className="card shadow-sm p-4" style={{ borderRadius: "15px" }}>
                        <Line data={salesData} options={salesOptions} />
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="card shadow-sm p-4" style={{ borderRadius: "15px" }}>
                        <Bar data={ordersData} options={ordersOptions} />
                    </div>
                </div>
            </div>


        </div>
    );
};

export default Index_page;
