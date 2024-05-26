import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";
import { hash, compare } from "bcryptjs";

export default NextAuth({
  pages: {
    signIn: "/",
  },
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      //@ts-ignore
      async authorize(credentials) {
        const { email, password } = credentials;

        // create default user
        const defaultUser = await prisma.admin.findUnique({
          where: { email: "admin@admin.com" },
        });
        const defaulthashed = await hash("admin", 12);
        if (!defaultUser)
          await prisma.admin.create({
            data: { email: "admin@admin.com", password: defaulthashed },
          });

          // find login user
        const user = await prisma.admin.findFirst({ where: { email } });
        if (!user) return null;
        const compareResult = await compare(password, user.password);
        if (!compareResult) return null

        return {
          id: user.id,
          email: user.email,
        };
      },
    }),
  ],

  secret: process.env.SECRET,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 Days
  },
});
