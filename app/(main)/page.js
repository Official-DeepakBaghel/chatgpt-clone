

import Script from "next/script";
import ChatClient from "../components/ChatClient";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
const para = [
    "What’s on your mind today?",
    "What’s on the agenda today?",
    "Good to see you, deepak.",
    "Where should we begin?",
    "Ready when you are.",
    "Good to see you, deepak.",
    "Hey, deepak. Ready to dive in?",
    "What are you working on?",
    "What can I help with?",
    "How can I help, deepak?"
]

export default function LandingPage() {
    const { data: session } = useSession();
    const [text, setText] = useState("");
    for (let i = 0; i < para.length; i++) {
        para[i] = para[i].replace("deepak", session?.user?.name || "Bro");
    }
    useEffect(() => {
        let index = Number(localStorage.getItem("index")) || 0;
        setText(para[index]);
        index = (index + 1) % para.length;
        localStorage.setItem("index", index);
    }, []);
    return <div className="bg-transparent space-y-8 h-full gap-8 flex items-center pt-[200px] flex-col relative">
        <h1 className="text-white font-semibold text-2xl">{text}</h1>
        <div className="absolute bottom-[-80px] left-1/2  transform -translate-x-1/2 w-[100%]" style={{ paddingLeft: "120px" }}>

            <ChatClient />
        </div>

    </div>;


}