"use client";
import { useState, useEffect, useRef } from "react";
import ChatInput from "./chatInput";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { typeText } from "./typeText";

import { getChatHistory } from "@/app/actions/chatActions";

export default function ChatClient({ initialMessage = "", chatId }) {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);


    const generatedId = useRef(typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(7));
    const activeChatId = chatId || generatedId.current;

    const [hasLoadedHistory, setHasLoadedHistory] = useState(!chatId);

    // Fetch history on mount if chatId exists
    useEffect(() => {
        if (chatId) {
            async function fetchHistory() {
                try {
                    const history = await getChatHistory(chatId);
                    if (history && history.length > 0) {
                        setMessages(history);
                    }
                } catch (e) {
                    console.error("Failed to load history", e);
                } finally {
                    setHasLoadedHistory(true);
                }
            }
            fetchHistory();
        }
    }, [chatId]);

    const sendPrompt = async (text) => {
        if (!text.trim() || isProcessing) return;

        // Add user message to history
        const userMessage = { role: "user", content: text };
        const newMessages = [...messages, userMessage];
        setMessages(newMessages);

        setLoading(true);
        setIsProcessing(true);

        try {
            const res = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: text, chatId: activeChatId }),
            });

            const raw = await res.text();
            setLoading(false);

            if (!raw) {
                const errorMsg = { role: "bot", content: "No response from server" };
                setMessages(prev => [...prev, errorMsg]);
                setIsProcessing(false);
                return;
            }

            const data = JSON.parse(raw);
            if (data.error) {
                const errorMsg = { role: "bot", content: data.error };
                setMessages(prev => [...prev, errorMsg]);
                setIsProcessing(false);
                return;
            }

            // Add an empty bot message placeholder
            const botMessageId = Date.now();
            const botMessage = { role: "bot", content: "", id: botMessageId };
            let updatedMessages = [...newMessages, botMessage];
            setMessages(updatedMessages);

            // Typing animation
            typeText(data.reply, (updatedText) => {
                setMessages((prev) => {
                    const mapped = prev.map((msg) =>
                        msg.id === botMessageId ? { ...msg, content: updatedText } : msg
                    );
                    updatedMessages = mapped; // keep track for saving
                    return mapped;
                });
            }, 10, () => {
                setIsProcessing(false);

            });

        } catch (err) {
            console.error(err);
            setLoading(false);
            setIsProcessing(false);
            setMessages((prev) => [...prev, { role: "bot", content: "Failed to generate response" }]);
        }
    };

    const initialSent = useRef(false);

    useEffect(() => {
        if (initialMessage && initialMessage.trim() && !initialSent.current) {

            // If we are waiting for history, do nothing yet
            if (!hasLoadedHistory) return;

            // Only send if history is empty
            if (messages.length === 0) {
                sendPrompt(initialMessage);
                initialSent.current = true;
            }
        }
    }, [initialMessage, messages.length, hasLoadedHistory]);



    return (
        <div className="flex flex-col w-full items-center">
            {/* Chat List */}
            <div className="w-[80%] flex flex-col gap-4 mb-[150px]">
                {messages.map((msg, idx) => (
                    <div key={idx} className={`flex w-full ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                        <div className={`text-sm px-5 py-4 rounded-2xl max-w-[75%] break-words whitespace-pre-wrap shadow-md ${msg.role === "user"
                            ? "bg-[#303030] text-white rounded-tr-none"
                            : "bg-[#212121] text-white prose prose-invert overflow-hidden rounded-tl-none"
                            }`}>
                            {msg.role === "user" ? (
                                msg.content
                            ) : (
                                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                    {msg.content}
                                </ReactMarkdown>
                            )}
                        </div>
                    </div>
                ))}

                {loading && (
                    <div className="flex justify-start w-full">
                        <div className="bg-[#212121] px-5 py-4 rounded-2xl max-w-[50%] animate-pulse rounded-tl-none">
                            <div className="loader"></div>
                        </div>
                    </div>
                )}

                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="w-[80%] fixed bottom-0 flex flex-col gap-2 items-center pb-6 bg-[#212121]">
                <ChatInput onSend={sendPrompt} disabled={isProcessing} />
                <p className="text-xs text-[#b4b4b4] mt-1">
                    ChatGPT can make mistakes. Check important info.
                </p>
            </div>
        </div>
    );
}
