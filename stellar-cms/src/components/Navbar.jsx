import React from "react";
import { Link } from "react-router-dom";

export default function NavBar(){
    return(
        <header className="navbar navbar-fixed">
            <ul>
                <Link className="Link" to="/">Back to Home</Link>
            </ul>
            <ul>
                <Link className="Link" to="/nasaphoto">Nasa Photo</Link>
            </ul>
            <ul>
                <Link className="Link" to="/issSat">ISS</Link>
            </ul>
        </header>
    )
}

