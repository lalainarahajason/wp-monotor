"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod"

import { LoginForm } from "@/components/auth/login-form";
import { CardWrapper } from "@/components/auth/card-wrapper";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"

import { LoginSchema } from "@/schemas"

const LoginPage = () => {

    const form = useForm<z.infer<typeof LoginSchema>>(
        {
            resolver: zodResolver(LoginSchema),
            defaultValues: {
                email: "",
                password: ""
            }
        }
    );

    return(
        <CardWrapper 
            headerLabel="Welcom back" 
            backButtonHref="/auth/register" 
            backButtonLabel="Create an account"
            showSocial
            >
            <LoginForm />
        </CardWrapper>
    )
}

export default LoginPage;