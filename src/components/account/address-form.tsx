'use client'
import React, { useState, useTransition, useEffect } from "react";
import { addressSchema } from '@/lib/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import {Address, User} from '@prisma/client'
import { updateUserById } from "@/lib/actions/user";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { FormField } from "../ui/form";
import { updateAddress } from "@/lib/actions/address";
const AddressForm = (address:Address) => {
    const [success, setSuccess] = useState<string | undefined>("");
    const [error, setError] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();

    const {
        handleSubmit,
        register,
        control,
        formState: { errors },
        reset,
      } = useForm<z.infer<typeof addressSchema>>({
        resolver: zodResolver(addressSchema),
        defaultValues: {
            name: address.name || "",
            street: address.street || "",
            city: address.city || "",
            province: address.province || "",
            country: address.country || "",
            postalCode: address.postalCode || "",
            isUse: address.isUse || false,
            userId: address.userId || "",
        },
      });
    
    const onSubmit = async (data: z.infer<typeof addressSchema>) => {
        setError("");
        setSuccess("");
        startTransition(() => {
          updateAddress(address.id, data)
          .then((address) => {
            if (address) {
              setSuccess("Address updated successfully.");
            } else {
              setError("Failed to update address.");
            }
          })
          .catch((error) => {
            setError("Failed to update address.");
          });
        });
    }
  return (
    <main className="flex min-h-screen w-full flex-col">
      <div className="flex w-full flex-col">
        <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 items-start gap-4 md:grid-cols-2">
          {/* <FormField
            id="name"
            label="Name"
            register={register("name")}
            error={errors.name}
            placeholder="Enter your name"
           />
          <FormField
            id="street"
            label="Street"
            register={register("street")}
            error={errors.street}
            placeholder="Enter your street"
           />
          <FormField
            id="city"
            label="City"
            register={register("city")}
            error={errors.city}
            placeholder="Enter your city"
           />
          <FormField
            id="province"
            label="Province"
            register={register("province")}
            error={errors.province}
            placeholder="Enter your province"
           />
          <FormField
            id="postalCode"
            label="Postal Code"
            register={register("postalCode")}
            error={errors.postalCode}
            placeholder="Enter your postal code"
           /> */}
        </div>
        </form>
      </div>

    </main>
  )
}

export default AddressForm