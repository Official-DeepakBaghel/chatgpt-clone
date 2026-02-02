"use server";

import { pool as db } from "@/app/config/dbPoll";

export async function handleEmailCheck(formData) {
    const email = formData.get("email");

    if (!email) {
        return { error: "Email is required" };
    }

    try {
        const [rows] = await db.query("SELECT * FROM user WHERE email = ?", [email]);

        if (rows.length > 0) {
            return { exists: true, email };
        } else {
            return { exists: false, email };
        }
    } catch (error) {
        console.error("Database query error:", error);
        return { error: "Something went wrong. Please try again later." };
    }
}
