import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import apiRequest from "@/utils/apiRequest";


const handler = NextAuth({
  pages: {
    signIn: "/",
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
        },
      },
      
    }),
  ],
  callbacks: {
    async signIn({ profile }) {
      if (!profile?.email) throw new Error("Erro: Sem e-mail do Google!");

      const userData = {
        name: profile.name,
        email: profile.email,
        image: profile.picture,
        googleId: profile.sub,
        id: profile.sub,
      };

      try {
        const response = await apiRequest({
          endpoint: "/users/login",
          method: "POST",
          body: userData,
        });

        if(!response) {
          console.error("Erro na resposta do backend:", response);
          return false;
        }

        return true;
      } catch (error) {
        console.error("Erro ao logar:", error);
        return false;
      }
    },
    async session({ session, token}) {
      session.user.id = token.sub;
      session.user.googleId = token.sub;
      return session;
    },
    async jwt({ token, user }) {
      if(user) {
        token.sub = user.id;
      }
      return token;
    }
  },
});

export { handler as GET, handler as POST };
