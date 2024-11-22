"use client";

import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import { db } from "../../../firebase.config";
import { collection, onSnapshot } from "firebase/firestore";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { MapPin, Phone, Mail } from "lucide-react";


type orgSchema = {
    id: string;
    name?: string,
    email?: string,
    number?: number,
    latitude: number,
    longitude: number,
    address?: string,
}

// marker icon
const redIcon = new L.Icon({
    iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

const MapComponent = () => {
    //states
    const [organizations, setOrganizations] = useState<orgSchema[]>([]);

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "organizations"), (snapshot) => {
            const orgData: orgSchema[] = snapshot.docs.map((doc) => {
                const data = doc.data() as orgSchema;
                return {
                    id: doc.id,
                    name: data.name,
                    number: data.number,
                    email: data.email,
                    address: data.address,
                    latitude: data.latitude,
                    longitude: data.longitude,
                };
            });
            setOrganizations(orgData);
        });

        return () => unsubscribe();
    }, []);

    return (
        <MapContainer
            center={[0, 0]}
            zoom={2}
            className="h-[600px] md:w-[65%] w-full"
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; OpenStreetMap contributors"
            />
            {organizations.map((org) => (
                <Marker
                    key={org.id}
                    position={[org.latitude, org.longitude]}
                    icon={redIcon}
                >
                    <Popup className="w-[300px]">
                        <section>
                            <p className="text-[15px] uppercase font-bold mb-[10px]">{org.name}</p>
                            <div className="flex items-center gap-2 mb-[2px]">
                                <MapPin size={20} />
                                <p className="m-0">{org.address}</p>
                            </div>
                            <div className="flex items-center gap-2 mb-[2px]">
                                <Phone size={20}/>
                                <p className="m-0">{org.number}</p>
                            </div>
                            <div className="flex items-center gap-2 mb-[2px]">
                                <Mail size={20} />
                                <p className="m-0">{org.email}</p>
                            </div>
                        </section>
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    )
}

export default MapComponent
