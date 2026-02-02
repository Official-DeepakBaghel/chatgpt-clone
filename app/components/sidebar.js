"use client";

import { getUserChats } from "@/app/actions/chatActions";
import Image from "next/image"
import chatgptLogo from "@/public/chatgptIcon.png"
import closeIcon from "@/public/close-sidebar.png"
import newChatIcon from "@/public/editIcon.png"
import searchIcon from "@/public/searchIcon.png"
import galleryIcon from "@/public/galleryIcon.png"
import appsIcon from "@/public/appsIcon.png"
import userIcon from "@/public/mr.png"
import { ChevronDown, ChevronRight, MoreHorizontal } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import SearchChat from "./searchChat"
import UserInfoDialog from "./UserInfoDialog"
import KeyboardShortcut from "./KeyboardShortcut"
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import chatgptIcon from "@/public/chatgptIcon.png";
import { DropdownMenuDialog } from "./threedot";
export default function Sidebar({ onClose }) {
    const { data: session } = useSession();
    const [isChatListOpen, setIsChatListOpen] = useState(true)
    const [showUserDialog, setShowUserDialog] = useState(false)
    const [showReportDialog, setShowReportDialog] = useState(false)
    const [chats, setChats] = useState([]);
    const [hoveredChatId, setHoveredChatId] = useState(null);
    const searchParams = useSearchParams();

    useEffect(() => {
        async function loadChats() {
            try {
                const userChats = await getUserChats();
                setChats(userChats);
            } catch (error) {
                console.error("Failed to load chats", error);
            }
        }
        loadChats();
    }, []);

    const toggleSearch = () => {
        setShowReportDialog((prev) => !prev);
    };

    return (
        <div className="bg-[#171717] relative flex flex-col w-full md:w-[260px] h-full text-[#ececec]">
            {/* Sticky Top Section */}
            <div className="w-full bg-[#171717]">
                {/* Header */}
                <div className="w-full flex justify-between items-center px-3 py-3 bg-[#171717]">
                    <div className="flex items-center gap-2">

                        <Image src={chatgptIcon} alt="ChatGPT" width={30} height={30} />

                    </div>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 flex items-center mr-4 justify-center hover:bg-[#2a2a2a] rounded-lg transition-colors"
                    >
                        <Image src={closeIcon} alt="ChatGPT" width={24} height={24} />
                    </button>
                </div>

                {/* Menu Items */}
                <div className="px-2 pb-2 space-y-1">
                    <Link
                        href="/"
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[#212121] transition-colors group"
                    >
                        <Image src={newChatIcon} alt="ChatGPT" width={24} height={24} />
                        <span className="text-sm font-normal">New chat</span>
                    </Link>

                    <button
                        onClick={toggleSearch}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[#212121] transition-colors w-full group"
                    >
                        <Image src={searchIcon} alt="ChatGPT" width={24} height={24} />
                        <span className="text-sm font-normal">Search chats</span>
                    </button>

                    <Link
                        href="/image"
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[#212121] transition-colors group"
                    >
                        <Image src={galleryIcon} alt="ChatGPT" width={24} height={24} />
                        <span className="text-sm font-normal">Images</span>
                    </Link>
                </div>
            </div>

            {/* Scrollable Middle Section */}
            <div className="flex-1 overflow-y-auto px-2 custom-scrollbar">
                {isChatListOpen && chats.length > 0 && (
                    <div className="space-y-0.5 pb-2">
                        <h6 className="text-sm font-semibold px-3 py-2.5 border-b border-[#2a2a2a]">Your Chats</h6>

                        {chats.map((chat) => (

                            <Link
                                key={chat.chat_id}
                                href={`/c/${chat.chat_id}`}
                                className="group flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-[#212121] transition-colors relative"
                                onMouseEnter={() => setHoveredChatId(chat.chat_id)}
                                onMouseLeave={() => setHoveredChatId(null)}
                            >
                                <p className="text-sm font-normal truncate flex-1 pr-2">
                                    {chat.title || "New Chat"}
                                </p>
                                {hoveredChatId === chat.chat_id && (
                                    <div
                                        className="w-6 h-6 flex items-center justify-center hover:bg-[#2a2a2a] rounded-md opacity-0 group-hover:opacity-100 transition-opacity"
                                        onClick={(e) => e.preventDefault()}
                                    >
                                        <DropdownMenuDialog />
                                    </div>
                                )}

                            </Link>
                        ))}
                    </div>
                )}
            </div>

            {/* Sticky Bottom Section */}
            <div className="border-t border-[#2a2a2a] bg-[#171717]">
                <UserInfoDialog isOpen={showUserDialog} onOpenChange={setShowUserDialog}>
                    <div className="fixed bottom-0 h-17.5 bg-[#181818] flex items-center justify-between gap-2 p-2 border-t border-gray-700 w-[225px] cursor-pointer">
                        <div className="flex items-center gap-2 " >
                            {session?.user?.image ? (
                                <Image
                                    src={session.user.image}
                                    alt="user avatar"
                                    width={30}
                                    height={30}
                                    className="rounded-full object-cover"
                                />
                            ) : (
                                <div className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-gray-600">
                                    <p className="text-white font-semibold text-xs">
                                        {session?.user?.name?.trim()?.charAt(0)?.toUpperCase() ||
                                            session?.user?.email?.charAt(0)?.toUpperCase() ||
                                            "U"}

                                    </p>
                                </div>
                            )}

                            <div className="flex flex-col">
                                <p className="text-white font-semibold text-xs truncate max-w-[120px]" >{session?.user?.name || session?.user?.email?.split('@')[0] || "User"}</p>
                                <p className="text-gray-400 text-xs">Free</p>
                            </div>
                        </div>
                        <button className="bg-gray-600 text-white cursor-pointer rounded-full px-3 py-1 text-xs border border-white hover:bg-gray-500">
                            Upgrade
                        </button>
                    </div>
                </UserInfoDialog>
            </div>

            <SearchChat showReportDialog={showReportDialog} setShowReportDialog={setShowReportDialog} />
            <KeyboardShortcut onToggleSearch={toggleSearch} />

            <style jsx global>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 8px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #2a2a2a;
                    border-radius: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #3a3a3a;
                }
            `}</style>
        </div>
    )
}