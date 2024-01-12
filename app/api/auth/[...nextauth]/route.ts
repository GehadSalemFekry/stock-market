import { authOptions } from "@/lib/nextauthOptions";
import NextAuth from "next-auth";

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
