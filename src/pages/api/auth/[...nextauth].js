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
    callbacks: { //  =====> Add Below Callbacks <=====
        jwt: async ({ token, user }) => ({ ...token, ...user }),
        session: async ({ session, token }) => {
            session.user = token;
            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,

};

export default NextAuth(authOptions);

