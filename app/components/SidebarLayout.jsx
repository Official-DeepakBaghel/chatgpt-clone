"use client";
import { useState } from "react";
import Sidebar from "./sidebar";
import CloseSidebar from "./closeSlidebar";

export default function SidebarLayout() {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div
            className={`relative transition-all duration-300 ease-in-out h-screen border-r border-gray-700 bg-[#181818] overflow-hidden ${isOpen ? "w-[238px]" : "w-[60px]"
                }`}
        >
            {/* Sidebar with transition */}
            <div
                className={`absolute inset-0 transition-opacity duration-300 ease-in-out bg-black ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                    }`}
            >
                <Sidebar onClose={() => setIsOpen(false)} />
            </div>

            {/* Close sidebar view with transition */}
            <div
                className={`absolute inset-0 transition-opacity duration-300 ease-in-out ${isOpen ? "opacity-0 pointer-events-none" : "opacity-100 pointer-events-auto"
                    }`}
            >
                <CloseSidebar onOpen={() => setIsOpen(true)} />
            </div>
        </div>
    );
}