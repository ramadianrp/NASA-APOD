import React, { useState, useEffect } from "react";
import NavBar from "./Navbar";

export default function NasaPhoto(){
    const [photoData, setPhotoData] = useState(null);

    useEffect(() => {
        fetchPhoto();

        async function fetchPhoto(){
            const res = await fetch(
                `https://api.nasa.gov/planetary/apod?api_key=eGclkIR1GWbubD6kxxF3Sk4heUOpNmRK6dUVzkxX`
            );
            const data = await res.json();
            setPhotoData(data)
            console.log(data);
        }
    }, []);

    if (!photoData){
        return <div/>
    }


    return(
        <>
        <NavBar />
        <div className="NasaMain fullscreen-bg">
            <img src={photoData.url} className="imageNasa"/>
            <div className="isiNasa">
                <h3>Photo of the day :</h3>
                <h1>{photoData.title}</h1>
                <p> date : {photoData.date}</p>
                <p>{photoData.explanation}</p>
            </div>
        </div>
        </>
    )


}

