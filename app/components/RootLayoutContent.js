"use client";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import SidebarLayout from "./SidebarLayout";
import Header from "./header";
import Header2 from "./header2";

export default function RootLayoutContent({ children }) {
    const { data: session } = useSession(); // Access session data
    const pathname = usePathname();

    const hideSidebar = pathname.startsWith("/login_signup");
    const hideHeader2 = pathname === "/" || pathname === "/image" || pathname.startsWith("/login_signup");
    const hideHeader = pathname.startsWith("/c/") || pathname.startsWith("/image") || pathname.startsWith("/login_signup");

    return (
        <div className="flex h-screen bg-[#212121] overflow-hidden">
            {/* Only show Sidebar if user is logged in (session exists) and not on a hidden route */}
            {session && !hideSidebar ? <SidebarLayout /> : <div />}

            <div className="flex-1 flex flex-col overflow-hidden">
                {!hideHeader2 && <Header2 />}
                {!hideHeader && <Header />}

                <div className="black-scrollbar flex-1 overflow-y-auto">
                    {children}
                </div>
            </div>
        </div>
    );
}
