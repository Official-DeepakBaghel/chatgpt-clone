"use server";

import { pool as db } from "@/app/config/dbPoll";
import { redirect } from "next/navigation";
import { getSession } from "@/app/config/auth";

export async function googleSignupLogin() {
    try {
        const session = await getSession();

        if (!session?.user?.email) {
            return { error: "Google authentication failed. No session found." };
        }

        const email = session.user.email;
        const name = session.user.name || null;

        const [rows] = await db.execute(
            "SELECT id FROM user WHERE email = ? LIMIT 1",
            [email]
        );

        // If user does not exist → create user
        if (!rows || rows.length === 0) {
            await db.execute(
                "INSERT INTO user (email, name, provider) VALUES (?, ?, ?)",
                [email, name, "google"]
            );
        }

        redirect("/");

    } catch (error) {
        console.error("Google login error:", error);
        return { error: "Something went wrong. Please try again." };
    }
}
