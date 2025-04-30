import React, {useState} from "react";
import axios from "axios";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useForm } from "react-hook-form";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form";
  import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
  import { Card } from "@/components/ui/card";

  const formSchema = z.object({
    friendId: z.string().min(1, "Please select a frined"),
    amount: z.coerce.number().positive("Amount must be positive"),
    direction: z.enum(["paid", "received"]),
  })

const TransactionForm = () => {
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            friendId: "",
            amount: 0,
            direction: "paid",
        }
    })

    return (
        <>

        </>
    )
}

export default TransactionForm;