export const runtime = "nodejs"; //

import { pool } from "@/app/config/dbPoll";

export async function POST(req) {
    try {
        const { chatId, message } = await req.json();

        if (!chatId || !message) {
            return Response.json(
                { error: "chatId or message missing" },
                { status: 400 }
            );
        }

        // Save user message
        await pool.execute(
            "INSERT INTO user_chat (chat_id, role, content) VALUES (?, ?, ?)",
            [chatId, "user", message]
        );

        // Fetch history
        const [rows] = await pool.execute(
            "SELECT role, content FROM user_chat WHERE chat_id = ? ORDER BY created_at ASC",
            [chatId]
        );

        const messages = rows.map(row => ({
            role: row.role,
            content: row.content
        }));

        const MODELS = [
            "google/gemini-2.0-flash-experimental:free", // Primary
            "meta-llama/llama-3.3-70b-instruct:free",
            "deepseek/deepseek-r1:free",
            "qwen/qwen-2.5-coder-32b-instruct:free",
            "mistralai/mistral-7b-instruct:free",
            "google/gemini-2.0-flash-exp:free" // Backup
        ];

        let reply = "";
        let successfulModel = "";
        let lastError = null;

        for (const model of MODELS) {
            try {
                console.log(`Trying model: ${model}`);
                const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
                        "HTTP-Referer": "https://localhost:3000",
                        "X-Title": "ChatGPT Clone",
                    },
                    body: JSON.stringify({
                        model: model,
                        messages
                    })
                });

                const data = await res.json();

                if (!res.ok) {
                    console.warn(`Model ${model} failed:`, data.error?.message || res.statusText);
                    lastError = data.error?.message || "Unknown error";
                    continue; // Try next model
                }

                // If successful
                reply = data.choices?.[0]?.message?.content || "";
                if (!reply) {
                    console.warn(`Model ${model} returned empty reply.`);
                    lastError = "Empty reply";
                    continue;
                }

                successfulModel = model;
                console.log(`Success with model: ${model}`);
                break; // Exit loop on success

            } catch (err) {
                console.error(`Error with model ${model}:`, err);
                lastError = err.message;
            }
        }

        if (!reply) {
            console.error("All models failed. Last error:", lastError);
            const finalError = lastError || "All providers invalid";
            // Save assistant reply (error message)
            await pool.execute(
                "INSERT INTO user_chat (chat_id, role, content) VALUES (?, ?, ?)",
                [chatId, "assistant", finalError]
            );
            return Response.json({ reply: finalError }); // Return error as message so client doesn't break
        }



        // Save assistant reply
        await pool.execute(
            "INSERT INTO user_chat (chat_id, role, content) VALUES (?, ?, ?)",
            [chatId, "assistant", reply]
        );

        return Response.json({ reply });

    } catch (err) {
        console.error("Chat API Error:", err);
        return Response.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
