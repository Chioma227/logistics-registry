"use client";

import { useState } from "react";
// import FormComponent from "@/components/organisms/Form";
import dynamic from "next/dynamic";
// import MapComponent from "@/components/organisms/Map";
// import BookingComponent from "@/components/organisms/Booking";

const FormComponent = dynamic(() => import("@/components/organisms/Form"), { ssr: false });
const MapComponent = dynamic(() => import("@/components/organisms/Map"), { ssr: false });
const BookingComponent = dynamic(() => import("@/components/organisms/Booking"), { ssr: false });

type orgSchema = {
  id: string;
  name?: string,
  email?: string,
  number?: number,
  latitude: number,
  longitude: number,
  address?: string,
}

const RegisterComponent  = () => {
  //states
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedOrg, setSelectedOrg] = useState<orgSchema | null>(null);

  // Close dialog
  const handleDialogClose = () => {
    setSelectedOrg(null);
    setIsDialogOpen(false);
  };

  return (
    <div className="md:flex items-center block relative">
      <FormComponent />
      <MapComponent
        setSelectedOrg={setSelectedOrg}
        setIsDialogOpen={setIsDialogOpen}
      />

      {selectedOrg && (
        <BookingComponent
          selectedOrg={selectedOrg}
          open={isDialogOpen}
          onClose={handleDialogClose}
        />
      )}
    </div>
  )
}

export default RegisterComponent
