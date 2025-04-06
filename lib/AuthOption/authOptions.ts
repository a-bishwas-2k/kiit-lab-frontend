import { NextAuthOptions } from "next-auth";

import GoogleProvider from "next-auth/providers/google";

export const authOption: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            authorization: {
                params: {
                    prompt: "consent",
                },
            },
            httpOptions: {
                timeout: 100000,
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user, session, account }) {
            if (account) {

                const checkEmail = await fetch(`${process.env.SERVER_URL}/users/checkEmail`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email: user.email, name: user.name }),
                });

                if (!checkEmail.ok) {
                    console.error("Email check failed", await checkEmail.text());
                    // throw new Error("Email check failed");
                    return token;
                }

                const data = await checkEmail.json();
                console.log("Email check success", data);
                // return true;

                token.user = {
                    id: user.id,
                    email: data.email,
                    name: data.name!,
                    image: user.image!,
                };

                token.id = data.id;
                token.isAdmin = data.isAdmin;

                return token;
            }
            return token;




        },

        async session({ session, token }) {
            session.user = token.user || {};
            session.id = token.id || null;
            session.isAdmin = token.isAdmin;
            return session;
        },


    },

    pages: {
        signIn: "/auth/login",
        newUser: "/",
        error: "/auth/error",
    },
    session: {
        strategy: "jwt",
        maxAge: 60 * 60 * 24 * 10, // 10 days

        // maxAge:10
    },
    jwt: {
        secret: process.env.NEXTAUTH_SECRET,
        // maxAge: 60 * 60 * 24 * 10, // 10 days
    },
}