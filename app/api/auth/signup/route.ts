import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

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