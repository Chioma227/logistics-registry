"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Header from "@/components/molecules/Header";

const HomeComponent = () => {
    const router = useRouter();

    //handle navigate
    const handleRoute = () => {
        router.push("/register")
    }
    return (
        <main className="h-[100dvh] sm:px-[50px]">
            <Header />
            <section className="flex items-center justify-center md:mt-[150px] mt-[70px]">
                <div className="text-center p-8">
                    <h1 className="sm:text-4xl text-[30px] font-bold mb-4">Welcome to LogiRegistry</h1>
                    <p className="text-lg text-gray-600 mb-6">
                        Connect, register, and grow with the leading logistics registry platform. Start your journey today!
                    </p>
                    <Button onClick={handleRoute} className="px-6 py-3 text-white rounded-lg hover:bg-gray-700 transition">
                        Register Your Company Now
                    </Button>
                </div>
            </section>
        </main>
    )
}

export default HomeComponent
