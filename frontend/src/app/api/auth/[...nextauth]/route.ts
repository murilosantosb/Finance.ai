import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

const handler = NextAuth({
    pages: {
        signIn: "/"
    },
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code",
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, account }) {
            if(account && account.provider === "google") {
                token.googleId = account.id_token || null;
            }
            return token;
        },
        async session({ session, token }) {
            session.user.googleId = token.googleId || null;
            console.log("Sessão do usuário", session)
            return session;
        }
    }

})

export { handler as GET, handler as POST }

