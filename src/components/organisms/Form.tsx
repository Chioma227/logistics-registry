"use client";

import { toast } from "sonner";
import { Input } from "../ui/input"
import { Button } from "../ui/button";
import Loader from "../loader/Loader";
import { useState, useEffect } from "react";
import { db } from "../../../firebase.config";
import { collection, addDoc } from "firebase/firestore";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";


const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY || "";

const defaultCenter = {
    lat: 37.7749,
    lng: -122.4194,
};

const FormComponent = () => {
    //states
    const [name, setName] = useState("");
    const [email, setEmail] = useState('');
    const [number, setNumber] = useState('');
    const [address, setAddress] = useState('');
    const [loading, setLoading] = useState(false);
    const [latitude, setLatitude] = useState("37.7749");
    const [longitude, setLongitude] = useState("-122.4194");
    const [markerPosition, setMarkerPosition] = useState(defaultCenter);
    // const [isClient, setIsClient] = useState(false);

    // useEffect(() => {
    //   setIsClient(true); // Mark the component as mounted
    // }, []);


    const { isLoaded } = useLoadScript({
        googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    });

    // let window: Window & typeof globalThis;

    useEffect(() => {
        if (typeof window !== "undefined" && "geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setLatitude(String(latitude));
                    setLongitude(String(longitude));
                    setMarkerPosition({ lat: latitude, lng: longitude });
                },
                (error) => {
                    setLatitude("37.7749");
                    setLongitude("-122.4194");
                    console.error("Error fetching location:", error);
                }
            );
        }
    }, []);


    const handleMapClick = (event: google.maps.MapMouseEvent) => {
        if (event.latLng) {
            const lat = event.latLng.lat();
            const lng = event.latLng.lng();
            setLatitude(String(lat));
            setLongitude(String(lng));
            setMarkerPosition({ lat, lng });
        }
    };


    // const handleGeocode = async () => {
    //     if (!address) {
    //         toast("Please enter an address.");
    //         return;
    //     }
    //     try {
    //         const response = await fetch(
    //             `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
    //                 address
    //             )}&key=${GOOGLE_MAPS_API_KEY}`
    //         );
    //         const data = await response.json();
    //         if (data.results.length > 0) {
    //             const location = data.results[0].geometry.location;
    //             setLatitude(location.lat);
    //             setLongitude(location.lng);
    //             setMarkerPosition({ lat: location.lat, lng: location.lng });
    //         } else {
    //             toast("Address not found.");
    //         }
    //     } catch (error) {
    //         console.error("Geocoding error:", error);
    //     }
    // };

    //handle submit function
    const handleSubmit = async (e: React.FormEvent) => {
        //prevent default browser submit behavior
        e.preventDefault();

        //check if inputs are empty
        if (!name || !email || !number) {
            toast("All fields are required");
            return;
        }
        try {
            setLoading(true);
            await addDoc(collection(db, "organizations"), {
                name,
                email,
                address,
                number,
                latitude: parseFloat(latitude),
                longitude: parseFloat(longitude),
                createdAt: new Date(),
            });
            toast("Organization added successfully!");
            setName("");
            setEmail('');
            setNumber('');
            setAddress('');
            setLoading(false);
        } catch {
            setLoading(false);
            toast("Failed to add organization");
        }
    };

    if (!isLoaded) return <Loader />;

    return (
        <section className="lg:w-[35%] md:w-[50%] w-full lg:h-screen h-fit bg-white md:p-[23px] p-[15px] shadow-xl rounded-md">
            <h3 className="font-extrabold text-[25px] py-[20px]">Register Company</h3>
            <form onSubmit={handleSubmit} action="" className="">
                <div className="mb-[15px]">
                    <label htmlFor="name" className="font-medium ">Company Name*</label><br />
                    <Input
                        name="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full outline-none mt-[6px]" />
                </div>
                <div className="mb-[15px]">
                    <label htmlFor="email" className="font-medium ">Email*</label><br />
                    <Input
                        name="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full outline-none mt-[6px]" />
                </div>
                <div className="mb-[15px]">
                    <label htmlFor="address" className="font-medium ">Address*</label><br />
                    <Input
                        name="address"
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="w-full outline-none mt-[6px]" />
                </div>
                <div className="mb-[15px]">
                    <label htmlFor="number" className="font-medium ">WhatsApp Number*</label><br />
                    <Input
                        name="number"
                        type="text"
                        value={number}
                        onChange={(e) => setNumber(e.target.value)}
                        className="w-full outline-none mt-[6px]" />
                </div>
                <div className="mb-[15px]">
                    <label htmlFor="latitude" className="font-medium ">Latitude</label><br />
                    <Input
                        name="latitude"
                        type="text"
                        value={latitude}
                        readOnly
                        className="w-full outline-none mt-[6px]" />
                </div>
                <div className="mb-[15px]">
                    <label htmlFor="longitude" className="font-medium ">Longitude</label><br />
                    <Input
                        name="longitude"
                        type="text"
                        value={longitude}
                        readOnly
                        className="w-full outline-none mt-[6px]" />
                </div>
                <div className="mt-[40px] w-full">
                    <Button disabled={loading} type="submit"
                        className="w-full text-white font-medium hover:bg-gray-700 hover:text-white">
                        {loading ? <>
                            <Loader /> In Progress...
                        </> : "Register"}
                    </Button>
                </div>
            </form>

            <div className="mt-8 hidden">
                <h2 className="text-lg font-bold mb-2">Set Organization Location on Map</h2>
                {latitude && longitude && <GoogleMap
                    zoom={12}
                    center={markerPosition}
                    mapContainerStyle={{ width: "100%", height: "400px" }}
                    onClick={handleMapClick}
                >
                    <Marker position={markerPosition} />
                </GoogleMap>}
            </div>
        </section>
    )
}

export default FormComponent
