// WHY DO WE EVEN HAVE THIS FILE?????

// If we didn't have NextAuth, you wouldn't just have to write the database check. You would have to hand-write the cryptography to generate a token, hand-write the code to inject it into the browser's cookie storage, and hand-write the middleware to check that cookie on every single page refresh. It would be hundreds of lines of complex security code.

// [...nextauth]/route.ts is the engine that runs your entire app's security. It logs people in, it creates the cookies, and it remembers who the user is as they click around your website.

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { PrismaClient, Prisma } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/client";
import { PrismaAdapter } from "@auth/prisma-adapter";

const handler = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // check if user entered both email and password
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials");
        }

        // prisma asks mongodb if they have anyone in the vault with this exact email
        const user = await prisma.user.findUnique({
          where: { 
            email: credentials.email 
          }
        });

        // if mongodb has never heard of them we return invalid credentials
        if (!user || !user?.hashedPassword) {
          throw new Error("Invalid credentials");
        }

        // since we cannot unshred the password we take the password just typed run it through the exact same mathematical shredder and see if it matches perfectly
        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );

        // if correct password return user else return invalid credentials
        if (!isCorrectPassword) {
          throw new Error("Invalid credentials");
        }

        return user;
      }
    })
  ],
  session: {
    strategy: "jwt" // tells nextauth to hand the user a JWT instead of saving their session in db.
  },
  secret: process.env.NEXTAUTH_SECRET, // this is the invisible ink used to sign that wristband so hackers can't forge it
});

export { handler as GET, handler as POST };
