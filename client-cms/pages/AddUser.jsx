import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AddStaffPage() {
  const [input, setInput] = useState({
    username: "",
    email: "",
    password: "",
    phoneNumber: "",
    address: "",
  });
  console.log(input);

  const navigate = useNavigate();

  const handleInputAddStaffChange = (item) => {
    const { name, value } = item.target;

    setInput({
      ...input,
      [name]: value,
    });
  };

  const handleButtonSubmitAddStaff = async (item) => {
    item.preventDefault();
    try {
      const { data } = await axios({
        method: "POST",
        url: `https://main.stellar-ip.online/add-user`,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        data: input,
      });
      navigate("/asset");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {/* New User Section */}
      <section className="col-md-0 px-md-4 d-flex justify-content-center" id="new-user-section">
        <div className="row">
          <div className="col-12 col-md-6">
            <div className="pt-3 pb-2 mb-3 border-bottom">
              <form id="register-form" onSubmit={handleButtonSubmitAddStaff}>
                <h1 className="h3 mb-3 display-1 text-center">Add User</h1>
                <div className="mb-3">
                  <div className="d-flex justify-content-between">
                    <label htmlFor="register-username">Username</label>
                    <label className="text-danger text-end fw-bold">*</label>
                  </div>
                  <input
                    type="text"
                    value={input.name}
                    name="username"
                    onChange={handleInputAddStaffChange}
                    className="form-control"
                    id="register-username"
                    placeholder="Enter username ..."
                    autoComplete="off"
                    required=""
                  />
                </div>
                <div className="mb-3">
                  <div className="d-flex justify-content-between">
                    <label htmlFor="register-email">Email</label>
                    <label className="text-danger text-end fw-bold">*</label>
                  </div>
                  <input
                    value={input.email}
                    name="email"
                    onChange={handleInputAddStaffChange}
                    type="email"
                    className="form-control"
                    id="register-email"
                    placeholder="Enter email address ..."
                    autoComplete="off"
                    required=""
                  />
                </div>
                <div className="mb-3">
                  <div className="d-flex justify-content-between">
                    <label htmlFor="register-password">Password</label>
                    <label className="text-danger text-end fw-bold">*</label>
                  </div>
                  <input
                    value={input.password}
                    name="password"
                    onChange={handleInputAddStaffChange}
                    type="password"
                    className="form-control"
                    id="register-password"
                    placeholder="Enter password ..."
                    autoComplete="off"
                    required=""
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="register-phone">Phone Number</label>
                  <input
                    value={input.phoneNumber}
                    name="phoneNumber"
                    onChange={handleInputAddStaffChange}
                    type="text"
                    className="form-control"
                    id="register-phone"
                    placeholder="Enter phone number (optional) ..."
                    autoComplete="off"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="register-address">Address</label>
                  <textarea
                    value={input.address}
                    name="address"
                    onChange={handleInputAddStaffChange}
                    id="register-address"
                    className="form-control"
                    rows={3}
                    placeholder="Enter address (optional) ..."
                    autoComplete="off"
                    defaultValue={""}
                  />
                </div>
                <button
                  className="btn btn-lg btn-primary rounded-pill w-100 p-2 mt-3"
                  type="submit"
                >
                  Sign Up
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* End New User Section */}
    </>
  );
}

export default AddStaffPage;
