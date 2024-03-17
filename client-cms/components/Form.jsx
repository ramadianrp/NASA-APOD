import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Form = ({ types }) => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [error, setError] = useState(false);
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
                await axios.put(`https://example.com/api/asset/${id}`, input);
                message = "Edit";
            } else {
                await axios.post("https://example.com/api/asset", input);
                message = "Add New";
            }

            navigate("/asset");
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
            <section className="col-md-9 ms-sm-auto col-lg-10 px-md-4" id="new-product-section">
                <div className="row ">
                    <div className="col-12 col-md-6">
                        <form id="product-form" onSubmit={submitForm}>
                            <div className="mb-3">
                                <label htmlFor="product-name">Name <span className="text-danger fw-bold">*</span></label>
                                <input
                                    value={input.name}
                                    name="name"
                                    onChange={handleInputChange}
                                    type="text"
                                    className="form-control"
                                    id="product-name"
                                    placeholder="Enter Lodging Name"
                                    autoComplete="off"
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="product-desc">Description</label>
                                <textarea
                                    value={input.desc}
                                    name="desc"
                                    onChange={handleInputChange}
                                    className="form-control"
                                    id="product-desc"
                                    placeholder="Enter Description"
                                ></textarea>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="product-date-found">Date Found</label>
                                <input
                                    value={input.dateFound}
                                    name="dateFound"
                                    onChange={handleInputChange}
                                    type="date"
                                    className="form-control"
                                    id="product-date-found"
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="product-user-id">User ID</label>
                                <input
                                    value={input.userId}
                                    name="userId"
                                    onChange={handleInputChange}
                                    type="number"
                                    className="form-control"
                                    id="product-user-id"
                                    placeholder="Enter User ID"
                                />
                            </div>
                            <div className="row mt-5 mb-3">
                                <div className="col-6">
                                    <button
                                        className="btn btn-lg btn-primary rounded-pill w-100 p-2"
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
