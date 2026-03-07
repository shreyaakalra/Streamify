"use client";

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
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function SignUp() {

  const router = useRouter();

  const searchParams = useSearchParams();

  const emailFromUrl = searchParams.get("email") || "";

  const [formData, setFormData] = useState({
    name: "",
    email: emailFromUrl,
    password: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try{
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if(response.ok){
        alert("Account created successfully!");
        router.push("/")
      }
      else{
        const errorMessage = await response.text();
        alert(`Error: ${errorMessage}`);
      }
    } catch (error){
      console.log("something went wrong:", error);
    }
  };


  return (
    <div className="relative min-h-screen w-full flex flex-col">
      <Background />
      <div className="relative z-10 flex flex-col flex-1">
        <Navbar />
        <div className="flex items-center justify-center p-6 mt-15">
          <Card className="w-full max-w-sm bg-black border-gray-800 text-white shadow-2xl">
            <CardHeader>
              <CardTitle>Create a new account</CardTitle>
              <CardDescription>
                Enter the information below to create a new account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col gap-3">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      type="text"
                      value={formData.name}
                      placeholder="Enter your name"
                      required
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flex flex-col gap-3">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      placeholder="Enter your email"
                      required
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flex flex-col gap-3">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      value={formData.password}
                      placeholder="Enter your password"
                      required
                      onChange={handleChange}
                    />
                  </div>
                  <Button variant="destructive" className="mt-6">
                    Create Account
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
