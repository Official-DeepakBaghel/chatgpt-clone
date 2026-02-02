"use client"

import { useState } from "react"
import { MoreHorizontalIcon } from "lucide-react"
import { Pin } from "lucide-react"
import { Archive } from "lucide-react"
import { Flag } from "lucide-react"
import { Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import { Settings } from "lucide-react"
import { Bell } from "lucide-react"
import { LucidePersonStanding } from "lucide-react"
import { DatabaseZapIcon } from "lucide-react"
import { LayoutGridIcon } from "lucide-react"
import { KeyRound } from "lucide-react"
import { UserLock } from "lucide-react"
import { CircleUser } from "lucide-react"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export function DropdownMenuDialog() {
    // const [showNewDialog, setShowNewDialog] = useState(false)   
    // const [showShareDialog, setShowShareDialog] = useState(false)
    const [showReportDialog, setShowReportDialog] = useState(false)
    const [showDeleteDialog, setShowDeleteDialog] = useState(false)
    const [showSettingsDialog, setShowSettingsDialog] = useState(false)
    return (
        <>
            <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                    <Button className="bg-[#212121] hover:bg-[#303030] cursor-pointer" aria-label="Open menu" size="icon-sm">
                        <MoreHorizontalIcon className="text-white" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-39 bg-[#303030] border border-gray-700" align="end">
                    {/* <DropdownMenuLabel>File Actions</DropdownMenuLabel> */}
                    <DropdownMenuGroup className="cursor-pointer bg-[#303030] border-none text-white p-1">
                        {/* <DropdownMenuItem onSelect={() => setShowNewDialog(true)}>
                            New File...
                        </DropdownMenuItem> */}
                        {/* <DropdownMenuItem onSelect={() => setShowShareDialog(true)}>
                            Share...
                        </DropdownMenuItem> */}
                        <DropdownMenuItem className="hover:!bg-[#404040] !text-white text-xs cursor-pointer " >
                            <Pin className="rotate-45 cursor-pointer text-white" />Pin chat</DropdownMenuItem>
                        <DropdownMenuItem className="hover:!bg-[#404040] !text-white text-xs cursor-pointer">
                            <Archive className="cursor-pointer text-white" />Archive</DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => setShowReportDialog(true)} className="hover:!bg-[#404040] !text-white text-xs cursor-pointer">
                            <Flag className="cursor-pointer text-white" />Report</DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => setShowDeleteDialog(true)} className="hover:!bg-[#4D3434] !text-[#DF7775] text-xs cursor-pointer">
                            <Trash2 className="cursor-pointer text-[#DF7775]" />Delete</DropdownMenuItem>

                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
            {/* <Dialog open={showNewDialog} onOpenChange={setShowNewDialog}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Create New File</DialogTitle>
                        <DialogDescription>
                            Provide a name for your new file. Click create when you&apos;re
                            done.
                        </DialogDescription>
                    </DialogHeader>
                    <FieldGroup className="pb-3">
                        <Field>
                            <FieldLabel htmlFor="filename">File Name</FieldLabel>
                            <Input id="filename" name="filename" placeholder="document.txt" />
                        </Field>
                    </FieldGroup>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button type="submit">Create</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog> */}
            {/* <Dialog open={showShareDialog} onOpenChange={setShowShareDialog}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Share File</DialogTitle>
                        <DialogDescription>
                            Anyone with the link will be able to view this file.
                        </DialogDescription>
                    </DialogHeader>
                    <FieldGroup className="py-3">
                        <Field>
                            <Label htmlFor="email">Email Address</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="shadcn@vercel.com"
                                autoComplete="off"
                            />
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="message">Message (Optional)</FieldLabel>
                            <Textarea
                                id="message"
                                name="message"
                                placeholder="Check out this file"
                            />
                        </Field>
                    </FieldGroup>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button type="submit">Send Invite</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog> */}

            <Dialog open={showReportDialog} onOpenChange={setShowReportDialog}>
                <DialogContent className="sm:max-w-[425px] bg-[#212121] border border-gray-700 rounded-lg p-6 [&>button]:text-white
      [&>button]:opacity-80
      [&>button:hover]:bg-[#414141] [&>button]:p-2">
                    <DialogHeader>
                        <DialogTitle className="text-white text-lg font-semibold">
                            Report a conversation
                        </DialogTitle>
                        <DialogDescription className="text-white text-sm mt-1 mb-4">
                            Why are you reporting this conversation?
                        </DialogDescription>

                        <div className="flex flex-col gap-3">
                            {[
                                "Violence & self-harm",
                                "Sexual exploitation & abuse",
                                "Child/teen exploitation",
                                "Bullying & harassment",
                                "Spam, fraud & deception",
                                "Privacy violation",
                                "Intellectual property",
                                "Age-inappropriate content",
                                "Something else"
                            ].map((item, index) => (
                                <label
                                    key={index}
                                    className="flex items-center gap-3 cursor-pointer"
                                >
                                    <input
                                        type="radio"
                                        name="report"
                                        value={item}
                                        className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-2 focus:ring-blue-500"
                                    />
                                    <span className="text-white text-sm">{item}</span>
                                </label>
                            ))}
                        </div>
                    </DialogHeader>

                    <DialogFooter className="mt-1">
                        <DialogClose asChild>
                            <Button className="bg-[#303030] hover:bg-[#404040] text-gray-400 font-semibold rounded-full w-[60px] p-2 h-[30px] text-[13px]" style={{ cursor: "not-allowed", disabled: true }}>Next</Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                <DialogContent className="sm:max-w-[425px] bg-[#212121] border border-gray-700 rounded-lg p-4 [&>button]:hidden">
                    <DialogHeader>
                        <DialogTitle className="text-white text-md font-semibold">
                            Delete chat?
                        </DialogTitle>
                        <DialogDescription className="text-white text-sm mt-1">
                            This will delete <span className="text-white font-semibold">White close icon fix.</span>
                        </DialogDescription>
                        <DialogDescription className="text-gray-400 text-xs">
                            Visit <span className="underline"> <a onClick={() => { setShowDeleteDialog(false); setShowSettingsDialog(true); }}>settings</a></span> to delete any memories saved during this chat.
                        </DialogDescription>
                    </DialogHeader>

                    <DialogFooter className="mt-1">
                        <DialogClose asChild>
                            <Button className=" flex justify-center items-center bg-[#303030] text-white rounded-full border border-gray-700 w-[60px] p-2 h-[30px] text-[13px]" >Cancel</Button>
                        </DialogClose>
                        <Button className=" flex justify-center items-center bg-red-500 hover:bg-red-600 text-white font-semibold rounded-full w-[60px] p-2 h-[30px] text-[13px]" style={{ cursor: "not-allowed", disabled: true }}>Delete</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Dialog open={showSettingsDialog} onOpenChange={setShowSettingsDialog}>
                <DialogContent className="flex flex-row gap-2 sm:max-w-[680px] h-[580px] bg-[#191919] border border-gray-700 rounded-[12px] p-0.5 [&>button]:hidden">
                    <DialogHeader className="sr-only">
                        <DialogTitle>Settings</DialogTitle>
                    </DialogHeader>
                    <div className="flex h-[100%] w-[25%] flex-col items-start p-2 gap-2 rounded-[12px]">
                        <DialogClose asChild className="cursor-pointer">
                            <X className="text-white h-5 w-5 font-semibold  mb-6" />
                        </DialogClose>

                        <div className="flex justify-start w-[100%] gap-2 p-1 rounded-[10px] hover:bg-[#303030] items-center cursor-pointer">

                            <Settings className="text-white h-5 w-5  font-semibold" />    <h1 className="text-white text-xs font-semibold">General</h1>
                        </div>
                        <div className="flex justify-start w-[100%] gap-2 p-1 rounded-[10px] hover:bg-[#303030] items-center cursor-pointer">

                            <Bell className="text-white h-5 w-5 font-semibold" />    <h1 className="text-white text-xs font-semibold">Notification</h1>
                        </div>
                        <div className="flex justify-start w-[100%] gap-2 p-1 rounded-[10px] hover:bg-[#303030] items-center cursor-pointer">

                            <LucidePersonStanding className="text-white h-5 w-5 font-semibold" />    <h1 className="text-white text-xs font-semibold">Personalization</h1>
                        </div>
                        <div className="flex justify-start w-[100%] gap-2 p-1 rounded-[10px] hover:bg-[#303030] items-center cursor-pointer">

                            <DatabaseZapIcon className="text-white h-5 w-5 font-semibold" />    <h1 className="text-white text-xs font-semibold">Data Control</h1>
                        </div>
                        <div className="flex justify-start w-[100%] gap-2 p-1 rounded-[10px] hover:bg-[#303030] items-center cursor-pointer">

                            <KeyRound className="text-white h-5 w-5 font-semibold" />    <h1 className="text-white text-xs font-semibold">Security</h1>
                        </div>
                        <div className="flex justify-start w-[100%] gap-2 p-1 rounded-[10px] hover:bg-[#303030] items-center cursor-pointer">

                            <UserLock className="text-white h-5 w-5 font-semibold" />    <h1 className="text-white text-xs font-semibold">Parental Controls</h1>
                        </div>
                        <div className="flex justify-start w-[100%] gap-2 p-1 rounded-[10px] hover:bg-[#303030] items-center cursor-pointer">

                            <CircleUser className="text-white h-5 w-5 font-semibold" />    <h1 className="text-white text-xs font-semibold">Account</h1>
                        </div>
                    </div>
                    <div className="bg-[#212121] h-[100%] w-[75%] rounded-r-[12px] p-2">
                        <div className="flex flex-col justify-start items-start">
                            <h1 className="text-white text-lg font-semibold mb-4">Personalization</h1>
                            <hr className="w-[100%]" />
                            <h6 className="text-white text-sm mt-4">Base style and tone</h6>
                            <p className="text-gray-400 text-xs mt-1">Set the style and tone of how ChatGPT responds to you.<br></br> This doesn't impact ChatGPT's capabilities..</p>
                        </div>

                    </div>
                </DialogContent>
            </Dialog>

        </>
    )
}
