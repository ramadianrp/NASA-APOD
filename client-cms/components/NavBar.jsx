import React from "react";
import { Link } from "react-router-dom";

export default function NavBar(){
    return(
        <header className="navbar navbar-fixed">
            <ul>
                <Link className="Link" to="/asset">Asset</Link>
            </ul>
            <ul>
                <Link className="Link" to="/add-user">Add Member</Link>
            </ul>
        </header>
    )
}

