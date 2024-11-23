import {
    Dialog,
    DialogContent,
    DialogTitle
} from "../ui/dialog"
import { toast } from "sonner";
import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Loader from "../loader/Loader";
import { db } from "../../../firebase.config";
import { collection, addDoc } from "firebase/firestore";

type orgSchema = {
    id: string;
    name?: string,
    email?: string,
    number?: number,
    latitude: number,
    longitude: number,
    address?: string,
}

const BookingComponent = ({
    open,
    onClose,
    selectedOrg,
}: {
    open: boolean;
    onClose: () => void
    selectedOrg: orgSchema;
}) => {
    //states
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [details, setDetails] = useState("");
    const [loading, setLoading] = useState(false);

    //submit form function
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setLoading(true);
            await addDoc(collection(db, "bookings"), {
                orgId: selectedOrg.id,
                orgName: selectedOrg.name,
                name,
                email,
                details,
                createdAt: new Date(),
            });
            toast("Booking successfully submitted!");
            onClose();
        } catch {
            toast("Failed to submit booking.");
        } finally {
            setLoading(false);
        }
    };

    if (!selectedOrg) return null;

    return (
        <Dialog open={open} onOpenChange={(state) => !state && onClose()}>
            <DialogContent className="z-[9999]">
                <DialogTitle className="font-bold uppercase text-center text-[14px]">Book {selectedOrg.name}</DialogTitle>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block font-medium">Your Name</label>
                        <Input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full border px-3 py-2 rounded outline-none"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block font-medium">Your Email</label>
                        <Input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full border px-3 py-2 rounded outline-none"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block font-medium">Booking Details</label>
                        <textarea
                            value={details}
                            onChange={(e) => setDetails(e.target.value)}
                            className="w-full border px-3 py-2 rounded outline-none"
                            rows={4}
                            required
                        />
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-300 text-gray-800 px-4 py-2 rounded mr-2"
                        >
                            Cancel
                        </button>
                        <Button
                            type="submit"
                            className={`px-4 py-2 rounded ${loading ? "bg-gray-500" : " text-white hover:bg-gray-700"}`}
                            disabled={loading}
                        >
                            {loading ? <Loader /> : "Submit"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>

    );
};

export default BookingComponent;
