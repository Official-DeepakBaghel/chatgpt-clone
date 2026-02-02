"use client";
import { Dialog } from "@/components/ui/dialog";
import { DialogContent } from "@/components/ui/dialog";
import { DialogHeader } from "@/components/ui/dialog";
import { DialogTitle } from "@/components/ui/dialog";
import { DialogDescription } from "@/components/ui/dialog";
import { DialogFooter } from "@/components/ui/dialog";
import { signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
export default function LogoutNow({ isOpen, onClose }) {
    const { data: session } = useSession();
    const handleLogout = () => {
        signOut({ callbackUrl: "/login_signup" });
    };
    return (
        <Dialog open={isOpen} onOpenChange={onClose} className="z" >
            <DialogContent className="w-[320px] h-[280px] bg-[#282828] border border-[#252525] [&>button]:hidden" >
                <DialogHeader className="text-[10px] p-2 flex flex-col justify-center items-center">
                    <DialogTitle className="text-center text-[20px] font-semibold text-white">Are you sure you<br /> want to log out?</DialogTitle>
                    <DialogDescription className="text-center text-[14px] text-[#f5f5f5]">
                        Log out of ChatGPT as {session?.user?.email}?
                    </DialogDescription>

                </DialogHeader>
                <DialogFooter className="flex flex-col justify-center gap-2 w-full">
                    <div className="flex flex-col justify-center gap-2 w-full">
                        <Button onClick={handleLogout} className="w-full rounded-full bg-white text-black text-xs hover:bg-[#f5f5f5] cursor-pointer">
                            Log out
                        </Button>
                        <Button onClick={onClose} className="w-full rounded-full text-xs bg-[#353535] text-white border border-[#606060] hover:bg-[#606060] cursor-pointer">
                            Cancel
                        </Button>
                    </div>
                </DialogFooter>

            </DialogContent>
        </Dialog>
    )
}