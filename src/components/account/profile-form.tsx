"use client"
import React, { useState, useTransition, useEffect } from "react";
import { userSchema } from '@/lib/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import {Address, User} from '@prisma/client'
import { updateUserById } from "@/lib/actions/user";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { FormField } from "../ui/form";
import { updateAddress } from "@/lib/actions/address";
const ProfileForm = (user:User) => {
    const [success, setSuccess] = useState<string | undefined>("");
    const [error, setError] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();

    const {
        handleSubmit,
        register,
        control,
        formState: { errors },
        reset,
      } = useForm<z.infer<typeof userSchema>>({
        resolver: zodResolver(userSchema),
        defaultValues: {
            name: user.name || "",
            email: user.email || "",
        },
      });
  
  return (
    <main className="flex min-h-screen w-full flex-col">
      <div className="flex w-full flex-col">
        <section>
            <p>
                name : {user.name}
            </p>
            <p>
                email : {user.email}
            </p>
        </section>
      </div>

    </main>
  )
}

export default ProfileForm