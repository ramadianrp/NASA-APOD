import React, { useState, useEffect } from "react";
import NavBar from "./Navbar";
import axios from 'axios';

export default function YourComponent() {
    const [locationData, setLocationData] = useState(null);

    // console.log(locationData.iss_position, "<<<< loc pos");

    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        try {
            const config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: 'https://5ed24c67-3bee-4c64-bb1b-8453c0483738.mock.pstmn.io/location',
                headers: {}
            };

            const response = await axios.request(config);
            setLocationData(response.data);
            console.log(JSON.stringify(response.data));
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    if (!locationData) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <NavBar />
            <div>
                <h1>ISS Location</h1>
                <p>Latitude: {locationData.iss_position.latitude}</p>
                <p>Longitude: {locationData.iss_position.longitude}</p>
                <p>Timestamp: {locationData.timestamp}</p>
            </div>
        </>
    );
}
