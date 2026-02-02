import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Image from "next/image"
import userIcon from "@/public/mr.png"
import { LogOut, UserIcon } from "lucide-react"
import { SettingsIcon } from "lucide-react"
import { LogOutIcon } from "lucide-react"
import { Sparkles } from "lucide-react"
import { Scan } from "lucide-react"
import { PersonStanding } from "lucide-react"
import { ChevronRight } from "lucide-react"
import { HelpCircleIcon } from "lucide-react"
import LogoutNow from "./logout"
import { useState } from "react"
import { useSession } from "next-auth/react"

export default function UserInfoDialog({ children, isOpen, onOpenChange }) {
    const { data: session } = useSession();
    const [showLogoutDialog, setShowLogoutDialog] = useState(false);
    return (<>
        <DropdownMenu open={isOpen} onOpenChange={onOpenChange} className="text-[10px]">
            <DropdownMenuTrigger asChild>
                {children}
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-55 h-60 bg-[#323232] border-none text-[10px] p-2 m-0 ml-1" align="start">
                <div className="flex items-start gap-2 p-2 pl-0 cursor-pointer hover:bg-[#404040] hover:text-white focus:bg-[#404040] focus:text-white rounded-[8px]">
                    {session?.user?.image ? <Image src={session?.user?.image} alt="userIcon" width={25} height={25} className="rounded-full" /> : <div className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-gray-600">
                        <p className="text-white font-semibold text-xs">
                            {session?.user?.name?.trim()?.charAt(0)?.toUpperCase() ||
                                session?.user?.email?.charAt(0)?.toUpperCase() ||
                                "U"}

                        </p>
                    </div>}
                    <div className="flex flex-col">
                        <p className="text-white font-semibold text-xs truncate max-w-[120px]">{session?.user?.name || session?.user?.email?.split('@')[0] || "User"}</p>
                        <p className="text-gray-400 text-xs truncate max-w-[160px]">{session?.user?.email || "No email"}</p>
                    </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem className="flex items-center gap-1 text-xs text-white cursor-pointer hover:bg-[#404040] hover:text-white focus:bg-[#404040] focus:text-white">
                        <Sparkles className="mr-2 h-4 w-4 text-white" />
                        Upgrade plan
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        className="flex items-center gap-1 text-xs text-white cursor-pointer hover:bg-[#404040] hover:text-white focus:bg-[#404040] focus:text-white"
                    >
                        <PersonStanding className="mr-2 h-4 w-4 text-white" />
                        Personalization
                    </DropdownMenuItem>

                    <DropdownMenuItem
                        className="
    flex items-center gap-1 text-xs text-white cursor-pointer
    hover:bg-[#404040] hover:text-white
    focus:bg-[#404040] focus:text-white
  "
                    >
                        <SettingsIcon className="mr-2 h-4 w-4 text-white" />
                        Settings
                    </DropdownMenuItem>

                </DropdownMenuGroup>
                <DropdownMenuSeparator />

                <DropdownMenuItem className="flex items-center gap-2 justify-between cursor-pointer hover:bg-[#404040] focus:bg-[#404040]">
                    <div className="flex items-center gap-1 text-xs text-white">
                        <HelpCircleIcon className="mr-2 h-4 w-4 mt-1 text-white cursor-pointer hover:bg-[#404040] focus:bg-[#404040]" />
                        Help Center</div>
                    <ChevronRight className="h-4 w-4 text-white" />
                </DropdownMenuItem>
                <DropdownMenuItem
                    onSelect={(e) => {
                        e.preventDefault();
                        setShowLogoutDialog(true);
                    }}
                    className="flex items-center gap-1 text-xs text-white cursor-pointer hover:bg-[#404040] hover:text-white focus:bg-[#404040] focus:text-white"
                >
                    <LogOutIcon className="mr-2 h-4 w-4 text-white" />
                    Logout
                </DropdownMenuItem>
                <LogoutNow isOpen={showLogoutDialog} onClose={() => setShowLogoutDialog(false)} />
            </DropdownMenuContent>
        </DropdownMenu >



    </>
    )
}
