import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const Bill_My = () => {

     useEffect(() => {
              document.title = "Bill - Section";
   },[]);
    return (
        <div className="container p-2">
            
            <div className="row g-3 ">
                <h2>Sales Section</h2>
                <hr />

                <div className="col-md-3">
                    <Link to="/sales-my" style={{ textDecoration : 'none'}}>
                        <div className="p-3 card me-2 d-flex flex-row align-items-center">
                            <i className="bi bi-receipt fs-2 me-3"></i>
                            <div className="">
                                <span className="fw-bold">Sale</span><br />
                                <small>Bill Your Products Here</small>
                            </div>
                        </div>
                    </Link>
                </div>

                <div className="col-md-3 ">
                    <Link to="/stock-my" style={{ textDecoration : 'none'}}>
                        <div className="me-3 card p-3 d-flex flex-row  align-items-center ">
                            <i className="bi bi-box-seam fs-2 me-3"></i>
                            <div className="ml-2">
                                <span className="fw-bold">Stock</span><br />
                                <small>Manage your stock here</small>
                            </div>

                        </div>
                    </Link>
                </div>

                 <div className="col-md-3 ">
                    <Link to="/payslip_my" style={{ textDecoration : 'none'}}>
                        <div className="me-3 card p-3 d-flex flex-row  align-items-center ">
                            <i class="bi bi-wallet2 fs-2 me-3"></i>
                            <div className="ml-2">
                                <span className="fw-bold">Payslip</span><br />
                                <small>Access Your Payslip Here</small>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Bill_My;
