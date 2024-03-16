import React, { useState, useEffect } from "react";
import NavBar from "./Navbar";
import axios from "axios";
import { Link } from "react-router-dom";

export default function IssSat() {
    const [issData, setIssData] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        try {
            const res = await fetch(
                `https://api.wheretheiss.at/v1/satellites`
            );
            if (!res.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await res.json();
            setIssData(data[0]);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    async function handleClick() {
        try {
            const response = await axios.get('https://5ed24c67-3bee-4c64-bb1b-8453c0483738.mock.pstmn.io/location');
            console.log(JSON.stringify(response.data));
        } catch (error) {
            console.error('Error fetching location:', error);
        }
    }

    if (!issData) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <NavBar />
            <div className="IssMain">
                <div className="table-container">
                    <table className="table">
                        <tr>
                            <th>Name</th>
                            <th>ID</th>
                        </tr>
                        <tr>
                            <th>{issData.name}</th>
                            <th>{issData.id}</th>
                        </tr>
                    </table>
                </div>
            </div>
        </>
    );
}
