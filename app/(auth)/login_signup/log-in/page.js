"use client";
import Image from "next/image";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

export default function Password() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const emailParam = searchParams.get("email") || "";

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        const email = formData.get("email");
        const password = formData.get("password");

        try {
            const result = await signIn("credentials", {
                email,
                password,
                redirect: false,
            });

            if (result.error) {
                setError("Invalid email or password");
            } else {
                router.push("/");
                router.refresh();
            }
        } catch (err) {
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-white relative flex flex-col items-center pt-20  p-4">
            {/* Logo in top-left */}
            <div className="absolute top-3.5 left-4">
                <span className="text-[16px] font-bold font-sans tracking-tight ">ChatGPT</span>
            </div>

            <main className="w-full max-w-[360px] flex flex-col items-center gap-1">
                <h1 className="text-[22px] font-medium text-[#0d0d0d] mt-1 mb-4  font-sans">Enter your password</h1>
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col justify-center items-center gap-3 w-full">
                        <div className="relative w-[240px] max-w-md">
                            <input
                                type="email"
                                id="email"
                                name="email"
                                defaultValue={emailParam}
                                placeholder=" "
                                required
                                className="
    peer w-[240px] rounded-full border border-gray-300
    bg-white px-5 py-2 text-sm text-gray-900
    outline-none focus:border-blue-600 pr-10
  "
                            />

                            <button type="button" onClick={() => router.back()} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6e6e80] cursor-pointer text-[11px] text-blue-600 hover:underline">Edit</button>
                        </div>
                        <div className="relative w-[240px] max-w-md">

                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                name="password"
                                placeholder=" "
                                required
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
    pr-10
  "
                            />
                            {error && <p className="text-red-500 text-[10px] mt-1 text-center">{error}</p>}
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6e6e80] cursor-pointer rounded-full hover:bg-gray-200 p-1"
                            >
                                {showPassword ? <EyeOff size={16} className="text-black" /> : <Eye size={16} className="text-black" />}
                            </button>
                        </div>

                        <Link href="#" className="text-[11px] text-[#3c46ff] hover:underline w-[240px] ml-4 mb-1">Forgot password?</Link>

                        <button
                            disabled={loading}
                            className="bg-[#0d0d0d] hover:bg-[#1a1a1a] transition-colors text-white cursor-pointer rounded-full p-3 text-xs w-[240px] font-sans disabled:opacity-50"
                        >
                            {loading ? "Logging in..." : "Continue"}
                        </button>

                    </div>
                </form>

                <div className="flex items-center gap-1 mt-3 ">
                    <p className="text-[11px] text-[#0d0d0d] font-sans">Don't have an account?</p>
                    <Link href="/login_signup/create-account" className="text-[11px] text-[#3c46ff] hover:underline">Sign Up</Link>
                </div>
                <div className="flex items-center gap-4 w-[240px] my-1 mt-2">
                    <hr className="flex-1 border-[#d9d9e3]" />
                    <span className="text-[10px] text-black font-sans">OR</span>
                    <hr className="flex-1 border-[#d9d9e3]" />
                </div>
                <button
                    onClick={() => signIn("google")}
                    className=" mt-2 bg-white hover:bg-[#f9f9f9] transition-colors text-[#0d0d0d] border border-[#d9d9e3] hover:border-[#b4b4c4] cursor-pointer rounded-full p-3 text-[11px] w-[240px] font-sans"
                >
                    Log in with Google
                </button>
                <footer className="mt-5 flex items-center gap-2 ">
                    <Link href="#" className="text-[10px] text-[#6e6e80] hover:text-[#0d0d0d] underline underline-offset-2 decoration-[#6e6e80] decoration-[0.5px] font-sans">Terms of Use</Link>
                    <span className="text-black text-[10px] font-sans">|</span>
                    <Link href="#" className="text-[10px] text-[#6e6e80] hover:text-[#0d0d0d] underline underline-offset-2 decoration-[#6e6e80] decoration-[0.5px] font-sans">Privacy Policy</Link>
                </footer>
            </main>
        </div>
    );
}
