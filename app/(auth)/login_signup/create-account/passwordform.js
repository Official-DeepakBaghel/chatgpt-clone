"use server";

import bcrypt from "bcrypt";
import { pool as db } from "@/app/config/dbPoll";
import { redirect } from "next/navigation";

export async function PasswordForm(prevState, formData) {
    try {
        const email = formData.get("email")?.toString().trim();
        const password = formData.get("password")?.toString().trim();

        if (!email || !password) {
            return { error: "Email and Password are required" };
        }

        const normalizedEmail = email.toLowerCase().trim();

        if (password.length < 6) {
            return { error: "Password must be at least 6 characters long" };
        }

        // 1. Check if user already exists
        const [existingUsers] = await db.execute(
            "SELECT id FROM user WHERE email = ? LIMIT 1",
            [normalizedEmail]
        );

        if (existingUsers && existingUsers.length > 0) {
            return { error: "User with this email already exists" };
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await db.execute(
            "INSERT INTO user (email, password, provider) VALUES (?, ?, ?)",
            [normalizedEmail, hashedPassword, "credentials"]
        );

    } catch (error) {
        console.error("Signup error:", error);
        return { error: "Something went wrong. Please try again." };
    }

    // Redirect to login page with the email filled in
    redirect(`/login_signup/log-in?email=${encodeURIComponent(formData.get("email"))}`);
}
