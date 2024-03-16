import React from "react";
import { Link } from "react-router-dom";
import NavBar from "./Navbar";

export default function Home() {
    return (
        <>
        <header className="navbar navbar-fixed">
            <ul>
                <Link className="Link" to="/nasaphoto">Nasa Photo</Link>
            </ul>
            <ul>
                <Link className="Link" to="/issSat">ISS</Link>
            </ul>
        </header>
        </>
    )
}
