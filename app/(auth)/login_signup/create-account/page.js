
"use client";
import Image from "next/image";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { useState, useActionState, useEffect, Suspense } from "react";
import { PasswordForm } from "./passwordform";
import { useSearchParams } from "next/navigation";

function PasswordContent() {
    const [state, action] = useActionState(PasswordForm, { error: null });
    const searchParams = useSearchParams();
    const emailFromQuery = searchParams.get("email") || "";
    const [email, setEmail] = useState(emailFromQuery);

    const [showPassword, setShowPassword] = useState(false);
    useEffect(() => {
        if (emailFromQuery) {
            setEmail(emailFromQuery);
        }
    }, [emailFromQuery]);

    return (
        <div className="min-h-screen bg-white relative flex flex-col items-center pt-20  p-4">
            {/* Logo in top-left */}
            <div className="absolute top-3.5 left-4">
                <span className="text-[16px] font-bold font-sans tracking-tight ">ChatGPT</span>
            </div>

            <main className="w-full max-w-[360px] flex flex-col items-center gap-2">
                <h1 className="text-[22px] font-medium text-[#0d0d0d] mt-1 font-sans">Create a password</h1>
                <p className="text-[11px] text-[#525252] font-sans mb-3 text-center">You’ll use this password to log in to ChatGPT <br></br> and other OpenAI products
                </p>
                <form action={action}>
                    <div className="flex flex-col justify-center items-center gap-4 w-full">
                        <div className="relative w-[240px] max-w-md">
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Enter your email "
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="
    peer w-[240px] rounded-full border border-gray-300
    bg-white px-5 py-2 text-sm text-gray-900
    outline-none focus:border-blue-600
  "
                            />

                            <Link href="/login_signup" className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6e6e80] cursor-pointer text-[11px] text-blue-600 hover:underline">Edit</Link>
                        </div>
                        <div className="relative w-[240px] max-w-md ">

                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                name="password"
                                placeholder="Password"

                                className="
    peer
    w-[240px]
    rounded-full
    border border-gray-300
    bg-white
    px-5
    py-2
    text-sm
    text-gray-900
    outline-none
    focus:border-blue-600
  "
                            />
                            {state?.error && <p className="text-red-500 text-sm mt-2">{state.error}</p>}
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6e6e80] cursor-pointer rounded-full hover:bg-gray-200 p-1"
                            >
                                {showPassword ? <EyeOff size={16} className="text-black" /> : <Eye size={16} className="text-black" />}
                            </button>
                        </div>



                        <button className="bg-[#0d0d0d] hover:bg-[#1a1a1a] transition-colors text-white cursor-pointer rounded-full p-3 text-xs w-[240px] font-sans">
                            Continue
                        </button>

                    </div>
                </form>

                <div className="flex items-center gap-1 mt-3">
                    <p className="text-[11px] text-[#0d0d0d] font-sans">Already have an account?</p>
                    <Link href="/login_signup" className="text-[11px] text-[#3c46ff] hover:underline">Log in</Link>
                </div>

                <footer className="mt-8 flex items-center gap-2 ">
                    <Link href="https://openai.com/policies/terms-of-use" className="text-[10px] text-[#6e6e80] hover:text-[#0d0d0d] underline underline-offset-2 decoration-[#6e6e80] decoration-[0.5px] font-sans">Terms of Use</Link>
                    <span className="text-black text-[10px] font-sans">|</span>
                    <Link href="https://openai.com/policies/privacy-policy" className="text-[10px] text-[#6e6e80] hover:text-[#0d0d0d] underline underline-offset-2 decoration-[#6e6e80] decoration-[0.5px] font-sans">Privacy Policy</Link>
                </footer>
            </main>
        </div>
    );
}

export default function Password() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <PasswordContent />
        </Suspense>
    );
}