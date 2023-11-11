import { options } from "@/lib/nextAuthOptions";
import nextAuth from "next-auth";

const handler = nextAuth(options);

export { handler as GET, handler as POST };
