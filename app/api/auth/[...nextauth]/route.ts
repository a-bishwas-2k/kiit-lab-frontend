import { authOption } from "@/lib/AuthOption/authOptions";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
 
const handler = NextAuth(authOption);

export { handler as GET, handler as POST };
