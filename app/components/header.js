"use client";
import Image from "next/image";
import groupChat from "@/public/group_chat.png";
import temp_chat from "@/public/temp_chat.png";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { AlertDialogDemo } from "./addPeople";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { CircleHelp } from "lucide-react";
import chatgptIcon from "@/public/chatgptIcon.png";
export default function Header() {
    const [open, setOpen] = useState(false);
    const { data: session } = useSession();
    const router = useRouter();
    
    return (
        <>
            <div className="flex justify-between px-8 py-2 pl-4 ml-4 items-center bg-[#212121] w-full">
                <div className="flex items-center gap-1 hover:bg-[#303030] p-2 rounded-[8px] cursor-pointer">
                    <Image src={chatgptIcon} alt="chatgptIcon" width={25} height={25} />
                    <p className="text-white font-semibold text-xs">ChatGPT</p>
                    <ChevronDown size={12} className="text-gray-400 mt-0.5" />
                </div>

                <div className="flex gap-2 ">
                    {session ? <Image
                        src={groupChat}
                        alt="groupChat"
                        width={15}
                        height={15}
                        className="cursor-pointer"
                        onClick={() => setOpen(true)}
                    />
                        : <button className="cursor-pointer bg-white text-black text-[10px] font-semibold text-center rounded-full w-[50px] p-1" onClick={() => router.push("/login_signup")}> Log in</button>}

                    {session ? <Image
                        src={temp_chat}
                        alt="temp_chat"
                        width={15}
                        height={15}
                    /> : <button className="cursor-pointer bg-transparent text-white text-[10px] font-semibold text-center rounded-full w-[100px] p-1 border border-gray-500" onClick={() => router.push("/login_signup")}>Sign Up for free</button>}
                    {session ? null : <CircleHelp size={20} className="text-white cursor-pointer" />}
                </div>
            </div>


            <AlertDialogDemo open={open} setOpen={setOpen} />
        </>
    );
}
