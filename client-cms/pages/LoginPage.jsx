import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  //   console.log(input);
  const navigate = useNavigate();

  const handleInputChange = async (event) => {
    // console.log(event.target.value, "<<< ini EVENT");
    const { name, value } = event.target;

    // const newInput = {
    //   ...input,
    // };

    // newInput[name] = value;

    // setInput(newInput);
    setInput({
      ...input,
      [name]: value,
    });
  };
  console.log(input);

  const handleSubmit = async (item) => {
    item.preventDefault();
    try {
      const { data } = await axios({
        method: "POST",
        url: `https://enter.stellar-ip.online/login`,
        data: input,
      });
      console.log(data, "ini data di handle");
      localStorage.setItem("token", data.token);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {/* Login Section */}
      <section className="container" id="login-section">
        <div className="row">
          <div className="col-12 text-center">
            <h1 className="mb-3 mt-5" style={{ color: "black" }}>
              Login Options
            </h1>
            <span style={{ color: "black" }}>
              Log in 
            </span>
          </div>
          <div className="col-12 col-lg-8 offset-lg-2 my-5">
            <div className="row align-items-center">
              <div className="col-12 col-md-6 border-end p-5 text-left">
              </div>
              <div className="col-10 col-md-6 p-5 text-left">
                <div className="form-signin m-auto">
                  <form id="login-form" onSubmit={handleSubmit}>
                    <h1
                      className="h3 mb-4 display-5"
                      style={{ color: "black" }}
                    >
                      Log in to your account
                    </h1>
                    <div className="mb-3 mt-3">
                      <div className="d-flex justify-content-between">
                        <label htmlFor="login-email" style={{ color: "black" }}>
                          Email
                        </label>
                        <label className="text-danger text-end fw-bold">
                          *
                        </label>
                      </div>
                      <input
                        type="email"
                        className="form-control"
                        id="login-email"
                        name="email"
                        onChange={handleInputChange}
                        value={input.email}
                        placeholder="EMAIL BANG"
                        autoComplete="off"
                        required=""
                      />
                    </div>
                    <div className="mb-4">
                      <div className="d-flex justify-content-between">
                        <label
                          htmlFor="login-password"
                          style={{ color: "black" }}
                        >
                          Password
                        </label>
                        <label className="text-danger text-end fw-bold">
                          *
                        </label>
                      </div>
                      <input
                        type="password"
                        className="form-control"
                        name="password"
                        onChange={handleInputChange}
                        value={input.password}
                        id="login-password"
                        placeholder="PASSWORD BANG"
                        autoComplete="off"
                        required=""
                      />
                    </div>
                    <div className="checkbox mb-3">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          defaultValue=""
                          id="login-remember"
                        />
                      </div>
                    </div>
                    <button
                      className="btn btn-lg btn-primary rounded-pill w-100 p-2"
                      type="submit"
                    >
                      Log In
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* End Login Section */}
    </>
  );
}

export default LoginPage;
