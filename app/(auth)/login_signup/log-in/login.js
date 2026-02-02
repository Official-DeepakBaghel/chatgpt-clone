"use server";

import bcrypt from "bcrypt";
import { pool as db } from "@/app/config/dbPoll";
import { redirect } from "next/navigation";

export async function loginform(prevState, formData) {
    try {
        if (!(formData instanceof FormData)) {
            return { error: "Invalid form submission" };
        }

        const email = formData.get("email")?.toString().trim();
        const password = formData.get("password")?.toString().trim();


        if (!email || !password) {
            return { error: "Email and Password are required" };
        }

        const normalizedEmail = email.toLowerCase().trim();

        const [rows] = await db.execute(
            "SELECT id, password FROM user WHERE email = ? LIMIT 1",
            [normalizedEmail]
        );

        if (!rows || rows.length === 0) {
            return { error: "Invalid email or password" };
        }

        const user = rows[0];

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return { error: "Invalid email or password" };
        }

    } catch (error) {
        console.error("Login error:", error);
        return { error: "Something went wrong. Please try again" };
    }

    redirect("/");
}
