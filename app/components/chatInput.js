"use client"
import Image from "next/image"
import { useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import micIcon from "@/public/micicon.png"
import upArrow from "@/public/upArrow.png"
import plusIcon from "@/public/plusIcon.png"
const StopButtonIcon = ({ size = 35 }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
    >
        <circle cx="12" cy="12" r="11" fill="#3b3b3bff" />

        <rect x="9" y="9" width="6" height="6" rx="1" fill="white" />
    </svg>
);

export default function ChatInput({ onSend, disabled }) {
    const [uploadedImage, setUploadedImage] = useState(null)
    const [message, setMessage] = useState("")
    const router = useRouter()
    const pathname = usePathname()

    const handleImageUpload = (e) => {
        if (disabled) return
        const file = e.target.files[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setUploadedImage(reader.result)
            }
            reader.readAsDataURL(file)
        }
    }

    const removeImage = () => {
        setUploadedImage(null)
    }

    const handleSubmit = () => {
        if (!message.trim() || disabled) return

        // If we are already in a chat page, use onSend to append message without navigating
        if (onSend && pathname !== "/") {
            onSend(message)
            setMessage("")
            return
        }

        // Generate random chat ID and navigate with message
        const chatId = crypto.randomUUID()
        const encodedMessage = encodeURIComponent(message)
        router.push(`/c/${chatId}?message=${encodedMessage}`)

        // Clear message after navigation
        setMessage("")
    }

    return (
        <div className={`flex items-center justify-between bg-[#303030] w-[45vw] p-1 rounded-[50px] `}>
            <div className="flex items-center relative w-[5%] justify-center">

                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={disabled}
                    className={`absolute inset-0 w-full h-full opacity-0 z-10 ${disabled ? "cursor-not-allowed" : "cursor-pointer"}`}
                />
                <Image
                    src={plusIcon}
                    alt="plusIcon"
                    width={18}
                    height={18}
                    className="pointer-events-none"
                />

            </div>

            {/* Show uploaded image thumbnail if exists */}
            {uploadedImage && (
                <div className="relative ml-2 w-[40px] h-[40px]">
                    <button
                        onClick={removeImage}
                        disabled={disabled}
                        className={`absolute top-1 left-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs ${disabled ? "cursor-not-allowed" : "hover:bg-red-600"}`}
                    >
                        ×
                    </button>
                    <img
                        src={uploadedImage}
                        alt="Uploaded preview"
                        className="w-5 h-5 rounded-lg object-cover" style={{ maxWidth: "50px", maxHeight: "50px" }}

                    />

                </div>
            )}

            <input
                type="search"
                value={message}
                onChange={(e) => setMessage(e.target.value)}

                placeholder={disabled ? "Please wait for response..." : "Ask anything"}
                className={`text-white p-3 font-semibold text-xs w-[80%] bg-transparent border-none focus:outline-none rounded-[50px] `}
                onKeyDown={(e) => {
                    if (e.key === "Enter" && !disabled) {
                        handleSubmit()
                    }
                }}
            />

            <div className="flex items-center justify-end gap-2 w-[15%] mr-1">
                <Image src={micIcon} alt="micIcon" width={18} height={18} className={disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"} />
                <button
                    className={` ${disabled ? "" : "bg-white"} w-[30px] h-[30px] rounded-full flex items-center justify-center ${disabled ? "cursor-not-allowed" : "cursor-pointer"}`}
                    onClick={handleSubmit}
                    disabled={disabled}
                >
                    {disabled ? <StopButtonIcon />

                        : <Image src={upArrow} alt="upArrow" width={15} height={15} />}
                </button>
            </div>
        </div>
    )
}
