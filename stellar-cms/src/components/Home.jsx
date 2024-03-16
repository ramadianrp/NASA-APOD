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
                <Link className="Link" to="/issPos">ISS Position</Link>
            </ul>
            <ul>
                <Link className="Link" to="/astro">Astronauts</Link>
            </ul>
        </header>
        <div className="home-background">
            <h1>Choose From Navbar</h1>
        </div>
        </>
    )
}
