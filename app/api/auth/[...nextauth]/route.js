import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { pool as db } from "@/app/config/dbPoll";
import bcrypt from "bcrypt";

export const runtime = "nodejs";

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Missing email or password");
                }

                const email = credentials.email.toLowerCase().trim();

                const [rows] = await db.execute(
                    "SELECT id, email, password FROM user WHERE email = ? LIMIT 1",
                    [email]
                );

                console.log("Authorize attempt for:", email);
                if (rows.length === 0) {
                    console.log("No user found for:", email);
                    return null; // Return null instead of throwing to avoid generic error pages
                }

                const user = rows[0];

                const isPasswordCorrect = await bcrypt.compare(
                    credentials.password,
                    user.password
                );

                if (!isPasswordCorrect) {
                    console.log("Invalid password for:", email);
                    return null;
                }

                console.log("Authorize success for:", email);
                return {
                    id: String(user.id),
                    email: user.email,
                };
            }
        })
    ],

    session: {
        strategy: "jwt",
    },

    secret: process.env.NEXTAUTH_SECRET,

    callbacks: {
        async signIn({ user, account, profile }) {
            try {
                if (account.provider === "google") {
                    const email = user.email;
                    const name = user.name;
                    const image = user.image;

                    const [rows] = await db.execute(
                        "SELECT id FROM user WHERE email = ? LIMIT 1",
                        [email]
                    );

                    if (rows.length === 0) {
                        await db.execute(
                            `INSERT INTO user (name, email, image, provider) 
               VALUES (?, ?, ?, ?)`,
                            [name, email, image, "google"]
                        );
                    }
                }

                return true;
            } catch (error) {
                console.error("Sign-in DB error:", error);
                return false;
            }
        },

        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
            }
            return token;
        },

        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id;
            }
            return session;
        },
    },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
