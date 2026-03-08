// WHY DO WE NEED THIS??

// NextAuth is incredibly good at checking IDs but it refuses to build new IDs. It handles the cookies and the session security but we need this signup route to act as a registration desk to save users to the database.

// Its only job is to take a brand new user, shred their password, put them in the MongoDB vault, and say "Okay, you exist now. Go to the Front Door to log in."


import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";


// in nextjs naming a function POST means this file will only listen to frontend forms that are submitting data.
export async function POST(request: Request){ 

  try{
    const body = await request.json();
    const { name, email, password } = body;

    if(!name || !email || !password){
      return new NextResponse("Missing info",{status: 400});
    }

    const userExists = await prisma.user.findUnique({
      where: {
        email: email,
      },
    })

    if(userExists){
      return new NextResponse("Email already in use.", {status: 400})
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name: name,
        email: email,
        hashedPassword: hashedPassword,
      }
    })

    return NextResponse.json(user);

  } catch (error) {
    console.log("SIGNUP_ERROR", error);
    return new NextResponse("Internal Error", {status: 500});
  }
}