import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const Sales_add_form = ({ base_url }) => {
  const navigate = useNavigate();

  const [input, setInputs] = useState({
    employee_name: "",
    employee_code: "",
    mobile: "",
    place: "",
    maritial_status: "",
  });

  const [imgFile, setImgFile] = useState(null);
  const [previewImg, setPreviewImg] = useState(null);

  function onchange_handler(e) {
    setInputs({ ...input, [e.target.name]: e.target.value });
  }
  useEffect(() => {
    document.title = "Contact List - Add";
  }, []);

  function imageChangeHandler(e) {
    const file = e.target.files[0];
    setImgFile(file);

    if (file) {
      setPreviewImg(URL.createObjectURL(file));
    }
  }

  function submit_handler(e) {
    e.preventDefault();

    // ✅ Create FormData (important for image upload)
    const formData = new FormData();
    formData.append("employee_name", input.employee_name);
    formData.append("employee_code", input.employee_code);
    formData.append("mobile", input.mobile);
    formData.append("place", input.place);
    formData.append("maritial_status", input.maritial_status);
    formData.append("img_file", imgFile); // ✅ send image file

    axios
      .post(base_url + "/store-contact", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          "Content-Type": "multipart/form-data"
        },
      })
      .then((res) => {
        if (res.data.status === "success") {
          navigate("/contact", {
            state: {
              message: "Contact Created Successfully",
              type: "success",
            },
          });
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((error) => {
        toast.error(
          error.response?.data?.message || "Server error occurred"
        );
      });
  }

  return (
    <div className="container">
      {/* <h3 className="">Employee Add</h3>
      <span>Commercial document that records the products to the customers.</span>
      <hr /> */}

      <form onSubmit={submit_handler} encType="multipart/form-data">
        <div className="card shadow-sm">
          {/* <div className="card-header">
            <h5 className="mb-0">Employee Details</h5>
          </div> */}

          <div className="card-body">
            <div className="row">
              {/* Form section */}
              <div className="col-md-8">
                <div className="row">
                  <div className="col-md-4 form-group mb-3">
                    <label>Employee Name</label>
                    <input
                      className="form-control"
                      name="employee_name"
                      onChange={onchange_handler}
                      type="text"
                    />
                  </div>

                  <div className="col-md-4 form-group mb-3">
                    <label>Employee Code</label>
                    <input
                      className="form-control"
                      name="employee_code"
                      onChange={onchange_handler}
                      type="text"
                    />
                  </div>

                  <div className="col-md-4 form-group mb-3">
                    <label>Mobile</label>
                    <input
                      className="form-control"
                      name="mobile"
                      onChange={onchange_handler}
                      type="text"
                    />
                  </div>

                  <div className="col-md-4 form-group mb-3">
                    <label>Place</label>
                    <input
                      className="form-control"
                      name="place"
                      onChange={onchange_handler}
                      type="text"
                    />
                  </div>

                  <div className="col-md-4 form-group mb-3">
                    <label>Marital Status</label>
                    <select
                      className="form-control"
                      name="maritial_status"
                      onChange={onchange_handler}
                    >
                      <option value="">Select</option>
                      <option value="Single">Single</option>
                      <option value="Married">Married</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Image section */}
              <div className="col-md-4">
                <div className="border rounded p-3 text-center h-100">
                  <span className="fw-bold">Profile Image</span>

                  <div className="d-flex flex-column align-items-center mt-3">
                    <img
                      src={previewImg || ""}
                      alt=""
                      style={{
                        width: "130px",
                        height: "130px",
                        marginBottom: "10px",
                        borderRadius: "8%",
                        objectFit: "cover",
                      }}
                    />

                    <input
                      type="file"
                      className="form-control"
                      name="img_file"
                      onChange={imageChangeHandler}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-12 mt-3">
          <button type="submit" className="btn btn-success float-end">
            Save
          </button>
        </div>

        <ToastContainer pauseOnHover autoClose={3000} position="top-right" />
      </form>
    </div>
  );
};

export default Sales_add_form;
