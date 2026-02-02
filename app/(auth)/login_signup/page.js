"use client";
import Image from "next/image";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { handleEmailCheck } from "./actions";
export default function Login() {
    const { data: session } = useSession();
    if (session) {
        return redirect("/");
    }

    return (
        <div className="min-h-screen bg-white relative flex flex-col items-center justify-center p-4">
            {/* Logo in top-left */}
            <div className="absolute top-3.5 left-4">
                <span className="text-[16px] font-bold font-sans tracking-tight ">ChatGPT</span>
            </div>

            <main className="w-full max-w-[360px] flex flex-col items-center gap-4">
                <h1 className="text-[22px] font-medium text-[#0d0d0d] mt-9 font-sans">Welcome back</h1>

                <div className="flex flex-col justify-center items-center gap-3 w-full">
                    {/* Social Buttons */}
                    <div className="flex items-center gap-3 border border-[#d9d9e3] hover:bg-[#f9f9f9] transition-colors cursor-pointer rounded-full p-2 w-[240px]">
                        <div className="w-[20px] h-[20px] flex items-center justify-center ml-1">
                            <Image src="https://auth-cdn.oaistatic.com/assets/google-logo-NePEveMl.svg" alt="google" width={13} height={13} />
                        </div>
                        <button onClick={() => signIn("google")} className="text-[11px] text-[#0d0d0d] font-sans cursor-pointer">Continue with Google</button>

                    </div>

                    <div className="flex items-center gap-3 border border-[#d9d9e3] hover:bg-[#f9f9f9] transition-colors cursor-pointer rounded-full p-2 w-[240px]">
                        <div className="w-[20px] h-[20px] flex items-center justify-center ml-1">
                            <svg width="15" height="15" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[16px]">
                                <path fillRule="evenodd" clipRule="evenodd" d="M12.4419 2.52044C13.2355 1.54784 13.123 0.6322 13.123 0.6322C13.123 0.6322 12.247 0.621419 11.2334 1.25816C10.22 1.89491 9.47954 2.87154 9.47954 2.87154C9.47954 2.87154 10.3807 3.01254 11.3831 2.39276C11.3831 2.39276 11.8384 2.10099 12.4419 2.52044ZM12.7214 11.7513C12.7093 14.3644 14.8872 15.6596 14.9392 15.6881C14.9197 15.7538 14.5996 16.8924 13.8214 18.067C13.1486 19.0811 12.4489 20.0898 11.3323 20.1114C10.2371 20.1331 9.88514 19.4443 8.64816 19.4443C7.41119 19.4443 7.02293 20.0898 5.99615 20.1331C4.96937 20.1764 4.17882 19.0463 3.4988 18.0453C2.10688 15.996 1.04284 12.2619 2.47926 9.68453C3.19313 8.40375 4.47506 7.59253 5.85695 7.57088C6.9069 7.54924 7.89679 8.29828 8.54144 8.29828C9.18608 8.29828 10.3957 7.41119 11.666 7.54101C12.2033 7.56306 13.7144 7.76632 14.6853 9.23194C14.6067 9.28292 12.735 10.4093 12.7214 11.7513Z" fill="black" />
                            </svg>
                        </div>
                        <p className="text-[11px] text-[#0d0d0d] font-sans">Continue with Apple</p>
                    </div>

                    <div className="flex items-center gap-3 border border-[#d9d9e3] hover:bg-[#f9f9f9] transition-colors cursor-pointer rounded-full p-2 w-[240px]">
                        <div className="w-[20px] h-[20px] flex items-center justify-center ml-1">
                            <Image src="https://auth-cdn.oaistatic.com/assets/microsoft-logo-BUXxQnXH.svg" alt="microsoft" width={13} height={13} />
                        </div>
                        <p className="text-[11px] text-[#0d0d0d] font-sans">Continue with Microsoft</p>
                    </div>

                    <div className="flex items-center gap-3 border border-[#d9d9e3] hover:bg-[#f9f9f9] transition-colors cursor-pointer rounded-full p-2 w-[240px]">
                        <div className="w-[20px] h-[20px] flex items-center justify-center ml-1">
                            <svg width="13" height="13" viewBox="0 0 22 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M2 5.57143C2 3.59898 3.59898 2 5.57143 2H8.625C9.0287 2 9.39281 2.24274 9.54808 2.61538L11.4231 7.11538C11.5744 7.47863 11.4987 7.89686 11.2295 8.18394L9.82741 9.67954C10.9044 11.7563 12.2732 13.2047 14.3016 14.2842L15.7929 12.7929C16.0794 12.5064 16.5106 12.4211 16.8846 12.5769L21.3846 14.4519C21.7573 14.6072 22 14.9713 22 15.375V18.4286C22 20.401 20.401 22 18.4286 22C9.35532 22 2 14.6447 2 5.57143ZM5.57143 4C4.70355 4 4 4.70355 4 5.57143C4 13.5401 10.4599 20 18.4286 20C19.2964 20 20 19.2964 20 18.4286V16.0417L16.7336 14.6807L15.2071 16.2071C14.9098 16.5044 14.4582 16.584 14.0771 16.4062C11.0315 14.9849 9.12076 12.9271 7.71882 9.92289C7.54598 9.55251 7.61592 9.11423 7.89546 8.81606L9.32824 7.28777L7.95833 4H5.57143Z" fill="currentColor"></path></svg>
                        </div>
                        <p className="text-[11px] text-[#0d0d0d] font-sans">Continue with phone</p>
                    </div>
                </div>

                <div className="flex items-center gap-4 w-[240px] my-1">
                    <hr className="flex-1 border-[#d9d9e3]" />
                    <span className="text-[10px] text-black font-sans">OR</span>
                    <hr className="flex-1 border-[#d9d9e3]" />
                </div>

                <div className="flex flex-col justify-center items-center gap-4 w-full">
                    <form action={async (formData) => {
                        const result = await handleEmailCheck(formData);
                        if (result?.error) {
                            console.error(result.error);
                            return; // Handle error UI ideally
                        }
                        if (result?.exists) {
                            window.location.href = `/login_signup/log-in?email=${encodeURIComponent(result.email)}`;
                        } else {
                            window.location.href = `/login_signup/create-account?email=${encodeURIComponent(result.email)}`;
                        }
                    }} className="flex flex-col items-center gap-4 w-full">
                        <div className="relative w-[240px] max-w-md">
                            <input
                                type="email"
                                id="email"
                                name="email"

                                className="
              peer
              w-[240px]
              rounded-full
              border border-gray-300
              bg-white
              px-5
              py-2
              text-xs
              text-gray-900
              outline-none
              focus:border-blue-600
            "
                                placeholder="Email address"
                                required
                            />


                        </div>
                        <button type="submit" className="bg-[#0d0d0d] hover:bg-[#1a1a1a] transition-colors text-white cursor-pointer rounded-full p-3 text-xs w-[240px] font-sans">
                            Continue
                        </button>
                    </form>
                </div>

                <div className="flex items-center gap-1 mt-2">
                    <p className="text-[11px] text-[#0d0d0d] font-sans">Don't have an account?</p>
                    <Link href="/login_signup/create-account" className="text-[11px] text-[#3c46ff] hover:underline">Sign up</Link>
                </div>

                <footer className="mt-5 flex items-center gap-2">
                    <Link href="#" className="text-[10px] text-[#6e6e80] hover:text-[#0d0d0d] underline underline-offset-2 decoration-[#6e6e80] decoration-[0.5px] font-sans">Terms of Use</Link>
                    <span className="text-black text-[10px] font-sans">|</span>
                    <Link href="#" className="text-[10px] text-[#6e6e80] hover:text-[#0d0d0d] underline underline-offset-2 decoration-[#6e6e80] decoration-[0.5px] font-sans">Privacy Policy</Link>
                </footer>
            </main>
        </div>
    );
}

