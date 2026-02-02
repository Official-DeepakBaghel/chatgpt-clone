import Image from "next/image";
import groupChat from "@/public/group_chat.png";
import { ChevronDown } from "lucide-react";
import { DialogCloseButton } from "./shareBtn";
import shareIcon from "@/public/shareIcon.png";
import { AlertDialogDemo } from "./addPeople";
import UpgradeIcon from "@/public/upgradeAiIcon.png";
import freeIcon from "@/public/freeAiIcon.png";
import { DropdownMenuDialog } from "./threedot";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import chatgptIcon from "@/public/chatgptIcon.png";
import { CircleHelp } from "lucide-react";
export default function Header2() {
    const [open, setOpen] = useState(false);
    const { data: session } = useSession();
    const router = useRouter();
    return (
        <div className={`relative flex justify-between px-8 py-2 ml-2 items-center bg-[#212121] w-full after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-[96%] ${session ? 'after:border-b' : ''} after:border-gray-500`}>

            <div className="relative showPlan flex items-center gap-1 hover:bg-[#303030] h-full p-2 rounded-[8px] cursor-pointer">
                <button
                    className="flex items-center gap-1 hover:bg-[#303030] rounded-[8px] cursor-pointer"
                >
                    <Image src={chatgptIcon} alt="chatgptIcon" width={25} height={25} />
                    <p className="text-white font-semibold text-xs">ChatGPT</p>
                    <ChevronDown size={12} className="text-gray-400 cursor-pointe hover:te        xt-white transition-colors duration-30        0 mt-0.5 ease-in-out" />
                </button>

                <div className="hidePlan absolute top-7 left-0 z-10 bg-[#353535] w-[240px] h-[110px] rounded-[8px] flex flex-col justify-center items-start pl-2 pr-2 cursor-pointer border border-gray-700" style={{ cursor: "pointer" }}>
                    {/* dropdown content */}
                    <div className="flex justify-between items-center w-full hover:bg-[#404040] rounded-[8px] p-2">
                        <div className="flex items-center gap-1 justify-center cursor-pointer">
                            <Image src={UpgradeIcon} alt="upgradeIcon" width={15} height={15} />
                            <div className="flex flex-col justify-center items-start">
                                <h1 className="text-white font-semibold text-xs">   ChatGPT Go</h1>
                                <p className="text-white font-semibold text-[10px]">Our smarter model & more.</p>
                            </div>

                        </div>

                        <button className="text-white cursor-pointer rounded-full w-[50px] h-[20px] text-[7px] border border-white hover:bg-gray-500">
                            Upgrade
                        </button>
                    </div>
                    <div className="flex justify-between items-center w-full cursor-pointer hover:bg-[#404040] rounded-[8px] p-2">
                        <div className="flex items-center gap-1 justify-center">
                            <Image src={freeIcon} alt="upgradeIcon" width={15} height={15} />
                            <div className="flex flex-col justify-center items-start">
                                <h1 className="text-gray-400 font-semibold text-xs">   ChatGPT</h1>
                                <p className="text-gray-400 font-semibold text-[10px]">Great for everyday tasks.</p>
                            </div>

                        </div>
                        <div className="text-gray-400">✓</div>
                    </div>
                </div>




            </div>


            <div className="flex gap-2">
                {session ? <div className="flex items-center gap-1 hover:bg-[#303030] h-full p-2 rounded-[8px] cursor-pointer">
                    <Image src={shareIcon} alt="shareIcon" width={15} height={15} />
                    {/* <p className="text-white font-semibold text-xs">Share</p>  */}
                    <DialogCloseButton />
                </div> : <button className="cursor-pointer bg-white text-black text-[10px] font-semibold text-center rounded-full w-[50px] p-1" onClick={() => router.push("/login_signup")}>Log in</button>}
                {session ? <div className="flex items-center gap-1 hover:bg-[#303030] h-full p-2 rounded-[8px] cursor-pointer">
                    <Image src={groupChat} alt="groupChat" onClick={() => setOpen(true)} width={15} height={15} />


                </div> : <button className="cursor-pointer bg-transparent text-white text-[10px] font-semibold text-center rounded-full w-[100px] p-1 border border-gray-500" onClick={() => router.push("/login_signup")}>Sign Up for free</button>}
                {/* <div className="flex items-center gap-1 text-sm text-white hover:bg-[#303030] h-full p-2 rounded-[8px] cursor-pointer">•••</div> */}
                {session ? <DropdownMenuDialog /> : <CircleHelp size={20} className="text-white cursor-pointer" />}
            </div>
            <AlertDialogDemo open={open} setOpen={setOpen} />
        </div>
    );
}
