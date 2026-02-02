"use client";
import Image from "next/image";
import { useState } from "react";
import micIcon from "@/public/micicon.png";
import upArrow from "@/public/upArrow.png";
import plusIcon from "@/public/plusIcon.png";
import { ImageIcon, Loader2 } from "lucide-react";
import GenImgCarousel from "../../components/genImgCarousel";
import DiscoverCarousel from "../../components/DiscoverCarousel";

export default function ImagePage() {
    const [prompt, setPrompt] = useState("");
    const [loading, setLoading] = useState(false);
    const [generatedImage, setGeneratedImage] = useState(null);
    const [error, setError] = useState(null);

    const handleGenerate = async () => {
        if (!prompt) return;
        setLoading(true);
        setGeneratedImage(null);
        setError(null);
        try {
            const res = await fetch("/api/ttimg", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ prompt }),
            });

            const responseText = await res.text();

            let data;
            try {
                data = JSON.parse(responseText);
            } catch (e) {
                console.error("JSON Parse Error. Body:", responseText);
                throw new Error("Invalid response from server");
            }

            if (!res.ok) {
                console.error("API Error Response:", data);
                throw new Error(data.error || data.details || "Failed to generate image");
            }

            if (data.imageUrl) {
                setGeneratedImage(data.imageUrl);
            } else {
                console.error("No image URL in response", data);
                throw new Error("No image returned from generation service");
            }
        } catch (error) {
            console.error("Error generating image:", error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleGenerate();
        }
    };

    return (
        <div
            className="flex-1 flex h-full flex-col overflow-hidden"
            style={{
                background: `linear-gradient(180deg, rgba(64,39,68,1) 0%, rgba(73,46,42,1) 50%, #000000 100%)`
            }}
        >
            <div className={`flex w-full items-center justify-center p-2 ${generatedImage ? 'h-full' : ''}`}>
                <div className="flex w-[50%] flex-col gap-2 relative h-full">
                    <h1 className="text-white text-[25px] mt-8 font-semibold p-2">Images</h1>

                    {/* Error Message */}
                    {error && (
                        <div className="bg-red-500/10 border border-red-500/50 text-red-200 p-3 rounded-lg text-sm text-center">
                            {error}
                        </div>
                    )}

                    {/* Input Area */}
                    <div className="flex items-center justify-center bg-[#303030] w-[100%] p-1 rounded-[16px] z-10 sticky top-0">

                        {/* Plus Icon */}
                        <div className="relative flex items-center justify-center w-[5%] h-10">
                            <input
                                type="file"
                                accept="image/*"
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            />
                            <ImageIcon className="text-white pointer-events-none" />
                        </div>

                        {/* Image Preview (static UI only) */}
                        <div className="relative ml-2 w-[40px] h-[40px] hidden">
                            <button className="absolute top-1 left-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                                ×
                            </button>
                            <div className="w-10 h-10 bg-gray-500 rounded-lg" />
                        </div>

                        {/* Input */}
                        <input
                            type="search"
                            placeholder="Describe a new Image"
                            className="text-white p-3 font-semibold text-xs w-[80%] bg-transparent border-none focus:outline-none rounded-[50px]"
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />

                        {/* Right Icons */}
                        <div className="flex items-center justify-end gap-2 w-[15%] mr-1">
                            <Image
                                src={micIcon}
                                alt="mic icon"
                                width={18}
                                height={18}
                                className="cursor-pointer"
                            />

                            <div
                                onClick={handleGenerate}
                                className={`bg-white w-[30px] h-[30px] rounded-full flex items-center justify-center cursor-pointer transition-opacity ${loading ? 'opacity-50 pointer-events-none' : 'hover:opacity-90'}`}
                            >
                                {loading ? (
                                    <Loader2 className="w-4 h-4 animate-spin text-black" />
                                ) : (
                                    <Image
                                        src={upArrow}
                                        alt="send"
                                        width={15}
                                        height={15}
                                    />
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Generated Image Display */}
                    {(loading || generatedImage) && (
                        <div className="mt-4 w-full flex justify-center">
                            {loading ? (
                                <div className="text-white flex flex-col items-center gap-2">
                                    <div className="animate-pulse w-96 h-96 bg-gray-700/50 rounded-xl flex items-center justify-center">
                                        <Loader2 className="w-8 h-8 animate-spin text-white/50" />
                                    </div>
                                    <p className="text-sm text-gray-400">Generating your masterpiece...</p>
                                </div>
                            ) : (
                                <div className="relative w-full max-w-[600px] aspect-square bg-[#202020] rounded-xl overflow-hidden shadow-2xl border border-white/10">
                                    <img
                                        src={generatedImage}
                                        alt="Generated content"
                                        className="w-full h-full object-contain"
                                    />
                                </div>
                            )}
                        </div>
                    )}

                    {!generatedImage && !loading && (
                        <>
                            <GenImgCarousel />
                            <DiscoverCarousel />
                        </>
                    )}
                </div>
            </div>

        </div>
    );
}