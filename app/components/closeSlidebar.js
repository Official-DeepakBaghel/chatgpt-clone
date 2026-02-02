import Image from "next/image"
import chatgptIcon from "@/public/chatgptIcon.png"
import editIcon from "@/public/editIcon.png"
import searchIcon from "@/public/searchIcon.png"
import galleryIcon from "@/public/galleryIcon.png"
import primiumIcon from "@/public/primium.png"
import userIcon from "@/public/mr.png"
import closeIcon from "@/public/close-sidebar.png"
import Link from "next/link"
import UserInfoDialog from "./UserInfoDialog"
import { useState } from "react"
import SearchChat from "./searchChat"
import { useSession } from "next-auth/react"
export default function CloseSlidebar({ onOpen }) {
    const { data: session } = useSession();
    const [showReportDialog, setShowReportDialog] = useState(false)
    const [showUserDialog, setShowUserDialog] = useState(false)
    return (
        <div className="bg-[#212121] h-full w-full border-r flex justify-between flex-col border-gray-500">
            <div className="flex flex-col gap-3 pt-4 justify-center items-center">
                <div className="relative group w-[33px] h-[33px] cursor-w-resize hover:bg-[#313131]  rounded-[10px] ">

                    <Image
                        src={chatgptIcon}
                        alt="chatgptIcon"
                        width={33}
                        height={33}
                        className="block group-hover:hidden"

                    />


                    <Image
                        src={closeIcon}
                        alt="closeIcon"
                        width={22}
                        height={22}
                        className="hidden group-hover:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100"
                        onClick={onOpen}

                    />
                </div>
                <div className="flex flex-col gap-2 justify-center items-center ">
                    <div className=" hover:bg-[#313131] p-2 rounded-[10px] cursor-pointer">
                        <Link href="/"><Image src={editIcon} alt="editIcon" width={22} height={22} className="" /></Link>
                    </div>
                    <div className="hover:bg-[#313131] p-2 rounded-[10px] cursor-pointer">
                        <Image src={searchIcon} alt="searchIcon" width={22} height={22} onClick={() => setShowReportDialog(true)} />
                    </div>
                    <div className="hover:bg-[#313131] p-2 rounded-[10px] cursor-pointer">
                        <Link href="/image"><Image className="galleryIcon" src={galleryIcon} alt="galleryIcon" width={22} height={22} /></Link>
                    </div>
                </div>
            </div>
            <SearchChat showReportDialog={showReportDialog} setShowReportDialog={setShowReportDialog} />
            <div className="flex flex-col gap-2 justify-center items-center m-2">
                <div className=" hover:bg-[#313131] p-2 rounded-[10px] cursor-pointer">
                    < Image src={primiumIcon} alt="primiumIcon" width={30} height={30} />
                </div>
                <UserInfoDialog isOpen={showUserDialog} onOpenChange={setShowUserDialog}>
                    <div className=" hover:bg-[#313131] p-2 rounded-[10px] cursor-pointer">
                        {session?.user?.image ? (
                            <Image src={session.user.image} alt="userIcon" width={25} height={25} className="rounded-full" />
                        ) : (
                            <div className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-gray-600">
                                <p className="text-white font-semibold text-xs">
                                    {session?.user?.name?.trim()?.charAt(0)?.toUpperCase() ||
                                        session?.user?.email?.charAt(0)?.toUpperCase() ||
                                        "U"}

                                </p>
                            </div>
                        )}
                    </div></UserInfoDialog>
            </div>

        </div>
    );
}