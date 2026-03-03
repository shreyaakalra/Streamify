"use client"

import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { ChevronRight } from 'lucide-react';
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Hero() {
  const [email, setEmail] = useState("");

  const router = useRouter();

  function userEmail(e : React.ChangeEvent<HTMLInputElement>){
    setEmail(e.target.value);
  }

  function handleGetStarted(e: React.FormEvent){
    e.preventDefault();

    if(email.trim() !== ""){
      router.push(`/sign-up?email=${encodeURIComponent(email)}`);    
    }
  }

  return (
    <section className="flex flex-col items-center text-center px-6 py-24 max-w-2xl mx-auto ">
      <h1 className="text-4xl sm:text-5xl font-black leading-tight drop-shadow-lg">
        Unlimited movies, shows and more
      </h1>
      <p className="text-base text-gray-300 mt-4 font-semibold">
        Starts at ₹149. Cancel at any time.
      </p>
      <p className="text-base text-gray-300 mt-2">
        Ready to watch? Enter your email to create your account.
      </p>

      <form onSubmit={handleGetStarted} className="flex flex-col sm:flex-row gap-3 mt-8 w-full max-w-xl">
        <Input
          className="h-12 sm:h-12 rounded-none border border-gray-400 bg-black/40 placeholder:text-gray-400 hover:border-white"
          placeholder="Email Address"
          type="email"
          value={email}
          onChange={userEmail}
          required
        />

        <Button
            variant="destructive" 
            className="h-12 rounded-none px-6 font-bold text-base whitespace-nowrap w-50 mx-auto hover:underline"
            type="submit"
        >
          Get Started
          <ChevronRight className="ml-1 w-5 h-5" />
        </Button>
  
      </form>
    </section>
  );
}
