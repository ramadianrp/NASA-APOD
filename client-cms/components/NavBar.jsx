import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2"

export default function NavBar(){

    const navigate = useNavigate();

    const handleLogout = async () => {
        const result = await Swal.fire({
            title: "Logout?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sure",
        });

        if (result.isConfirmed) {
            localStorage.clear();
            Swal.fire({
                title: "Logout Success!",
                icon: "success",
                timer: 1500,
                showConfirmButton: false,
            });

            navigate("/login");
        }
    };

    return(
        <header className="navbar navbar-fixed">
            <ul>
                <Link className="Link" to="/asset">Asset</Link>
            </ul>
            <ul>
                <Link className="Link" to="/add-user">Add Member</Link>
            </ul>
            <ul>
                <Link onClick={handleLogout} className="Link">Logout</Link>
            </ul>
            
            
        </header>
    )
}

