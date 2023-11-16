import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import jwt from "jsonwebtoken";

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
        session: async ({ session, token }) => {
            const accessToken = jwt.sign(
                {
                    name: token.name,
                    email: token.email,
                    picture: token.picture,
                    sub: token.sub,
                },
                process.env.JWT_SECRET, // JWT_SECRET is a secret string that only the server knows and should be regularly updated
                {
                    expiresIn: process.env.JWT_EXPIRES_IN, // JWT_EXPIRES_IN is the duration of the token
                },
            );
            session.user = token;
            session.accessToken = accessToken;
            // console.log("session", session);
            return session;
        },
    }

};


export default NextAuth(authOptions);

