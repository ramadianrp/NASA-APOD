import React, { useState, useEffect } from "react";
import axios from 'axios';
import NavBar from "./Navbar";

export default function YourComponent() {
    const [astroData, setAstroData] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        try {
            const config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: 'http://api.open-notify.org/astros.json',
                headers: {}
            };

            const response = await axios.request(config);
            setAstroData(response.data);
            console.log(JSON.stringify(response.data));
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    if (!astroData) {
        return <div>Loading...</div>;
    }

    return (
        <>
        <NavBar />
            <div className="containerAstro">
                <h1>Astronaut Data</h1>
                <p>Total Astronauts: {astroData.number}</p>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Craft</th>
                        </tr>
                    </thead>
                    <tbody>
                        {astroData.people.map((person, index) => (
                            <tr key={index}>
                                <td>{person.name}</td>
                                <td>{person.craft}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}
