"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";


const ClientRoot = ({ children }: { children: React.ReactNode }) => {

    //state & hoook
    const pathname = usePathname();
    const [displayedPage, setDisplayedPage] = useState(children);
    const [isFading, setIsFading] = useState(false);

    //effect to handle animation start and end on route change
    useEffect(() => {
        setIsFading(true);

        const timeout = setTimeout(() => {
            setDisplayedPage(children);
            setIsFading(false);
        }, 500);

        return () => clearTimeout(timeout);
    }, [pathname, children]);

    return (
        <div className={`fade-container ${isFading ? "fade-out" : "fade-in"}`}>
            {displayedPage}
        </div>
    );
};

export default ClientRoot;
