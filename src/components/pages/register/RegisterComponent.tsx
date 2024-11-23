"use client";

import { useState } from "react";
import MapComponent from "@/components/organisms/Map";
import FormComponent from "@/components/organisms/Form";
import BookingComponent from "@/components/organisms/Booking";

type orgSchema = {
  id: string;
  name?: string,
  email?: string,
  number?: number,
  latitude: number,
  longitude: number,
  address?: string,
}

const RegisterComponent = () => {
  //states
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedOrg, setSelectedOrg] = useState<orgSchema | null>(null);

  if (typeof window === "undefined") return null; 

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
