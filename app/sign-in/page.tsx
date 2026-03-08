"use client"

import Background from "@/components/Background";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signIn } from "next-auth/react";

export default function SignIn() {

  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id] : e.target.value
    }
  )}

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();

    try{
      const result = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if(result?.ok){
        router.push("/dashboard");
      }
      else if(result?.error){
        alert("Wrong credentials!")
      }

    } catch (error){
      console.log("something went wrong", error);
    }
  }

  return (
    <div className="relative min-h-screen w-full flex flex-col">
      <Background />
      <div className="relative z-10 flex flex-col flex-1">
        <Navbar />
        <div className="flex items-center justify-center p-6 mt-15">
          <Card className="w-full max-w-sm bg-black border-gray-800 text-white shadow-2xl">
            <CardHeader>
              <CardTitle>Login to your account</CardTitle>
              <CardDescription>
                Enter your email and password to log in to your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col gap-3">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-3">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <Button variant="destructive" className="mt-6">
                    Log In
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
