import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Form = ({ asset }) => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [error, setError] = useState(false);
    const [data, setData] = useState()
    const [input, setInput] = useState({
        name: "",
        desc: "",
        dateFound: "",
        userId: ""
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;

        setInput({
            ...input,
            [name]: value
        });
    };

    const submitForm = async (event) => {
        event.preventDefault();
        let message;
        try {
            if (id) {
                await axios.post(`http://18.136.199.197/asset/${id}`, input);
                message = "Add";
            }

            navigate("/");
            Swal.fire({
                title: `Success ${message} asset`,
                icon: "success",
                timer: 2000,
                showConfirmButton: false
            });
        } catch (error) {
            console.log(error);
            setError(error);
            Swal.fire({
                title: error.response.data.message,
                icon: "error",
                timer: 2000,
                showConfirmButton: false
            });
        }
    };

    const fetchDataById = async (event) => {
        event.preventDefault();
        try {
            const { data } = await axios.get(`https://main.stellar-ip.online/asset/${id}`)
            console.log(data), "<<< INI DATA COOOK";
        } catch (error) {
            console.log(error);
            setError(error);
        }
    };

    useEffect(() => {
        if (id) {
            fetchDataById();
        } else {
            setInput({
                name: "",
                desc: "",
                dateFound: "",
                userId: ""
            });
        }
    }, [id]);

    return (
        <>
            <section className="col-md-9 ms-sm-auto col-lg-10 px-md-4" id="new-asset-section">
                <div className="row justify-content-center"> 
                    <div className="col-12 col-md-6">
                        <form id="product-form" onSubmit={submitForm} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                            <div className="mb-4">
                                <label htmlFor="asset-name" className="block text-gray-700 text-sm font-bold mb-2">Name <span className="text-danger fw-bold">*</span></label>
                                <input
                                    value={input.name}
                                    name="name"
                                    onChange={handleInputChange}
                                    type="text"
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="asset-name"
                                    placeholder="Enter Asset Name"
                                    autoComplete="off"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="asset-desc" className="block text-gray-700 text-sm font-bold mb-2">Description</label>
                                <textarea
                                    value={input.desc}
                                    name="desc"
                                    onChange={handleInputChange}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="asset-desc"
                                    placeholder="Enter Description"
                                ></textarea>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="asset-date-found" className="block text-gray-700 text-sm font-bold mb-2">Date Found</label>
                                <input
                                    value={input.dateFound}
                                    name="dateFound"
                                    onChange={handleInputChange}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="date-found"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="user-id" className="block text-gray-700 text-sm font-bold mb-2">User ID</label>
                                <input
                                    value={input.userId}
                                    name="userId"
                                    onChange={handleInputChange}
                                    type="number"
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="user-id"
                                    placeholder="Enter User ID"
                                />
                            </div>
                            <div className="row mt-5 mb-3">
                                <div className="col-6">
                                    <button
                                        className="bg-blue-500 hover:bg-blue-700 text-dark font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
                                        type="submit"
                                    >
                                        Submit
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </section>

        </>
    );
};

export default Form;
