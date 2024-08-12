"use client";

import { useTransition, useState } from "react";
import { useSession } from "next-auth/react";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
    Form,
    FormField,
    FormControl,
    FormItem,
    FormLabel,
    FormDescription,
    FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { useCurrentUser } from "@/hooks/use-current-user";

import {
    Card,
    CardHeader,
    CardContent,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import { settings } from "@/actions/settings";
import { SettingsSchema } from "@/schemas";

const SettingsCard = () => {

    const user = useCurrentUser();

    console.log(user)

    const [isPending, startTransition] = useTransition();
    const { update } = useSession();
    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();

    const form = useForm<z.infer<typeof SettingsSchema>>({
        resolver: zodResolver(SettingsSchema),
        defaultValues: {
            name: user?.name || undefined
        }
    });

    const onSubmit = (values: z.infer<typeof SettingsSchema>) => {

        startTransition(() => {
            settings(values)
            .then((data) => {
                if(data.error) {
                    setError(data.error);
                }
                if(data.success) {
                    update();
                    setSuccess(data.success);
                }
            })
            .catch(() => setError("Something get wrong!"))
        })
        
    }

    return (
        <Card className="w-[600px]">
            <CardHeader>
                <p className="text-2xl font-semibold text-center">
                    Settings
                </p>
                <CardContent>
                    <Form {...form}>
                        <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
                            <div className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Name</FormLabel>
                                            <FormControl>
                                                <Input 
                                                    {...field} 
                                                    placeholder="John Doe"
                                                    disabled={isPending}
                                                    />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>
                            
                            <Button type="submit">Save</Button>
                        </form>
                    </Form>
                </CardContent>
            </CardHeader>
        </Card>
    )
}

export default SettingsCard;
