import React from "react";
import { Link } from "react-router-dom";

export default function NavBar(){
    return(
        <div>
            <ul>
                <Link to="/">Kembalikan saya ke home</Link>
            </ul>
            <ul>
                <Link to="/nasaphoto">Nasa Photo</Link>
            </ul>
            <ul>
                <Link to="/issSat">ISS</Link>
            </ul>
        </div>
    )
}

