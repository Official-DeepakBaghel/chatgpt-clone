"use server";

import { pool as db } from "@/app/config/dbPoll";

export async function getUserChats(userId) {
    try {
        // Group by chat_id and get the most recent message time for sorting
        const [rows] = await db.execute(`
            SELECT chat_id, 
                   MAX(created_at) as last_activity,
                   (SELECT content FROM user_chat u2 WHERE u2.chat_id = u1.chat_id AND role = 'user' ORDER BY created_at ASC LIMIT 1) as title
            FROM user_chat u1
            GROUP BY chat_id
            ORDER BY last_activity DESC
        `);
        return rows;
    } catch (error) {
        console.error("Error fetching user chats:", error);
        return [];
    }
}

export async function getChatHistory(chatId) {
    try {
        const [rows] = await db.execute(
            "SELECT role, content FROM user_chat WHERE chat_id = ? ORDER BY created_at ASC",
            [chatId]
        );
        return rows;
    } catch (error) {
        console.error("Error fetching chat history:", error);
        return [];
    }
}
