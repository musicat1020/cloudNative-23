import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {

    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
        }),
    ],
    session: {
        strategy: "jwt",
    },
    // ref:https://stackoverflow.com/questions/76905467/how-to-access-token-in-next-auth
    callbacks: {
        async session({ session, token }) {
            session.user = token;
            return session;
        },
    }
};

export default NextAuth(authOptions);

