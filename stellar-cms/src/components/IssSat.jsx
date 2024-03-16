import React, { useState, useEffect } from "react";
import NavBar from "./Navbar";

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
