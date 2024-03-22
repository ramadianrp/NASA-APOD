import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  //   console.log(input);
  const navigate = useNavigate();

  const handleInputChange = async (event) => {
    console.log(event.target.value, "<<< ini EVENT");
    const { name, value } = event.target;
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
        url: `https://main.stellar-ip.online/login`,
        data: input,
      });
      console.log(data, "ini data di handle");
      localStorage.setItem("token", data.token);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleCredentialResponse = async (credential) => {
    // console.log("Encoded JWT ID token: ", response);
    try {
      const { data } = await axios.post(`https://main.stellar-ip.online/google-login`, {
        googleToken: credential
      });
      localStorage.access_token = data.access_token;
      navigate("/");
      Swal.fire({
        title: "login success",
        icon: "success",
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    google.accounts.id.initialize({
      client_id: "400285801655-r144spmn48l2tc05ck0ujlo9sqs7r8bu.apps.googleusercontent.com",
      callback: handleCredentialResponse
    });
    google.accounts.id.renderButton(
      document.getElementById("buttonDiv"),
      { theme: "outline", size: "large" }  // customization attributes
    );
    // google.accounts.id.prompt(); // also display the One Tap dialog

  }, [])

  return (
    <>
      {/* Login Section */}
      <div className="flex justify-center items-center h-screen">
        <div className="border-2 rounded-lg p-8 shadow-lg items-center" >
          <h1 className="block font-bold text-teal-500 text-4xl text-center">Login</h1>
          <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-8">
            <div className="mb-4 ">
              <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
              <input type="email" id="email" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="email" onChange={handleInputChange} required />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password</label>
              <input type="password" id="password" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="password" onChange={handleInputChange} required />
            </div>
            <div className="flex items-center justify-center">
              <button type="submit" className="bg-teal-500 hover:bg-teal-700 text-dark font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Login</button>
            </div>
          </form>
          <div className="flex items-center justify-center" id="buttonDiv"></div>
        </div>
      </div>
      {/* End Login Section */}
    </>
  );
}

export default LoginPage;
