import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog"
import Link from "next/link"
import newChatIcon from "@/public/editIcon.png"
import Image from "next/image"
export default function SearchChat({ showReportDialog, setShowReportDialog }) {
    return (
        <Dialog open={showReportDialog} onOpenChange={setShowReportDialog} >
            <DialogContent className="sm:max-w-[630px] h-[330px] bg-[#212121] border border-gray-700 rounded-lg  [&>button]:text-white
        [&>button]:opacity-80
        [&>button:hover]:bg-[#414141] [&>button]:p-2 p-0 m-0">
                <DialogHeader>
                    <DialogTitle className="text-white text-[14px] p-4">

                        <input type="search" placeholder="Search chats.." className="w-[90%] bg-transparent text-[13px]  border-none focus:outline-none" />
                    </DialogTitle>
                    <hr className=""></hr>

                    <div className="flex items-center gap-2 pl-3 pt-2 pr-2 hover:bg-[#414141] cursor-pointer m-2 p-2 rounded-[8px]">
                        <Image src={newChatIcon} alt="newChatIcon" width={20} height={20} />
                        <DialogClose asChild>
                            <Link href="/" className="text-white font-semibold text-xs">New chat</Link>
                        </DialogClose>
                    </div>

                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}